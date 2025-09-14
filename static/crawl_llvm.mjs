import { writeFileSync } from 'fs';
import { mkdir } from 'fs/promises';
import { JSDOM } from 'jsdom';
import TurndownService from 'turndown';
import { Readability } from '@mozilla/readability';
import { request } from 'undici';
import path from 'path';

const outDir = 'knowledge/llvm';
const seeds = [
  'https://clang.llvm.org/docs/UsersManual.html',
  'https://clang.llvm.org/docs/DiagnosticsReference.html'
];
const allowPrefix = 'https://clang.llvm.org/docs/';
const td = new TurndownService();

await mkdir(outDir, { recursive: true });

const seen = new Set();
const q = [...seeds];

async function fetchToMd(url) {
  const { body } = await request(url);
  const html = await body.text();
  const dom = new JSDOM(html, { url });
  const doc = dom.window.document;
  const reader = new Readability(doc);
  const article = reader.parse();
  const title = (article?.title || doc.title || url).trim();
  const mdBody = td.turndown(article?.content || doc.querySelector('main, body')?.innerHTML || '');

  const fm = [
    '---',
    `title: "${title.replace(/"/g, '\\"')}"`,
    `source: "${url}"`,
    `source_tag: "llvm"`,
    `license: "Apache-2.0 WITH LLVM-exception"`,
    `license_url: "https://llvm.org/LICENSE.txt"`,
    `attribution: "LLVM/Clang docs (Apache-2.0 with LLVM exception)"`,
    '---',
    ''
  ].join('\n');

  const file = path.join(outDir, `${encodeURIComponent(url)}.md`);
  writeFileSync(file, fm + mdBody, 'utf8');
  console.log('[llvm] saved:', file);
}

while (q.length) {
  const url = q.shift();
  if (seen.has(url)) continue;
  seen.add(url);
  await fetchToMd(url);

  const { body } = await request(url);
  const html = await body.text();
  const doc = new JSDOM(html).window.document;
  doc.querySelectorAll('a[href]').forEach(a => {
    const u = new URL(a.href, url).toString();
    if (u.startsWith(allowPrefix) && !seen.has(u)) q.push(u);
  });
}
