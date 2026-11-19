import { contact } from "./config.js";
import { byId } from "./dom.js";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_MESSAGE = 10;
const MAX_MESSAGE = 2000;
export function validate(values) {
    const errors = {};
    const name = values.name.trim();
    const email = values.email.trim();
    const message = values.message.trim();
    if (name.length < 2)
        errors.name = "Please enter your name (at least 2 characters).";
    if (!EMAIL_PATTERN.test(email))
        errors.email = "Please enter a valid email address, like name@example.com.";
    if (message.length < MIN_MESSAGE) {
        errors.message = `Your message is too short. Please write at least ${MIN_MESSAGE} characters.`;
    }
    else if (message.length > MAX_MESSAGE) {
        errors.message = `Your message is too long. Please keep it under ${MAX_MESSAGE} characters.`;
    }
    return errors;
}
async function sendToEndpoint(endpoint, values) {
    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({
                name: values.name.trim(),
                email: values.email.trim(),
                message: values.message.trim(),
            }),
        });
        return response.ok;
    }
    catch {
        return false;
    }
}
function openEmailApp(values) {
    const subject = encodeURIComponent(`Portfolio message from ${values.name.trim()}`);
    const body = encodeURIComponent(`${values.message.trim()}\n\n${values.name.trim()}\n${values.email.trim()}`);
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
}
export function initContactForm() {
    const form = byId("contact-form");
    const status = byId("cf-status");
    const submit = byId("cf-submit");
    if (!form || !status || !submit)
        return;
    const inputs = {
        name: byId("cf-name"),
        email: byId("cf-email"),
        message: byId("cf-message"),
    };
    const company = byId("cf-company");
    const showErrors = (errors) => {
        for (const field of Object.keys(inputs)) {
            const input = inputs[field];
            const slot = byId(`cf-${field}-error`);
            const text = errors[field] ?? "";
            if (slot)
                slot.textContent = text;
            if (input) {
                if (text)
                    input.setAttribute("aria-invalid", "true");
                else
                    input.removeAttribute("aria-invalid");
            }
        }
    };
    const setStatus = (text, kind) => {
        status.textContent = text;
        status.dataset.kind = kind;
    };
    const readValues = () => ({
        name: inputs.name?.value ?? "",
        email: inputs.email?.value ?? "",
        message: inputs.message?.value ?? "",
        company: company?.value ?? "",
    });
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        setStatus("", "info");
        const values = readValues();
        const errors = validate(values);
        showErrors(errors);
        const firstInvalid = Object.keys(inputs).find((field) => errors[field]);
        if (firstInvalid) {
            inputs[firstInvalid]?.focus();
            setStatus("Please fix the highlighted fields and try again.", "error");
            return;
        }
        // A filled hidden field means a bot. Pretend it worked and send nothing.
        if (values.company.trim() !== "") {
            setStatus("Thank you! Your message has been sent.", "ok");
            form.reset();
            return;
        }
        if (!contact.formEndpoint) {
            openEmailApp(values);
            setStatus(`Opening your email app. If nothing opens, write to ${contact.email} directly.`, "info");
            return;
        }
        submit.disabled = true;
        setStatus("Sending your message...", "info");
        const sent = await sendToEndpoint(contact.formEndpoint, values);
        submit.disabled = false;
        if (sent) {
            form.reset();
            setStatus("Thank you! Your message has been sent. I'll reply as soon as I can.", "ok");
        }
        else {
            setStatus(`Your message could not be sent. Please try again, or email me at ${contact.email}.`, "error");
        }
    });
}
