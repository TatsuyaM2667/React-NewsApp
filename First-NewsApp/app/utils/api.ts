// utils/api.ts
import axios from 'axios';
import 'dotenv/config';
import { ArticleResponse } from '../types';
const API_KEY = process.env.EXPO_PUBLIC_NEWS_API_KEY;
const BASE_URL = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${API_KEY}`;
export const fetchArticles = async (): Promise<ArticleResponse> => {
  const response = await axios.get(BASE_URL);
  return response.data;
};