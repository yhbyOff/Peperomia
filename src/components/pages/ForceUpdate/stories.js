import React from "react";
import { storiesOf } from "@storybook/react-native";
import { View, StyleSheet } from 'react-native';
import Page from "./Page";

storiesOf('pages', module).add('ForceUpdate', () => (
  <View style={styles.root}>
    <Page />
  </View>
));

const styles = StyleSheet.create({
  root: {
    paddingTop: 60,
  },
});
