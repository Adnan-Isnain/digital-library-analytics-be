import { UUIDV4Pattern } from "@models/pattern";

export const createBookSchema = {
    body: {
      type: 'object',
      required: ['slug', 'title', 'isbn'],
      properties: {
        slug: { type: 'string', minLength: 3, maxLength: 50 },
        title: { type: 'string', minLength: 1 },
        isbn: { type: 'string', pattern: '^[0-9]{13}$' },
        authorId: { type: 'string', pattern: UUIDV4Pattern},
        categories: {
          type: "array",
          items: { type: "string" },
          minItems: 1,
        },
        seriesId: { type: "number", nullable: true }
      },
    },
  };