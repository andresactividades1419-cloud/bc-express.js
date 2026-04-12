import express from 'express';
import cors from 'cors';

export const app = express();
app.use(cors());
app.use(express.json());

// Simple in-memory resource
interface Item { id: number; name: string }
let items: Item[] = [
  { id: 1, name: 'Widget A' },
  { id: 2, name: 'Widget B' },
];
let nextId = 3;

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.get('/api/items', (_req, res) => {
  res.json(items);
});

app.post('/api/items', (req, res) => {
  const { name } = req.body as { name?: string };
  if (!name) { res.status(400).json({ error: 'name required' }); return; }
  const item = { id: nextId++, name };
  items.push(item);
  res.status(201).json(item);
});

app.delete('/api/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) { res.status(404).json({ error: 'not found' }); return; }
  items.splice(idx, 1);
  res.status(204).send();
});
