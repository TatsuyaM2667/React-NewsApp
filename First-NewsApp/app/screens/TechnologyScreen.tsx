// app/screens/TechnologyScreen.tsx （他カテゴリはファイル名とURLだけ変更）
import axios from 'axios';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Article } from '../types';

const API_KEY = Constants.expoConfig?.extra?.NEWS_API_KEY;
const URL = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${API_KEY}`;

export default function TechnologyScreen() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(URL)
      .then(res => setArticles(res.data.articles))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;

  return (
    <FlatList
      data={articles}
      keyExtractor={(_, i) => i.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => WebBrowser.openBrowserAsync(item.url)}>
          <View style={styles.card}>
            {item.urlToImage && (
              <Image source={{ uri: item.urlToImage }} style={styles.image} />
            )}
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.source}>{item.source.name}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff'
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 10
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4
  },
  source: {
    color: '#555'
  }
});