import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format, subDays } from 'date-fns';

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const entries = [];
      // 최근 30일 데이터 로드
      for (let i = 0; i < 30; i++) {
        const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
        const stored = await AsyncStorage.getItem(`gratitude_${date}`);
        if (stored) {
          entries.push({
            date,
            gratitudes: JSON.parse(stored).filter(g => g.trim() !== ''),
          });
        }
      }
      setHistory(entries);
    } catch (error) {
      console.error('기록 로딩 실패:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>감사 기록</Text>
        <Text style={styles.count}>총 {history.length}일 기록됨 🎉</Text>
      </View>

      {history.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>아직 기록이 없어요</Text>
          <Text style={styles.emptySubtext}>오늘부터 시작해보세요!</Text>
        </View>
      ) : (
        history.map((entry, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardDate}>
              {format(new Date(entry.date), 'yyyy년 MM월 dd일')}
            </Text>
            {entry.gratitudes.map((gratitude, idx) => (
              <Text key={idx} style={styles.cardText}>
                • {gratitude}
              </Text>
            ))}
          </View>
        ))
      )}

      <TouchableOpacity style={styles.refreshButton} onPress={loadHistory}>
        <Text style={styles.refreshText}>새로고침</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5',
  },
  header: {
    padding: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 5,
  },
  count: {
    fontSize: 16,
    color: '#666',
  },
  empty: {
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#CCC',
  },
  card: {
    backgroundColor: 'white',
    margin: 15,
    marginTop: 10,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 15,
  },
  cardText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 24,
    marginBottom: 8,
  },
  refreshButton: {
    margin: 20,
    padding: 15,
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    alignItems: 'center',
  },
  refreshText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});