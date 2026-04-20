// Daily Brief Generator
// Generates proactive morning briefings based on available data

export interface BriefItem {
  id: string;
  category: "priority" | "info" | "action" | "alert";
  icon: string;
  title: string;
  description: string;
  action?: {
    label: string;
    href?: string;
    command?: string;
  };
  timestamp?: string;
}

export interface DailyBrief {
  date: string;
  greeting: string;
  summary: string;
  items: BriefItem[];
  generatedAt: string;
}

// Get current time-based greeting
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

// Get day summary
function getDaySummary(): string {
  const day = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const date = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  return `${day}, ${date}`;
}

// Generate brief items based on current context
export async function generateDailyBrief(): Promise<DailyBrief> {
  const items: BriefItem[] = [];
  const now = new Date();
  const hour = now.getHours();

  // Mission reminder (always first)
  items.push({
    id: "mission",
    category: "priority",
    icon: "🎯",
    title: "Mission Focus",
    description: "Build the autonomous AI organization that works 24/7/365 to produce ongoing monetary value.",
  });

  // Morning priorities (6 AM - 12 PM)
  if (hour >= 6 && hour < 12) {
    items.push({
      id: "morning-review",
      category: "action",
      icon: "📧",
      title: "Review inbox",
      description: "Check for overnight emails and urgent messages",
      action: { label: "Check Email", command: "Check my inbox for important emails" },
    });

    items.push({
      id: "calendar-check",
      category: "info",
      icon: "📅",
      title: "Today's schedule",
      description: "Review any meetings or deadlines",
      action: { label: "View Calendar", command: "What's on my calendar today?" },
    });
  }

  // Market hours (9 AM - 4 PM EST / 6 AM - 1 PM PST)
  if (hour >= 6 && hour < 14) {
    items.push({
      id: "gold-price",
      category: "info",
      icon: "🥇",
      title: "Gold market update",
      description: "Check spot price and overnight movements",
      action: { label: "Get Price", command: "What's the current gold spot price?" },
    });
  }

  // LSD project check (daily)
  items.push({
    id: "lsd-status",
    category: "action",
    icon: "🏗️",
    title: "LSD Platform progress",
    description: "Review current phase tasks and blockers",
    action: { label: "View Workflow", href: "/lsd" },
  });

  // X/Brand engagement (best times: 9 AM, 12 PM, 3 PM EST)
  if (hour === 9 || hour === 12 || hour === 15) {
    items.push({
      id: "x-post",
      category: "action",
      icon: "🐦",
      title: "Optimal posting time",
      description: "High engagement window — consider posting content",
      action: { label: "View Ideas", href: "/brand" },
    });
  }

  // Afternoon check-in (2-4 PM)
  if (hour >= 14 && hour < 16) {
    items.push({
      id: "afternoon-review",
      category: "info",
      icon: "📊",
      title: "Progress check",
      description: "Review what's been accomplished today",
    });
  }

  // End of day (5-7 PM)
  if (hour >= 17 && hour < 19) {
    items.push({
      id: "eod-summary",
      category: "info",
      icon: "🌅",
      title: "End of day",
      description: "Time to wrap up and plan for tomorrow",
    });

    items.push({
      id: "family-time",
      category: "priority",
      icon: "👨‍👩‍👧‍👦",
      title: "Family focus",
      description: "Step away from work — family time matters",
    });
  }

  // Agent status (always include)
  items.push({
    id: "agent-status",
    category: "info",
    icon: "🤖",
    title: "Agent fleet ready",
    description: "Sub-agents available for task delegation",
    action: { label: "View Fleet", href: "/" },
  });

  return {
    date: getDaySummary(),
    greeting: getGreeting(),
    summary: generateSummary(items),
    items,
    generatedAt: now.toISOString(),
  };
}

function generateSummary(items: BriefItem[]): string {
  const actionCount = items.filter((i) => i.category === "action").length;
  const priorityCount = items.filter((i) => i.category === "priority").length;
  
  if (priorityCount > 0 && actionCount > 0) {
    return `${priorityCount} priority item${priorityCount > 1 ? 's' : ''} and ${actionCount} action${actionCount > 1 ? 's' : ''} for today.`;
  } else if (actionCount > 0) {
    return `${actionCount} action${actionCount > 1 ? 's' : ''} suggested for today.`;
  }
  return "All systems nominal. Ready for your commands.";
}

// Check if we should show morning brief (first access of the day)
export function shouldShowMorningBrief(): boolean {
  if (typeof window === "undefined") return false;
  
  const lastBriefDate = localStorage.getItem("last-daily-brief");
  const today = new Date().toDateString();
  
  return lastBriefDate !== today;
}

// Mark morning brief as shown
export function markBriefShown(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("last-daily-brief", new Date().toDateString());
}
