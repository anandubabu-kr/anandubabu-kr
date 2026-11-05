// Blog posts and training materials.
// To publish a new one: put the page in public/learning/ (or create an
// Astro page under src/pages/learning/), then add an entry below.
// Newest first; the homepage shows the first few.

export interface LearningItem {
  title: string;
  description: string;
  href: string;
  /** e.g. "Interactive guide", "Article", "Slides" */
  format: string;
  /** ISO date, used for sorting and display */
  date: string;
  tags: string[];
}

export const learning: LearningItem[] = [
  {
    title: "Git Workflow Playground",
    description:
      "A hands-on guide to how Git really works: branches, merge vs rebase, branching strategies, Conventional Commits, and recovering from everyday accidents. Includes a live sandbox to try commands and a quiz to check what you've learned.",
    href: "/learning/git-workflow.html",
    format: "Interactive guide",
    date: "2026-11-05",
    tags: ["Git", "Team workflow", "Training"],
  },
];

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { month: "short", year: "numeric" });
