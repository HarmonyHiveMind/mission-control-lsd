import { NextRequest, NextResponse } from "next/server";
import { steerSubAgent, killSubAgent, spawnSubAgent } from "@/lib/openclaw";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ action: string }> }
) {
  const { action } = await params;
  const body = await request.json();

  try {
    switch (action) {
      case "steer": {
        const { target, message } = body;
        if (!target || !message) {
          return NextResponse.json(
            { ok: false, error: "Missing target or message" },
            { status: 400 }
          );
        }
        const success = await steerSubAgent(target, message);
        return NextResponse.json({ ok: success });
      }

      case "kill": {
        const { target } = body;
        if (!target) {
          return NextResponse.json(
            { ok: false, error: "Missing target" },
            { status: 400 }
          );
        }
        const success = await killSubAgent(target);
        return NextResponse.json({ ok: success });
      }

      case "spawn": {
        const { task, label, model, mode, runtime, timeoutSeconds } = body;
        if (!task) {
          return NextResponse.json(
            { ok: false, error: "Missing task" },
            { status: 400 }
          );
        }
        const result = await spawnSubAgent({
          task,
          label,
          model,
          mode,
          runtime,
          timeoutSeconds,
        });
        return NextResponse.json(result);
      }

      default:
        return NextResponse.json(
          { ok: false, error: `Unknown action: ${action}` },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error(`Agent action ${action} failed:`, error);
    return NextResponse.json(
      { ok: false, error: "Action failed" },
      { status: 500 }
    );
  }
}
