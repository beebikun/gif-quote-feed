import * as React from 'react';
import { shallow } from 'enzyme';
import { Location } from 'history';
import RoutedBody from './element';

it('render without crashing', () => {
  const fetchRandom = jest.fn();
  const fetchSaved = jest.fn();

  const wrapper = shallow(<RoutedBody
    fetchRandom={ fetchRandom }
    fetchSaved={ fetchSaved }
    location = { {} as Location }
    />);
  const Route = wrapper.find('Route');
  expect(Route).toHaveLength(2);
  expectChild('/', fetchRandom);
  expectChild('/saved', fetchSaved);

  const Redirect = wrapper.find('Redirect');
  expect(Redirect).toHaveLength(1);
  expect(Redirect.prop('to')).toBe('/');

  // tslint:disable-next-line:no-any
  function expectChild(path: string, mockedFetch: () => void): void {
    const r = Route.filterWhere((n): boolean => {
      return n.prop('path') === path;
    });
    expect(r).toHaveLength(1);

    // tslint:disable-next-line:no-any
    const component: any = (r.props() as any).component();
    const fetch = component.props!.fetch;
    expect(fetch).toBe(mockedFetch);
  }
});
