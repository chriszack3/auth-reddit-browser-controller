import puppeteer from 'puppeteer'
import dotenv from 'dotenv'
import axios from 'axios'
import { runLogIn, runFetchComments } from './lib/functions.mjs'
dotenv.config()

const username = process.env.USER_NAME
const password = process.env.PASS_WORD

const run = async (sub) => {
  const config = {
    headless: false,
    args: ["--disable-notifications"]
  }
  const browser = await puppeteer.launch(config);
  const page = await browser.newPage()
  
  await page.goto(`https://www.reddit.com/login/`);
  // Type into search box.
  await page.type(`input[id="loginUsername"]`, username);
  await page.type(`input[id="loginPassword"]`, password);
  await page.click(`button[type="submit"]`)
  await page.waitForNavigation()
  await page.click(`i.icon-chat`)
  
  await page.waitForSelector(`button[aria-label="Close"]`)
  await page.click(`button[aria-label="Close"]`)
  await page.waitForNetworkIdle()
  const messages = await page.$$(`main#tooltip-container > div > div > div > div > div > a`, (messages) => messages)
  messages[1].click()
  
}

run('FootFetishTalks')
