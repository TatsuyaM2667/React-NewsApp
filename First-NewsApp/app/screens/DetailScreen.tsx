// app/screens/DetailScreen.tsx
import React from 'react';
import { ScrollView, Text, Image, Button } from 'react-native';
import * as Linking from 'expo-linking';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';

type DetailRouteProp = RouteProp<RootStackParamList, 'Detail'>;

export default function DetailScreen() {
  const { params } = useRoute<DetailRouteProp>();
  const { article } = params;

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{article.title}</Text>
      <Text>{article.source.name}</Text>
      {article.urlToImage && (
        <Image source={{ uri: article.urlToImage }} style={{ height: 200, marginVertical: 10 }} />
      )}
      <Text style={{ marginBottom: 10 }}>{article.description}</Text>
      <Button title="記事を読む" onPress={() => Linking.openURL(article.url)} />
    </ScrollView>
  );
}