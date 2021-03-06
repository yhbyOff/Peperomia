import React, { FC, useState, memo, useCallback } from 'react';
import { Alert } from 'react-native';
import uuidv1 from 'uuid/v1';
import { Item } from 'domain/item';
import { SelectItemDetail } from 'domain/itemDetail';
import { getItemByID } from 'lib/item';
import {
  sortItemDetail,
  getItemDetailByID,
  getItemDetails,
  deleteItemDetail,
} from 'lib/itemDetail';
import { ContextProps as ItemContextProps } from 'containers/Items';
import { useAuth } from 'containers/Auth';
import { useDidMount } from 'hooks/index';
import { ScreenNavigationProp, ScreenRouteProp } from './';
import Page from './Page';

type State = {
  item: Item;
  itemDetail: SelectItemDetail;
};

export type Props = Pick<ItemContextProps, 'refreshData'> & {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
  onEdit: (
    title: string,
    kind: string,
    place: string,
    url: string,
    memo: string,
    moveMinutes: number,
    priority: number,
    itemId: string
  ) => void;
};

const initialState = () => ({
  item: {
    id: 0,
    title: '',
    image: '',
    kind: '',
  },
  itemDetail: {
    id: 0,
    itemId: '',
    kind: '',
    title: '',
    memo: '',
    place: '',
    url: '',
    moveMinutes: 0,
    priority: 0,
  },
});

const ScheduleDetailConnected: FC<Props> = memo((props) => {
  const { uid } = useAuth();
  const [state, setState] = useState<State>(initialState());
  const itemDetailId = props.route.params.itemDetailId || '1';

  useDidMount(() => {
    const getData = async () => {
      const itemDetail = await getItemDetailByID(uid, String(itemDetailId));
      const item = await getItemByID(uid, String(itemDetail?.itemId));

      setState((s) => ({
        ...s,
        item,
        itemDetail,
      }));
    };

    getData();
  });

  const onDismiss = useCallback(() => {
    props.navigation.goBack();
  }, [props.navigation]);

  const onCreateScheduleDetail = useCallback(() => {
    const {
      title,
      kind,
      place,
      url,
      moveMinutes,
      priority,
      itemId,
    } = state.itemDetail;
    props.onEdit(
      title,
      kind,
      place,
      url,
      state.itemDetail.memo,
      moveMinutes,
      priority,
      String(itemId)
    );
  }, [props, state.itemDetail]);

  const onDelete = useCallback(async () => {
    const ok = await deleteItemDetail(uid, {
      id: String(state.itemDetail.id),
    });

    if (!ok) {
      Alert.alert('保存に失敗しました');
      return;
    }

    const itemDetails = await getItemDetails(
      null,
      String(state.itemDetail.itemId)
    );

    if (itemDetails.length > 0) {
      await sortItemDetail(
        uid,
        itemDetails.map((itemDetail) => ({
          ...itemDetail,
          id: String(itemDetail.id),
        }))
      );
    }

    if (props.refreshData) {
      props.refreshData();
      props.navigation.navigate('Schedule', {
        itemId: state.itemDetail.itemId,
        title: state.item.title,
        refresh: uuidv1(),
      });
    }
  }, [
    props,
    state.item.title,
    state.itemDetail.id,
    state.itemDetail.itemId,
    uid,
  ]);

  return (
    <Page
      {...state.itemDetail}
      loading={state.itemDetail.id === 0}
      onDismiss={onDismiss}
      onDelete={onDelete}
      onCreateScheduleDetail={onCreateScheduleDetail}
    />
  );
});

export default ScheduleDetailConnected;
