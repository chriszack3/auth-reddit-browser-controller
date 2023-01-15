import puppeteer from 'puppeteer'
import dotenv from 'dotenv'
import axios from 'axios'
import { runLogIn, runFetchComments } from './lib/functions.mjs'
dotenv.config()

const username = process.env.USER_NAME
const password = process.env.PASS_WORD

const run = async (threadLink) => {
    const config = {
        headless: false,
    }
    const browser = await puppeteer.launch(config);
    const page = await browser.newPage()
    const loggedIn = await runLogIn(page, username, password)
    const comments = await runFetchComments(loggedIn, threadLink)
    comments.forEach(async (comment) => {
      // const response = await axios.post(`http://localhost:9000/api/OpenAi`, {
      //   prompt: comment
      // })
      console.log(comment)
    })
    // const localPage = await browser.newPage()
    // await localPage.goto(`http://localhost:9000`)
    // await localPage.waitForSelector('textarea')
    // await localPage.type(`textarea[type="text"]`, 'type this')
    const timeout = () => {
      setTimeout(() => browser.close(), 5000)
    }
    timeout()
    
}

run("https://old.reddit.com/r/feet/comments/10bnmcv/white_toes_anyone/")

