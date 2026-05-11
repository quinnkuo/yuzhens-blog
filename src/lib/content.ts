import { getCollection } from 'astro:content';
import { sortByDateDesc } from './format';

const includeDrafts = !import.meta.env.PROD;

export async function getPublishedArticles() {
  const articles = await getCollection('articles', ({ data }) => {
    return includeDrafts || data.status === 'published';
  });

  return sortByDateDesc(articles);
}

export async function getPublishedWorks() {
  const works = await getCollection('works', ({ data }) => {
    return includeDrafts || data.status === 'published';
  });

  return sortByDateDesc(works);
}

export async function getPublishedNotes() {
  const notes = await getCollection('notes', ({ data }) => {
    return includeDrafts || data.status === 'published';
  });

  return sortByDateDesc(notes);
}

export async function getTopics() {
  const topics = await getCollection('topics');
  return [...topics].sort((a, b) => a.data.order - b.data.order);
}

export async function getTopicMap() {
  const topics = await getTopics();
  return new Map(topics.map((topic) => [topic.data.slug, topic]));
}

export function topicName(slug: string, topicMap: Awaited<ReturnType<typeof getTopicMap>>) {
  return topicMap.get(slug)?.data.name ?? slug;
}
