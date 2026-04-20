import { NextRequest } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

const GATEWAY_URL = process.env.OPENCLAW_GATEWAY_URL || "http://localhost:18789";
const GATEWAY_TOKEN = process.env.OPENCLAW_GATEWAY_TOKEN || "aad026f2ffd72a8e8b4711fce9c3b46ee5713233506a68c5";

// Directory for uploaded files (accessible by OpenClaw agent)
const UPLOAD_DIR = join(process.cwd(), "uploads");

// Ensure upload directory exists
async function ensureUploadDir() {
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true });
  }
}

// Generate unique filename
function uniqueFilename(originalName: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).slice(2, 8);
  const ext = originalName.split(".").pop() || "";
  const baseName = originalName.replace(/\.[^/.]+$/, "").slice(0, 50);
  return `${timestamp}-${random}-${baseName}.${ext}`;
}

// Check if content type indicates form data
function isFormData(contentType: string | null): boolean {
  return contentType?.includes("multipart/form-data") || false;
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type");
  
  let message = "";
  let history: Array<{ role: string; content: string }> = [];
  const uploadedFiles: Array<{ name: string; path: string; type: string; size: number }> = [];

  try {
    if (isFormData(contentType)) {
      // Handle multipart form data with files
      await ensureUploadDir();
      
      const formData = await request.formData();
      message = formData.get("message") as string || "";
      
      const historyStr = formData.get("history") as string;
      if (historyStr) {
        try {
          history = JSON.parse(historyStr);
        } catch {
          history = [];
        }
      }

      // Process uploaded files
      const files = formData.getAll("files");
      
      for (const file of files) {
        if (file instanceof File) {
          const filename = uniqueFilename(file.name);
          const filepath = join(UPLOAD_DIR, filename);
          
          const bytes = await file.arrayBuffer();
          await writeFile(filepath, Buffer.from(bytes));
          
          uploadedFiles.push({
            name: file.name,
            path: filepath,
            type: file.type,
            size: file.size,
          });
        }
      }
    } else {
      // Handle JSON request
      const body = await request.json();
      message = body.message || "";
      history = body.history || [];
    }

    if (!message && uploadedFiles.length === 0) {
      return new Response(JSON.stringify({ error: "Message or files required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Build input array with history
    const input: Array<{ 
      type: string; 
      role?: string; 
      content?: string | Array<{ type: string; text?: string; image_url?: { url: string } }>;
    }> = [];
    
    // Add conversation history (last 10 messages)
    for (const msg of history.slice(-10)) {
      input.push({
        type: "message",
        role: msg.role,
        content: msg.content,
      });
    }
    
    // Build current message content
    if (uploadedFiles.length > 0) {
      // Multimodal message with files
      const content: Array<{ type: string; text?: string; image_url?: { url: string } }> = [];
      
      // Add file references
      for (const file of uploadedFiles) {
        if (file.type.startsWith("image/")) {
          // For images, use file:// URL that OpenClaw can read
          content.push({
            type: "image_url",
            image_url: { url: `file://${file.path}` },
          });
        } else {
          // For documents, include path in text
          const fileDesc = `[Attached file: ${file.name} (${file.type}, ${(file.size / 1024).toFixed(1)}KB) at: ${file.path}]`;
          content.push({
            type: "text",
            text: fileDesc,
          });
        }
      }
      
      // Add text message if present
      if (message) {
        content.push({
          type: "text",
          text: message,
        });
      } else {
        content.push({
          type: "text",
          text: "Please review the attached file(s).",
        });
      }
      
      input.push({
        type: "message",
        role: "user",
        content,
      });
    } else {
      // Text-only message
      input.push({
        type: "message",
        role: "user",
        content: message,
      });
    }

    const response = await fetch(`${GATEWAY_URL}/v1/responses`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GATEWAY_TOKEN}`,
        "Content-Type": "application/json",
        "x-openclaw-agent-id": "main",
      },
      body: JSON.stringify({
        model: "openclaw",
        input,
        stream: true,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Gateway error:", error);
      return new Response(JSON.stringify({ error: `Gateway error: ${response.status}` }), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Stream the SSE response back to the client
    const headers = new Headers();
    headers.set("Content-Type", "text/event-stream");
    headers.set("Cache-Control", "no-cache");
    headers.set("Connection", "keep-alive");

    return new Response(response.body, { headers });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(JSON.stringify({ error: "Failed to process request" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
