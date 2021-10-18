const prisma = require("../../utils/database");

/* READ Controllers */

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

/* CREATE Controller */

const createOne = async (req, res) => {
  const { name, age, type, breed, microchip } = req.body;

  try {
    const result = await prisma.pet.create({
      data: {
        name,
        age,
        type,
        breed,
        microchip,
      },
    });

    res.json({ data: result });
  } catch (error) {
    console.error({ error: error.message });

    res.status(500).json({ error: error.message });
  }
};

/* UPDATE Controllers */

const updateOneById = async (req, res) => {
  const targetId = req.params.id;

  try {
    const result = await prisma.pet.update({
      where: {
        id: parseInt(targetId),
      },
      data: {
        ...req.body,
      },
    });

    res.json({ data: result });
  } catch (error) {
    console.error({ error: error.message });

    res.status(500).json({ error: error.message });
  }
};

/* DELETE Controllers */

const deleteOneById = async (req, res) => {
  const targetId = req.params.id;

  try {
    const result = await prisma.pet.delete({
      where: {
        id: parseInt(targetId),
      },
    });

    res.json({
      message: `Pet with id:${targetId} was removed from the list successfully!`,
    });
  } catch (error) {
    console.error({ error: error.message });

    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAll,
  getOneById,
  getPetTypes,
  createOne,
  updateOneById,
  deleteOneById,
};
