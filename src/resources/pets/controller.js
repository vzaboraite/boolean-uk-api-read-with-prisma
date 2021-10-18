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

const getOneById = async (req, res) => {
  const targetId = req.params.id;

  try {
    const result = await prisma.pet.findUnique({
      where: {
        id: parseInt(targetId),
      },
    });

    res.json({ data: result });
  } catch (error) {
    console.error({ error: error.message });

    res.status(500).json({ error: error.message });
  }
};

const getPetTypes = async (req, res) => {
  try {
    const result = await prisma.pet.findMany({
      distinct: ["type"],
      select: {
        type: true,
      },
    });
    res.json({ data: result });
  } catch (error) {
    console.error({ error: error.message });

    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAll,
  getOneById,
  getPetTypes,
};
