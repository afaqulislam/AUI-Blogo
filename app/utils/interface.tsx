export interface Post {
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  body: any;
  tags: Array<Tag>;
  category: Category;
  _id: string;
  headings?: Array<HTMLHeadElement | string>;
  comments?: Array<Comment>;
  image?: any;
  bodyImages?: Array<{
    _key?: string;
    asset?: {
      _id?: string;
      metadata?: {
        dimensions?: { width?: number; height?: number };
      };
    };
  }>;
}

export interface Tag {
  name: string;
  slug: { current: string };
  _id: string;
  postCount?: number;
}

export interface Category {
  name: string;
  slug: { current: string };
  _id: string;
  description?: string;
  postCount?: number;
}

export interface Comment {
  name: string;
  comment: string;
  _createdAt: string;
  _id: string;
}
