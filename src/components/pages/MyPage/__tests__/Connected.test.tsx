import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Connected from '../Connected';

describe('components/pages/MyPage/Connected.tsx', () => {
  let wrapper: ShallowWrapper;

  const propsData: any = () => ({
    navigation: {
      setParams: jest.fn(),
      navigate: jest.fn(),
    },
    route: {
      params: {
        itemId: '1',
        refresh: '',
      },
    },
    refreshData: jest.fn(),
    uid: 'test',
    email: 'test',
    post: jest.fn(),
    onPermissionRequest: jest.fn(),
  });

  beforeEach(() => {
    wrapper = shallow(<Connected {...propsData()} />);
  });

  it('正常に表示されている', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
