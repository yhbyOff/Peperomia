import React, { Component } from "react";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import { Alert, Dimensions } from "react-native";
import Toast from "react-native-root-toast";
import { backup, restore } from "../../../lib/backup";
import { Consumer as FetchConsumer } from "../../../containers/Fetch";
import { Consumer as AuthConsumer } from "../../../containers/Auth";
import { Consumer as ItemsConsumer } from "../../../containers/Items";
import Page from "./Page";

interface Props {
  navigation: NavigationScreenProp<NavigationRoute>;
}

export default class extends Component<Props> {
  static navigationOptions = { title: "マイページ" };

  render() {
    return (
      <AuthConsumer>
        {({ email, uid }: any) => (
          <FetchConsumer>
            {({ post }: any) => (
              <ItemsConsumer>
                {({ refreshData }: any) => (
                  <Connected
                    {...this.props}
                    post={post}
                    email={email}
                    uid={uid}
                    refreshData={refreshData}
                  />
                )}
              </ItemsConsumer>
            )}
          </FetchConsumer>
        )}
      </AuthConsumer>
    );
  }
}

interface ConnectedProps {
  navigation: NavigationScreenProp<NavigationRoute>;
  post: (url: string, param: any) => Promise<Response>;
  email: string;
  uid: string;
  refreshData: () => void;
}

interface State {
  loading: boolean;
  LoadingText: string;
}

class Connected extends Component<ConnectedProps, State> {
  static navigationOptions = { title: "設定" };

  state = {
    loading: false,
    LoadingText: ""
  };

  onBackup = async () => {
    Alert.alert(
      "バックアップを作成しますか？",
      "既にバックアップを作成している場合は上書きされます。",
      [
        {
          text: "キャンセル",
          style: "cancel"
        },
        {
          text: "作成する",
          onPress: () => {
            this.backup();
          }
        }
      ],
      { cancelable: false }
    );
  };

  backup = async () => {
    this.setState({
      loading: true,
      LoadingText: "バックアップ中です..."
    });

    try {
      const { items, itemDetails } = await backup();

      const request = {
        items,
        itemDetails
      };
      const response = await this.props.post("SyncItems", {
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        Alert.alert("バックアップに失敗しました");
        return;
      }

      const { height } = Dimensions.get("window");

      let toast = Toast.show("バックアップを作成しました", {
        duration: Toast.durations.LONG,
        position: height - 150,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      });

      // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
      setTimeout(function() {
        Toast.hide(toast);
      }, 3000);

      this.setState({
        loading: false
      });
    } catch (err) {
      this.setState({
        loading: false
      });

      setTimeout(() => {
        Alert.alert("バックアップに失敗しました");
      }, 100);
    }
  };

  onRestore = async () => {
    Alert.alert(
      "バックアップから復元しますか？",
      "現在のデータは削除されるのでご注意ください",
      [
        {
          text: "キャンセル",
          style: "cancel"
        },
        {
          text: "復元する",
          onPress: () => {
            this.restore();
          }
        }
      ],
      { cancelable: false }
    );
  };

  restore = async () => {
    this.setState({
      loading: true,
      LoadingText: "復元中です..."
    });

    try {
      await restore(this.props.uid);

      const { height } = Dimensions.get("window");

      let toast = Toast.show("データを復元しました", {
        duration: Toast.durations.LONG,
        position: height - 150,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      });

      // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
      setTimeout(function() {
        Toast.hide(toast);
      }, 3000);

      await this.props.refreshData();

      this.setState({
        loading: false
      });
    } catch (err) {
      this.setState({
        loading: false
      });

      setTimeout(() => {
        Alert.alert("復元に失敗しました", err.message);
      }, 100);
    }
  };

  render() {
    return (
      <Page
        loading={this.state.loading}
        LoadingText={this.state.LoadingText}
        email={this.props.email}
        onBackup={this.onBackup}
        onRestore={this.onRestore}
      />
    );
  }
}