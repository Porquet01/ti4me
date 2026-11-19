import { byId } from "./dom.js";
import { profile } from "./profile.js";
import { typeInto } from "./typewriter.js";

/**
 * Writes "Hi, I'm Felix." into the hero heading, typed out by TypeScript.
 * Screen readers get the full sentence straight away; the typing is visual only.
 */
export async function playGreeting(): Promise<void> {
  const text = `Hi, I'm ${profile.name}.`;
  const readable = byId("hero-greeting-text");
  const ghost = byId("hero-greeting-ghost");
  const typed = byId("hero-typed");
  const wrap = byId("hero-greeting");
  if (!readable || !ghost || !typed || !wrap) return;

  readable.textContent = text;
  ghost.textContent = text; // invisible copy that reserves the final size
  wrap.dataset.state = "typing";
  await typeInto(typed, text);
  wrap.dataset.state = "done";
}
