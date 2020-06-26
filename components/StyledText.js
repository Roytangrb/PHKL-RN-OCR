import * as React from 'react';
import { Text } from 'react-native';

export function MonoText(props) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono', fontSize: 16 }]} />;
}

export function MonoTitle(props) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono', fontSize: 20, fontWeight: 'bold' }]} />;
}
