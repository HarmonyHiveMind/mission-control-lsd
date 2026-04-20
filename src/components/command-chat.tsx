"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useChat, type Message, type MessageAttachment } from "@/contexts/chat-context";
import {
  MessageSquare,
  Send,
  Loader2,
  User,
  Bot,
  AlertCircle,
  Paperclip,
  X,
  FileText,
  Image as ImageIcon,
  File,
} from "lucide-react";

interface Attachment {
  id: string;
  file: File;
  preview?: string;
  type: "image" | "document" | "other";
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/pdf",
  "text/plain",
  "text/markdown",
  "application/json",
  "text/csv",
];

export function CommandChat() {
  const { messages, setMessages, updateMessage } = useChat();
  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "error">("connected");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Cleanup previews on unmount
  useEffect(() => {
    return () => {
      attachments.forEach((att) => {
        if (att.preview) URL.revokeObjectURL(att.preview);
      });
    };
  }, [attachments]);

  const getFileType = (file: File): "image" | "document" | "other" => {
    if (file.type.startsWith("image/")) return "image";
    if (
      file.type === "application/pdf" ||
      file.type.startsWith("text/") ||
      file.type === "application/json"
    )
      return "document";
    return "other";
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadError(null);

    const newAttachments: Attachment[] = [];
    const errors: string[] = [];

    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        errors.push(`${file.name} exceeds 10MB limit`);
        continue;
      }

      if (!ALLOWED_TYPES.includes(file.type) && !file.type.startsWith("image/")) {
        errors.push(`${file.name} has unsupported type`);
        continue;
      }

      const type = getFileType(file);
      const attachment: Attachment = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        file,
        type,
      };

      if (type === "image") {
        attachment.preview = URL.createObjectURL(file);
      }

      newAttachments.push(attachment);
    }

    if (errors.length > 0) {
      setUploadError(errors.join("; "));
    }

    setAttachments((prev) => [...prev, ...newAttachments].slice(0, 5)); // Max 5 files
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => {
      const att = prev.find((a) => a.id === id);
      if (att?.preview) URL.revokeObjectURL(att.preview);
      return prev.filter((a) => a.id !== id);
    });
  };

  const sendMessage = async () => {
    if ((!input.trim() && attachments.length === 0) || isStreaming) return;

    const messageAttachments: MessageAttachment[] = attachments.map((att) => ({
      name: att.file.name,
      type: att.type,
      url: att.preview,
      size: att.file.size,
    }));

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
      status: "complete",
      attachments: messageAttachments.length > 0 ? messageAttachments : undefined,
    };

    const assistantMessage: Message = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: "",
      timestamp: new Date(),
      status: "streaming",
    };

    // Clear input and attachments
    const currentAttachments = [...attachments];
    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInput("");
    setAttachments([]);
    setIsStreaming(true);
    setUploadError(null);

    try {
      const history = messages
        .filter((m) => m.status === "complete")
        .map((m) => ({ role: m.role, content: m.content }));

      // Use FormData if we have attachments
      let response: Response;

      if (currentAttachments.length > 0) {
        const formData = new FormData();
        formData.append("message", userMessage.content);
        formData.append("history", JSON.stringify(history));
        
        currentAttachments.forEach((att) => {
          formData.append("files", att.file);
        });

        response = await fetch("/api/chat", {
          method: "POST",
          body: formData,
        });
      } else {
        response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: userMessage.content,
            history,
          }),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") continue;

              try {
                const parsed = JSON.parse(data);

                if (parsed.type === "response.output_text.delta") {
                  fullContent += parsed.delta || "";
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === assistantMessage.id
                        ? { ...m, content: fullContent }
                        : m
                    )
                  );
                } else if (parsed.type === "response.completed") {
                  if (parsed.response?.output) {
                    for (const item of parsed.response.output) {
                      if (item.type === "message" && item.content) {
                        for (const part of item.content) {
                          if (part.type === "output_text" && part.text) {
                            fullContent = part.text;
                          }
                        }
                      }
                    }
                  }
                }
              } catch {
                // Skip non-JSON lines
              }
            }
          }
        }
      }

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMessage.id
            ? { ...m, content: fullContent || "...", status: "complete" }
            : m
        )
      );
      setConnectionStatus("connected");
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMessage.id
            ? {
                ...m,
                content: "Connection error. Please try again.",
                status: "error",
              }
            : m
        )
      );
      setConnectionStatus("error");
    } finally {
      setIsStreaming(false);
      inputRef.current?.focus();
      // Cleanup previews
      currentAttachments.forEach((att) => {
        if (att.preview) URL.revokeObjectURL(att.preview);
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const renderAttachmentIcon = (type: "image" | "document" | "other") => {
    switch (type) {
      case "image":
        return <ImageIcon className="w-4 h-4" />;
      case "document":
        return <FileText className="w-4 h-4" />;
      default:
        return <File className="w-4 h-4" />;
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 h-full flex flex-col">
      <CardHeader className="pb-3 shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-500" />
              Command Chat
            </CardTitle>
            <CardDescription className="text-slate-400">
              Direct line to Oden
            </CardDescription>
          </div>
          <Badge
            variant="outline"
            className={
              connectionStatus === "connected"
                ? "border-green-500/50 text-green-400"
                : "border-red-500/50 text-red-400"
            }
          >
            <span
              className={`w-2 h-2 rounded-full mr-1 ${
                connectionStatus === "connected"
                  ? "bg-green-500 animate-pulse"
                  : "bg-red-500"
              }`}
            />
            {connectionStatus === "connected" ? "Live" : "Error"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col min-h-0 p-3">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto space-y-3 mb-3 pr-1">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2 ${
                message.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  message.role === "user"
                    ? "bg-blue-500/20 text-blue-400"
                    : "bg-amber-500/20 text-amber-400"
                }`}
              >
                {message.role === "user" ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-blue-500/10 border border-blue-500/20"
                    : "bg-slate-700/50 border border-slate-600"
                }`}
              >
                {/* Attachments in message */}
                {message.attachments && message.attachments.length > 0 && (
                  <div className="mb-2 space-y-2">
                    {message.attachments.map((att, i) => (
                      <div key={i}>
                        {att.type === "image" && att.url ? (
                          <img
                            src={att.url}
                            alt={att.name}
                            className="max-w-full max-h-48 rounded-md"
                          />
                        ) : (
                          <div className="flex items-center gap-2 px-2 py-1.5 bg-slate-600/50 rounded text-xs text-slate-300">
                            {renderAttachmentIcon(att.type)}
                            <span className="truncate max-w-[150px]">{att.name}</span>
                            <span className="text-slate-500">
                              ({formatFileSize(att.size)})
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                
                {message.content && (
                  <p className="text-sm text-slate-200 whitespace-pre-wrap">
                    {message.content}
                    {message.status === "streaming" && (
                      <span className="inline-block w-1.5 h-4 bg-amber-500 ml-0.5 animate-pulse" />
                    )}
                  </p>
                )}
                {message.status === "error" && (
                  <div className="flex items-center gap-1 mt-1 text-red-400 text-xs">
                    <AlertCircle className="w-3 h-3" />
                    Error
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Attachment Preview */}
        {attachments.length > 0 && (
          <div className="mb-2 p-2 bg-slate-700/30 rounded-lg border border-slate-600">
            <div className="flex flex-wrap gap-2">
              {attachments.map((att) => (
                <div
                  key={att.id}
                  className="relative group"
                >
                  {att.type === "image" && att.preview ? (
                    <div className="relative">
                      <img
                        src={att.preview}
                        alt={att.file.name}
                        className="h-16 w-16 object-cover rounded-md border border-slate-500"
                      />
                      <button
                        onClick={() => removeAttachment(att.id)}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="relative flex items-center gap-2 px-2 py-1.5 bg-slate-600/50 rounded border border-slate-500">
                      {renderAttachmentIcon(att.type)}
                      <div className="max-w-[100px]">
                        <p className="text-xs text-slate-300 truncate">
                          {att.file.name}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          {formatFileSize(att.file.size)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeAttachment(att.id)}
                        className="ml-1 w-4 h-4 bg-red-500/80 hover:bg-red-500 rounded-full flex items-center justify-center text-white"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Error */}
        {uploadError && (
          <div className="mb-2 px-3 py-2 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-3 h-3 shrink-0" />
            {uploadError}
          </div>
        )}

        {/* Input Area */}
        <div className="flex gap-2 shrink-0">
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={ALLOWED_TYPES.join(",")}
            onChange={handleFileSelect}
            className="hidden"
          />
          
          {/* Attach button */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            disabled={isStreaming || attachments.length >= 5}
            className="border-slate-600 bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white shrink-0"
            title="Attach files (max 5)"
          >
            <Paperclip className="w-4 h-4" />
          </Button>

          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={attachments.length > 0 ? "Add a message (optional)..." : "Send a command..."}
            disabled={isStreaming}
            className="flex-1 px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 focus:outline-none disabled:opacity-50"
          />
          <Button
            onClick={sendMessage}
            disabled={(!input.trim() && attachments.length === 0) || isStreaming}
            className="bg-amber-500 hover:bg-amber-600 text-slate-900"
          >
            {isStreaming ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
        
        {/* File hint */}
        <p className="text-[10px] text-slate-500 mt-1 text-center">
          Supports images, PDFs, text files • Max 10MB each • Up to 5 files
        </p>
      </CardContent>
    </Card>
  );
}
