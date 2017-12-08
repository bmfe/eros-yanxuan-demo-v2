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
<style scoped>
.iconfont {
    font-family: iconfont;
}

.wrapper {
    background-color: #fff;
    padding-bottom: 10px;
    padding-top: 26px;
    width: 750px;
}

.tlt {
    text-align: center;
    color: #333;
    width: 750px;
    padding: 10px;
    font-size: 30px;
}

.gb-box {
    padding: 16px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
}

.i-gd {
    width: 350px;
    height: 510px;
    margin-bottom: 20px;
}

.gd-bg {
    background-color: #f4f4f4;
}

.gd-img {
    width: 350px;
    height: 350px;
}

.gd-tlt {
    font-size: 28px;
    color: #333;
    width: 350px;
    margin-top: 15px;
    overflow: hidden;
    lines: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.gd-info {
    display: block;
    font-size: 28px;
    width: 350px;
    height: 65px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 15px;
    padding-bottom: 15px;
    color: #9F8A60;
    background-color: #F1ECE2;
    overflow: hidden;
    lines: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.gd-price {
    font-size: 28px;
    width: 350px;
    margin-top: 10px;
    color: #b4282d;
    overflow: hidden;
    lines: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>