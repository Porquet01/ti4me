/**
 * Makes the navigation bar glow where the cursor is.
 * The glow follows the pointer sideways and fades as it moves away from the bar.
 */
export function initNavGlow() {
    const header = document.querySelector(".site-header");
    if (!header)
        return;
    const reach = 240; // pixels below the bar where the glow has fully faded
    let latest = null;
    let frame = 0;
    const update = () => {
        frame = 0;
        if (!latest)
            return;
        const box = header.getBoundingClientRect();
        const x = latest.clientX - box.left;
        const y = Math.min(Math.max(latest.clientY - box.top, 0), box.height);
        const outside = latest.clientY < box.top
            ? box.top - latest.clientY
            : Math.max(0, latest.clientY - box.bottom);
        const strength = Math.max(0, 1 - outside / reach);
        header.style.setProperty("--glow-x", `${x}px`);
        header.style.setProperty("--glow-y", `${y}px`);
        header.style.setProperty("--glow-opacity", strength.toFixed(2));
    };
    document.addEventListener("pointermove", (event) => {
        if (event.pointerType === "touch")
            return;
        latest = event;
        if (!frame)
            frame = window.requestAnimationFrame(update);
    });
    document.documentElement.addEventListener("pointerleave", () => {
        header.style.setProperty("--glow-opacity", "0");
    });
}
