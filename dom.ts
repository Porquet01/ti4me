/** Small helpers for building the page without innerHTML. */

export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  text?: string,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

export function byId<T extends HTMLElement = HTMLElement>(id: string): T | null {
  return document.getElementById(id) as T | null;
}

/**
 * An image that falls back to a text placeholder when the file is missing,
 * so the site never shows a broken-image icon.
 */
export function imageSlot(
  src: string,
  alt: string,
  fallbackText: string,
  className: string,
): HTMLElement {
  const wrap = el("div", className);
  const img = el("img");
  img.alt = alt;
  img.loading = "lazy";
  img.decoding = "async";
  img.addEventListener(
    "error",
    () => {
      img.remove();
      wrap.classList.add("is-empty");
      const label = el("span", "placeholder-label", fallbackText);
      label.setAttribute("aria-hidden", "true");
      wrap.appendChild(label);
    },
    { once: true },
  );
  img.src = src;
  wrap.appendChild(img);
  return wrap;
}

export function initials(fullName: string): string {
  const parts = fullName.split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
  return (first + last).toUpperCase();
}
