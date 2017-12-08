import isFunction from 'lodash/isFunction'

let modal = weex.requireModule('bmModal')
let tools = weex.requireModule('bmTool')

// 接口超时设置
export const TIMEOUT = 30000

// 配置请求的别名
export const apis = {
    // home
    'yanxuan_home_getYXBanners': '/test/yanxuan/home/getYXBanners',
    'yanxuan_home_getBlock1': '/test/yanxuan/home/getBlock1',
    'yanxuan_home_getGoods1': '/test/yanxuan/home/getGoods1',
    'yanxuan_home_getGoods2': '/test/yanxuan/home/getGoods2',
    'yanxuan_home_getGoods3': '/test/yanxuan/home/getGoods3',
    'yanxuan_home_getChannel': '/test/yanxuan/home/getChannel',
    // topic
    'yanxuan_topic_getTopics': '/test/yanxuan/topic/getTopics',
    'yanxuan_topic_getArticles': '/test/yanxuan/topic/getArticles',
    // class
    'yanxuan_class_getClasses': '/test/yanxuan/class/getClasses',
    'yanxuan_class_getSubclasses': '/test/yanxuan/class/getSubclasses',
    // shop
    'yanxuan_shop_getGoods': '/test/yanxuan/shop/getGoods',
    // my
    'yanxuan_my_getService': '/test/yanxuan/my/getService',
}


/**
 * 请求返回统一拦截器
 * options 你请求传入的所有参数和配置
 * resData 服务器端返回的所有数据
 * resolve 请求成功请resolve你得结果，这样请求的.then中的成功回调就能拿到你resolve的数据
 * reject 请求成功请resolve你得结果，这样请求的.then中的失败回调就能拿到你reject的数据
 */

// 这里我们默认的后端返回格式是
// {
//     resCode: 0,
//     msg: '这是后端传的消息',
//     data: {
//         成功数据
//     }
// }

// 假设 resCode 为 0 为业务操作成功，非 0 为业务操作失败，我们需要写如下逻辑
export const responseHandler = (options, resData, resolve, reject) => {
    if (resData && resData.resCode == 0) {
        // 操作成功 resolve 成功数据
        resolve(resData)
    } else {
        // 弹窗统一消失，防止弹错误提示的时候还有别的弹窗
        modal.hideLoading()
        let { resCode } = resData
        if (resCode == 101) {
            // 特殊code的不同处理，根据业务自行编写
            return
        }
        if (!options.noShowDefaultError) {
            // 统一弹窗处理
            modal.alert({
                message: resData.msg,
                okTitle: '确定'
            })
        }
        // 如果需要特殊处理， 请求时候传入 noShowDefaultError :true ,这个请求就不会走弹窗的默认逻辑
        reject(resData)
    }
}