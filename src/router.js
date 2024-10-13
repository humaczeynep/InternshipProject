import { createRouter, createWebHistory } from 'vue-router'

import showVideos from './page/show-videos/show-videos.vue';
import historyPage from './page/history/history-page.vue';
import playlist from './page/playlist/playlist.vue';
import watchLater from './page/watch-later/watch-later.vue';
import VideoDetail from './components/video-detail.vue';



const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: showVideos },
        { path: '/history', component: historyPage },
        { path: '/playlist', component: playlist },
        { path: '/watchlater', component: watchLater },
        { path:  '/video/:id', name : VideoDetail, props: true, component: VideoDetail },

        
    ]
});

export default router