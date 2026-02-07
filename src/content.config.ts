import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.date().optional(),
    author: z.string().optional(),
    minutesRead: z.string().optional(),
    isPinned: z.boolean().optional(),
    excerpt: z.string().optional(),
    tags: z.array(z.string()).optional(),
    image: z.object({
      src: z.string().optional(),
      alt: z.string().optional()
    }).optional()
  }),
});

const blogs = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.date().optional(),
    author: z.string().optional(),
    minutesRead: z.string().optional(),
    isPinned: z.boolean().optional(),
    excerpt: z.string().optional(),
    tags: z.array(z.string()).optional(),
    image: z.object({
      src: z.string().optional(),
      alt: z.string().optional()
    }).optional()
  }),
});

export const collections = {
  projects, blogs
};
