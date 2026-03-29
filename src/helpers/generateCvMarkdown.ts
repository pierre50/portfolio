import {
  PERSONAL_INFO,
  PROFILE,
  SKILLS,
  EXPERIENCE,
  PROJECTS,
  EDUCATION,
  LANGUAGES,
} from "../constants/cv";

type Locale = "fr" | "en";

const LABELS = {
  fr: {
    profile: "Profil",
    skills: "Compétences clés",
    experience: "Expériences professionnelles",
    projects: "Projets personnels",
    education: "Formation",
    languages: "Langues",
  },
  en: {
    profile: "Profile",
    skills: "Key Skills",
    experience: "Professional Experience",
    projects: "Personal Projects",
    education: "Education",
    languages: "Languages",
  },
};

export function generateCvMarkdown(locale: Locale): string {
  const t = LABELS[locale];
  const l = (obj: { fr: string; en: string }) => obj[locale];
  const lines: string[] = [];

  // Header
  lines.push(`# ${PERSONAL_INFO.name}`);
  lines.push("");
  lines.push(`**${l(PERSONAL_INFO.title)}**`);
  lines.push("");
  lines.push(PERSONAL_INFO.location);
  lines.push(`📧 [${PERSONAL_INFO.email}](mailto:${PERSONAL_INFO.email})`);
  lines.push(`📞 ${PERSONAL_INFO.phone}`);
  lines.push(`🔗 [LinkedIn](${PERSONAL_INFO.linkedin})`);
  lines.push(`🌐 [${PERSONAL_INFO.website}](${PERSONAL_INFO.website})`);
  lines.push("");
  lines.push("---");
  lines.push("");

  // Profile
  lines.push(`## ${t.profile}`);
  lines.push("");
  lines.push(l(PROFILE));
  lines.push("");
  lines.push("---");
  lines.push("");

  // Skills
  lines.push(`## ${t.skills}`);
  lines.push("");
  for (const group of SKILLS) {
    lines.push(`### ${l(group.label)}`);
    lines.push("");
    lines.push(l(group.items));
    lines.push("");
  }
  lines.push("---");
  lines.push("");

  // Experience
  lines.push(`## ${t.experience}`);
  lines.push("");
  for (const xp of EXPERIENCE) {
    lines.push(`### ${l(xp.role)}`);
    lines.push("");
    lines.push(`**${xp.company}** – ${xp.location}`);
    lines.push(`*${l(xp.period)}*`);
    lines.push("");
    lines.push(l(xp.summary));
    lines.push("");
    for (const bullet of xp.bullets) {
      lines.push(`* ${l(bullet)}`);
    }
    lines.push("");
    lines.push("---");
    lines.push("");
  }

  // Projects
  if (PROJECTS.length > 0) {
    lines.push(`## ${t.projects}`);
    lines.push("");
    for (const project of PROJECTS) {
      const titleWithLink = project.link
        ? `[${project.title}](${project.link})`
        : project.title;
      lines.push(`### ${titleWithLink} *(${project.year})*`);
      lines.push("");
      lines.push(`**Stack :** ${project.technologies.join(", ")}`);
      lines.push("");
      lines.push(l(project.summary));
      lines.push("");
      for (const bullet of project.bullets) {
        lines.push(`* ${l(bullet)}`);
      }
      lines.push("");
    }
    lines.push("---");
    lines.push("");
  }

  // Education
  lines.push(`## ${t.education}`);
  lines.push("");
  for (const edu of EDUCATION) {
    lines.push(`**${l(edu.degree)}**`);
    lines.push(`${edu.school} – ${edu.location}`);
    lines.push(`*${edu.period}*`);
    lines.push("");
  }
  lines.push("---");
  lines.push("");

  // Languages
  lines.push(`## ${t.languages}`);
  lines.push("");
  for (const lang of LANGUAGES) {
    lines.push(`**${l(lang.name)}** : ${l(lang.level)}`);
  }

  return lines.join("\n");
}
