import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';

import LazyImg, { IProps } from './index';

const props = {
  height: 100,
  src: 'src',
  width: 133,
};


const mockLoader = jest.spyOn(LazyImg.prototype, 'loadImg');
const mockClear = jest.spyOn(LazyImg.prototype, 'clearImgOnload');
const mockUpdate = jest.spyOn(LazyImg.prototype, 'componentDidUpdate');

beforeEach(() => {
  mockLoader.mockClear();
  mockClear.mockClear();
  mockUpdate.mockClear();
});

function getImgLoader(wrapper: ShallowWrapper): HTMLImageElement {
  // tslint:disable-next-line:no-any
  return (wrapper.instance() as any).img;
}

it('renders without crashing', () => {
  const options = { lifecycleExperimental: false, disableLifecycleMethods: true };
  const wrapper = shallow(<LazyImg { ...props } />, options);
  const imgLoader = getImgLoader(wrapper);

  expectLoader(true);
  expectImgMatch();

  expect(imgLoader.onload)
    .toBeUndefined();

  (wrapper.instance() as LazyImg).componentDidMount();

  expect(mockLoader).toHaveBeenCalledTimes(1);
  expect(mockClear).toHaveBeenCalledTimes(1);
  expect(imgLoader.onload)
    .toBeUndefined();

  expectLoader(false);
  expectImgMatch(props);

  function expectImgMatch(expected?: IProps): void {
    const Img = wrapper.update().find('img');

    if (expected) {
      expect(Img.props())
        .toMatchObject(expected);
    } else {
      expect(Img)
        .toHaveLength(0);
    }
  }

  function expectLoader(expected: boolean): void {
    const Loader = wrapper.update().find('Loader');
    expect(Loader)
      .toHaveLength(expected ? 1 : 0);
  }
});

it('clear imgLoader.onload after unmount', () => {
  const wrapper = shallow(<LazyImg { ...props } />);
  const imgLoader = getImgLoader(wrapper);
  expect(mockClear).toHaveBeenCalledTimes(1);

  imgLoader.onload = jest.fn();

  wrapper.unmount();

  expect(imgLoader.onload)
    .toBeUndefined();
  expect(mockClear).toHaveBeenCalledTimes(2);
});

describe('UPDATE', () => {
  it('update if src is changed', () => {
    const wrapper = shallow(<LazyImg { ...props } />);
    expect(mockLoader).toHaveBeenCalledTimes(1);

    mockUpdate.mockClear();
    mockLoader.mockClear();
    wrapper.setProps({ src: 'new' });
    // 1 after setProps and 2 times after setState (set default and set given)
    expect(mockUpdate).toHaveBeenCalledTimes(3);
    expect(mockLoader).toHaveBeenCalledTimes(1);
  });

  it('dont update if src isnt changed', () => {
    const wrapper = shallow(<LazyImg { ...props } />);
    expect(mockLoader).toHaveBeenCalledTimes(1);

    mockUpdate.mockClear();
    mockLoader.mockClear();
    wrapper.setProps({ height: 10 });
    expect(mockUpdate).toHaveBeenCalledTimes(1);

    expect(mockLoader).toHaveBeenCalledTimes(0);
  });
});