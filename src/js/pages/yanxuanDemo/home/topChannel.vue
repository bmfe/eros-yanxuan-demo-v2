<template>
    <div class="wrapper">
        <scroller class="scroller" scroll-direction="horizontal" flex-direction="row" loadmoreoffset="750px" show-scrollbar=false>
            <div class="j-uline" ref="jcLine"></div>
            <text jact="true" class="i-c" v-for="(item,index) in channelList" :class="[ activeIndex == index ? 'c-act' : '']" @click="chooseChannel(index,item)" :ref="'channel_' + index">{{item.name}}</text>
        </scroller>
        <div class="panel" v-if="pullStatus && dataReady" :style="{'height': panelHeight}">
            <text class="allChannel">全部频道</text>
            <div class="box-line" v-for="(item,index) in row">
                <div class="box " v-for="(item,rowIndex) in 4" :class="[ activeIndex == (index*4 + rowIndex) ? 'box-act' : '']" v-if="channelList[index*4 + rowIndex]" @click="chooseChannel(index*4 + rowIndex)">
                    <text class="box-text" :class="[ activeIndex == (index*4 + rowIndex) ? 'c-act' : '']">{{channelList[index*4 + rowIndex].name}}</text>
                </div>
            </div>
        </div>
        <div class="more iconfont" @click="pull">
            <text class="iconfont moreicon" ref="more">&#xe661;</text>
        </div>
    </div>
</template>
<script>
import { CHANNELLIST } from './config'
const dom = weex.requireModule('dom');
const animation = weex.requireModule('animation')
export default {
    props: {
        activeIndex: {
            type: Number,
            default: 0
        }
    },
    watch: {
        activeIndex(newVal, oldVal) {
            let scrollIndex = newVal < 2 ? 0 : newVal - 2
            this.scrollToMenu(scrollIndex)
        },
        pullStatus(newVal) {
            let num = newVal ? 180 : 0
            let height = newVal ? 160 + 86 * (this.row - 1) : 0

            // animation.transition(this.$refs.panel, {
            //     styles: {
            //         height: height + 'px'
            //     },
            //     duration: 200,
            //     timingFunction: 'ease',
            //     delay: 0
            // }, function() {});

            animation.transition(this.$refs.more, {
                styles: {
                    transform: 'rotate(' + num + 'deg)'
                },
                duration: 200,
                timingFunction: 'ease',
                delay: 0
            }, function() {});
        }
    },
    created() {
        this.getChannel()
    },
    data() {
        return {
            channelList: [],
            row: 1,
            pullStatus: false,
            dataReady: false,
            panelHeight: 0
        }
    },
    methods: {
        getChannel() {
            // this.$fetch({
            //     method: 'GET',
            //     name: 'yanxuan_home_getChannel',
            //     data: {}
            // }).then(resData => {
            //     this.channelList = resData.data
            //     this.row = Math.ceil(this.channelList.length / 4)
            //     this.panelHeight = 160 + 86 * (this.row - 1)
            //     this.dataReady = true
            // }, error => {

            // })

            this.channelList = CHANNELLIST
            this.row = Math.ceil(this.channelList.length / 4)
            this.panelHeight = 160 + 86 * (this.row - 1)
            this.dataReady = true

        },
        chooseChannel(index, channel) {
            this.pullStatus = false
            this.activeIndex = index
            let item = channel ? channel : this.channelList[index]
            animation.transition(this.$refs.jcLine, {
                styles: {
                    width: item.width + "px",
                    transform: 'translateX(' + item.left + 'px)',
                },
                duration: 200,
                timingFunction: 'ease',
                delay: 0
            }, function() {});
            this.$emit('change', index)
        },
        scrollToMenu(index) {
            dom.scrollToElement(this.$refs[`channel_${index}`][0])
        },
        pull() {
            this.pullStatus = !this.pullStatus
        }
    }
}
</script>
<style lang="sass" src="./topChannel.scss"></style>