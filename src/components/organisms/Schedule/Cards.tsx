import React, { Component } from 'react';
import { FlatList } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { SelectItemDetail } from 'domain/itemDetail';
import Card from 'components/molecules/Schedule/TouchableCard';
import { ConnectedType } from 'components/pages/Schedule/Connected';
import Loading from './Loading';

type Props = Pick<ConnectedType, 'onScheduleDetail'> & {
  data: SelectItemDetail[];
  loading: boolean;
};

export default class extends Component<Props> {
  renderItem({ item, index }: { item: SelectItemDetail; index: number }) {
    return (
      <Card
        {...item}
        kind={item.kind}
        end={index + 1 === this.props.data.length}
        onPress={() => this.props.onScheduleDetail(String(item.id))}
      />
    );
  }

  render() {
    if (this.props.loading) {
      return <Loading />;
    }

    return (
      <FlatList
        data={this.props.data}
        keyExtractor={(item) => String(item.id)}
        renderItem={this.renderItem.bind(this)}
        contentContainerStyle={styles.root}
      />
    );
  }
}

const styles = EStyleSheet.create({
  root: {
    paddingBottom: 50,
  },
});
