// OpenClaw Gateway client

const GATEWAY_URL = process.env.OPENCLAW_GATEWAY_URL || "http://localhost:18789";
const GATEWAY_TOKEN = process.env.OPENCLAW_GATEWAY_TOKEN || "aad026f2ffd72a8e8b4711fce9c3b46ee5713233506a68c5";

interface ToolInvokeRequest {
  tool: string;
  action?: string;
  args?: Record<string, unknown>;
  sessionKey?: string;
}

interface ToolInvokeResponse<T = unknown> {
  ok: boolean;
  result?: T;
  error?: { type: string; message: string };
}

export async function invokeToolTool<T = unknown>(
  request: ToolInvokeRequest
): Promise<ToolInvokeResponse<T>> {
  const response = await fetch(`${GATEWAY_URL}/tools/invoke`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${GATEWAY_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    return {
      ok: false,
      error: {
        type: "http_error",
        message: `HTTP ${response.status}: ${response.statusText}`,
      },
    };
  }

  return response.json();
}

// Session types
export interface Session {
  sessionKey: string;
  label?: string;
  kind?: string;
  agentId?: string;
  model?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  lastMessage?: {
    role: string;
    content: string;
    timestamp?: string;
  };
}

export interface SubAgent {
  sessionId: string;
  label?: string;
  status: "running" | "completed" | "failed" | "killed";
  task?: string;
  model?: string;
  startedAt?: string;
  completedAt?: string;
  runtime?: string;
}

// API functions
export async function listSessions(options?: {
  activeMinutes?: number;
  limit?: number;
  messageLimit?: number;
  kinds?: string[];
}): Promise<Session[]> {
  const result = await invokeToolTool<{ sessions: Session[] }>({
    tool: "sessions_list",
    args: options || {},
  });

  if (result.ok && result.result) {
    return result.result.sessions || [];
  }
  return [];
}

export async function listSubAgents(options?: {
  recentMinutes?: number;
}): Promise<SubAgent[]> {
  const result = await invokeToolTool<{ agents: SubAgent[] }>({
    tool: "subagents",
    action: "list",
    args: options || {},
  });

  if (result.ok && result.result) {
    return result.result.agents || [];
  }
  return [];
}

export async function steerSubAgent(
  target: string,
  message: string
): Promise<boolean> {
  const result = await invokeToolTool({
    tool: "subagents",
    action: "steer",
    args: { target, message },
  });
  return result.ok;
}

export async function killSubAgent(target: string): Promise<boolean> {
  const result = await invokeToolTool({
    tool: "subagents",
    action: "kill",
    args: { target },
  });
  return result.ok;
}

export async function getSessionStatus(sessionKey?: string): Promise<{
  time?: string;
  model?: string;
  tokens?: { in: number; out: number };
  context?: { used: number; max: number };
  session?: string;
} | null> {
  const result = await invokeToolTool({
    tool: "session_status",
    args: sessionKey ? { sessionKey } : {},
  });

  if (result.ok && result.result) {
    return result.result as {
      time?: string;
      model?: string;
      tokens?: { in: number; out: number };
      context?: { used: number; max: number };
      session?: string;
    };
  }
  return null;
}

// Note: sessions_spawn is blocked by default on /tools/invoke
// We'll need to use a different approach or configure gateway.tools.allow
export async function spawnSubAgent(options: {
  task: string;
  label?: string;
  model?: string;
  mode?: "run" | "session";
  runtime?: "subagent" | "acp";
  timeoutSeconds?: number;
}): Promise<{ ok: boolean; error?: string }> {
  // This will likely fail with 404 due to default deny list
  // but we include it for when the user enables it
  const result = await invokeToolTool({
    tool: "sessions_spawn",
    args: options,
  });

  if (result.ok) {
    return { ok: true };
  }
  return { ok: false, error: result.error?.message || "Failed to spawn agent" };
}
