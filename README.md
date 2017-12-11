## 前言
本项目是根据[yanxuan-weex-demo](https://github.com/zwwill/yanxuan-weex-demo)，在其基础上使用[weex-eros](https://gitee.com/karynsong/weex-eros-doc/wikis/pages?title=Home)编写完成，在此感谢yanxuan项目作者zwwill的支持。

## 安装cli
首先需要安装脚手架[eros-cli](https://github.com/bmfe/eros-cli)

    $ cnpm install -g eros-cli

初始化模板

    $ eros init
    
向app打内置包(以ios为例)

    $ eros pack --ios

启动服务

    $ eros dev
    
以ios为例，通过xcode安装app到手机上，在app中通过【调试-设置项】，关闭interceptor,否则看到的是内置包中的内容。

那怎么才能看到刚才我们在电脑上写的效果呢？通过charles等软件将请求代理到我们的电脑上，这样在app中看到的才是我们电脑上的项目。

只配代理还不行，要在本地配hosts,在 127.0.0.1 中增加 app.weex-eros.com

好啦，双击app上的调试，刷新页面，看看效果吧~

## 项目结构
服务启动后，我们就可以开始在模板中编写我们的代码了。

在`src/js/pages`文件夹下新建我们的yanxuanDemo文件夹，所有关于此项目的代码，都将放在这里。

结构如下：

    |-- yanxuanDemo         
      |-- common         （公共组件）
      |-- class          （模块-分类）
      |-- home           （模块-首页）
      |-- my             （模块-个人）
        |-- config.js  
        |-- index.scss 
        |-- index.vue  
      |-- shop           （模块-购物车）
      |-- topic          （模块-专题）
      |-- utils          （工具库）
      |-- config.js      （公共配置文件）
      |-- index.vue    

每个模块文件夹下都有类似my文件夹下的`config.js、index.scss、index.vue`等文件。`config.js`主要写配置信息以及接口的调用方法（当然，如果项目比较复杂庞大，你也可以将配置信息和接口分开来写）。

## 配置信息
编写好我们的项目后，需要在整个项目的config文件夹下找到`eros.dev.js`和`eros.native.js`。

每个模块的入口文件，也就是打包的地址，都需要在`eros.dev.js`中配置：

    "exports": [
        // appBoard 
        "js/config/index.js",
        // mediator
        "js/mediator/index.vue",
        // home
        "js/pages/yanxuanDemo/index.vue",
        "js/pages/yanxuanDemo/home/index.vue",
        "js/pages/yanxuanDemo/topic/index.vue",
        "js/pages/yanxuanDemo/class/index.vue",
        "js/pages/yanxuanDemo/shop/index.vue",
        "js/pages/yanxuanDemo/my/index.vue"
    ]
    
在`eros.native.js`中配置项目的落地页地址：

    "page": {
            "homePage": "/pages/yanxuanDemo/index.js"
    }

重新打包（`eros pack`）并启动一下服务（`eros dev`），看看是不是可以看到我们的demo了。

**这里有一个地方需要注意，如果修改了`eros.dev.js`，都需要重新启动服务（`eros dev`）；如果修改了`eros.native.js`，则需要重新打包到app(`eros pack`)，详细描述可以查看[weex-eros使用手册](https://github.com/bmfe/eros-template/wiki/eros)**

## 实现tab效果
目前weex官方没有提供tab组件，我们暂时找到了一种替代方案，可以满足部分tab交互的需求。

这里说一下大体思路。模块分为两部分，tabs和存放tab对应内容的panel。

panel实际上是一个scroller，在scroller上设置属性`paging-enabled="true"`，这是我们weex-eros的属性，用来监听滑动事件。

在scroller中有一个个的div，在div上设置`ref="page_xxx"`,xxx为0，1，2，3,分别对应每一个tab。

在scroller上设置scroll事件，scroll事件中可以获取到滑动的偏移量（[contentOffset.x](https://weex.apache.org/cn/references/components/scroller.html#事件)）。

由于weex默认屏幕的宽度是750，当发现滑动的偏移量为750的整倍数时，我们就认为切换tab了。具体对应第几个tab，就看是750的多少倍。

这时将tabs中对应的选中样式修改，完成滑动内容修改tab的交互。

tabs大家可以自己定义样式，但是在每一个tab上，都需要设置click事件，用来告诉我们是点击的哪一个tab。

点击tab切换panel中对应内容时，可以用    

    dom.scrollToElement(this.$refs[`page_${index}`][0], { animated: false })
    
这样点击tab，panel中的内容就修改了。

这里有一个问题需要注意，必须设置`animated: false`。如果不设置的话，`dom.scrollToElement`默认会有动画效果，会触发scroller上的scroll事件,而scroll中也会影响tab,造成交互错乱。

具体的实现可以参考`src/pages/yanxuanDemo/class/index.vue`，或者封装的组件`src/js/components/topTab`，组件调用在`src/js/pages/news`中，仅供参考。

这个解决方案目前有一个问题，就是你必须知道切换一屏的距离，例如本例中左右切换是750。在不知道一屏的距离时，**便没法计算对应哪一个tab**，这是这个方案目前的缺点。

尤其是实现上下切换时，由于滑动的高度不一定是固定值，很多时候会根据屏幕大小变化，所以还需要大家自己手动计算高度。

## 使用mock调试
为了方便初次使用的同学能尽快看到效果，所以对动态数据进行了本地写死操作。

但是真实的场景是，这些数据都是从后端拿到的。所以我们需要本地mock数据，在接口还不能使用的情况下，不影响我们前端的进度。

在`mock/test`文件夹下，创建yanxuan文件夹，所有关于此项目的mock数据，都写在这里。

为了便于区分，我们可以根据模块再详细分组。例如，将home模块的所有数据，放在home文件夹下。

新增`getYXBanners.js`，数据如下:

    module.exports = [{
        "delay": 500,
        "response": {
            "resCode": 0,
            "msg": null,
            "data": [
                { title: '', src: 'http://yanxuan.nosdn.127.net/630439320dae9f1ce3afef3c39721383.jpg' },
                { title: '', src: 'http://yanxuan.nosdn.127.net/5100f0176e27a167cc2aea08b1bd11d8.jpg' },
                { title: '', src: 'http://doc.zwwill.com/yanxuan/imgs/banner-1.jpg' },
                { title: '', src: 'http://doc.zwwill.com/yanxuan/imgs/banner-2.jpg' },
                { title: '', src: 'http://doc.zwwill.com/yanxuan/imgs/banner-4.jpg' },
                { title: '', src: 'http://doc.zwwill.com/yanxuan/imgs/banner-5.jpg' },
                { title: '', src: 'http://doc.zwwill.com/yanxuan/imgs/banner-6.jpg' }
            ]
        }
    }]

在`src/js/config/apis.js`中，增加内容：

    // 配置请求的别名
    export const apis = {
        // home
        'yanxuan_home_getYXBanners': '/test/yanxuan/home/getYXBanners',
    }

在我们需要获取数据的地方，增加获取数据的方法：

    this.$fetch({
        method: 'GET',
        name: 'yanxuan_home_getYXBanners',
        data: {}
    }).then(resData => {
        this.YXBanners = resData.data
    }, error => {
    
    })

这样，便可以通过别名调用我们的mock地址，当后端接口通了时，在apis.js中将mock地址替换为线上地址即可。


目前主要实现的是首页部分，其他模块只是实现了简单交互，后续会慢慢丰富。


希望大家可以积极交流，帮助我们完善weex-eros和demo!