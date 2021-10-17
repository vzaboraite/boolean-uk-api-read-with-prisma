const prisma = require("../../utils/database");

const getAll = async (req, res) => {
  try {
    const result = await prisma.book.findMany();
    res.json({ data: result });
  } catch (error) {
    console.error({ error: error.message });

    res.status(500), json({ error: error.message });
  }
};

const getOneById = async (req, res) => {
  const { id } = req.params;
  const targetId = parseInt(id);

  try {
    const result = await prisma.book.findUnique({
      where: {
        id: targetId,
      },
    });

    res.json({ data: result });
  } catch (error) {
    console.error({ error: error.message });

    res.status(500).json({ error: error.message });
  }
};

const getFictionBooks = async (req, res) => {
  const { topic } = req.query;

  try {
    const result = await prisma.book.findMany({
      where: {
        type: "fiction",
        topic,
      },
    });

    res.json({ data: result });
  } catch (error) {
    console.error({ error: error.message });

    res.status(500).json({ error: error.message });
  }
};

const getNonFictionBooks = async (req, res) => {
  const { topic } = req.query;

  try {
    const result = await prisma.book.findMany({
      where: {
        type: "non-fiction",
        topic,
      },
    });

    res.json({ data: result });
  } catch (error) {
    console.error({ error: error.message });

    res.status(500).json({ error: error.message });
  }
};

const getAuthorBooks = async (req, res) => {
  const { name } = req.params;
  const { order } = req.query;

  const transformedName = name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  try {
    let queryOptions = {
      where: {
        author: transformedName,
      },
    };

    if (order === "recent") {
      queryOptions = {
        ...queryOptions,
        orderBy: {
          publicationDate: "desc",
        },
      };
    }

    const result = await prisma.book.findMany(queryOptions);

    res.json({ data: result });
  } catch (error) {
    console.error({ error: error.message });

    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAll,
  getOneById,
  getFictionBooks,
  getNonFictionBooks,
  getAuthorBooks,
};
