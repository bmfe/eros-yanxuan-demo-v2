<template>
    <div class="wrapper">
        <text class="search iconfont">&#xe65c; 搜索商品，共8888款好物</text>
    </div>
</template>
<script>
export default {

}
</script>
<style scoped>
.iconfont {
    font-family: iconfont;
}

.wrapper {
    width: 750;
    height: 70px;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-around;
    background-color: #fafafa;
    opacity: .99;
    border-bottom-width: 1px;
    border-bottom-color: #d9d9d9;
}

.search {
    flex: 1;
    height: 60px;
    font-size: 26px;
    padding-top: 13px;
    background-color: #ededed;
    border-radius: 8px;
    margin-right: 26px;
    margin-left: 26px;
    text-align: center;
    color: #666;
}
</style>