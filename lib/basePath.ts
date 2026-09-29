/**
 * Prefix absolute public asset paths with the deploy basePath when set.
 * Empty on the custom-domain root deploy; kept so a subpath deploy can
 * return without rewriting every asset call site.
 */
export function withBasePath(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!base || path === base || path.startsWith(`${base}/`)) return path;
  return `${base}${path}`;
}
