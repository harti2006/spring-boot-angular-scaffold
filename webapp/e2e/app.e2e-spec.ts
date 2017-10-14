import { AppPage } from './app.po';

describe('spring-boot-angular-scaffold App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display title message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toContain('Software Projects Manager');
  });
});
