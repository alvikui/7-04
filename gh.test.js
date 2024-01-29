const jestPuppeteerConfig = require("./jest-puppeteer.config");
const jestConfig = require("./jest.config");
const { testTimeout } = require("./jest.config");


let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {

  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });
  
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
  }, 5000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 10000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Get started with Team")
  }, 15000);

    test("The page Every GitHub plan", async () => {
      const btnSelector = ".link-mktg.f4-mktg";
      await page.waitForSelector(btnSelector, {
        visible: true,
      })
      const actual = await page.$eval(btnSelector, link => link.textContent);
      expect(actual).toContain("Learn more about GitHub Enterprise")
    }, 25000);

    test("The page contains", async () => {
      const btnSelector = ".btn-mktg.btn-muted-mktg";
      await page.waitForSelector(btnSelector, {
        visible: true,
      });
      const actual = await page.$eval(btnSelector, link => link.textContent);
      expect(actual).toContain("Sign up for free")
    }, 30000);

    describe("The h1 header content", () => {

    test("The h1 header content'", async () => {
      await page.goto("https://github.com/features/actions");
      const firstLink = await page.$("header div div a");
      await firstLink.click();
      await page.waitForSelector('h1');
      const title2 = await page.title();
      expect(title2).toEqual('Features • GitHub Actions · GitHub');
    }, 20000);
  })
})