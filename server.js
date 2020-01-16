const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const send = require('koa-send')

const puppeteer = require('puppeteer')

router.get('/getIndexScreen', getIndexScreen)

app.use(router.routes())

app.use(async (ctx, next) => {
  try {
    await send(ctx, ctx.path, {root: __dirname + '/public'})
  } catch (e) {
    console.log(e)
    next()
  }
})

async function getIndexScreen(ctx) {
  const browser = await puppeteer.launch({
    args: [
      '–disable-gpu',
      '–disable-dev-shm-usage',
      '–disable-setuid-sandbox',
      '–no-first-run',
      '–no-sandbox',
      '–no-zygote',
      '–single-process'
    ]
  })
  const page = await browser.newPage()
  await page.setViewport({
    width: 375,
    height: 667
  })
  await page.goto('http://localhost:3000/index.html')
  await page.screenshot({path: 'public/example.png'})

  await browser.close()
  await send(ctx, 'public/example.png')
}

app.use(async ctx => {
  ctx.status = 404
  switch (ctx.accepts('html', 'json')) {
    case 'html':
      ctx.type = 'html'
      ctx.body = '<h1>Not Found</h1>'
      break
    case 'json':
      ctx.body = {
        message: 'Not Found'
      }
      break
    default:
      ctx.type = 'text'
      ctx.body = 'Not Found'
  }
})

app.listen(3000)