import { writeFileSync } from 'fs';
import { mkdir, readFile } from 'fs/promises';
import { JSDOM } from 'jsdom';
import TurndownService from 'turndown';
import { Readability } from '@mozilla/readability';
import { request } from 'undici';
import path from 'path';

const outDir = 'knowledge/mslearn';
const seeds = [
  'https://learn.microsoft.com/en-us/cpp/c-runtime-library/c-run-time-library-reference?view=msvc-170',
  'https://learn.microsoft.com/en-us/cpp/c-runtime-library/run-time-routines-by-category?view=msvc-170'
];
const allowPrefix = 'https://learn.microsoft.com/en-us/cpp/c-runtime-library/';

const td = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });

const seen = new Set();
const q = [...seeds];

await mkdir(outDir, { recursive: true });

async function fetchToMd(url) {
  const { body } = await request(url);
  const html = await body.text();
  const dom = new JSDOM(html, { url });
  const doc = dom.window.document;

  // 取主內容（Readability 會自動去導航/側邊）
  const reader = new Readability(doc);
  const article = reader.parse();
  const title = (article?.title || doc.title || url).trim();

  const mdBody = td.turndown(article?.content || doc.querySelector('main')?.innerHTML || '');
  const fm = [
    '---',
    `title: "${title.replace(/"/g, '\\"')}"`,
    `source: "${url}"`,
    `source_tag: "mslearn"`,
    `license: "CC BY 4.0"`,
    `license_url: "https://creativecommons.org/licenses/by/4.0/"`,
    `attribution: "© Microsoft Learn (CC BY 4.0)"`,
    '---',
    ''
  ].join('\n');

  const file = path.join(outDir, `${encodeURIComponent(url)}.md`);
  writeFileSync(file, fm + mdBody, 'utf8');
  console.log('[mslearn] saved:', file);
}

while (q.length) {
  const url = q.shift();
  if (seen.has(url)) continue;
  seen.add(url);
  await fetchToMd(url);

  // 簡單抽子連結
  const { body } = await request(url);
  const html = await body.text();
  const doc = new JSDOM(html).window.document;
  doc.querySelectorAll('a[href]').forEach(a => {
    const u = new URL(a.href, url).toString();
    if (u.startsWith(allowPrefix) && !seen.has(u)) q.push(u);
  });
}
