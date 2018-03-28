import { CitysdkexamplePage } from './app.po';

describe('citysdkexample App', () => {
  let page: CitysdkexamplePage;

  beforeEach(() => {
    page = new CitysdkexamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
