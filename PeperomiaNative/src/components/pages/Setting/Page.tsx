import React, { FC } from 'react';
import {
  View,
  ScrollView,
  Text,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Updates } from 'expo';
import { ListItem, Divider } from 'react-native-elements';
import Constants from 'expo-constants';
import theme from '../../../config/theme';
import app from '../../../../app.json';

type Props = {
  login: boolean;
  loading: boolean;
  onResetSQL: () => void;
  onDeleteSQL: () => void;
  onShowSQL: () => void;
  onData: () => void;
  onDeleteUser: () => void;
  onTos: () => void;
  onPolicy: () => void;
  onSignIn: () => void;
  onLogout: () => void;
  onFeedback: () => void;
  onMyPage: () => void;
  onMigrationV100: () => void;
  onScreenSetting: () => void;
  onLoginWithAmazon: () => void;
  onFirestoreResetQuery: () => void;
  onFirestoreSelect: () => void;
};

const SettingPage: FC<Props> = props => (
  <View style={styles.root}>
    <ScrollView>
      <ListItem
        title="お問い合わせ"
        rightIcon={{ name: 'chevron-right', color: theme().mode.text }}
        containerStyle={styles.menu}
        titleStyle={styles.menuText}
        bottomDivider
        onPress={props.onFeedback}
      />
      <ListItem
        title="画面表示"
        rightIcon={{ name: 'chevron-right', color: theme().mode.text }}
        containerStyle={styles.menu}
        titleStyle={styles.menuText}
        onPress={props.onScreenSetting}
      />
      <View style={styles.menuSpace} />
      <ListItem
        title="利用規約"
        rightIcon={{ name: 'chevron-right', color: theme().mode.text }}
        containerStyle={styles.menu}
        titleStyle={styles.menuText}
        bottomDivider
        onPress={props.onTos}
      />
      <ListItem
        title="プライバシーポリシー"
        rightIcon={{ name: 'chevron-right', color: theme().mode.text }}
        containerStyle={styles.menu}
        titleStyle={styles.menuText}
        onPress={props.onPolicy}
      />

      <View style={styles.menuSpace} />

      {(() => {
        if (props.loading) {
          return (
            <View style={[styles.menu, styles.loginMenu]}>
              <ActivityIndicator size="large" color={theme().mode.text} />
            </View>
          );
        }

        if (props.login) {
          return (
            <>
              <ListItem
                title="マイページ"
                onPress={props.onMyPage}
                rightIcon={{
                  name: 'chevron-right',
                  color: theme().mode.text,
                }}
                containerStyle={styles.menu}
                titleStyle={styles.menuText}
                bottomDivider
              />
              <ListItem
                title="ログアウト"
                containerStyle={styles.menu}
                titleStyle={{ color: theme().color.red }}
                onPress={props.onLogout}
                bottomDivider
              />
            </>
          );
        }

        return (
          <ListItem
            title="ユーザー登録 / ログイン"
            rightIcon={{
              name: 'chevron-right',
              color: theme().mode.text,
            }}
            containerStyle={styles.menu}
            titleStyle={styles.menuText}
            onPress={props.onSignIn}
            bottomDivider
          />
        );
      })()}

      {!Constants.isDevice && (
        <ListItem
          title="Alexa連携を設定する(β版)"
          rightIcon={{
            name: 'chevron-right',
            color: theme().mode.text,
          }}
          containerStyle={styles.menu}
          titleStyle={styles.menuText}
          onPress={props.onLoginWithAmazon}
        />
      )}

      <View style={styles.menuSpace} />
      <ListItem
        title="バージョン情報"
        rightTitle={
          <Text style={{ color: theme().mode.text }}>{app.expo.version} </Text>
        }
        containerStyle={styles.menu}
        titleStyle={styles.menuText}
      />
      {!Constants.isDevice && (
        <>
          <View style={styles.debugSpace} />
          <Divider />
          <Text style={styles.debug}>デバッグ機能</Text>
          <Divider />
          <ListItem title="初期データ投入" onPress={props.onResetSQL} />
          <Divider />
          <ListItem title="ユーザー初期化" onPress={props.onDeleteUser} />
          <Divider />
          <ListItem
            title="v1.0.0の状態にする"
            onPress={props.onMigrationV100}
          />
          <Divider />
          <ListItem title="アイテムを削除" onPress={props.onDeleteSQL} />
          <Divider />
          <ListItem title="DBのデータを表示" onPress={props.onData} />
          <Divider />
          <ListItem
            title="firestoreをデータリセット"
            onPress={props.onFirestoreResetQuery}
          />
          <Divider />
          <ListItem
            title="firestoreをデータを確認"
            onPress={props.onFirestoreSelect}
          />
          <Divider />
          <ListItem
            title="最初のプラン作成キャッシュの削除"
            onPress={() => {
              AsyncStorage.removeItem('FIRST_CRAEATE_ITEM');
            }}
          />
          <Divider />
          <ListItem
            title="アプリを再起動する"
            onPress={() => {
              Updates.reload();
            }}
          />
          <Divider style={styles.debugSpace} />
        </>
      )}
    </ScrollView>
  </View>
);

const styles = EStyleSheet.create({
  root: {
    backgroundColor: '$settingRoot',
    height: '100%',
  },
  menu: {
    backgroundColor: '$settingMenu',
  },
  menuText: {
    color: '$text',
  },
  menuSpace: {
    height: 20,
  },
  loginMenu: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  debugSpace: {
    marginBottom: 50,
  },

  debug: {
    backgroundColor: theme().color.highLightGray,
    paddingVertical: 15,
    paddingLeft: 10,
    fontSize: 20,
  },
});

export default SettingPage;
