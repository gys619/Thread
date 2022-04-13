#### elecV2P 环境变量使用说明  
* 1.以京东CK为例，登录elecV2P后台（默认地址:127.0.0.1:80）
* 2.选择`JSMANAGE`，key填`CookiesJD`，下面空白处即value值按下面的格式填写，多账号以此类推，自行删减。  
```bash
[
  {
    "userName": "jd_5bbxxx414",
    "cookie": "pt_key=xxx;pt_pin=jd_5xxx414;"
  },
  {
    "userName": "jd_739xxx89e",
    "cookie": "pt_key=xxx;pt_pin=jd_739xxx89e;"
  },
  {
    "userName": "jd_413xxxe89",
    "cookie": "pt_key=xxx;pt_pin=jd_413xxxe89;"
  }
]
```
* 其他环境变量按正常填写即可  
#### elecV2P 京东任务订阅地址  
`https://raw.githubusercontent.com/zero205/JD_tencent_scf/main/jd_task.json`
#### 订阅地址使用说明  
* 登录elecV2P后台，选择`TASK`，选择添加订阅任务，输入上面的订阅地址，点击获取内容，点击全部添加即可  

#### elecV2P 通知方式
* [点此查看](https://github.com/zero205/JD_tencent_scf/issues/15)
