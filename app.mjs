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
  const msgThreads = await page.$$(`main#tooltip-container > div > div > div > div > div > a`)
  
  let messagesArr = []
  for (let i = 0; i < msgThreads.length; i++) {
    await msgThreads[i].click()
    await page.waitForNetworkIdle()
    const messages = await page.$$eval(`main#tooltip-container > div > div > div > div > div > span`, (options) => {
      return {
        threadMessages: options.map(option => {
          return {
            html: option.innerHTML,
            text: option.innerText,
          }
        })
      }
    })
    messagesArr.push(messages)
    
  }
  
 console.log(messagesArr)
  
  //messages.forEach((thread) => {
    // await thread.click()
    // await page.waitForSelector(`#tooltip-container > div > div > div > div > div > span`)
    // const threadContent = await page.$eval(`#tooltip-container > div > div > div > div > div > span`, (msg) => msg)
    // const previousChats = await page.$$eval(`#tooltip-container > div > div > div > div > div`, (chats) => {
    //   return chats
    // })
    //console.log(thread)
  //document.querySelector("#tooltip-container > div > div > div > div> div > span > span > pre")
  //})
  // let i = 0
  // for (i < messages.length - 1; i++;) {
  //   await messages[i].click()
  //   const previousChats = await page.$$(`#tooltip-container > div > div > div > div > div > span:nth-child(3) > span`, (chats) => chats.innerText)
  //   console.log(previousChats)
  //   i++
  // }
  
}

run('FootFetishTalks')
