import * as Router from 'koa-router'
import { Context } from 'koa'
import { catchError, check, generateOk } from '../libs/check'
import { articleKit, tokenKit } from '../kits'
import { IArticle } from '../types'

const router = new Router({
  prefix: '/api/article',
})

router.post('/searchOwner', async (ctx: Context) => {
  try {
    let token = ctx.cookies.get('token')
    check(!!token, 'User_Not_Signed')
    let tokenCol = await tokenKit.findOne(token)
    check(!!tokenCol, 'User_Login_Expired')
    let {
      pageIndex,
      pageSize,
      keyword,
      sort = 'ctime',
    } = ctx.request.body as {
      pageIndex: number
      pageSize: number
      keyword: string
      sort: 'ctime' | 'preview'
    }
    // todo: check data
    let data = await articleKit.search(
      keyword,
      pageIndex,
      pageSize,
      sort,
      tokenCol.userId,
    )
    ctx.body = generateOk(data)
  } catch (err) {
    catchError(err, ctx)
  }
})

router.post('/searchAll', async (ctx: Context) => {
  try {
    let {
      pageIndex,
      pageSize,
      keyword,
      sort = 'ctime',
    } = ctx.request.body as {
      pageIndex: number
      pageSize: number
      keyword: string
      sort: 'ctime' | 'preview'
    }
    // todo: check data
    let data = await articleKit.search(keyword, pageIndex, pageSize, sort)
    ctx.body = generateOk(data)
  } catch (err) {
    catchError(err, ctx)
  }
})

router.post('/add', async (ctx: Context) => {
  try {
    let token = ctx.cookies.get('token')
    check(!!token, 'User_Not_Signed')
    let tokenCol = await tokenKit.findOne(token)
    check(!!tokenCol, 'User_Login_Expired')
    let { title, subTitle, content, tags, banner } = ctx.request.body as {
      content: string
      title: string
      subTitle: string
      tags: string[]
      banner: string[]
    }
    const now = new Date().getTime()
    const record: IArticle = {
      title,
      author: tokenCol.userId,
      subTitle,
      content,
      tags: tags,
      ctime: now,
      mtime: now,
      banner,
      preview: 0,
    }
    // todo: check data
    let res = await articleKit.add(record)
    ctx.body = generateOk(res)
  } catch (err) {
    catchError(err, ctx)
  }
})

router.delete('/:id', async (ctx: Context) => {
  try {
    let token = ctx.cookies.get('token')
    check(!!token, 'User_Not_Signed')
    let tokenCol = await tokenKit.findOne(token)
    check(!!tokenCol, 'User_Login_Expired')
    // check data
    await articleKit.remove(ctx.params.id, tokenCol.userId)
    ctx.body = generateOk()
  } catch (err) {
    catchError(err, ctx)
  }
})

router.put('/:id', async (ctx: Context) => {
  try {
    let token = ctx.cookies.get('token')
    check(!!token, 'User_Not_Signed')
    let tokenCol = await tokenKit.findOne(token)
    check(!!tokenCol, 'User_Login_Expired')
    let { title, subTitle, content, tags, banner } = ctx.request.body as {
      title: string,
      subTitle: string,
      content: string,
      tags: string[],
      banner: string[],
    }
    // check data
    await articleKit.update(
      ctx.params.id,
      title,
      subTitle,
      content,
      tags,
      tokenCol.userId,
      banner,
    )
    ctx.body = generateOk()
  } catch (err) {
    catchError(err, ctx)
  }
})

router.get('/:id', async (ctx: Context) => {
  try {
    const article = await articleKit.preview(ctx.params.id)
    ctx.body = generateOk({
      info: article,
    })
  } catch (err) {
    catchError(err, ctx)
  }
})

export default router
