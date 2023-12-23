import { renderPackage } from './utils';

test('renders package correctly', () => {
  const p = {
    layers: [
      { text: 'Hello' },
      { text: 'World' }
    ],
    calculations: [
      { text: '1' },
      { text: '2' },
      { text: '3' }
    ]
  };

  const expectedPackage = {
    layers: [
       'Hello' ,
       'World' 
    ],
    calculations: [
      1,
      2,
      3
    ]
  };

  const result = renderPackage(p);

  expect(result).toEqual(expectedPackage);
});