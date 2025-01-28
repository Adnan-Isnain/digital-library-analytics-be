import { Prisma, PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs'

const prisma = new PrismaClient();

const initialSeeder = async () => {
  console.info("Seeding initial data...");
  const password = await bcryptjs.hash("123456", 10)
  const users = [
    {
      id : "feabd7fd-6301-4b9e-9fef-2ae7f5de9394",
      email: "jk.rowling@test.com",
      password: password,
      role: "author"
    },
    {
      id: "6ac79fcd-2a3f-4330-8e8c-56b162ef3771",
      email: "jrr.tolkien@test.com",
      password: password,
      role: "author"
    },
    {
      id: "2406f88c-8002-48f3-9dc1-f5c4d8d54e76",
      email: "ac.doyle@test.com",
      password: password,
      role: "author"
    },
  ]



  const categories = [
    { name: "Fantasy", slug: "fantasy" },
    { name: "Mystery", slug: "mystery" },
    { name: "Science Fiction", slug: "science-fiction" },
  ];

  const authors = [
    {
      id: "f531a60c-9f98-41ce-b431-847ef8884b84",
      name: "J.K. Rowling",
      bio: "J.K. Rowling is a famous British author, best known for the Harry Potter series.",
      userId: "feabd7fd-6301-4b9e-9fef-2ae7f5de9394"
    },
    {
      id: "04da3d5e-6e4e-4ce7-bc9b-8020b05affd0",
      name: "J.R.R. Tolkien",
      bio: "J.R.R. Tolkien was an English writer and professor, best known for writing 'The Hobbit' and 'The Lord of the Rings'.",
      userId: "6ac79fcd-2a3f-4330-8e8c-56b162ef3771"
    },
    {
      id: "dcda3542-d9a3-4062-98be-19388144e45e",
      name: "Arthur Conan Doyle",
      bio: "Arthur Conan Doyle was a Scottish author, famous for creating the detective character Sherlock Holmes.",
      userId: "2406f88c-8002-48f3-9dc1-f5c4d8d54e76"
    },
  ];

  const series = [
    {
      name: "Harry Potter Series",
      slug: "harry-potter-series",
      description: "A series of books about the adventures of a young wizard named Harry Potter.",
    },
    {
      name: "Lord of the Rings Series",
      slug: "lord-of-the-rings-series",
      description: "An epic series about Frodo Baggins' journey to destroy a powerful ring.",
    },
    {
      name: "Sherlock Holmes Series",
      slug: "sherlock-holmes-series",
      description: "A series of detective novels focusing on the adventures of Sherlock Holmes, a famous British detective.",
    },
  ];

  const books = [
    {
      title: "Harry Potter and the Sorcerer's Stone",
      slug: "harry-potter-and-the-sorcerers-stone",
      isbn: "9780747532699",
      categories: ["fantasy"],
      seriesSlug: "harry-potter-series",
      authorId: "f531a60c-9f98-41ce-b431-847ef8884b84"
    },
    {
      title: "Harry Potter and the Chamber of Secrets",
      slug: "harry-potter-and-the-chamber-of-secrets",
      isbn: "9780747538493",
      categories: ["fantasy"],
      seriesSlug: "harry-potter-series",
      authorId: "f531a60c-9f98-41ce-b431-847ef8884b84"
    },
    {
      title: "Harry Potter and the Prisoner of Azkaban",
      slug: "harry-potter-and-the-prisoner-of-azkaban",
      isbn: "9780747542155",
      categories: ["fantasy"],
      seriesSlug: "harry-potter-series",
      authorId: "f531a60c-9f98-41ce-b431-847ef8884b84"
    },
    {
      title: "The Fellowship of the Ring",
      slug: "the-fellowship-of-the-ring",
      isbn: "9780618126989",
      categories: ["fantasy"],
      seriesSlug: "lord-of-the-rings-series",
      authorId: "04da3d5e-6e4e-4ce7-bc9b-8020b05affd0"
    },
    {
      title: "The Two Towers",
      slug: "the-two-towers",
      isbn: "9780618126996",
      categories: ["fantasy"],
      seriesSlug: "lord-of-the-rings-series",
      authorId: "04da3d5e-6e4e-4ce7-bc9b-8020b05affd0"
    },
    {
      title: "The Return of the King",
      slug: "the-return-of-the-king",
      isbn: "9780618127009",
      categories: ["fantasy"],
      seriesSlug: "lord-of-the-rings-series",
      authorId: "04da3d5e-6e4e-4ce7-bc9b-8020b05affd0"
    },
    {
      title: "A Study in Scarlet",
      slug: "a-study-in-scarlet",
      isbn: "9781853268959",
      categories: ["mystery"],
      seriesSlug: "sherlock-holmes-series",
      authorId: "dcda3542-d9a3-4062-98be-19388144e45e"
    },
    {
      title: "The Sign of the Four",
      slug: "the-sign-of-the-four",
      isbn: "9781853268966",
      categories: ["mystery"],
      seriesSlug: "sherlock-holmes-series",
      authorId: "dcda3542-d9a3-4062-98be-19388144e45e"
    },
  ];

  console.info("Starting Transaction...");

  await prisma.$transaction(async (tx) => {
    console.info("Seeding user...");
    await tx.user.createMany({ data: users });

    console.info("Seeding categories...");
    await tx.category.createMany({ data: categories });

    console.info("Seeding authors...");
    await tx.author.createMany({ data: authors });

    console.info("Seeding series...");
    await tx.series.createMany({
      data: series.map((s) => ({
        name: s.name,
        slug: s.slug,
        description: s.description,
      })),
    });

    console.info("Seeding books...");
    await Promise.all(
      books.map((book) => {
        const data: Prisma.BookCreateInput = {
          title: book.title,
          slug: book.slug,
          isbn: book.isbn,
          authors: {
            connect: { id: book.authorId },
          },
          categories: {
            connect: book.categories.map((categorySlug) => ({
              slug: categorySlug,
            })),
          },
          series: {
            connect: { slug: book.seriesSlug },
          },
        };

        return tx.book.create({ data });
      })
    );
  });

  console.info("Seeding completed successfully.");
};

async function main() {
  const seeders = [initialSeeder];

  for (const seeder of seeders) {
    try {
      await seeder();
    } catch (error) {
      console.error("Error during seeding:", error);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
