<template>
    <div class="wrapper">
        <!-- <div class="status-bar"></div> -->
        <home-header></home-header>
        <scroller class="main-list" offset-accuracy="300px">
            <refresher @loadingDown="loadingDown"></refresher>
            <div class="cell-button">
                <yx-slider :imageList="YXBanners"></yx-slider>
                <div class="slogan">
                    <text class="i-slg iconfont">&#xe63a; 网易自营品牌</text>
                    <text class="i-slg iconfont">&#xe63a; 30天无忧退货</text>
                    <text class="i-slg iconfont">&#xe63a; 48小时快速退款</text>
                </div>
            </div>
            <div class="cell-button">
                <block-1 :title="block1.title" :items="block1.items" :url="block1.url"></block-1>
            </div>
            <div class="cell-button">
                <block-2 hasMore=true newGoods=true :head="head1" :goods="goods1"></block-2>
            </div>
            <div class="cell-button">
                <block-2 hasMore=true hotGoods=true :head="head2" :goods="goods2"></block-2>
            </div>
            <div class="cell-button">
                <block-3 :goods="goods3"></block-3>
            </div>
            <loading class="loading" @loading="onloading" :display="showLoading">
                <text class="indicator">加载中...</text>
            </loading>
        </scroller>
        <!-- <bmmask animation="center" position="center" class="mask" :duration="300" ref="channel" disableMaskEvent="true"> -->
        <top-channel @change="onchange" ref="topChannel" :activeIndex="activeIndex"></top-channel>
        <!-- </bmmask> -->
    </div>
</template>
<script>
if (process.env.NODE_ENV === 'development') require('Config')
import header from './header';
import refresher from '../common/refresh';
import topChannel from './topChannel';
import YXSlider from './YXSlider';
import block1 from './block1';
import block2 from './block2';
import block3 from './block3';
import { YXBANNERS, BLOCK1, GOODS1, GOODS2, GOODS3 } from './config'

const SCROLL_FULL_WIDTH = 750
const dom = weex.requireModule('dom');

export default {
    components: {
        'home-header': header,
        'refresher': refresher,
        'top-channel': topChannel,
        'yx-slider': YXSlider,
        'block-1': block1,
        'block-2': block2,
        'block-3': block3
    },
    created() {
        this.init()
    },
    data() {
        return {
            YXBanners: [],
            block1: {
                title: '',
                url: '',
                items: []
            },
            head1: {
                tlt: '周一周四 · 新品发布',
                tltBg: 'http://doc.zwwill.com/yanxuan/imgs/bg-new.png',
                url: 'http://m.you.163.com/item/newItem'
            },
            head2: {
                tlt: '人气推荐 · 好物精选',
                tltBg: 'http://doc.zwwill.com/yanxuan/imgs/bg-hot.png',
                url: 'http://m.you.163.com/item/recommend'
            },
            goods1: [],
            goods2: [],
            goods3: [],
            showLoading: 'hide',
            activeIndex: 0
        }
    },
    methods: {
        jumpWeb(_url) {
            this.$router.toWebView({
                url: _url,
                title: ''
            })
        },
        onloading() {
            this.$notice.loading.show()
            this.showLoading = 'show';
            setTimeout(() => {
                this.$notice.loading.hide()
                this.goods3.push(...this.goods1);
                this.showLoading = 'hide'
            }, 600)
        },
        loadingDown() {
            this.goods3 = [];
            this.goods3.push(...this.goods2);
            this.goods3.push(...this.goods1);
        },
        init() {
            this.getYXBanners()
            this.getBlock1()
            this.getGoods1()
            this.getGoods2()
            this.getGoods3()
        },
        getYXBanners() {
            // this.$fetch({
            //     method: 'GET',
            //     name: 'yanxuan_home_getYXBanners',
            //     data: {}
            // }).then(resData => {
            //     this.YXBanners = resData.data
            // }, error => {

            // })

            this.YXBanners = YXBANNERS
        },
        getBlock1() {
            // this.$fetch({
            //     method: 'GET',
            //     name: 'yanxuan_home_getBlock1',
            //     data: {}
            // }).then(resData => {
            //     this.block1.title = resData.data.title
            //     this.block1.url = resData.data.url
            //     this.block1.items = resData.data.items
            // }, error => {

            // })

            this.block1.title = BLOCK1.title
            this.block1.url = BLOCK1.url
            this.block1.items = BLOCK1.items
        },
        getGoods1() {
            // this.$fetch({
            //     method: 'GET',
            //     name: 'yanxuan_home_getGoods1',
            //     data: {}
            // }).then(resData => {
            //     this.goods1 = resData.data
            // }, error => {

            // })

            this.goods1 = GOODS1
        },
        getGoods2() {
            // this.$fetch({
            //     method: 'GET',
            //     name: 'yanxuan_home_getGoods2',
            //     data: {}
            // }).then(resData => {
            //     this.goods2 = resData.data
            // }, error => {

            // })

            this.goods2 = GOODS2
        },
        getGoods3() {
            // this.$fetch({
            //     method: 'GET',
            //     name: 'yanxuan_home_getGoods3',
            //     data: {}
            // }).then(resData => {
            //     this.goods3 = resData.data
            // }, error => {

            // })

            this.goods3 = GOODS3
        },
        onchange(index) {
            console.log(index);
            // dom.scrollToElement(this.$refs[`page_${index}`][0], { animated: false })
        },
    }
}

</script>
<style lang="sass" src="./index.scss"></style>
