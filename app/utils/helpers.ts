export const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};

export const dedupeTags = <
  T extends { _id?: string; slug?: { current?: string }; name?: string }
>(
  items: T[] | null | undefined
): T[] => {
  const seen = new Set<string>();
  const result: T[] = [];
  for (const item of items || []) {
    if (!item) continue;
    const key = item.slug?.current || item.name || item._id;
    if (!key || seen.has(key)) continue;
    seen.add(key);
    result.push(item);
  }
  return result;
};