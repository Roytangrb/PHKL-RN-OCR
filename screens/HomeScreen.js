import React, { useState } from 'react';
import { Image, StyleSheet, View, Button, Modal, Alert, ActivityIndicator } from 'react-native';

import CameraCapture from '../components/CameraCapture';
import Config from '../config/default';

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [snapshot, setSnapshot] = useState(null);
  const [cameraModalVisible, setCameraModalVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const snap = () => {
    setSnapshot(null);
    setSubmitted(false);
    setCameraModalVisible(true);
  }

  const goToDetail = (json) => {
    var result = json?.responses[0];
    if (result){
      navigation.navigate("HistoryDetail", { result });
    }
  }

  const submit = () => {
    if (loading) return;
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
            "content": snapshot.base64
          },
          "features": [
            {
              "type": "TEXT_DETECTION"
            }
          ]
        }
      ]
    })
    
    setLoading(true);

    return fetch("https://vision.googleapis.com/v1/images:annotate?key=" + Config.GOOGLE_CLOUD_VISION_API_KEY, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: body
    })
      .then(response => response.json())
      .then(json => {
        console.log('Fetched Vision API JSON: ', json);
        if (json.error) throw json.error;

        setSubmitted(true);
        return json;
      })
      .then(goToDetail)
      .catch(err => {
        setSubmitted(false);
        Alert.alert(`Error: ${err.code}\n${err.status}\n${err.message}`);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const receiveSnap = (photo) => {
    setSnapshot(photo ?? null);
    setCameraModalVisible(false);
  }

  const getDataUrl = () => {
    return 'data:image/jpg;base64,' + snapshot?.base64 ?? '';
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator style={styles.loading} size="large" animating={loading} />
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
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  loading: {
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
    zIndex: 1,
  },
  previewContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#999',
    marginBottom: 10,
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
  }
});
