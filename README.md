# ============================ Firebase SetUp (New Project) =============================

1. Go to 'https://console.firebase.google.com/' this link and click on Add project.

2. In lowercase letter set project name as firebase project name.

3. Then continue, tick Enable Google Analytics for this project(default tick) and set Default Account(othervise select or add) for Firebase.

4. Click on Create project.

# ================================= For Android ================================

1. Click on android icon.

2. Android package name: Set project package name(example: com.packagename) => getting from android/app/src/main/java/MainApplication.java || MainActivity || AndroidManifest at first line.

3. then Register app.(optainal field not set, SHA-1 need for notification || auth and other, currently i work on firestore so not added now).

# Note :- Generate ----- SHA-1 ----- ways:-
-> Open terminal at PATH root: your_project/android

# debug :- Get SHA-1
run:- ./gradlew signingReport || gradlew signingReport
SHA1:- 5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25

# release:- Get SHA-1
run:- keytool -list -v -keystore your-release-filename.jks -alias your-alias-name

===OR===

run:- keytool -list -v -keystore your-release-filename.keystore -alias your-alias-name
example:- keytool -list -v -keystore release.jks -alias key0
SHA1:- 24:E8:F9:1A:46:AF:FF:00:18:58:5E:72:AA:B2:A9:BF:42:87:8A:CD
 
4. Download google-service.json file and Add into the project PATH: android/app/google-services.json.

5. # PATH: android/build.gradle:
    dependencies {
        classpath("com.android.tools.build:gradle:7.3.1")
        classpath("com.facebook.react:react-native-gradle-plugin")
        // Add below line only:
        classpath 'com.google.gms:google-services:4.3.15'
    }

6. # PATH: android/app/build.gradlew
=> apply plugin: "com.google.gms.google-services" (This line add at line No. 3)

=>   dependencies {
        implementation("com.facebook.react:react-android")
        implementation("androidx.swiperefreshlayout:swiperefreshlayout:1.0.0")

        ========== ADD THIS BELOW two LINE FOR ANDROID FIREBASE SET UP =========
        implementation platform('com.google.firebase:firebase-bom:32.1.0')
        implementation 'com.google.firebase:firebase-analytics-ktx'


        debugImplementation("com.facebook.flipper:flipper:${FLIPPER_VERSION}")
        debugImplementation("com.facebook.flipper:flipper-network-plugin:${FLIPPER_VERSION}") {
            exclude group:'com.squareup.okhttp3', module:'okhttp'
        }
        debugImplementation("com.facebook.flipper:flipper-fresco-plugin:${FLIPPER_VERSION}")
        if (hermesEnabled.toBoolean()) {
            implementation("com.facebook.react:hermes-android")
        } else {
            implementation jscFlavor
        }
    }

# For Native Setup:
# Install & setup the app module
- npm install @react-native-firebase/app
- yarn add @react-native-firebase/app

# ================================ For IOS =========================================

1. Click on ios icon.

=> For Native Setup:
# Install & setup the app module
- npm install @react-native-firebase/app
- yarn add @react-native-firebase/app

# ============================ FIRESTORE - Android =============================

# Console setup:-

1. In Firebase console Home screen => In left side menu => open Build => click on Firestore Database => In page open click on Create database => select as per requirement First: Start in production mode Second: start in Test mode => i select test mode => next => enable.

2. In Rule tab go => set only => allow read, write; => remove after conditions. => Publish

# Native Setup:-

# Install the firestore module
- npm install @react-native-firebase/firestore 
- yarn add @react-native-firebase/firestore

# ================= FIRESTORE - IOS ===================

# Console setup:-

# Native Setup:-

# ============================= Google-SignIn-Android ==============================

# Console setup:-

1. In left sidebar => Go to Build => click on Authentication => open new page click on Get started => open tab sign-in method => Click on Google icon => In opened page tick to enable switch => set support email as created firebase account mail then click to Save.

# Note: click on Set up sign-in method if already Get started proccess done.
# Note: SHA-1 if not added then (Configure SHA-1 certificate and download google-services.json in project settings).

# Native setup:-

# Install the auth module
- npm install @react-native-firebase/auth 
- yarn add @react-native-firebase/auth

- npm i @react-native-google-signin/google-signin

# Usage:-

import { GoogleSignin } from '@react-native-google-signin/google-signin';

