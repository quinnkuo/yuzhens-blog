import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const status = z.enum(['draft', 'published']).default('published');

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    topics: z.array(z.string()).default([]),
    status,
    featured: z.boolean().default(false),
    originalUrl: z.url().optional(),
    sourceLabel: z.string().optional()
  })
});

const topics = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/topics' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    summary: z.string(),
    order: z.number().default(999),
    featured: z.boolean().default(false),
    accent: z.enum(['green', 'blue', 'red', 'gold']).default('green')
  })
});

const works = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/works' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    type: z.string(),
    status,
    featured: z.boolean().default(false),
    topics: z.array(z.string()).default([]),
    externalUrl: z.url().optional(),
    cover: z.string().optional()
  })
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    topics: z.array(z.string()).default([]),
    status,
    featured: z.boolean().default(false)
  })
});

export const collections = { articles, topics, works, notes };
