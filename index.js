require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/guides', async (req, res) => {
  const guides = await prisma.guide.findMany();
  res.json(guides);
});

app.post('/api/guides', async (req, res) => {
  const { title, slug, content, is_premium } = req.body;
  const g = await prisma.guide.create({ data: { title, slug, content, is_premium } });
  res.status(201).json(g);
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Backend listening on ${port}`));

app.get('/api/guides', async (req, res) => {
  try {
    const guides = await prisma.guide.findMany();
    res.json(guides);
  } catch (err) {
    console.error("❌ Error in GET /api/guides:", err);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE guide by id
app.put('/api/guides/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const updated = await prisma.guide.update({
      where: { id: parseInt(id) },
      data: { title },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE guide by id
app.delete('/api/guides/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.guide.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Guide deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});