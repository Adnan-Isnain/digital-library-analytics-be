export interface ICreateNewBook {
    title: string
    slug: string
    isbn: string
    authorId: string
    categories: string[]
    seriesId?: string
}