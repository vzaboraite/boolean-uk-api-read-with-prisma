const prisma = require("../../utils/database");

const getAll = async (req, res) => {
  try {
    const result = await prisma.pet.findMany();

    res.json({ data: result });
  } catch (error) {
    console.error({ error: error.message });

    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAll,
};
