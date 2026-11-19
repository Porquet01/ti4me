/**
 * Contact details and site settings.
 * Edit this file when your details change.
 */
export interface Contact {
  email: string;
  github: string;
  githubUrl: string;
  /** Paste your LinkedIn profile URL here once you have one. null hides it. */
  linkedinUrl: string | null;
  /**
   * Formspree form URL, for example "https://formspree.io/f/abcdwxyz".
   * Leave as "" and the form opens the visitor's email app instead.
   */
  formEndpoint: string;
}

export const contact: Contact = {
  email: "porquetfelix@gmail.com",
  github: "Porquet01",
  githubUrl: "https://github.com/Porquet01",
  linkedinUrl: null,
  formEndpoint: "",
};
