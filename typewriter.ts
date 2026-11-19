/** Types text into an element one character at a time. */

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function delayAfter(char: string): number {
  if (char === "," || char === ".") return 260;
  return 70 + Math.random() * 55;
}

export function typeInto(target: HTMLElement, text: string, startDelay = 350): Promise<void> {
  if (prefersReducedMotion()) {
    target.textContent = text;
    return Promise.resolve();
  }

  const chars = Array.from(text);
  target.textContent = "";

  return new Promise((resolve) => {
    let index = 0;
    const step = (): void => {
      const next = chars[index];
      if (next === undefined) {
        resolve();
        return;
      }
      target.textContent = (target.textContent ?? "") + next;
      index += 1;
      window.setTimeout(step, delayAfter(next));
    };
    window.setTimeout(step, startDelay);
  });
}
