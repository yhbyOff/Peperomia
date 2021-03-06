import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Feather } from '@expo/vector-icons';
import { IconImage } from 'components/atoms';
import { whenIPhoneSE } from 'lib/responsive';

type Props = {
  imageSrc: string;
  imageSize: number;
  backgroundColor: string;
  onSave: () => void;
  onOpenActionSheet: () => void;
};

export default (props: Props) => {
  return (
    <>
      <View style={styles.root}>
        <IconImage
          src={props.imageSrc}
          name=""
          size={whenIPhoneSE(60, 100)}
          opacity={0.85}
          defaultIcon
        />
      </View>
      <View style={styles.camera}>
        <View>
          <View
            style={[
              styles.cameraIconBackground,
              { backgroundColor: props.backgroundColor },
            ]}
          />

          <View style={styles.cameraIconContainer}>
            <TouchableOpacity onPress={props.onOpenActionSheet}>
              <Feather name="camera" size={32} style={styles.cameraIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = EStyleSheet.create({
  cameraIconBackground: {
    borderTopWidth: 3,
    borderColor: '$icon',
    marginTop: 27,
    height: '100%',
  },
  cameraIconContainer: {
    height: 54,
    width: 54,
    borderWidth: 3,
    borderRadius: 54,
    borderColor: '$icon',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$background',
    right: 40,
  },
  cameraIcon: {
    color: '$icon',
  },
  image: {
    opacity: 0.85,
  },
  root: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  camera: {
    height: 54,
  },
});
