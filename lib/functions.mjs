export const runLogIn = async (page, username, password) => {
    
    await page.goto(`https://old.reddit.com`);
    // Type into search box.
    await page.type(`form[id="login_login-main"] > input[name="user"]`, username);
    await page.type(`form[id="login_login-main"] > input[name="passwd"]`, password);
    await page.click(`input[id="rem-login-main"]`)
    await page.click(`form[id="login_login-main"] > div.submit > button`)
    await page.waitForNavigation()
}
//changethisto return the browser instance and text !!!!!!!!!!!!!
export const runFetchComments = async (page, threadLink) => {
    //const page = await browserContext.newPage();
    await page.goto(threadLink)
    await page.waitForSelector(`div.md > p`)
    const comments = await page.$$eval(`div.md > p`, commentNodes => {
        return commentNodes.map((commentNode) => commentNode)
    })
    
    return comments
}