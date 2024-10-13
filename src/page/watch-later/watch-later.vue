<template>

    <div :class="{ 'dark-mode': isDarkMode }">
        <navbar></navbar>

        <div class="head">
            <button class="darkmode" @click="toggleDarkMode">
                {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
            </button>
            <span class="watchlater">WATCH LATER</span>
        </div>

        <div class="video-box">
            <div v-for="video in watchlaterVideos" :key="video.title" class="video">
                <img :src="video.imageURL" @click="goToDetail(video.id)" alt="Video Thumbnail">
                <p class="title">{{ video.title }}</p>
                <p class="description">{{ video.description }}</p>
            </div>
        </div>

    </div>

</template>

<script>
import { collection, getDocs } from 'firebase/firestore';
import db from '../../firebase';
import navbar from '@/components/navbar.vue';


export default {
    components: {
        navbar
    },
    data() {
        return {
            isSidebarOpen: false,
            isDarkMode: false,
            watchlaterVideos: []
        };
    },
    async created() {
        try {
            const watchLaterCollection = collection(db, 'watchLater');
            const watchLaterSnapshot = await getDocs(watchLaterCollection);
            if (watchLaterSnapshot.empty) {
                console.log("Watch Later'da video bulunamadı");
                return;
            }
            this.watchlaterVideos = watchLaterSnapshot.docs.map(doc => doc.data());
            console.log("Watch Later videoları getirildi:", this.watchlaterVideos);
        } catch (error) {
            console.error("Watch Later videolarını getirirken hata oluştu:", error);
        }
    },
    methods: {
        toggleDarkMode() {
            this.isDarkMode = !this.isDarkMode;
        },
        toggleSidebar() {
            this.isSidebarOpen = !this.isSidebarOpen;
        },
        goToDetail(id) {
            this.$router.push(`/video/${id}`);
        },
    }
};
</script>

<style src="./watch-later.style.css"></style>
