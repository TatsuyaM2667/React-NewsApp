# React-NewsApp

## 概要

このアプリは、**React Native**（Expo）を使って作成されたニュース閲覧アプリ。  
ニュースAPI（[NewsAPI.org](https://newsapi.org/)）から記事を取得し、カテゴリごとに表示する。

---

## ディレクトリ構成

```
First-NewsApp/
├── app/
│   ├── screens/
│   │   ├── BusinessScreen.tsx
│   │   ├── SportsScreen.tsx
│   │   └── TechnologyScreen.tsx
│   ├── utils/
│   │   └── api.ts
│   ├── types.ts
│   └── ...
├── .env
├── .gitignore
├── app.json
└── ...
```

---

## APIキーの安全な管理

### 1. `.env`ファイルでAPIキーを管理

APIキーは**.envファイル**に保存。  
例:
```env
EXPO_PUBLIC_NEWS_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 2. `.gitignore`で`.env`を除外

`.env`ファイルはGit管理対象外にし、**GitHubに公開されない**ようにします。

```gitignore
.env
```

### 3. `app.json`でExpoのextraにAPIキーを渡す

`app.json`の`extra`フィールドで、`.env`の値をExpoアプリに渡す。

```json
"extra": {
  "NEWS_API_KEY": "${EXPO_PUBLIC_NEWS_API_KEY}"
}
```

### 4. コード内でAPIキーを参照

各画面やAPI呼び出し部分で、`expo-constants`を使ってAPIキーを取得する。

```typescript
import Constants from 'expo-constants';

const API_KEY = Constants.expoConfig?.extra?.NEWS_API_KEY;
```

---

## 主要なファイルの説明

### `app/screens/TechnologyScreen.tsx`（他カテゴリも同様）

```typescript
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import * as WebBrowser from 'expo-web-browser';
import { Article } from '../types';
import Constants from 'expo-constants';

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
```

#### ポイント
- **APIキーはハードコーディングせず、環境変数から取得**  
- `axios`でAPIリクエストし、記事データを取得
- `FlatList`で記事一覧を表示
- 記事をタップするとWebブラウザで詳細を表示

---

## セキュリティ対策

- **APIキーは絶対にソースコードに直接書かない**
- `.env`で管理し、`.gitignore`で除外
- 公開リポジトリに機密情報が含まれないようにする

---
## 👨‍💻 作者
- [TatsuyaM2667](https://github.com/TatsuyaM2667)

## License
MIT License (Attribution Required — © 2025 TatsuyaM2667)
