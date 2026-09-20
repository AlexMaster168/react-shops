// Разовый скрипт: ищет обложки в Open Library и кладёт в public/covers/<id>.jpg
import fs from 'node:fs';

const queries = {
  0: 'Origin Dan Brown',
  1: 'Nineteen Eighty-Four Orwell',
  2: 'The Girl in the Fog Carrisi',
  3: 'The Empire Must Die Zygar',
  4: 'Tatyana Ustinova',
  5: 'Crime and Punishment Dostoevsky',
  6: 'Gut Giulia Enders',
  7: 'Think and Grow Rich Napoleon Hill',
  8: '7 Habits of Highly Effective People Covey',
  9: 'The Girl in the Ice Robert Bryndza',
  10: 'Miracle Morning Elrod',
  11: 'Rich Dad Poor Dad Kiyosaki',
  12: 'Atlas Shrugged Ayn Rand',
  13: 'Marinina Alexandra Price of the question',
  14: 'Gone Girl Gillian Flynn',
  15: 'Metro 2035 Glukhovsky',
  16: 'The Snowman Jo Nesbo',
  17: 'Boost Your Memory Jonathan Hancock',
  18: 'War and Peace Tolstoy',
};

const get = (url) => fetch(url, { signal: AbortSignal.timeout(45000), headers: { 'User-Agent': 'react-shops-demo/1.0' } });

for (const [id, q] of Object.entries(queries)) {
  if (fs.existsSync(`public/covers/${id}.jpg`)) continue;
  try {
    const r = await (await get(`https://openlibrary.org/search.json?limit=5&fields=title,cover_i&q=${encodeURIComponent(q)}`)).json();
    const hit = r.docs.find((d) => d.cover_i);
    console.log(id, q, '=>', hit ? `${hit.title} (${hit.cover_i})` : 'NOT FOUND');
    if (!hit) continue;
    const img = await get(`https://covers.openlibrary.org/b/id/${hit.cover_i}-L.jpg`);
    fs.writeFileSync(`public/covers/${id}.jpg`, Buffer.from(await img.arrayBuffer()));
  } catch (e) {
    console.log(id, q, 'FAIL', e.message);
  }
}
