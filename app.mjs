import puppeteer from 'puppeteer'
import dotenv from 'dotenv'

dotenv.config()

const username = process.env.USER_NAME
const password = process.env.PASS_WORD
const config = {
  headless: false,
  args: ["--disable-notifications"]
}

const run = async (username, password, config) => {
  const runLogin = async (page) => {
    const toBeCompleted = new Promise(async (res, rej) => {
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
  const checkForModal = async (page) => {
    const toBeCompleted = new Promise(async (res, rej) => {
      const done = await page.waitForSelector(`div[aria-modal="true"]`, 5000)
        .then(async () => {
          await page.click(`button[aria-label="Close"]`)
        })
        .catch((error) => {
          console.log('checkForModal Error: ' + err)
          return error
        })

      return done?.error ? rej(done) : res(done)
    })
    return await Promise.all([toBeCompleted])
  }

  const runGetChatThreads = async (page) => {
    const toBeCompleted = new Promise(async (res, rej) => {
      await page.click(`i.icon-chat`)
      await page.waitForSelector(`main#tooltip-container > div > div > div > div > div:last-child > a`)
      res(await page.$$(`main#tooltip-container > div > div > div > div > div > a > div > h4 > span`) ?? rej('Error'))
      //   .then((threads) => {
      //   return threads?.length > 0 ? res(threads) : rej("runGetChatThreads Error: " + err ?? "No error message")
      // })
    })
    return await Promise.all([toBeCompleted])
  }

  const browser = await puppeteer.launch(config);
  const page = await browser.newPage()
  await runLogin(page)
  await checkForModal(page)
  const [threads] = await runGetChatThreads(page).catch(err => console.log(err))
  console.log(threads)
  

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