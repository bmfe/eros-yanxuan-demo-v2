<template>
    <topTab :tabTitle="menu">
        <list @loadmore="loadmore(index)" v-for="(item,index) in menu" style="width: 750px" :slot="'page_'+index">
            <cell class="border-cell"></cell>
            <cell class="wrap-box" v-for="(arr,arrIndex) in itemArr[index]" :key="arrIndex">
                <image style="width: 150;height: 150;" :src="'https://lev-inf.benmu-health.com/resource/image/'+imgUrl[arrIndex%4]+'.jpg'">
                </image>
                <div>
                    <text class="title">{{'这是标题'+(index+1)+'-'+(arrIndex+1)}}</text>
                    <text class="desc">{{'这是tab'+(index+1)+'的第'+(arrIndex+1)+'条内容'}}</text>
                </div>
            </cell>
            <cell>
                <text class="bottom-tip" v-if="!isLoadmore">下拉加载更多</text>
                <text class="bottom-tip" v-if="isLoadmore">加载中...</text>
            </cell>
        </list>
    </topTab>
</template>
<script>
if(process.env.NODE_ENV === 'development') require('Config')
import { WxcTabPage } from 'Eros/weex-ui'
import { tabTitles, imgUrl } from './config'
import topTab from 'Components/topTab'

const SCROLL_FULL_WIDTH = 750
const dom = weex.requireModule('dom')

export default {
    bmRouter: {
        viewWillAppear() {
            this.initTitle()
        },
        viewWillBackAppear() {
            this.initTitle()
        }
    },
    components: {
        WxcTabPage,
        topTab
    },
    created() {
        // console.log('#######', weex.config.eros)

        // 初始化mock数据
        for (let i = 0; i < this.menu.length; i++) {
            this.itemArr.push([1, 2, 3, 4, 5])
        }
    },
    data() {
        return {
            tabTitles,
            imgUrl,
            itemArr: [],
            isLoadmore: false,
            menu: [{
                "name": "111"
            }, {
                "name": "222",
            }, {
                "name": "333"
            }, {
                "name": "444"
            }, {
                "name": "555"
            }, {
                "name": "666"
            }, {
                "name": "777"
            }, {
                "name": "888"
            }]
        }
    },
    methods: {
        initTitle() {
            this.$navigator.setNavigationInfo({
                title: '新闻直播间',
                navShow: true, // 是否显示导航栏
                statusBarStyle: 'Default' // 状态栏文字颜色：Defautl 黑色， LightContent 白色
            }, () => {
                
            })

            // this.$navigator.setCenterItem({
            //     text: '新闻直播间',
            //     textColor: 'black', // 文字颜色 (默认为白色)
            //     fontSize: '36', // 字号（默认32px）
            //     fontWeight: 'bold', // 是否加粗（默认不加粗）
            // }, () => {
            //     // 点击回调
            //     console.log("您点击了导航条中间区域。")
            // })
        },
        loadmore(index) {
            this.isLoadmore = true
            this.$notice.loading.show()
            setTimeout(() => {
                this.itemArr[index] = this.itemArr[index].concat([1, 2, 3, 4, 5])
                this.$notice.loading.hide()
                this.isLoadmore = false
            }, 1000)
        }
    }
}
</script>
<style scoped>
.border-cell {
    background-color: #f2f3f4;
    width: 750px;
    height: 24px;
    align-items: center;
    justify-content: center;
    border-bottom-width: 1px;
    border-style: solid;
    border-color: #e0e0e0;
}

.wrap-box {
    margin-bottom: 20;
    padding-top: 40;
    padding-right: 36;
    padding-bottom: 40;
    padding-left: 40;
    box-shadow: 0 5 10 #ebf0f5;
    flex-direction: row;
    background-color: #fff;
    border-bottom-width: 1;
    border-bottom-color: #bbb;
}

.title {
    font-size: 40;
    font-weight: 600;
    margin-left: 20;
}

.desc {
    margin-left: 20;
    margin-top: 10;
    text-overflow: ellipsis;
}

.bottom-tip {
    text-align: center;
    margin-top: 20;
    margin-bottom: 40;
}
</style>