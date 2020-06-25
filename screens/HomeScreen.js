import React, { useState } from 'react';
import { Image, StyleSheet, View, Button, Modal, Alert } from 'react-native';

import CameraCapture from '../components/CameraCapture';

export default function HomeScreen() {
  const [snapshot, setSnapshot] = useState(null);
  const [cameraModalVisible, setCameraModalVisible] = useState(false);

  const snap = () => {
    setSnapshot(null);
    setCameraModalVisible(true);
  }

  const submit = () => {

  }

  const receiveSnap = (photo) => {
    setSnapshot(photo ?? null);
    setCameraModalVisible(false);
    console.log(photo);
  }

  const getDataUrl = () => {
    return 'data:image/jpg;base64,' + snapshot?.base64;
  }

  return (
    <View style={styles.container}>
      <View style={styles.previewContainer}>
        <Image style={styles.preview} resizeMode="contain" source={{ uri: getDataUrl() }} />
      </View>
      <View style={styles.actions}>
        <Button title="Snap" onPress={snap} />
        <Button title="Submit" onPress={submit} />
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={cameraModalVisible}
        onDismiss={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={{ marginTop: 22, flex: 1 }}>
          { cameraModalVisible ? <CameraCapture onCaptured={receiveSnap} /> : null }
          <Button
            title="Cancel"
            onPress={() => {
              setCameraModalVisible(false);
            }} 
          />
        </View>
      </Modal>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  previewContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  preview: {
    flex: 1,
    width: '100%',
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
  }
});
