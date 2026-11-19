import { byId } from "./dom.js";
export function initNav() {
    const toggle = byId("nav-toggle");
    const links = byId("nav-links");
    if (!toggle || !links)
        return;
    const setOpen = (open) => {
        links.dataset.open = String(open);
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    toggle.addEventListener("click", () => setOpen(links.dataset.open !== "true"));
    links.addEventListener("click", (event) => {
        if (event.target instanceof HTMLAnchorElement)
            setOpen(false);
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape")
            setOpen(false);
    });
    // Mark the link of the section currently in view.
    const anchors = Array.from(links.querySelectorAll('a[href^="#"]'));
    const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (!entry.isIntersecting)
                continue;
            for (const anchor of anchors) {
                if (anchor.hash === `#${entry.target.id}`) {
                    anchor.setAttribute("aria-current", "true");
                }
                else {
                    anchor.removeAttribute("aria-current");
                }
            }
        }
    }, { rootMargin: "-45% 0px -50% 0px" });
    for (const anchor of anchors) {
        const section = document.querySelector(anchor.hash);
        if (section)
            observer.observe(section);
    }
}
