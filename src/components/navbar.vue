<template>
    <div :class="{ 'dark-mode': isDarkMode }">
        <nav class="header">
            <span class="material-symbols-outlined menu" @click="toggleSidebar">menu</span>
            <span class="material-symbols-outlined videocam">videocam</span>

            <span class="material-symbols-outlined notifications">
                notifications
            </span>
            <div class="login">
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
            

        </div>
        <div class="overlay" v-if="isSidebarOpen" @click="toggleSidebar"></div>

        <!-- <div :class="{ 'dark-mode': isDarkMode }">
        <navbar></navbar>
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
                    <span v-if="isLoggedIn"></span>
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
        </div> -->
        <!-- <div>
        <nav class="header">
            <span class="material-symbols-outlined menu" @click="toggleSidebar">menu</span>
            <span class="material-symbols-outlined videocam">videocam</span>
            <div class="search-box">
                <input type="text" v-model="query" @keyup.enter="search" placeholder="Ara" />
                <button @click="search">
                    <span class="material-symbols-outlined">
                        search
                    </span>
                </button>
            </div>
            <span class="material-symbols-outlined notifications">
                notifications
            </span>
            <div class="account" @click="showLoginForm">
                <span v-if="isLoggedIn"></span>
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
        <div class="overlay" v-if="isSidebarOpen" @click="toggleSidebar"></div> -->
    </div>


</template>

<script>
export default {
    data() {
        return {
            isSidebarOpen: false,
            isDarkMode: false
        };
    },
    methods: {
        toggleSidebar() {
            this.isSidebarOpen = !this.isSidebarOpen;
        },
        toggleDarkMode() {
            this.isDarkMode = !this.isDarkMode;

        },



    }
};
</script>

<style scoped>
nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    height: 60px;
    background-color: #ccc;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
}

.material-symbols-outlined {
    cursor: pointer;
    margin: 0 10px;
}

.search-box {
    display: flex;
    align-items: center;
    flex-grow: 1;
    justify-content: center;
}

.search-box input {
    padding: 0.5rem;
    font-size: 1rem;
}

.search-box button {
    padding: 0.5rem;
    margin-left: 0.5rem;
    border: none;
    background: none;
    cursor: pointer;
}

.menu {
    margin-right: auto;
}

.videocam {
    margin-right: 20px;
}

.notifications {
    margin-left: 20px;
}

.login {
    display: flex;
    align-items: center;
    padding: 5px;
    border: 1px solid black;
    border-radius: 10px;
    background-color: #fff;
    margin-right: 20px;
}

/* Sidebar Styles */
.sidebar {
    position: fixed;
    top: 0;
    left: -300px;
    width: 250px;
    height: 100%;
    background: #ccc;
    color: #fff;
    transition: left 0.3s;
    z-index: 1000;
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
}

.sidebar.open {
    left: 0;
}

.sidebar .close {
    display: block;
    text-align: right;
    cursor: pointer;
}

.sidebar ul {
    list-style: none;
    padding: 0;
}

.sidebar ul li {
    padding: 20px;
    margin: 20px 0;
    cursor: pointer;
    border: 1px solid beige;
    border-radius: 20px;
    background-color: darkgray;
    color: black;
}

/* Overlay Styles */
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 500;
}

.dark-mode {
    background-color: #121212;
    color: #ffffff;
}

.dark-mode button {
    background-color: #333333;
    color: black;
}

.dark-mode .content .sidebar.open {
    background-color: #303030;
}


.dark-mode .video {
    background-color: #303030;
    color: #ccc;
}

.dark-mode .video .title {
    color: rgb(182, 193, 126);
}

.dark-mode .video .description {
    color: #ccc;
}

.dark-mode .video button {
    background-color: #bababa;
}
</style>
