const KNOWN_PROGRAMMERS = {
  "42576": { title: "완주하지 못한 선수", level: "Lv.1", tags: ["Hash"], status: "todo" },
  "42840": { title: "모의고사", level: "Lv.1", tags: ["Brute Force"], status: "todo" },
  "43165": { title: "타겟 넘버", level: "Lv.2", tags: ["DFS/BFS"], status: "todo" },
  "1844": { title: "게임 맵 최단거리", level: "Lv.2", tags: ["BFS", "Graph"], status: "todo" },
  "42895": { title: "N으로 표현", level: "Lv.3", tags: ["Dynamic Programming"], status: "todo" },
  "49189": { title: "가장 먼 노드", level: "Lv.3", tags: ["Graph", "BFS"], status: "todo" },
};

export function parseProblemUrl(url) {
  const programmersMatch = url.match(/lessons\/(\d+)/);
  if (programmersMatch) {
    const lessonId = programmersMatch[1];
    const preset = KNOWN_PROGRAMMERS[lessonId];
    return {
      site: "Programmers",
      externalId: lessonId,
      url,
      title: preset?.title || `Programmers ${lessonId}`,
      level: preset?.level || "Lv.?",
      tags: preset?.tags || [],
      status: preset?.status || "todo",
    };
  }

  return {
    site: "Custom",
    externalId: `custom-${Date.now()}`,
    url,
    title: "새 문제",
    level: "",
    tags: [],
    status: "todo",
  };
}
