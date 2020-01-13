const Koa = require('koa')
const logger = require('koa-logger')
const app = new Koa()

// logger
app.use(logger((str, args) => {
  // redirect koa logger to other output pipe
  // default is process.stdout(by console.log function)
  console.log(args)
}))

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