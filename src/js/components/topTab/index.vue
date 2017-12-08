<template>
    <div>
        <tab :activeIndex="activeIndex" @change="onchange" :tabTitle="tabTitle"></tab>
        <scroller append="tree" class="scroller" paging-enabled="true" scroll-direction="horizontal" @scroll="onscroll" offset-accuracy="0">
            <div class="page" :ref="'page_'+index" :key="index" v-for="(item,index) in tabTitle">
                <div class="item-container" :style="{ height: (tabPageHeight - tabStyles.height) + 'px' }">
                    <slot :name="'page_'+index"></slot>
                </div>
            </div>
        </scroller>
    </div>
</template>
<script>
import 'Config'
import Utils from 'Eros/weex-ui/packages/utils'
import Tab from './tab'
import { tabStyles } from './config'

const SCROLL_FULL_WIDTH = 750
const dom = weex.requireModule('dom')

export default {
    props: {
        tabTitle: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            tabStyles,
            activeIndex: 0,
            tabPageHeight: 1000,
            isClickChange: false
        }
    },
    created() {
        this.tabPageHeight = Utils.env.getPageHeight();
    },
    components: { Tab },
    methods: {
        onchange(index) {
            dom.scrollToElement(this.$refs[`page_${index}`][0], { animated: false })
        },
        onscroll(e) {
            let formatOffset = Math.abs(e.contentOffset.x)
            if (formatOffset % SCROLL_FULL_WIDTH === 0) {
                this.activeIndex = formatOffset / SCROLL_FULL_WIDTH
            }
        }
    }
}
</script>
<style lang="sass" src="./index.scss"></style>