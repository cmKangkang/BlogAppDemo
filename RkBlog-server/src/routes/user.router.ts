import * as Router from 'koa-router'
import { Context } from 'koa'
import { catchError, check, generateOk } from '../libs/check'
import { tokenKit, userKit } from '../kits'

const router = new Router({
  prefix: '/api/user',
})

router.put('/updateUserInfo', async (ctx: Context) => {
  try {
    const { avatar, nickname } = ctx.request.body as {
      avatar: string
      nickname: string
    }
    // check data
    const token = ctx.cookies.get('token')
    check(!!token, 'User_Not_Signed')
    let tokenCol = await tokenKit.findOne(token)
    check(!!tokenCol, 'User_Login_Expired')
    await userKit.updateUserInfo(tokenCol.userId, nickname, avatar)
    ctx.body = generateOk()
  } catch (err) {
    catchError(err, ctx)
  }
})

router.put('/updatePwd', async (ctx: Context) => {
  try {
    const { oldPwd, newPwd } = ctx.request.body as {
      oldPwd: string
      newPwd: string
    }
    // check data
    const token = ctx.cookies.get('token')
    check(!!token, 'User_Not_Signed')
    let tokenCol = await tokenKit.findOne(token)
    check(!!tokenCol, 'User_Login_Expired')
    await userKit.updatePwd(tokenCol.userId, oldPwd, newPwd)
    ctx.body = generateOk()
  } catch (err) {
    catchError(err, ctx)
  }
})

router.get('/userInfo', async (ctx: Context) => {
  try {
    const token = ctx.cookies.get('token')
    check(!!token, 'User_Not_Signed')
    let tokenCol = await tokenKit.findOne(token)
    check(!!tokenCol, 'User_Login_Expired')
    let user = await userKit.findOne(tokenCol.userId)
    ctx.body = generateOk(user)
  } catch (err) {
    catchError(err, ctx)
  }
})

export default router
