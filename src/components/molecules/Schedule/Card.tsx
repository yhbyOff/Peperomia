import React from 'react';
import { View, Text } from 'react-native';
import Color from 'color';
import EStyleSheet from 'react-native-extended-stylesheet';
import { SelectItemDetail } from 'domain/itemDetail';
import { KINDS } from 'peperomia-util';
import s from 'config/style';
import { IconImage } from 'components/atoms';

type Props = SelectItemDetail & {
  kind: string;
};

export default (props: Props) => {
  const config = KINDS[props.kind];
  const ss = s.schedule;

  if (!config) {
    console.log('kind config not found');
    return null;
  }

  return (
    <View
      style={[
        styles.contens,
        {
          borderWidth: ss.borderWidth,
          borderColor: Color(config.backgroundColor)
            .darken(ss.borderColorAlpha)
            .toString(),
          backgroundColor: Color(config.backgroundColor)
            .lighten(ss.backgroundColorAlpha)
            .toString(),
        },
      ]}
    >
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <IconImage
            src={config.src}
            name={config.name}
            size={60}
            opacity={1.0}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {props.title}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  iconContainer: {
    position: 'absolute',
    right: 30,
  },
  titleContainer: {
    flex: 1,
    padding: 20,
    paddingBottom: 25,
  },
  contents: {
    padding: 0,
    borderRadius: 0,
    height: 80,
    justifyContent: 'flex-end',
  },
  title: {
    color: '#555',
    fontWeight: '600',
    fontSize: 20,
  },
});
