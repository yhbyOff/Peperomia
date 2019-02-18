import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { Input, ListItem, Button, Divider } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import { KINDS } from "../../../lib/getKind";
import { IconImage } from "../../atoms";

export interface Props {
  kind: string;
}

export interface State {
  search: string;
}

export default class extends Component<Props, State> {
  state = {
    search: ""
  };

  render() {
    const items = Object.entries(KINDS)
      .map(([key, value]) => ({
        kind: key,
        ...value
      }))
      .filter((item: any) => {
        if (this.state.search === "") {
          return true;
        }

        return (
          item.name.includes(this.state.search) ||
          item.kind.includes(this.state.search)
        );
      });

    return (
      <View style={{ backgroundColor: "#ffffff" }}>
        <View
          style={{
            paddingHorizontal: 10,
            height: "7%",
            backgroundColor: "#eeeeee"
          }}
        >
          <Input
            placeholder="検索"
            leftIcon={{ type: "MaterialIcons", name: "search", color: "#888" }}
            inputContainerStyle={{
              backgroundColor: "#cccccc",
              borderBottomWidth: 0,
              borderRadius: 10
            }}
            leftIconContainerStyle={{
              marginRight: 20
            }}
            onChangeText={text => this.setState({ search: text })}
          />
        </View>
        <Divider />
        <ScrollView style={{ width: "100%", height: "80%", paddingLeft: 15 }}>
          {items.map((item: any, i: number) => (
            <ListItem
              key={i}
              title={item.name}
              leftIcon={
                <IconImage
                  kind={item.kind}
                  size={20}
                  opacity={1.0}
                  defaultIcon
                />
              }
              rightIcon={
                <View>
                  {this.props.kind === item.kind ? (
                    <MaterialIcons
                      name="check"
                      color="#32cd32"
                      size={20}
                      style={{ paddingRight: 5 }}
                    />
                  ) : null}
                </View>
              }
              bottomDivider
            />
          ))}
        </ScrollView>
        <View
          style={{
            backgroundColor: "#eee",
            height: "8%",
            alignItems: "flex-end"
          }}
        >
          <Button
            title="写真から選択"
            type="clear"
            icon={<MaterialIcons name="chevron-right" size={25} />}
            iconRight
            titleStyle={{
              color: "#F95F62",
              fontSize: 12,
              fontWeight: "600"
            }}
          />
        </View>
      </View>
    );
  }
}