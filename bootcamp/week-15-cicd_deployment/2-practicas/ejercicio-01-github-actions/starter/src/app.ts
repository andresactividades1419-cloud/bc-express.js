import express from 'express';
import cors from 'cors';

export const app = express();
app.use(cors());
app.use(express.json());

interface Item { id: number; name: string; price: number }
let items: Item[] = [
  { id: 1, name: 'Laptop', price: 999 },
  { id: 2, name: 'Mouse', price: 25 },
];
let nextId = 3;

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.get('/api/items', (_req, res) => {
  res.json(items);
});

app.get('/api/items/:id', (req, res) => {
  const item = items.find((i) => i.id === Number(req.params.id));
  if (!item) { res.status(404).json({ error: 'Not found' }); return; }
  res.json(item);
});

app.post('/api/items', (req, res) => {
  const { name, price } = req.body as { name?: string; price?: number };
  if (!name || price === undefined) {
    res.status(400).json({ error: 'name and price required' });
    return;
  }
  const item = { id: nextId++, name, price };
  items.push(item);
  res.status(201).json(item);
});

app.delete('/api/items/:id', (req, res) => {
  const idx = items.findIndex((i) => i.id === Number(req.params.id));
  if (idx === -1) { res.status(404).json({ error: 'Not found' }); return; }
  items.splice(idx, 1);
  res.status(204).send();
});

// Reset para tests
export function resetItems(): void {
  items = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Mouse', price: 25 },
  ];
  nextId = 3;
}
