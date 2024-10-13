<template>

    <div class="container" :class="{ 'dark-mode': isDarkMode }">
        <navbar></navbar>

        <div class="head">
            <button class="darkmode" @click="toggleDarkMode">
                {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
            </button>
            <span class="playlist">PLAYLIST</span>
        </div>
        <div class="video-box">
            <div v-for="video in playlistVideos" :key="video.title" class="video">
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
            playlistVideos: []
        };
    },
    async created() {
        try {
            const playlistCollection = collection(db, 'playlist');
            const playlistSnapshot = await getDocs(playlistCollection);
            if (playlistSnapshot.empty) {
                console.log("Playlistte video bulunamadı");
                return;
            }
            this.playlistVideos = playlistSnapshot.docs.map(doc => doc.data());
            console.log("Playlist videoları getirildi:", this.playlistVideos);
        } catch (error) {
            console.error("Playlist videolarını getirirken hata oluştu:", error);
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

<style src="./playlist.style.css"></style>
