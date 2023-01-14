const puppeteer = require('puppeteer')
require('dotenv').config()

const username = process.env.USER_NAME
const password = process.env.PASS_WORD

const run = async (threadLink) => {
    const config = {
        headless: false,
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
    await page.goto(threadLink)
    await page.waitForSelector(`div.md`)
    const commentsText = await page.$$eval(`div.md > p`, comments => {
      return comments.map(comment => comment.textContent)
    })
     commentsText.map((comment) => console.log(comment))
    const localPage = await browser.newPage()
    await localPage.goto(`http://localhost:9000`)
    await localPage.waitForSelector('textarea')
    await localPage.type(`textarea[type="text"]`, 'type this')
    const timeout = () => {
      setTimeout(() => browser.close(), 5000)
    }
    timeout()
    
}

run("https://old.reddit.com/r/feet/comments/10bnmcv/white_toes_anyone/")

