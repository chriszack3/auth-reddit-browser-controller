export const runLogIn = async (pageContext, username, password) => {
    await pageContext.goto(`https://old.reddit.com`);
    // Type into search box.
    await pageContext.type(`form[id="login_login-main"] > input[name="user"]`, username);
    await pageContext.type(`form[id="login_login-main"] > input[name="passwd"]`, password);
    await pageContext.click(`input[id="rem-login-main"]`)
    await pageContext.click(`form[id="login_login-main"] > div.submit > button`)
    await pageContext.waitForNavigation()
}

export const runFetchComments = async (pageContext, threadLink) => {
    await pageContext.goto(threadLink)
    await pageContext.waitForSelector(`div.md`)
    const commentsText = await pageContext.$$eval(`div.md > p`, comments => {
        return comments.map(comment => comment.textContent)
    })
    commentsText.map((comment) => console.log(comment))
    return commentsText
}