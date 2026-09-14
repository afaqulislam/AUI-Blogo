import type { StructureResolver } from 'sanity/desk'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Posts')
        .child(S.documentTypeList('post').title('Posts')),
      S.listItem()
        .title('Categories')
        .child(S.documentTypeList('category').title('Categories')),
      S.listItem()
        .title('Tags')
        .child(S.documentTypeList('tag').title('Tags')),
      S.listItem()
        .title('Comments')
        .child(S.documentTypeList('comment').title('Comments')),
    ])
