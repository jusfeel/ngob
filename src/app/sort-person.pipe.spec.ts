import { SortPersonPipe } from './sort-person.pipe';

describe('SortPersonPipe', () => {
  it('create an instance', () => {
    const pipe = new SortPersonPipe();
    expect(pipe).toBeTruthy();
  });
});
