export const runLogIn = async (browserContext, username, password) => {
    const page = await browserContext.newPage();
    await page.goto(`https://old.reddit.com`);
    // Type into search box.
    await page.type(`form[id="login_login-main"] > input[name="user"]`, username);
    await page.type(`form[id="login_login-main"] > input[name="passwd"]`, password);
    await page.click(`input[id="rem-login-main"]`)
    await page.click(`form[id="login_login-main"] > div.submit > button`)
    await page.waitForNavigation()
}

export const runFetchComments = async (browserContext, threadLink) => {
    const page = await browserContext.newPage();

    await page.goto(threadLink)
    await page.waitForSelector(`div.md`)
    const commentsText = await page.$$eval(`div.md > p`, comments => comments.map((comment, index) => comment.textContent))
    return commentsText
}