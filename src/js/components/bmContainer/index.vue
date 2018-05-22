<template>
    <div>
        <div v-if="statusBarShow" class="status-bar" :style="{'height': statusHeight,'background-color': statusBarColor}"></div>
        <slot></slot>
        <div v-if="touchBarShow" class="touch-bar" :style="{'height': touchHeight,'background-color': touchBarColor}"></div>
    </div>
</template>
<script>
export default {
    props: {
        statusBarShow: {
            type: Boolean,
            default: false
        },
        statusBarColor: {
            type: String,
            default: '#07ae9c'
        },
        statusBarHeight: {
            type: String,
            default: ''
        },
        touchBarShow: {
            type: Boolean,
            default: false
        },
        touchBarColor: {
            type: String,
            default: '#eff3f4'
        },
        touchBarHeight: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            statusHeight: Number.parseInt(this.statusBarHeight || weex.config.env.statusBarHeight || 40),
            touchHeight: Number.parseInt(this.touchBarHeight || weex.config.env.touchBarHeight || 0)
        }
    },
    created() {

    },
    methods: {

    }
}
</script>
<style lang="sass" scoped>
@import 'src/js/css/core/variables.scss';
.status-bar {
    width: 750;
    height: 40;
    //background-color: $base-green;
}

.navigate-bar {
    width: 750;
    height: 80;
    //background-color: $base-green;
}

.touch-bar {
    height: 68;
    width: 750;
    //background-color: $bgcolor;
}
</style>