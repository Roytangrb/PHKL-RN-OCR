import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

export default function CameraCapture(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [canCapture, setCanCapture] = useState(false);
  const camera = useRef(null);

  const takePic = async () => {
    if(camera.current && canCapture){
      setCanCapture(false);

      let photo = await camera.current.takePictureAsync({
        base64: true,
      });

      props.onCaptured(photo);
    }
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={camera} 
        onCameraReady={()=>{ setCanCapture(true) }}
      >
        <TouchableOpacity style={styles.shotBtnContainer} onPress={takePic}>
          {
            canCapture 
            ?
            <View style={styles.shotBtnOuter} >
              <View style={styles.shotBtnInner} />
            </View>
            :
            <Text>Loading ...</Text>
          }
        </TouchableOpacity>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  shotBtnContainer: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  shotBtnOuter: { 
    borderWidth: 2,
    borderRadius: 25,
    borderColor: 'white',
    height: 50,
    width: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  shotBtnInner: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: 'white',
    height: 40,
    width: 40,
    backgroundColor: 'white'
  }
})