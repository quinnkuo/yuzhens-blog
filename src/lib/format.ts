export function withBase(path = '/') {
  const base = import.meta.env.BASE_URL ?? '/';
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  if (cleanPath === '/') {
    return `${cleanBase}/`;
  }

  return `${cleanBase}${cleanPath}`;
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

export function sortByDateDesc<T extends { data: { pubDate?: Date; date?: Date } }>(items: T[]) {
  return [...items].sort((a, b) => {
    const left = a.data.pubDate ?? a.data.date;
    const right = b.data.pubDate ?? b.data.date;
    return Number(right) - Number(left);
  });
}
