import { browser, by, element } from 'protractor';

export class HomePage {
  navigateTo() {
    return browser.get('/');
  }

  isOnPage() {
    expect(browser.getCurrentUrl()).toBe(browser.baseUrl + '/');
  }
  getHeading() {
    return element(by.css('app-root h1')).getText();
  }

  getHomeComponentMessage() {
    return element(by.css('app-root app-home p')).getText();
  }

  getCurrentUrl() {
    return browser.getCurrentUrl();
  }
}
