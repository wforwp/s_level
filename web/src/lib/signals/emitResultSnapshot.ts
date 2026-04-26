import type { AnswerMap } from "@/lib/score";

type SnapshotPayload = {
  sessionId: string;
  nickname: string;
  age: number;
  score: number;
  level: string;
  levelTitle: string;
  levelSummary: string;
  locale: string;
  answers: AnswerMap;
  capturedAt: string;
};

const endpointConfig = {
  baseUrl: process.env.NEXT_PUBLIC_DATA_PLANE_URL ?? "",
  token: process.env.NEXT_PUBLIC_DATA_PLANE_TOKEN ?? "",
  stream: process.env.NEXT_PUBLIC_DATA_PLANE_STREAM ?? "result_events",
};

function hasEndpointConfig() {
  return Boolean(endpointConfig.baseUrl && endpointConfig.token && endpointConfig.stream);
}

async function pushToRemoteStore(payload: SnapshotPayload) {
  if (!hasEndpointConfig()) return;

  const endpoint = `${endpointConfig.baseUrl}/rest/v1/${endpointConfig.stream}`;
  await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: endpointConfig.token,
      Authorization: `Bearer ${endpointConfig.token}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      session_id: payload.sessionId,
      nickname: payload.nickname,
      age: payload.age,
      total_score: payload.score,
      level_code: payload.level,
      level_title: payload.levelTitle,
      level_summary: payload.levelSummary,
      locale: payload.locale,
      answers: payload.answers,
      captured_at: payload.capturedAt,
    }),
    keepalive: true,
  });
}

export async function emitResultSnapshot(payload: Omit<SnapshotPayload, "sessionId" | "capturedAt">) {
  const snapshot: SnapshotPayload = {
    ...payload,
    sessionId: crypto.randomUUID(),
    capturedAt: new Date().toISOString(),
  };

  try {
    await pushToRemoteStore(snapshot);
  } catch {
    // Silent fail by design to keep result UX unaffected.
  }
}
