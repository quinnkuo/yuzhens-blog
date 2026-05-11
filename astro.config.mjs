import { defineConfig } from 'astro/config';

const repository = process.env.GITHUB_REPOSITORY?.split('/')[1];
const owner = process.env.GITHUB_REPOSITORY_OWNER;
const isUserPage =
  repository && owner && repository.toLowerCase() === `${owner}.github.io`.toLowerCase();

const base =
  process.env.BASE_PATH ??
  (process.env.GITHUB_ACTIONS && repository && !isUserPage ? `/${repository}` : '/');

const site = process.env.SITE_URL ?? (owner ? `https://${owner}.github.io` : 'https://example.com');

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'always'
});
