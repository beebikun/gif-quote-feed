import { IStorageEntry } from 'data/reducers/utils';
import { FakeID } from 'utils';
import store from 'data/storage';
import { renderTestSequence, IStepFunction, IStepFunctionProps } from './router';

export default function expectApp(initialPath: string, isRandom: boolean, steps: IStepFunction[], count: number): Promise<void> {
  return new Promise(resolve => {
    const renderSteps = [ expectCallFetch, expectLoadItems ].concat(steps.slice(1));
    const firstStep = steps[0] || Function.prototype;
    const lastStep = renderSteps[renderSteps.length - 1];
    renderSteps[renderSteps.length - 1] = (props: IStepFunctionProps) => {
      lastStep(props);
      resolve();
    };


    renderTestSequence({
      initialPath,
      steps: renderSteps,
    });

    function expectReducerItems(size: number): void {
      const items = store.getState().items;
      expect(items.size)
        .toEqual(size);
    }

    function expectCallFetch({ wrapper }: IStepFunctionProps): void {
      const Header = wrapper.find('Header');
      expect(Header).toHaveLength(1);

      const Body = wrapper.find('RoutedBody');
      expect(Body).toHaveLength(1);

      const Feed = wrapper.find('Feed');
      expect(Feed).toHaveLength(1);

      expectReducerItems(0);
    }

    function expectLoadItems(props: IStepFunctionProps): void {
      const { wrapper } = props;

      const Feed = wrapper.find('Feed');
      expect(Feed).toHaveLength(1);
      const items: IStorageEntry[] = Feed.prop('items');

      expect(items.length).toBe(count);

      if (isRandom) {
        expect(items.every(([key, item]: IStorageEntry) => FakeID.is(item.id) === true))
          .toBe(true);
      } else {
        expect(items.some(([key, item]: IStorageEntry) => FakeID.is(item.id) === true))
          .toBe(false);
      }

      expectReducerItems(count);

      const FeedItem = wrapper.find('FeedItem');
      expect(FeedItem).toHaveLength(count);

      const Text = wrapper.find('Text');
      expect(Text).toHaveLength(count);

      const Img = wrapper.find('Img');
      expect(Img).toHaveLength(count);

      // random feed has RandomGif buttons, but Saved Feed - hasnt
      const ButtonRandomGif = wrapper.find('ButtonRandomGif');
      expect(ButtonRandomGif).toHaveLength(isRandom ? count : 0);

      const SaveButton = wrapper.find('ButtonAdd')
        .filterWhere(n => n.prop('isSaved') === false);
      expect(SaveButton).toHaveLength(isRandom ? count : 0);

      const DeleteButton = wrapper.find('ButtonAdd')
        .filterWhere(n => n.prop('isSaved') === true);
      expect(DeleteButton).toHaveLength(isRandom ? 0 : count);

      firstStep(props);
    }
  });
}