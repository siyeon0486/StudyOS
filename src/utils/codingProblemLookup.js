const KNOWN_PROGRAMMERS = {
  "42576": { title: "완주하지 못한 선수", level: "Lv.1", tags: ["Hash"] },
  "42840": { title: "모의고사", level: "Lv.1", tags: ["Brute Force"] },
  "43165": { title: "타겟 넘버", level: "Lv.2", tags: ["DFS/BFS"] },
  "1844": { title: "게임 맵 최단거리", level: "Lv.2", tags: ["BFS", "Graph"] },
  "42895": { title: "N으로 표현", level: "Lv.3", tags: ["Dynamic Programming"] },
  "49189": { title: "가장 먼 노드", level: "Lv.3", tags: ["Graph", "BFS"] },
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
      status: "todo",
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

export function parseProblemLine(line, category = "custom") {
  const parts = line.split("|").map((x) => x.trim());
  if (parts.length >= 2) {
    const [title, url, level = "", tagText = ""] = parts;
    const parsed = url.includes("http") ? parseProblemUrl(url) : {};
    return {
      site: parsed.site || "Programmers",
      externalId: parsed.externalId || `manual-${Date.now()}`,
      title: title || parsed.title || "새 문제",
      url: url || "",
      level: level || parsed.level || "",
      tags: tagText ? tagText.split(",").map((x) => x.trim()).filter(Boolean) : parsed.tags || [],
      status: "todo",
      category,
    };
  }

  if (line.includes("http")) return { ...parseProblemUrl(line), category };

  return {
    site: "Programmers",
    externalId: `manual-${Date.now()}`,
    title: line,
    url: "",
    level: "",
    tags: [],
    status: "todo",
    category,
  };
}