# Note: Below code from PATH: android/app/google-service.json
"oauth_client": [
    {
    "client_id": "991227381840-bv9hahbhckt5umv3ovmcc45n59l88r8j.apps.googleusercontent.com",
    "client_type": 3
    }
],

useEffect(() => {
    GoogleSignin.configure({
        webClientId: here add client_id from above note as from oauth_client and client_type is 3.
    });
}, []);

# ================= Google-SignIn-IOS =================

# Console setup:-

# Native setup:-

# ================= Facebook-SignIn-Android =================

1. Create facebook developer account

# Console setup:-

- Go to firbase console -> Build -> Authentication -> click on sign-in method tab -> Click on Add new provider button -> select facebook -> tik to Enable switch -> set App ID(getting value from developer account) -> set App secret(getting value from developer account).

# Native setup:-

1. npm i react-native-fbsdk-next

2. PATH: android/build.gradle
repositories {
    google()
    mavenCentral() <= Add this line at
}

3. PATH: android/app/build.gradle
- implementation "com.facebook.android:facebook-android-sdk:10.1.0"

# Note: 10.1.0 set as react-native-fbsdk-next latest release version.

4. PATH: android/app/src/main/res/values/strings.xml, add below lines.
<string name="facebook_app_id">YOUR_FACEBOOK_APP_ID</string>
<string name="fb_login_protocol_scheme">fbYOUR_FACEBOOK_APP_ID</string>
<string name="facebook_client_token">FACEBOOK_CLIENT_TOKEN</string>
Note: YOUR_FACEBOOK_APP_ID(require), fbYOUR_FACEBOOK_APP_ID(optional) and FACEBOOK_CLIENT_TOKEN(require) added from facebook developer account.

5. PATH: android/app/src/main/AndroidManifest.xml, add below line
-> <meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/facebook_app_id" />
-> <meta-data android:name="com.facebook.sdk.ClientToken" android:value="@string/facebook_client_token" />
# Note: add before ending tag as </application> </manifest>.

6. Show facebook popup, PATH: android/app/src/main/AndroidManifest.xml, add below line after first </activity> end:-
<activity
    android:name="com.facebook.FacebookActivity"
    android:configChanges="keyboard|keyboardHidden|screenLayout|screenSize|orientation"
    android:label="@string/app_name" />

<activity
    android:name="com.facebook.CustomTabActivity"
    android:exported="true">
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />

        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />

        <!-- Add your Facebook protocol scheme -->
        <data android:scheme="@string/fb_login_protocol_scheme" />
    </intent-filter>
</activity>

7. PATH: android/app/src/main/AndroidManifest.xml, add below
-> <uses-permission android:name="com.google.android.gms.permission.AD_ID" tools:node="remove" />
# Note: If getting tools error then -> first line for Manifest file as <manifest xmlns:android="http://schemas.android.com/apk/res/android" package="com.yourpackage"> add this line as -> <manifest xmlns:android="http://schemas.android.com/apk/res/android" xmlns:tools="http://schemas.android.com/tools" package="com.yourpackage">

# ================= Facebook-SignIn-IOS =================

# Console setup:-

# Native setup:-

# ================= Notification-Android =================

# Console setup:-

# Native setup:-

1. Go to 'https://rnfirebase.io/'

2. Click on left sidebar having Cloud Messaging -> usage

3. yarn add @react-native-firebase/messaging

=> For permission pop up for API level 33+ :-
->  import {PermissionsAndroid} from 'react-native';
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

# Usage:-

# ------ Getting a Device Token ------:

1. import messaging from '@react-native-firebase/messaging';
2. const token = await messaging().getToken(); [get in useEffect and set in database or redux-persist]

# ------ App in Foreground Mode -------:

useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

# ------ App in Background Mode -------:

-> Set this code in index.js
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

messaging().onNotificationOpenedApp(async remoteMessage => {
     console.log('Message handled in the background!', remoteMessage.notification);
});

# ------ App in Kill Mode ---------:

// messaging().getInitialNotification(async remoteMessage => {
//     console.log('Message handled in the kill!', remoteMessage);
// });


# ================= Notification-IOS =================

# Console setup:-

# Native setup:-

=> For open notification permission pop up, write below code in useEffect.
-> async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

# ====================DeepLink(Dynamic Links)=========================

# Console setup:-
1. Go to firebase console website -> left sidebar click on engage -> select and click on Dynamic Links.
2. 

# Native setup:-