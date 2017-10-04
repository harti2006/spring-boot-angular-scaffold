import { AppPage } from './app.po';

describe('spring-boot-angular2-scaffold App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display title message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toContain('Software Projects Manager');
  });
});
