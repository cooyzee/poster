const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const send = require('koa-send')

const puppeteer = require('puppeteer')

router.get('/getIndexScreen', getIndexScreen)
router.get('/', index)

app.use(router.routes())

async function index(ctx) {
  await send(ctx, 'index.html')
}

async function getIndexScreen(ctx) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('http://localhost:3000')
  await page.screenshot({path: 'example.png'})

  await browser.close()
  await send(ctx, 'example.png')
}

app.use(async ctx => {
  ctx.status = 404;
  switch (ctx.accepts('html', 'json')) {
    case 'html':
      ctx.type = 'html'
      ctx.body = '<h1>Page Not Found</h1>'
      break
    case 'json':
      ctx.body = {
        message: 'Page Not Found'
      }
      break
    default:
      ctx.type = 'text'
      ctx.body = 'Page Not Found'
  }
})

app.listen(3000)