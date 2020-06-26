import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { MonoText, MonoTitle } from '../components/StyledText'

export default function HistoryDetailScreen({ navigation, route }){
  const { result } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <MonoTitle style={styles.title}>Timestamp</MonoTitle>
      <MonoText>{ result?.timestamp }</MonoText>
      <MonoTitle style={styles.title}>Full text annotation</MonoTitle>
      <MonoText>{ result?.text }</MonoText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 15,
    paddingHorizontal: 15,
  },
  title: {
    color: '#999',
  }
})