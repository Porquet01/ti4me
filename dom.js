/** Small helpers for building the page without innerHTML. */
export function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className)
        node.className = className;
    if (text !== undefined)
        node.textContent = text;
    return node;
}
export function byId(id) {
    return document.getElementById(id);
}
/**
 * An image that falls back to a text placeholder when the file is missing,
 * so the site never shows a broken-image icon.
 */
export function imageSlot(src, alt, fallbackText, className) {
    const wrap = el("div", className);
    const img = el("img");
    img.alt = alt;
    img.loading = "lazy";
    img.decoding = "async";
    img.addEventListener("error", () => {
        img.remove();
        wrap.classList.add("is-empty");
        const label = el("span", "placeholder-label", fallbackText);
        label.setAttribute("aria-hidden", "true");
        wrap.appendChild(label);
    }, { once: true });
    img.src = src;
    wrap.appendChild(img);
    return wrap;
}
export function initials(fullName) {
    const parts = fullName.split(/\s+/).filter(Boolean);
    const first = parts[0]?.[0] ?? "";
    const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
    return (first + last).toUpperCase();
}
