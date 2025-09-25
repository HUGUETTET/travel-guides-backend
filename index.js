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
