import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import BottomTabNavigator from './navigation/BottomTabNavigator';

import HistoryDetailScreen from './screens/HistoryDetailScreen';

const Stack = createStackNavigator();

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <NavigationContainer linking={LinkingConfiguration}>
          <Stack.Navigator initialRouteName="Root">
            <Stack.Screen name="Root" component={BottomTabNavigator} />
            <Stack.Screen name="HistoryDetail" component={HistoryDetailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
