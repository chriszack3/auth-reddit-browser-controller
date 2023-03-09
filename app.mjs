import puppeteer from 'puppeteer'
import dotenv from 'dotenv'
import fs from 'fs'
import axios from 'axios'
import { runLogIn, runFetchComments } from './lib/functions.mjs'
import { error } from 'console'

dotenv.config()

const username = process.env.USER_NAME
const password = process.env.PASS_WORD
const config = {
  headless: false,
  args: ["--disable-notifications"]
}
const run = async (username, password, config) => {


  const browser = await puppeteer.launch(config);
  const page = await browser.newPage()

  const runLogin = async (page) => {
    console.log(page)
    const toBeCompleted = new Promise(async (res, rej) => {
      console.log('tbd running: ' + page)
      await page.goto(`https://www.reddit.com/login/`);
      // Type into search box.
      await page.type(`input[id="loginUsername"]`, username);
      await page.type(`input[id="loginPassword"]`, password);
      await page.click(`button[type="submit"]`)
      const done = await page.waitForNavigation()
      return done?.error ? rej(done) : res(done)
    })
    return await Promise.all([toBeCompleted])
  }
  console.log(page)
  await runLogin(page)
  // await page.click(`i.icon-chat`)

  // await page.waitForSelector(`div[aria-modal="true"]`, 5000)

  // await page.click(`button[aria-label="Close"]`)

  // await page.waitForSelector(`main#tooltip-container > div > div > div > div > div:last-child > a`)
  // const threadArr = await page.$$(`main#tooltip-container > div > div > div > div > div:last-child > a`)

  // await threadArr[threadArr.length - 1].click()
  //const messages = await page.$$eval(`main#tooltip-container > div > div > div > div > div:last-child > a`, (options, index) => {
  //       const threadMessages = options.map(option => {
  //         return {
  //           html: option.innerHTML,
  //           text: option.innerText,
  //         }
  //       })
  //       const usernames = threadMessages?.[0]?.text
  //       return {
  //         threadMessages,
  //         usernames,

  //       }
  //     })

  // threadArr.map(async (thread) => {
  //   console.log(thread)
  // })
  // messageArr
  // .then(arr => {
  //   return [arr].reverse()
  //     .map(async (thread) => {
  //       console.log("thread" + thread)
  //       await page.click(thread)
  //       await page.waitForNetworkIdle()
  //       const messages = await page.$$eval(`main#tooltip-container > div > div > div > div > div:last-child > a`, (options, index) => {
  //         const threadMessages = options.map(option => {
  //           return {
  //             html: option.innerHTML,
  //             text: option.innerText,
  //           }
  //         })
  //         const usernames = threadMessages?.[0]?.text
  //         return {
  //           threadMessages,
  //           usernames,
  //         }
  //       })
  //       return await new Promise.all([messages])
  //         .then((res) => {
  //           console.log(res)
  //           return res
  //         }, err => err)
  //     })
  // }
  //)

  // const messageArr = msgThreads
  //   .map(async (thread, i) => {
  //     console.log(thread)
  //     await page.click(thread[i])
  //     await page.waitForNetworkIdle()
  //     const messages = await page.$$eval(`main#tooltip-container > div > div > div > div > div:last-child > a`, (options, index) => {
  //       const threadMessages = options.map(option => {
  //         return {
  //           html: option.innerHTML,
  //           text: option.innerText,
  //         }
  //       })
  //       const usernames = threadMessages?.[0]?.text
  //       return {
  //         threadMessages,
  //         usernames,

  //       }
  //     })
  //     return messages
  //   })
  // const date = Date.now().toString()
  // fs.writeFileSync(`./logs/messageLogs/${date}.json`, JSON.stringify(threadArr));
  // file written successfully
}
run(username, password, config)