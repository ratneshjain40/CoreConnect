import { v4 as uuidv4 } from 'uuid';

export const generateSlug = (text: string): string => {
  const slug = text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Remove duplicate hyphens

  return `${slug}-${uuidv4().slice(0, 8)}`; // Append a unique 8-character UUID
};
