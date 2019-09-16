import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Cards, { Props as CardsProps } from "../../organisms/Home/Cards";
import theme from "../../../config/theme";

export interface Props extends CardsProps {
  onCreate: () => void;
}

interface ItemProps extends Props {
  onDelete: (id: string) => void;
}

export default (props: ItemProps) => (
  <View style={styles.root}>
    <View style={{ height: "100%", paddingTop: 3 }}>
      {props.data.length > 0 ? (
        <Cards
          data={props.data}
          loading={false}
          onSchedule={props.onSchedule}
          onDelete={props.onDelete}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {!props.loading && <Text>予定がありません</Text>}
        </View>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme.mode.background
  }
});
