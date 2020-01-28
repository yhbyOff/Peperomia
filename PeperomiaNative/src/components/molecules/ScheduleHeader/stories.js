import React from "react";
import { storiesOf } from "@storybook/react-native";
import { View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { KIND_PARK } from "../../../lib/getKind";
import theme from "../../../config/theme";
import Header from "./Header";

storiesOf('molecules/ScheduleHeader', module)
  .add('Header', () => (
    <Header
      kind={KIND_PARK}
      right={
        <MaterialCommunityIcons
          name="dots-horizontal"
          size={30}
          color={theme().color.white}
          style={{ marginRight: 0, marginLeft: 'auto' }}
        />
      }
    />
  ));