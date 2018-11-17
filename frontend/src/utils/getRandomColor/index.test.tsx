import getRandomColor, { size } from './index';

it('get color', () => {
  const color = getRandomColor();
  expect(/^#[0-9A-F]{6}/.test(color))
    .toBe(true);
});


it('not allow two the same color in a row', () => {
  let lastColor = '';
  const n = size * 2;

  for (let i = 0; i <= n; i++) {
    const color: string = getRandomColor();
    expect(color)
      .not
      .toBe(lastColor);

    lastColor = color;
  }
});