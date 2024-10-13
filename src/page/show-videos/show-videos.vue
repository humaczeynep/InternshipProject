<template>
    <div :class="{ 'dark-mode': isDarkMode }">
        <div class="content">
            <nav class="header">
                <span class="material-symbols-outlined menu" @click="toggleSidebar">menu</span>
                <span class="material-symbols-outlined videocam">videocam</span>

                <div class="search-box">
                    <input v-model="searchQuery" type="text" placeholder="Ara" />
                    <button @click="search">
                        <span class="material-symbols-outlined">search</span>
                    </button>
                </div>
                <span class="material-symbols-outlined notifications">
                    notifications
                </span>
                <div class="account" @click="showLoginForm">
                    <span v-if="isLoggedIn" @click="logout"> Çıkış Yap</span>
                    <span v-else>Oturum Aç</span>
                    <span class="material-symbols-outlined">
                        account_circle
                    </span>
                </div>

            </nav>
            <div class="sidebar" :class="{ open: isSidebarOpen }">
                <span class="material-symbols-outlined close" @click="toggleSidebar">close</span>
                <ul>
                    <li><router-link to="/" class="link"><span class="material-symbols-outlined">
                                home
                            </span>Home</router-link></li>
                    <li><router-link to="/watchlater" class="link"><span class="material-symbols-outlined">
                                schedule
                            </span>Watch Later</router-link></li>
                    <li><router-link to="/playlist" class="link"><span class="material-symbols-outlined">
                                playlist_play
                            </span>Playlist</router-link></li>
                    <li><router-link to="/history" class="link"><span class="material-symbols-outlined">
                                history
                            </span>History</router-link></li>
                </ul>
                <button @click="toggleDarkMode">
                    {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
                </button>
            </div>
            <div class="overlay" v-if="isSidebarOpen" @click="toggleSidebar"></div>
        </div>

        <div class="video-container" v-if="!loginFormVisible && !registerFormVisible">
            <div v-for="video in filteredVideos" :key="video.id" class="video" @click="handleVideoClick(video)">
                
                    <img :src="video.imageURL" @click="goToDetail(video.id)" />
                    <p class="title">{{ video.title }}</p>
                    <p class="description">{{ video.description }}</p>
                    <div class="buttons">
                        <button v-if="isLoggedIn" class="kaydet" v-on:click.native="addPlaylist(video)">Kaydet</button>
                        <button v-if="isLoggedIn" class="sonraizle" @click.prevent="addWatchLater(video)">Daha Sonra İzle</button>
                    </div>
            </div>
        </div>
    </div>

    <div id="login" v-if="loginFormVisible">
        <form v-if="!submitted" @submit.prevent="login">
            <h2>GİRİŞ YAP</h2>
            <label for="username">Kullanıcı Adı : </label>
            <input v-model="username" type="text" id="username" placeholder="Kullanıcı adınızı girin" required />

            <label for="password">Parola :</label>
            <input v-model="password" type="password" id="password" placeholder="Şifrenizi girin" required />

            <p><button type="submit">GİRİŞ YAP</button></p>

            <p>Hesabınız yok mu?
                <button class="registerbtn" @click="showRegisterForm"> KAYDOLUN</button>
            </p>

        </form>
        <p v-if="submitted">Giriş başarılı!</p>
        <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>

    <div id="register" v-if="registerFormVisible">
        <form @submit.prevent="register">
            <h2>KAYDOL</h2>
            <label for="username">Kullanıcı Adı : </label>
            <input v-model="username" type="text" id="username" placeholder="Kullanıcı adınızı girin" required />

            <label for="password">Parola :</label>
            <input v-model="password" type="password" id="password" placeholder="Şifrenizi girin" required />

            <p><button type="submit">KAYDOL</button></p>

        </form>
        <p v-if="submitted">Kayıt başarılı!</p>
        <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
</template>

<script>
import { collection, query, where, getDocs, addDoc, doc, setDoc } from 'firebase/firestore';
import db from '../../firebase';


export default {
    data() {
        return {
            isSidebarOpen: false,
            isDarkMode: false,
            searchQuery: '',
            videos: [],
            isLoggedIn: false,
            submitted: false,
            errorMessage: '',
            loginFormVisible: false,
            registerFormVisible: false,
            username: '',
            password: ''
        };
    },
    computed: {
        filteredVideos() {
            return this.videos.filter(video =>
                video.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                video.description.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }
    },
    methods: {
        async fetchVideos() {
            try {
                const videosCollection = collection(db, 'videos');
                const videoSnapshot = await getDocs(videosCollection);
                if (videoSnapshot.empty) {
                    console.log("No videos found");
                    return;
                }
                const videoList = videoSnapshot.docs.map(doc => doc.data());
                console.log("Fetched videos:", videoList);
                this.videos = videoList;
            } catch (error) {
                console.error("Error fetching videos:", error);
            }
        },

        toggleSidebar() {
            this.isSidebarOpen = !this.isSidebarOpen;
        },
        toggleDarkMode() {
            this.isDarkMode = !this.isDarkMode;
        },
        async addPlaylist(video) {
            try {
                const playlistRef = doc(db, 'playlist', video.title);
                await setDoc(playlistRef, video);
                console.log("Video playliste eklendi:", video);
            } catch (error) {
                console.error("Video playliste eklenirken hata oluştu:", error);
            }
            alert("Video Playlist'e Eklendi!");
        },
        async addWatchLater(video) {
            try {
                const watchLaterRef = doc(db, 'watchLater', video.title);
                await setDoc(watchLaterRef, video);
                console.log("Video watchlater'e eklendi:", video);
            } catch (error) {
                console.error("Video watchlater'e eklenirken hata oluştu:", error);
            }
            alert("Video Daha Sonra İzle Listesine Eklendi!");
        },
        async login() {
            try {
                const usersRef = collection(db, 'users');
                const q = query(usersRef, where('username', '==', this.username), where('password', '==', this.password));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    this.submitted = true;
                    this.errorMessage = '';
                    console.log("Giriş başarılı!");
                    this.isLoggedIn = true;
                    this.loginFormVisible = false;
                    this.registerFormVisible = false;

                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('username', this.username);
                } else {
                    alert("Kullanıcı adı veya parola yanlış.");
                    this.submitted = false;
                }
            } catch (error) {
                console.error("Giriş sırasında bir hata oluştu:", error);
                this.errorMessage = 'Giriş sırasında bir hata oluştu.';
                this.submitted = false;
            }
        },
        async register() {
            try {
                const usersRef = collection(db, 'users');
                const q = query(usersRef, where('username', '==', this.username));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    await addDoc(usersRef, {
                        username: this.username,
                        password: this.password
                    });
                    this.submitted = true;
                    this.errorMessage = '';
                    console.log("Kayıt başarılı!");
                } else {
                    alert("Bu kullanıcı adı zaten mevcut.");
                    this.submitted = false;
                }
            } catch (error) {
                console.error("Kayıt sırasında bir hata oluştu:", error);
                this.errorMessage = 'Kayıt sırasında bir hata oluştu.';
                this.submitted = false;
            }
        },
        showLoginForm() {
            this.loginFormVisible = true;
            this.registerFormVisible = false;
        },
        showRegisterForm() {
            this.registerFormVisible = true;
            this.loginFormVisible = false;
        },
        async handleVideoClick(video) {

            const history = JSON.parse(localStorage.getItem('history')) || [];
            if (!history.some(v => v && v.id === video.id)) {
                history.push(video);
                localStorage.setItem('history', JSON.stringify(history));
            }

            try {
                const historyRef = collection(db, 'history');
                const q = query(historyRef, where('id', '==', video.id));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    await addDoc(historyRef, video);
                    console.log("Video geçmişe eklendi:", video);
                }
            } catch (error) {
                console.error('History eklenirken hata oluştu:', error);
            }

            this.$router.push(`/video/${video.id}`);
        },

        goToDetail(id) {
            this.$router.push(`/video/${id}`);
        },
        logout() {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            this.isLoggedIn = false;
            this.submitted = false;
        }

    },
    created() {
        this.fetchVideos();
        this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        this.username = localStorage.getItem('username') || '';
    }
};
</script>

<style src="./show-videos.style.css"></style>
