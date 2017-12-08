<template>
    <div class="wrapper">
        <class-header></class-header>
        <div class="class-list">
            <scroller show-scrollbar="false">
                <div class="j-uline" ref="jcLine"></div>
                <text class="class-txt" v-for="(i,index) in classes" :class="[actIndex === index ? 'c-act' : '']" @click="chooseClass(index)" :ref="'class_' + index">{{i}}</text>
            </scroller>
        </div>
        <scroller class="main-list" append="tree" paging-enabled="true" @scroll="onscroll" offset-accuracy="0" show-scrollbar="false" ref="scroll" id="scroll">
            <div style="min-height: 1131px;" v-for="(item,index) in classes.length" @appear="appear(index)">
                <image class="ad-img" resize="cover" src="http://yanxuan.nosdn.127.net/3ebd7addcc0d101d116052a57cec2f16.png"></image>
                <text class="sub-tlt"> --- 推荐区分类 --- </text>
                <div class="sub-box">
                    <div class="sub-i" v-for="i in subclasses">
                        <image class="i-img" resize="contain" :src="i.img"></image>
                        <text class="i-name">{{i.name}}</text>
                    </div>
                </div>
            </div>
        </scroller>
    </div>
</template>
<script>
if(process.env.NODE_ENV === 'development') require('Config')
import refresher from '../common/refresh';
import header from './header';
import { CLASSES, SUBCLASSES } from './config'
const dom = weex.requireModule('dom');
const animation = weex.requireModule('animation')

export default {
    components: {
        'refresher': refresher,
        'class-header': header,
    },
    created() {
        this.init()
    },
    mounted() {
        this.$nextTick(() => {
            dom.getComponentRect(this.$refs.scroll, (data) => {
                this.scrollHeight = data.size.height
            })
        })
    },
    data() {
        return {
            classes: [],
            subclasses: [],
            actIndex: 0,
            scrollHeight: 0
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
        init() {

            // console.log('deviceHeight:' + this.$getConfig().env.deviceHeight);
            this.getClasses()
            this.getSubclasses()
        },
        getClasses() {
            // this.$fetch({
            //     method: 'GET',
            //     name: 'yanxuan_class_getClasses',
            //     data: {}
            // }).then(resData => {
            //     this.classes = resData.data
            // }, error => {

            // })

            this.classes = CLASSES
        },
        getSubclasses() {
            // this.$fetch({
            //     method: 'GET',
            //     name: 'yanxuan_class_getSubclasses',
            //     data: {}
            // }).then(resData => {
            //     this.subclasses = resData.data
            // }, error => {

            // })

            this.subclasses = SUBCLASSES
        },
        onscroll(e) {
            let formatOffset = Math.abs(e.contentOffset.y)
            // console.log(formatOffset);
            // console.log(this.scrollHeight);
            // if (formatOffset % this.scrollHeight === 0) {
            //     debugger
            //     this.activeIndex = formatOffset / this.scrollHeight
            // }
            // this.actIndex = parseInt(formatOffset / this.scrollHeight)

        },
        chooseClass(index) {
            this.actIndex = index
            animation.transition(this.$refs.jcLine, {
                styles: {
                    transform: 'translateY(' + (92 * index) + 'px)',
                },
                duration: 200,
                timingFunction: 'ease',
                delay: 0
            }, function() {});
        },
        appear(index) {
            console.log(index);
            this.chooseClass(index)
            
        }
    }
}
</script>
<style lang="sass" src="./index.scss"></style>