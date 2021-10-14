const { PrismaClient } = require("@prisma/client");
const {
  buildBooksDatabase,
  buildAnimalDatabase,
} = require("../src/utils/mockData");

const prisma = new PrismaClient();

async function createFromArray(array, model, name) {
  let count = 0;

  console.log(`\nSeeding ${name}s...\n\n`);

  for (let i = 0; i < array.length; i++) {
    const element = array[i];

    try {
      await model.create({ data: element });

      count++;

      process.stdout.moveCursor(0, -1);
      process.stdout.clearLine(1);

      console.log(`[${count}/${array.length}] ${name}s created.`);
    } catch (error) {
      console.error(`[ERROR] Seeding ${name} model: `, {
        code: error.code,
        error: error.message,
      });

      process.exit(1);
    } finally {
      await prisma.$disconnect();
    }
  }

  return count;
}

async function seedBooks() {
  const books = buildBooksDatabase();

  const Book = prisma.book;

  await createFromArray(books, Book, "book");
}

async function seedPets() {
  const pets = buildAnimalDatabase();

  const Pet = prisma.pet;

  await createFromArray(pets, Pet, "pet");
}

async function seed() {
  await seedBooks();
  await seedPets();
}

seed();
