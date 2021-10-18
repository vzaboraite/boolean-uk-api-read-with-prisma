const prisma = require("../../utils/database");

/* READ Controllers */
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
    let queryOptions = {
      where: {
        type: "fiction",
      },
    };

    if (topic) {
      queryOptions.where.topic = {
        in: typeof topic === "string" ? [topic] : topic,
      };
    }
    const result = await prisma.book.findMany(queryOptions);

    res.json({ data: result });
  } catch (error) {
    console.error({ error: error.message });

    res.status(500).json({ error: error.message });
  }
};

const getNonFictionBooks = async (req, res) => {
  const { topic } = req.query;

  try {
    let queryOptions = {
      where: {
        type: "non-fiction",
      },
    };

    if (topic) {
      queryOptions.where.topic = {
        in: typeof topic === "string" ? [topic] : topic,
      };
    }
    const result = await prisma.book.findMany(queryOptions);

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

/* CREATE Controller */

const createOne = async (req, res) => {
  const { title, type, author, topic, publicationDate } = req.body;

  try {
    const result = await prisma.book.create({
      data: {
        title,
        type,
        author,
        topic,
        publicationDate,
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
    const result = await prisma.book.update({
      where: { id: parseInt(targetId) },
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

/* DELETE Controller */

const deleteOneById = async (req, res) => {
  const targetId = req.params.id;

  try {
    const result = await prisma.book.delete({
      where: {
        id: parseInt(targetId),
      },
    });

    res.json({
      message: `The book with id:${targetId} has been successfully!`,
    });
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
  createOne,
  updateOneById,
  deleteOneById,
};
