import React, { useState } from 'react';
import { Image, StyleSheet, View, Button, Modal, Alert } from 'react-native';

import CameraCapture from '../components/CameraCapture';
import Config from '../config/default';

export default function HomeScreen() {
  const [snapshot, setSnapshot] = useState(null);
  const [cameraModalVisible, setCameraModalVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const snap = () => {
    setSnapshot(null);
    setSubmitted(false);
    setCameraModalVisible(true);
  }

  const submit = () => {
    if (submitted) {
      Alert.alert('This photo has been submitted');
      return;
    }

    if (!snapshot || !snapshot.base64){
      Alert.alert('Please snap a photo first');
      return;
    }

    const body = JSON.stringify({
      "requests": [
        {
          "image": {
            "content": "base64-encoded-image"
          },
          "features": [
            {
              "type": "TEXT_DETECTION"
            }
          ]
        }
      ]
    })
    
    return fetch("https://vision.googleapis.com/v1/images:annotate?key=" + Config["GOOGLE_CLOUD_VISION_API_KEY"], {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: body
    })
      .then(response => response.json())
      .then(json => {
        setSubmitted(true);
        console.log('Fetched Vision API JSON: ', json);
      })
      .catch(err => {
        setSubmitted(false);
        Alert.alert(err.code + ' - ' + err.message);
        console.log(err);
      });
  }

  const receiveSnap = (photo) => {
    setSnapshot(photo ?? null);
    setCameraModalVisible(false);
    console.log(photo);
  }

  const getDataUrl = () => {
    return 'data:image/jpg;base64,' + snapshot?.base64 ?? '';
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
        visible={cameraModalVisible} >
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
