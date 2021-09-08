import * as Koa from 'koa'
import router from './route'
import * as db from './db'
import config from './config'
import * as koaBody from 'koa-body'
import * as bodyParser from 'koa-bodyparser';

const app = new Koa()
// app.use(bodyParser());
app.use(async (ctx, next) => {
  let start = Date.now()
  await next()
  let time = Date.now() - start
  ctx.set('X-Response-Time', time + 'ms')
})
app.use(
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: config.uploadSizeLimit,
    },
  }),
)
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', ctx.headers.origin); // 不能为 *
  ctx.set('Access-Control-Allow-Headers', 'content-type');
  ctx.set('Access-Control-Allow-Methods', 'OPTIONS,GET,HEAD,PUT,POST,DELETE,PATCH');
  ctx.set('Access-Control-Allow-Credentials', 'true'); // 允许携带cookie
  // console.log(ctx.request.body);
  await next();
})
app.use(router.routes())
db.connect().then(() =>
  app.listen(config.port, () => {
    console.log(`start:${config.port}`)
  }),
)
