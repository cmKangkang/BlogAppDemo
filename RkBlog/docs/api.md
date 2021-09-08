# api文档

## 1 用户

### 1.1 注册

```
post /api/auth/signup
```

参数：

```
account: 'admin'
pwd: string
```

返回1：

```json
{
    stat: 'ok',
    data: 'token=dewdwede' // token
}
```

返回2：

```
{
	stat: 'Err_User_Exist',
	msg: '用户已存在'
}
```

### 1.2 登录

```
post /api/auth/signin
```

参数：

```
account: 'admin'
pwd: string
```

返回1：

```json
{
    stat: 'ok',
    data: 'token=dwedwedw3q' // token
}
```

返回2：

```
{
	stat: 'err',
	msg: 'dheuidiwe'
}
```

## 1.3 登出

```
post /api/auth/signout
```

参数：无

返回：

```
{
	stat: 'ok',
}
```

### 1.4 更新用户信息

```
post /api/user/searchOwner
```

参数：

```
avatar: '2313'
nickname: 'dewdew'
```

返回：

```
{
	stat: 'ok'
}
```



### 1.5 更新用户密码

```
post /api/user/updatePwd
```

参数：

```
oldPwd: 'fdew'
newPwd: 'dewfw'
```

返回：

```
{
	stat: 'ok'
}
```

### 1.6 获取用户信息

```
post /api/user/userInfo
```

参数：

```

```

返回：

```
{
	stat: 'ok'，
	data: {}
}
```


## 文章
1. 获取文章后的返回信息

```json

{
    "stat": "ok",
    "data": {
        "info": {
            "_id": "61124efb07fd979132c20034",
            "title": null,
            "author": {
                "_id": "610f54bd1797d4f5f2cd6b8d",
                "account": null,
                "nickname": "",
                "ctime": 1628394685662,
                "status": 0,
                "avatar": ""
            },
            "subTitle": null,
            "content": null,
            "tags": "",
            "ctime": 1628589819903,
            "mtime": 1628589819903,
            "banner": null,
            "preview": 1,
            "status": 0
        }
    }
}

```

2. 添加文章参数
```json
{
    title: 'demo',
    content: '
        # demo
        **示例**
        ```js
        console.log("hello world");
        ```
    ',
    tags: ['1', '2'],
    banner: ['166c4b88c4cd58ae9871f849624d8f23']
}

```