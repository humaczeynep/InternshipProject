<template>
    <navbar></navbar>
    <div class="detay-video" v-if="video">
        <img :src="video.imageURL" alt="Video Image" />
        <h1>{{ video.title }}</h1>
        <p>{{ video.description }}</p>
    </div>
    <div v-else>
        <p>Loading...</p>
    </div>
</template>

<script>
import { doc, getDoc } from 'firebase/firestore';
import db from '../firebase';
import navbar from './navbar.vue';

export default {
    components:{
        navbar
    },
    props: ['id'],
    data() {
        return {
            video: null,
        };
    },
    async created() {
        const history = JSON.parse(localStorage.getItem('history')) || [];

        const filteredHistory = history.filter(video => video !== null);

        const matchedVideo = filteredHistory.find(video => video.id === this.id);

        if (matchedVideo) {
            this.video = matchedVideo;
        } else {
            try {
                const videoRef = doc(db, 'videos', this.id);
                const videoSnap = await getDoc(videoRef);
                if (videoSnap.exists()) {
                    this.video = videoSnap.data();
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error getting document:", error);
            }
        }
    }
};
</script>

<style scoped>
.detay-video {
    width: 1000px;
    height: 500px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; 
    text-align: center; 
    margin-top: 100px;
}

h1 {
    font-size: 24px;
    margin-bottom: 20px;
}

img {
    max-width: 300px;
    height: auto;
    margin-bottom: 20px;
}

p {
    font-size: 18px;
    line-height: 1.5;
}
</style>

