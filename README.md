# PHKL-RN-OCR

## Demo
* Download Expo Client (Supporting Expo SDK 37) on [iOS](https://apps.apple.com/us/app/expo-client/id982107779) or [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en)

### Android
* View the [published Expo project](https://expo.io/@rubyroy/phkl-rn-ocr) with Expo client app

### iOS
* Clone this repo, run `yarn install` or `npm install`
* Run `yarn start` to start the local dev server
* Use Expo client app to view the dev build
* ***! app config (Firestore & Api keys) is hidden from this repo***

## Design
![](https://github.com/Roytangrb/PHKL-RN-OCR/tree/master/assets/images/data-flow-design.png)

## Developments

### Requirements
* `node`: 12.18.1
* `expo-cli`: 3.21.10

### Commands
* `yarn start`: start expo server to build and view on expo client app
* `expo publish`: publish to expo host

### References
* Google Vision API - [OCR, TEXT_DETECTION](https://cloud.google.com/vision/docs/ocr)
* [Expo with Firebase](https://docs.expo.io/guides/using-firebase/)
* [Cloud Firestore](https://firebase.google.com/docs/firestore/quickstart#add_data)
