// app/types.ts
export type Article = {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  source: {
    name: string;
  };
};

export type ArticleResponse = {
  status: string;
  totalResults: number;
  articles: Article[];
};

export type RootStackParamList = {
  Home: undefined;
  Detail: { article: Article };
};