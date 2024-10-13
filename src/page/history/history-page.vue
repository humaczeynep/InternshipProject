<template>

    <div :class="{ 'dark-mode': isDarkMode }">
        <navbar></navbar>
        <div class="head">
            <button class="darkmode" @click="toggleDarkMode">
                {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
            </button>
            <span class="history">HISTORY</span>
        </div>

        <div class="video-box">
            <div v-for="video in historyVideos" :key="video.title" class="video">
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
            historyVideos: []
        };
    },

    async created() {
        try {
            const historyCollection = collection(db, 'history');
            const historySnapshot = await getDocs(historyCollection);
            if (historySnapshot.empty) {
                console.log("Geçmişte video bulunamadı");
                return;
            }
            this.historyVideos = historySnapshot.docs.map(doc => doc.data());
            console.log("Geçmiş videoları getirildi:", this.historyVideos);
        } catch (error) {
            console.error("Geçmiş videolarını getirirken hata oluştu:", error);
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

<style src="./history.style.css"></style>
