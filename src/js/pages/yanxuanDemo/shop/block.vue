<template>
    <div class="wrapper">
        <text class="tlt">猜你喜欢</text>
        <div class="gb-box">
            <div class="i-gd" v-for="i in goods" @click="jumpWeb(i.url)">
                <div class="gd-bg">
                    <image class="gd-img" resize="cover" :src="i.img"></image>
                </div>
                <text class="gd-info">{{i.info}}</text>
                <text class="gd-tlt">{{i.tlt}}</text>
                <text class="gd-price">¥{{i.price}}</text>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["newGoods", "hotGoods", "head", "hasMore", "goods"],
    methods: {
        jumpWeb(_url) {
            if (!_url) return;
            this.$router.toWebView({
                url: _url,
                title: '',
                navShow: true,
            })
        }
    }
}
</script>

<style lang="sass" src="./block.scss"></style>