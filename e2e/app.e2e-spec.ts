import { AppPage } from './app.po';

describe('angular-go-todo-fun App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getHeading()).toEqual('Welcome to app!');
  });

  it('should be redirected on login page as guest user', () => {
    page.navigateTo();
    // expect(page.getHomeComponentMessage()).toEqual('home works!');
    expect(page.getCurrentUrl()).toContain('/login');
  });
});
