import puppeteer from 'puppeteer'
import dotenv from 'dotenv'
import { runLogIn, runFetchComments } from './lib/functions.mjs'
dotenv.config()

const username = process.env.USER_NAME
const password = process.env.PASS_WORD

const run = async (threadLink) => {
    const config = {
        headless: false,
    }
    const browser = await puppeteer.launch(config);
    const page = await browser.newPage();

    
    
    await runLogIn(page, username, password)
    await runFetchComments(page, threadLink)
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

