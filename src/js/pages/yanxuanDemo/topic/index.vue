<template>
    <div class="wrapper">
        <topic-header title="专题"></topic-header>
        <scroller class="main-list" offset-accuracy="300px">
            <refresher @loadingDown="loadingDown"></refresher>
            <div class="cell-button" @click="jumpWeb('http://m.you.163.com/topic/v1/look/list')">
                <block-1 :topics="topics"></block-1>
            </div>
            <div v-for="ar in articles" class="cell-button">
                <block-2 :article="ar"></block-2>
            </div>
        </scroller>
    </div>
</template>
<script>
if(process.env.NODE_ENV === 'development') require('Config')
import refresher from '../common/refresh';
import header from './header';
import block1 from './block1';
import block2 from './block2';
import { TOPICS, ARTICLES } from './config'

export default {
    components: {
        'refresher': refresher,
        'topic-header': header,
        'block-1': block1,
        'block-2': block2,
    },
    created() {
        this.init()
    },
    data() {
        return {
            topics: [],
            articles: []
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
        loadingDown() {

        },
        init() {
            this.getTopics()
            this.getArticles()
        },
        getTopics() {
            // this.$fetch({
            //        method: 'GET',
            //        name: 'yanxuan_topic_getTopics',
            //        data: {}
            //    }).then(resData => {
            //        this.topics = resData.data
            //    }, error => {

            //    })

            this.topics = TOPICS
        },
        getArticles() {
            // this.$fetch({
            //        method: 'GET',
            //        name: 'yanxuan_topic_getArticles',
            //        data: {}
            //    }).then(resData => {
            //        this.articles = resData.data
            //    }, error => {

            //    })

            this.articles = ARTICLES
        }
    }
}
</script>
<style scoped>
.iconfont {
    font-family: iconfont;
}

.wrapper {
    background-color: #f4f4f4;
}

.main-list {
    margin-top: 113px;
    margin-bottom: 90px;
}

.cell-button {
    padding-bottom: 18px;
}
</style>