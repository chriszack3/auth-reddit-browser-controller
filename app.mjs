import puppeteer from 'puppeteer'
import dotenv from 'dotenv'
import axios from 'axios'
import { runLogIn, runFetchComments } from './lib/functions.mjs'
dotenv.config()

const username = process.env.USER_NAME
const password = process.env.PASS_WORD
const config = {
  headless: false,
}

const run = async (sub) => {
  const config = {
    headless: false,
  }
  const browser = await puppeteer.launch(config);
  const page = await browser.newPage()
  await page.goto(`https://old.reddit.com`);

  await page.goto(`https://old.reddit.com/r/${sub}/top/?sort=top&t=all`)

  await Promise.all([
    await page.click(`button[value= "yes"]`),
    await page.waitForNavigation()
  ])

  const options = await page.$$eval('a[data-event-action="title"]', options => {
    return options.map(option => option.textContent);
  });
  console.log(options)

  const timeout = () => {
    setTimeout(() => browser.close(), 5000)
  }
  timeout()
}

run('FootFetishTalks')
