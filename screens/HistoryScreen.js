import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { MonoText, MonoTitle } from '../components/StyledText'

import firebase from '../utils/firebase'

export default function HistoryScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  const goToDetail = (result) => {
    navigation.navigate('HistoryDetail', { result });
  }

  useEffect(() => {
    const unsubscribe = firebase.firestore()
      .collection('ocr-results')
      .orderBy("timestamp", "desc")
      .limit(3)
      .onSnapshot(querySnapshot => {
        const _list = [];
        querySnapshot.forEach(doc => {
          const d = doc.data();
          _list.push({
            id: doc.id,
            text: d.text,
            timestamp: d.timestamp.toDate().toLocaleString()
          });
        })
        
        setList(_list);
        setLoading(false);
      })
    
    return () => unsubscribe(); // unsubcribe on unmount clean up
  }, []);

  return (
    <View style={styles.container} contentContainerStyle={styles.contentContainer}>
      <ActivityIndicator style={styles.loading} size="large" animating={loading} />
      <MonoTitle style={styles.title}>Last 3 Records</MonoTitle>
      <FlatList
        data={ list }
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <OptionButton 
            title={item.timestamp}
            onPress={() => goToDetail(item)}
          />
        )}
      />
    </View>
  );
}

function OptionButton({ title, onPress }) {
  return (
    <RectButton style={styles.option} onPress={onPress}>
      <View style={styles.optionTextContainer}>
        <MonoText style={styles.optionText}>{ title }</MonoText>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  loading: {
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
    zIndex: 1,
  },
  title: {
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#999',
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});
