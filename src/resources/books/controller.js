const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAll = async (req, res) => {
  try {
    const result = await prisma.book.findMany();
    res.json({ data: result });
  } catch (error) {
    console.error({ error: error.message });

    res.status(500), json({ error: error.message });
  }
};

module.exports = { getAll };
