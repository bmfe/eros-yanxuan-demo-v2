<template>
    <div class="app-wrapper">
        
        <embed v-for="(item,index) in items" :src="item.src" type="weex" class="content" :style="{ visibility: item.visibility }"></embed>
        <tab-bar @tabTo="onTabTo" :items="items"></tab-bar>
        <div class="touch-bar"></div>
    </div>
</template>
<script>
if (process.env.NODE_ENV === 'development') require('Config')
import util from './utils/util';
import tabBar from './common/tabBar';
import { tabConfig } from './config'
export default {
    bmRouter: {
        viewWillAppear() {
            debugger
            console.log('home-index-viewWillAppear');
        },
        viewWillBackAppear(params) {
            debugger
            console.log('home-index-viewWillBackAppear');
        }
    },
    components: {
        'tab-bar': tabBar,
    },
    created() {
        debugger
        util.initIconFont()
    },
    data() {
        return {
            items: tabConfig,
        }
    },
    methods: {
        onTabTo(_result) {
            let _key = _result.data.key || '';
            this.items.forEach((val) => {
                if (val.key === _key) {
                    val.visibility = 'visible'
                    return
                }
                val.visibility = 'hidden'
            })
        },
    }
}

</script>
<style>
body {
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
    color: #333;
}

</style>
<style lang="sass" scoped>
@import 'src/js/css/core/base.scss';
.iconfont {
    font-family: iconfont;
}

.content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin-top: 0;
    /*margin-bottom: 100;*/
}

.app-wrapper {
    background-color: #f4f4f4;
}

.r-box {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.iconfont {
    font-family: iconfont;
}

.wrapper {}

.main-list {
    position: fixed;
    top: 168px;
    bottom: 90px;
    left: 0;
    right: 0;
    /*margin-top: 167px;*/
    /*margin-bottom: 90px;*/
}

.cell-button {
    padding-bottom: 18px;
}

.slogan {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    background-color: #fff;
}

.i-slg {
    height: 66px;
    font-size: 26px;
    padding-top: 16px;
    flex: 1;
    text-align: center;
    color: #b4282d;
}

</style>
