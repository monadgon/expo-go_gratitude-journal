import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

export default function HomeScreen() {
  const [gratitudes, setGratitudes] = useState(['', '', '']);
  const [saved, setSaved] = useState(false);
  const today = format(new Date(), 'yyyy-MM-dd');

  useEffect(() => {
    loadTodayGratitudes();
  }, []);

  const loadTodayGratitudes = async () => {
    try {
      const stored = await AsyncStorage.getItem(`gratitude_${today}`);
      if (stored) {
        setGratitudes(JSON.parse(stored));
        setSaved(true);
      }
    } catch (error) {
      console.error('로딩 실패:', error);
    }
  };

  const saveGratitudes = async () => {
    const filtered = gratitudes.filter(g => g.trim() !== '');
    
    if (filtered.length === 0) {
      Alert.alert('알림', '최소 1개 이상 작성해주세요!');
      return;
    }

    try {
      await AsyncStorage.setItem(`gratitude_${today}`, JSON.stringify(gratitudes));
      setSaved(true);
      Alert.alert('저장 완료! 🎉', '오늘도 감사한 하루를 보내세요!');
    } catch (error) {
      Alert.alert('오류', '저장에 실패했습니다.');
    }
  };

  const updateGratitude = (index, text) => {
    const newGratitudes = [...gratitudes];
    newGratitudes[index] = text;
    setGratitudes(newGratitudes);
    setSaved(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.date}>{format(new Date(), 'yyyy년 MM월 dd일')}</Text>
        <Text style={styles.title}>오늘 감사한 일 3가지</Text>
        <Text style={styles.subtitle}>
          작은 것이라도 좋아요. 당신의 하루를 빛나게 한 순간들을 기록해보세요 ✨
        </Text>
      </View>

      {[0, 1, 2].map((index) => (
        <View key={index} style={styles.inputContainer}>
          <Text style={styles.number}>{index + 1}</Text>
          <TextInput
            style={styles.input}
            placeholder="감사한 일을 적어주세요..."
            placeholderTextColor="#999"
            value={gratitudes[index]}
            onChangeText={(text) => updateGratitude(index, text)}
            multiline
            maxLength={200}
          />
        </View>
      ))}

      <TouchableOpacity 
        style={[styles.button, saved && styles.buttonSaved]} 
        onPress={saveGratitudes}
      >
        <Text style={styles.buttonText}>
          {saved ? '✓ 저장됨' : '저장하기'}
        </Text>
      </TouchableOpacity>

      <View style={styles.tip}>
        <Text style={styles.tipText}>
          💡 매일 감사일기를 쓰면 행복도가 25% 증가한다는 연구 결과가 있어요!
        </Text>
      </View>
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
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    margin: 15,
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  number: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginRight: 15,
    marginTop: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    minHeight: 60,
  },
  button: {
    backgroundColor: '#FF6B6B',
    margin: 20,
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonSaved: {
    backgroundColor: '#4ECDC4',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tip: {
    margin: 20,
    padding: 15,
    backgroundColor: '#FFF9E6',
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#FFD93D',
  },
  tipText: {
    color: '#666',
    fontSize: 13,
    lineHeight: 18,
  },
});