import * as library from '.';

describe('http-statusify API', () => {
  it('should export the correct structure', () => {
    expect(library).toMatchSnapshot();
  });
});
