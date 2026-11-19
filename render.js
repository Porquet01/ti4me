import { contact } from "./config.js";
import { byId, el, imageSlot, initials } from "./dom.js";
import { education, profile, skills } from "./profile.js";
import { projects } from "./projects.js";
function tok(className, text) {
    return el("span", className, text);
}
/** Draws the profile as a TypeScript object, built from the real profile data. */
function renderHeroCode(target) {
    const entries = [
        ["name", profile.fullName],
        ["title", profile.title],
        ["location", profile.location],
        ["studying", profile.studying],
        ["stack", profile.stack],
        ["lookingFor", profile.lookingFor],
    ];
    target.replaceChildren();
    let index = 0;
    const addLine = (...parts) => {
        const row = el("span", "code-line");
        row.style.setProperty("--i", String(index++));
        row.append(...parts);
        target.appendChild(row);
    };
    addLine(tok("tok-kw", "const"), " ", tok("tok-var", "felix"), tok("tok-punc", ": "), tok("tok-type", "Profile"), tok("tok-punc", " = {"));
    for (const [key, value] of entries) {
        if (Array.isArray(value)) {
            const items = [];
            value.forEach((item, i) => {
                if (i > 0)
                    items.push(tok("tok-punc", ", "));
                items.push(tok("tok-str", `"${item}"`));
            });
            addLine("  ", tok("tok-key", key), tok("tok-punc", ": ["), ...items, tok("tok-punc", "],"));
        }
        else {
            addLine("  ", tok("tok-key", key), tok("tok-punc", ": "), tok("tok-str", `"${value}"`), tok("tok-punc", ","));
        }
    }
    addLine(tok("tok-punc", "};"));
}
export function renderHero() {
    const title = byId("hero-title");
    const location = byId("hero-location");
    const summary = byId("hero-summary");
    const code = byId("hero-code");
    const actions = byId("hero-actions");
    if (title)
        title.textContent = profile.title;
    if (location)
        location.textContent = profile.location;
    if (summary)
        summary.textContent = profile.summary;
    if (code)
        renderHeroCode(code);
    if (actions && profile.cvUrl) {
        const cv = el("a", "btn btn-ghost", "Download my CV");
        cv.href = profile.cvUrl;
        cv.setAttribute("download", "");
        actions.appendChild(cv);
    }
}
export function renderAbout() {
    const photo = byId("about-photo");
    const text = byId("about-text");
    const focus = byId("about-focus");
    if (photo) {
        photo.replaceChildren(imageSlot(profile.photo, profile.photoAlt, initials(profile.fullName), "photo-frame"));
    }
    if (text) {
        text.replaceChildren(...profile.about.map((paragraph) => el("p", undefined, paragraph)));
    }
    if (focus) {
        focus.replaceChildren(...profile.focus.map((item) => el("li", undefined, item)));
    }
}
export function renderSkills() {
    const grid = byId("skills-grid");
    if (!grid)
        return;
    grid.replaceChildren(...skills.map((group) => {
        const box = el("div", "skill-group");
        const list = el("ul", "chips");
        list.append(...group.items.map((item) => el("li", undefined, item)));
        box.append(el("h3", undefined, group.heading), el("p", "skill-blurb", group.blurb), list);
        return box;
    }));
}
function externalLink(text, href, label) {
    const link = el("a", "text-link", text);
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", `${label} (opens in a new tab)`);
    return link;
}
export function renderProjects() {
    const grid = byId("projects-grid");
    if (!grid)
        return;
    grid.replaceChildren(...projects.map((project) => {
        const card = el("article", "project-card");
        const media = imageSlot(project.image, project.imageAlt, project.title.charAt(0).toUpperCase(), "project-media");
        const body = el("div", "project-body");
        body.append(el("h3", undefined, project.title), el("p", undefined, project.summary));
        const tech = el("ul", "chips chips-small");
        tech.setAttribute("aria-label", "Technologies used");
        tech.append(...project.tech.map((item) => el("li", undefined, item)));
        body.appendChild(tech);
        const links = el("div", "project-links");
        if (project.liveUrl) {
            links.appendChild(externalLink("Live site", project.liveUrl, `${project.title}: live site`));
        }
        if (project.repoUrl) {
            links.appendChild(externalLink("Source code", project.repoUrl, `${project.title}: source code`));
        }
        if (links.childElementCount > 0)
            body.appendChild(links);
        card.append(media, body);
        return card;
    }));
}
export function renderEducation() {
    const list = byId("education-list");
    if (!list)
        return;
    list.replaceChildren(...education.map((entry) => {
        const item = el("article", "timeline-entry");
        const points = el("ul", "timeline-points");
        points.append(...entry.points.map((point) => el("li", undefined, point)));
        item.append(el("h3", undefined, entry.programme), el("p", "timeline-school", entry.school), el("p", "timeline-status", entry.status), points);
        return item;
    }));
}
export function renderContactLinks() {
    const list = byId("contact-links");
    if (!list)
        return;
    const rows = [
        ["Email", contact.email, `mailto:${contact.email}`],
        ["GitHub", `github.com/${contact.github}`, contact.githubUrl],
    ];
    if (contact.linkedinUrl) {
        rows.push(["LinkedIn", "Connect on LinkedIn", contact.linkedinUrl]);
    }
    list.replaceChildren(...rows.map(([label, text, href]) => {
        const row = el("div", "contact-row");
        const link = el("a", "text-link", text);
        link.href = href;
        if (!href.startsWith("mailto:")) {
            link.target = "_blank";
            link.rel = "noopener noreferrer";
        }
        const term = el("dt", undefined, label);
        const detail = el("dd");
        detail.appendChild(link);
        row.append(term, detail);
        return row;
    }));
}
export function renderFooter() {
    const footer = byId("footer-text");
    if (footer) {
        footer.textContent = `© ${new Date().getFullYear()} ${profile.fullName}. Built with TypeScript, HTML and CSS.`;
    }
}
