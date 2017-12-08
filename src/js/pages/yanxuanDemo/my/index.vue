<template>
    <div class="wrapper">
        <div class="header" @click="jumpWeb('http://m.you.163.com/ucenter')">
            <image class="header-bg" resize="cover" src="http://yanxuan.nosdn.127.net/6ae93353e95b3450a2710bb43f925a63.jpg"></image>
            <image class="i-photo" resize="cover" src="http://yanxuan.nosdn.127.net/885e3901d0a3501362530435d76bebb3.jpg"></image>
            <text class="i-name">zwwill7</text>
            <div class="b-tlt">
                <image class="i-tag tag-e" resize="contain" src="http://yanxuan.nosdn.127.net/3dc6e876620bb84a5dac3deb6ecd4916.png"></image>
                <text class="i-tag tag-v8 iconfont">&#xe6cc;</text>
                <text class="txt-tag">品质生活家</text>
            </div>
            <text class="b-qrcode iconfont">&#xe60e;</text>
        </div>
        <div class="s-box cell-button">
            <div class="box-tlt border-bottom">
                <text class="box-txt">我的订单</text>
                <text class="i-box-in iconfont">&#xe600;</text>
            </div>
            <div class="box-line">
                <div class="i-box-l">
                    <text class="i-box-icon iconfont">&#xe673;</text>
                    <text class="i-box-tlt">待付款</text>
                </div>
                <div class="i-box-l">
                    <text class="i-box-icon iconfont">&#xe675;</text>
                    <text class="i-box-tlt">待发货</text>
                </div>
                <div class="i-box-l">
                    <text class="i-box-icon iconfont">&#xe671;</text>
                    <text class="i-box-tlt">已发货</text>
                </div>
                <div class="i-box-l">
                    <text class="i-box-icon iconfont">&#xe672;</text>
                    <text class="i-box-tlt">待评价</text>
                </div>
                <div class="i-box-l">
                    <text class="i-box-icon iconfont">&#xe6ac;</text>
                    <text class="i-box-tlt">退换/售后</text>
                </div>
            </div>
        </div>
        <div class="s-box">
            <div class="box-tlt border-bottom">
                <text class="box-txt">我的服务</text>
            </div>
            <div class="box-line line-serve" :class="[index < (serviceLength - 1) ? 'border-bottom' : '']" v-for="(item,index) in serviceLength">
                <div class="i-box-l">
                    <text class="i-box-icon iconfont" :class="['i-c-'+services[index*4 + 0].color]">{{services[index*4 + 0].icon | myFilter}}</text>
                    <text class="i-box-tlt">{{services[index*4 + 0].name}}</text>
                </div>
                <div class="i-box-l">
                    <text class="i-box-icon iconfont" :class="['i-c-'+services[index*4 + 1].color]">{{services[index*4 + 1].icon | myFilter}}</text>
                    <text class="i-box-tlt">{{services[index*4 + 1].name}}</text>
                </div>
                <div class="i-box-l">
                    <text class="i-box-icon iconfont" :class="['i-c-'+services[index*4 + 2].color]">{{services[index*4 + 2].icon | myFilter}}</text>
                    <text class="i-box-tlt">{{services[index*4 + 2].name}}</text>
                </div>
                <div class="i-box-l">
                    <text class="i-box-icon iconfont" :class="['i-c-'+services[index*4 + 3].color]">{{services[index*4 + 3].icon | myFilter}}</text>
                    <text class="i-box-tlt">{{services[index*4 + 3].name}}</text>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
if(process.env.NODE_ENV === 'development') require('Config')
import he from '../utils/he';
import { SERVICES } from './config'

Vue.filter('myFilter', function(value) {
    return he.decode(value);
})

export default {
    mounted() {
        this.getService()
    },
    data() {
        return {
            services: [],
            serviceLength: 0
        }
    },
    methods: {
        jumpWeb(_url) {
            this.$router.toWebView({
                url: _url,
                title: '',
                navShow: true,
            })
        },
        getService() {
        	// this.$fetch({
         //        method: 'GET',
         //        name: 'yanxuan_my_getService',
         //        data: {}
         //    }).then(resData => {
         //        this.services = resData.data
         //        this.getLength()
         //    }, error => {

         //    })

         this.services = SERVICES
         this.getLength()
        },
        getLength() {
            this.serviceLength = Math.ceil(this.services.length / 4)
        }
    }
}
</script>
<style lang="sass" src="./index.scss"></style>