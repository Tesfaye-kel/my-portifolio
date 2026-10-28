import { jsPDF } from 'jspdf';

const textValue = (value) => (
  typeof value === 'string' || typeof value === 'number' ? String(value).trim() : ''
);

const listValue = (value) => (
  Array.isArray(value)
    ? value.map((item) => (typeof item === 'string' ? item : item?.name || item?.title || '')).filter(Boolean)
    : []
);

const colorFromHex = (hex, fallback) => {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || '');
  return match ? match.slice(1).map((part) => Number.parseInt(part, 16)) : fallback;
};

const drawWrapped = (doc, text, x, y, width, options = {}) => {
  const { fontSize = 9, lineHeight = 4.5, color = [55, 65, 81], font = 'normal' } = options;
  doc.setFont('helvetica', font);
  doc.setFontSize(fontSize);
  doc.setTextColor(...color);

  const lines = doc.splitTextToSize(textValue(text) || ' ', width);
  lines.forEach((line) => {
    if (y > 276) {
      doc.addPage();
      y = 20;
    }
    doc.text(line, x, y);
    y += lineHeight;
  });
  return y;
};

const drawSectionTitle = (doc, title, y, accent) => {
  if (y > 270) {
    doc.addPage();
    y = 20;
  }
  y += 3;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...accent);
  doc.text(title.toUpperCase(), 18, y);
  doc.setDrawColor(...accent);
  doc.setLineWidth(0.35);
  doc.line(18, y + 2, 192, y + 2);
  return y + 9;
};

export const downloadResumePdf = ({
  profile = {},
  hero = {},
  about = {},
  experience = [],
  projects = [],
  skillGroups = [],
  accent: accentHex,
}) => {
  const doc = new jsPDF({ format: 'a4', unit: 'mm', compress: true });
  const accent = colorFromHex(accentHex, [225, 29, 54]);
  const name = textValue(profile.name || hero.name) || 'Portfolio Resume';
  const role = textValue(profile.title || hero.subtitle) || 'Software Developer';
  const contact = [
    textValue(profile.email || about.contactInfo?.find((item) => /email/i.test(item.label || ''))?.value),
    textValue(profile.location || about.contactInfo?.find((item) => /location/i.test(item.label || ''))?.value),
  ].filter(Boolean).join(' | ');
  let y = 20;

  doc.setProperties({
    title: `${name} - CV`,
    subject: 'Professional curriculum vitae',
    author: name,
    creator: 'Portfolio CV Terminal',
  });
  doc.setFillColor(...accent);
  doc.rect(0, 0, 210, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(23);
  doc.setTextColor(24, 31, 42);
  doc.text(name, 18, y + 5);
  y += 12;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(...accent);
  doc.text(role, 18, y);
  y += 6;

  if (contact) {
    y = drawWrapped(doc, contact, 18, y, 174, { fontSize: 8.5, lineHeight: 4.5, color: [90, 99, 112] });
  }

  const summary = textValue(about.careerGoals || hero.description || profile.tagline);
  if (summary) {
    y = drawSectionTitle(doc, 'Professional Summary', y + 1, accent);
    y = drawWrapped(doc, summary, 18, y, 174, { fontSize: 9.5, lineHeight: 5 });
  }

  if (skillGroups.length) {
    y = drawSectionTitle(doc, 'Technical Skills', y + 2, accent);
    skillGroups.forEach((group) => {
      const skills = listValue(group.skills);
      if (!skills.length) return;
      y = drawWrapped(doc, `${textValue(group.title) || 'Skills'}: ${skills.join(', ')}`, 18, y, 174, {
        fontSize: 9,
        lineHeight: 4.8,
        color: [55, 65, 81],
      });
      y += 1;
    });
  }

  if (experience.length) {
    y = drawSectionTitle(doc, 'Experience', y + 2, accent);
    experience.forEach((item) => {
      const heading = [textValue(item.role || item.title), textValue(item.period)].filter(Boolean).join(' | ');
      if (y > 265) {
        doc.addPage();
        y = 20;
      }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(31, 41, 55);
      doc.text(doc.splitTextToSize(heading || 'Experience', 174), 18, y);
      y += 5;
      const organization = [textValue(item.company || item.organization), textValue(item.location)].filter(Boolean).join(' | ');
      if (organization) {
        y = drawWrapped(doc, organization, 18, y, 174, { fontSize: 8.5, lineHeight: 4.5, color: accent });
      }
      if (item.description) {
        y = drawWrapped(doc, item.description, 18, y + 1, 174, { fontSize: 8.5, lineHeight: 4.4 });
      }
      const achievements = listValue(item.achievements);
      achievements.slice(0, 5).forEach((achievement) => {
        y = drawWrapped(doc, `- ${achievement}`, 22, y + 1, 170, { fontSize: 8, lineHeight: 4 });
      });
      const technologies = listValue(item.technologies);
      if (technologies.length) {
        y = drawWrapped(doc, `Technologies: ${technologies.join(', ')}`, 18, y + 1, 174, {
          fontSize: 8,
          lineHeight: 4,
          color: [90, 99, 112],
        });
      }
      y += 3;
    });
  }

  if (projects.length) {
    y = drawSectionTitle(doc, 'Selected Projects', y + 1, accent);
    projects.slice(0, 8).forEach((project) => {
      if (y > 268) {
        doc.addPage();
        y = 20;
      }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(31, 41, 55);
      doc.text(textValue(project.title || project.name) || 'Project', 18, y);
      y += 4.8;
      if (project.description) {
        y = drawWrapped(doc, project.description, 18, y, 174, { fontSize: 8.3, lineHeight: 4.2 });
      }
      const technologies = listValue(project.technologies);
      if (technologies.length) {
        y = drawWrapped(doc, `Stack: ${technologies.join(', ')}`, 18, y, 174, {
          fontSize: 8,
          lineHeight: 4,
          color: accent,
        });
      }
      y += 2.5;
    });
  }

  const education = listValue(about.education);
  if (education.length) {
    y = drawSectionTitle(doc, 'Education', y + 1, accent);
    education.forEach((item) => {
      y = drawWrapped(doc, `- ${item}`, 18, y, 174, { fontSize: 8.5, lineHeight: 4.5 });
    });
  }

  const totalPages = doc.getNumberOfPages();
  for (let page = 1; page <= totalPages; page += 1) {
    doc.setPage(page);
    doc.setDrawColor(220, 224, 230);
    doc.setLineWidth(0.25);
    doc.line(18, 285, 192, 285);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(120, 128, 138);
    doc.text(name, 18, 291);
    doc.text(`${page} / ${totalPages}`, 192, 291, { align: 'right' });
  }

  const fileName = `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-cv.pdf`;
  doc.save(fileName);
};
