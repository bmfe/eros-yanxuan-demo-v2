// appBoard，mediator 不建议进行修改 如果修改了 也请对应修改
module.exports = {
    "exports": [
        // appBoard 
        "js/config/index.js",
        // mediator
        "js/mediator/index.vue",
        // home
        // "js/pages/news/index.vue",
        "js/pages/yanxuanDemo/index.vue",
        "js/pages/yanxuanDemo/home/index.vue",
        "js/pages/yanxuanDemo/topic/index.vue",
        "js/pages/yanxuanDemo/class/index.vue",
        "js/pages/yanxuanDemo/shop/index.vue",
        "js/pages/yanxuanDemo/my/index.vue"
    ],
    "alias": {
        "Eros": "js/components/__eros__",
        "Components": "js/components",
        "Common": "js/common",
        "Config": "js/config",
        "Widget": "js/widget",
        "Pages": "js/pages",
        "Utils": "js/utils"
    },
    "diff": {
        "pwd": "/Users/yangmingzhe/Work/opensource/eros-diff-folder",
        "proxy": "https://app.weex-eros.com/source"
    },
    "server": {
        "path": "./",
        "port": 80
    },
    "proxy": [{
        "route": "/test",
        "target": "127.0.0.1:52077/test"
    }],
    "mockServer": {
        "port": 52077,
        "mockDir": "./dist/mock"
    }
}