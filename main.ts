import { initContactForm } from "./contact.js";
import { initNavGlow } from "./glow.js";
import { playGreeting } from "./greeting.js";
import { initNav } from "./nav.js";
import {
  renderAbout,
  renderContactLinks,
  renderEducation,
  renderFooter,
  renderHero,
  renderProjects,
  renderSkills,
} from "./render.js";
import { initTheme } from "./theme.js";

renderHero();
renderAbout();
renderSkills();
renderProjects();
renderEducation();
renderContactLinks();
renderFooter();

initTheme();
initNav();
initContactForm();
initNavGlow();
void playGreeting();
