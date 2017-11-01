export interface Post {
  name: string;
  title: string;
  content: string;
  slug: string;
  cuid: string;
  _id?: any;
}

export interface PostReducerInit {
  data: {
    id: {};
    name: string;
    title: string;
    slug: string;
    cuid: string;
    content: string;
  }[];
}
