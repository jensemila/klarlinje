export function markdownToHtml(md: string): string {
  return md
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("# ")) return `<h1>${trimmed.slice(2)}</h1>`;
      if (trimmed.startsWith("## ")) return `<h2>${trimmed.slice(3)}</h2>`;
      if (trimmed.startsWith("### ")) return `<h3>${trimmed.slice(4)}</h3>`;
      const html = trimmed
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>")
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
        .replace(/\n/g, "<br/>");
      return `<p>${html}</p>`;
    })
    .filter(Boolean)
    .join("\n");
}

export function substituteVariables(
  text: string,
  name: string | null | undefined
): string {
  return text.replace(/\{\{name\}\}/g, name?.trim() || "du");
}
