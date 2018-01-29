<template>
    <div class="wrapper">
        <text>1234567</text>
    </div>
</template>
<script>
if(process.env.NODE_ENV === 'development') require('Config')
import header from './header';
import block from './block';
import refresher from '../common/refresh';
import { GOODS } from './config'

export default {
    components: {
        'shop-header': header,
        'refresher': refresher,
        'block': block,
    },
    created() {
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

        }

    }
}
</script>
<style lang="sass" src="./index.scss"></style>