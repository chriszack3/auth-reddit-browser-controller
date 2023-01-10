const puppeteer = require('puppeteer')
require('dotenv').config()

const username = process.env.USER_NAME
const password = process.env.PASS_WORD

const run = async () => {
    const config = { 
        headless: false
    }
    const browser = await puppeteer.launch(config);
    const page = await browser.newPage();

    await page.goto(`https://old.reddit.com`);
      // Type into search box.
    await page.type(`form[id="login_login-main"] > input[name="user"]`, username);
    await page.type(`form[id="login_login-main"] > input[name="passwd"]`, password);
    await page.click(`input[id="rem-login-main"]`)
    await page.click(`form[id="login_login-main"] > div.submit > button`)
    await page.waitForNavigation()
    
    await browser.close()
}

run()

