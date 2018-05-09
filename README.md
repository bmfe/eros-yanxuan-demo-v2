## Intro
![图片](https://raw.githubusercontent.com/zwwill/yanxuan-weex-demo/master/banner.png)

eros-yanxuan 是基于 [eros](https://bmfe.github.io/eros-docs/) 开发，从[网易严选 weex 版本改编](https://github.com/zwwill/yanxuan-weex-demo)迁移生成的项目。

- [eros 文档](https://bmfe.github.io/eros-docs/#/)
- [eros github](https://github.com/bmfe/eros-template)
## Run
确保你本地已经集成了 [eros 开发所需的环境](https://bmfe.github.io/eros-docs/#/zh-cn/base_env)。

clone 项目到本地：
```
$ git clone https://github.com/bmfe/eros-yanxuan-demo-v2.git eros-yanxuan
```

进入目录，下载前端依赖：
```
$ cd eros-yanxuan
$ npm i
```

### iOS SDK
```
$ cd platforms/ios/WeexEros
$ pod update                // 下载 iOS 依赖
$ open WeexEros.xcworkspace // 自动打开项目
```
选中模拟器，点击绿色箭头运行 app 即可。

### Android 

- Android 需要[自行导入项目](https://bmfe.github.io/eros-docs/#/zh-cn/base_init?id=android-%E5%AF%BC%E5%85%A5%E5%B7%A5%E7%A8%8B)，便可运行起来。

## develop
- 项目根目录下运行 `eros dev`
- 关闭调试，拦截器，打开热更新
- 重新 build app

## Question?
运行过程中出现问题在以下地址解决方法，如果没有找到，还请给我们提 issue。

- [eros issue](https://github.com/bmfe/eros-template/issues)
- [eros Q&A](https://bmfe.github.io/eros-docs/#/zh-cn/QA)

现在，尽情享受 eros 开发。
