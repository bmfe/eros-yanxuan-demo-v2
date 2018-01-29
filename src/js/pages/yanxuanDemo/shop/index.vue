<template>
    <div class="wrapper">
        <shop-header title="购物车" :rightBtn="rightBtn"></shop-header>
        <div class="slogan" @click="jump2($event,'true')">
            <text class="i-slg iconfont">&#xe63a; 30天无忧退换货</text>
            <text class="i-slg iconfont">&#xe63a; 48小时快速退款</text>
            <text class="i-slg iconfont">&#xe63a; 满88元免邮费</text>
        </div>
        <scroller class="main-list" offset-accuracy="300px">
            <refresher></refresher>
            <div class="shop-cart">
                <div v-if="!goodList || goodList.length<=0" class="cart-empty">
                    <image class="img-empty" resize="contain" src="http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/noCart-a8fe3f12e5.png"></image>
                    <text class="txt-empty">去添加点什么吧</text>
                </div>
            </div>
            <block :goods="goods"></block>
        </scroller>
    </div>
</template>
<script>
if(process.env.NODE_ENV === 'development') require('Config')
import header from './header';
import block from './block';
import refresher from '../common/refresh';
import { GOODS } from './config'

export default {
    bmRouter: {
        viewWillAppear() {
            debugger
            console.log('shop-viewWillAppear');
        },
        viewWillBackAppear(params) {
            debugger
            console.log('shop-viewWillBackAppear');
        }
    },
    components: {
        'shop-header': header,
        'refresher': refresher,
        'block': block,
    },
    created() {
        debugger
        console.log('shop-created');
        this.getGoods()
    },
    data() {
        return {
            rightBtn: {
                name: "编辑"
            },
            goods: [],
            goodList: []
        }
    },
    methods: {
        getGoods() {
            // this.$fetch({
            //     method: 'GET',
            //     name: 'yanxuan_shop_getGoods',
            //     data: {}
            // }).then(resData => {
            //     this.goods = resData.data
            // }, error => {

            // })

            this.goods = GOODS
        },
        jump2() {
            this.$router.open({
                name: 'a'
            })
        }

    }
}
</script>
<style lang="sass" src="./index.scss"></style>