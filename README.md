# CognitoMfaSample
CognitoのユーザプールをReact Nativeから叩いて遊んでみるリポジトリ（TOTPによるMFAに対応予定）

## セットアップ
このリポジトリは、expoのbare workflowに従って作成されています。
詳しくは[こちら](https://reactnative.dev/docs/environment-setup)を参照してください。

## デバッグ
### 下準備
環境変数の設定を行ってください。  
※ 環境変数の読み取りには、[react-native-config](https://www.npmjs.com/package/react-native-config)を使用しています。
```
cp .env.sample .env
```

設定する項目は`.env.sanple`を参照ください。

### iOSシミュレータでのデバッグ
```
npm run ios
```

機種を指定したい場合(iPhone Xの場合)
```
npm run ios -- --simulator="iPhone X"
```

### Androidエミュレータでのデバッグ
```
npm run android
```

機種を指定したい場合

1. デバイスを特定する
    ```
     adb devices
    ```
1. 取得したデバイスIDを指定して起動
    ```
    npm run android -- --deviceId ="emulator-xxxx"
    ```

## トラブルシューティング
### Windows環境で起動に失敗する
`ANDROID_HOME`に加え、`ANDROID_SDK_ROOT`を登録してください。

```
ANDROID_SDK_ROOT=%ANDROID_HOME%
```