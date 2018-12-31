import React, { Component } from "react";
import { SQLite } from "expo";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import { Text, TouchableOpacity, View, Share } from "react-native";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import {
  ActionSheetProps,
  connectActionSheet
} from "@expo/react-native-action-sheet";
import { Button } from "react-native-elements";
import EditSchedule from "../EditSchedule/Connected";
import SortableSchedule from "../SortableSchedule/Connected";
import { db } from "../../../lib/db";
import {
  update as updateItemDetail,
  ItemDetail
} from "../../../lib/db/itemDetail";
import Schedule from "./Connected";

interface State {
  scheduleId: number;
  title: string;
  items: ItemDetail[];
  saveItems: ItemDetail[];
  mode: string;
}

interface Props {
  navigation: NavigationScreenProp<NavigationRoute>;
}

class Switch extends Component<Props & ActionSheetProps, State> {
  static navigationOptions = ({ navigation }: { navigation: any }) => {
    const { params = {} } = navigation.state;
    return {
      title: params.title,
      headerLeft: (
        <View style={{ left: 5 }}>
          {(() => {
            if (params.mode === "edit") {
              return (
                <TouchableOpacity
                  onPress={() => params.onShow()}
                  style={{ left: 5 }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: "red"
                    }}
                  >
                    キャンセル
                  </Text>
                </TouchableOpacity>
              );
            }

            if (params.mode === "sort") {
              return (
                <TouchableOpacity
                  onPress={() => params.onEdit(params.items)}
                  style={{ left: 5 }}
                >
                  >
                  <Text
                    style={{ fontSize: 16, fontWeight: "600", color: "red" }}
                  >
                    キャンセル
                  </Text>
                </TouchableOpacity>
              );
            }

            return (
              <View>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{ flex: 1, flexDirection: "row", marginTop: 10 }}
                >
                  <MaterialCommunityIcons
                    name="chevron-left"
                    size={30}
                    color="#00bfff"
                  />
                </TouchableOpacity>
              </View>
            );
          })()}
        </View>
      ),
      headerRight: (
        <View style={{ right: 10 }}>
          {(() => {
            if (params.mode === "edit") {
              return null;
            }

            if (params.mode === "sort") {
              return (
                <TouchableOpacity onPress={() => params.onSave()}>
                  >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: "#00bfff"
                    }}
                  >
                    保存
                  </Text>
                </TouchableOpacity>
              );
            }

            return (
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Button
                  title=""
                  icon={
                    <Entypo
                      name="share-alternative"
                      size={16}
                      color="#FFFFFF"
                    />
                  }
                  buttonStyle={{
                    backgroundColor: "#4DB6AC",
                    width: 28,
                    height: 28,
                    borderColor: "transparent",
                    borderWidth: 0,
                    borderRadius: 10
                  }}
                  style={{ marginRight: 15 }}
                  onPress={() => params.onShare()}
                />

                <TouchableOpacity
                  onPress={() => params.onOpenActionSheet(params.items)}
                >
                  <MaterialCommunityIcons
                    name="dots-vertical"
                    size={26}
                    color="#00bfff"
                    style={{ marginRight: 0, marginLeft: "auto" }}
                  />
                </TouchableOpacity>
              </View>
            );
          })()}
        </View>
      )
    };
  };

  state = { scheduleId: 0, title: "", items: [], saveItems: [], mode: "show" };

  componentDidMount() {
    this.props.navigation.setParams({
      onEdit: this.onEdit,
      onShow: this.onShow,
      onSort: this.onSort,
      onSave: this.onSave,
      onShare: this.onShare,
      onOpenActionSheet: this.onOpenActionSheet,
      mode: "show"
    });
  }

  onOpenActionSheet = (items: ItemDetail[]) => {
    this.props.showActionSheetWithOptions(
      {
        options: ["追加する", "並び替え", "プランを削除", "キャンセル"],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 3
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          const itemId = this.props.navigation.getParam("scheduleId", "1");
          this.props.navigation.navigate("CreateScheduleDetail", {
            itemId,
            priority: items.length + 1
          });
          //this.onEdit(items);
        } else if (buttonIndex === 1) {
          this.onSort(items);
        }
      }
    );
  };

  onEdit = (items: ItemDetail[]): void => {
    const scheduleId = this.props.navigation.getParam("scheduleId", "1");

    this.setState({
      scheduleId,
      items,
      mode: "edit"
    });

    this.props.navigation.setParams({
      mode: "edit"
    });
  };

  onShow = (): void => {
    this.setState({ mode: "show" });

    this.props.navigation.setParams({
      mode: "show"
    });
  };

  onSort = (items: ItemDetail[]): void => {
    this.setState({ mode: "sort", items });

    this.props.navigation.setParams({
      mode: "sort"
    });
  };

  onSave = () => {
    this.setState({
      items: this.state.saveItems
    });
    this.onEdit(this.state.saveItems);
  };

  onChangeItems = (data: ItemDetail[]): void => {
    db.transaction((tx: SQLite.Transaction) => {
      data.forEach(async (item, index) => {
        item.priority = index + 1;
        console.log(item);

        await updateItemDetail(tx, item, this.save);
      });
    });

    this.setState({ saveItems: data });
  };

  save = (ans: any) => {
    console.log(ans);
  };

  onShare = async () => {
    try {
      const result: any = await Share.share({
        message:
          "React Native | A framework for building native apps using React"
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    if (this.state.mode === "edit") {
      return (
        <EditSchedule
          title={this.state.title}
          items={this.state.items}
          navigation={this.props.navigation}
          onShow={this.onShow}
        />
      );
    }

    if (this.state.mode === "sort") {
      return (
        <SortableSchedule
          items={this.state.items}
          onChangeItems={this.onChangeItems}
        />
      );
    }

    return <Schedule navigation={this.props.navigation} />;
  }
}

export default connectActionSheet(Switch);
