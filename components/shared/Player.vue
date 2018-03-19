<template>
    <div id="player">
        <div class="player__container">
            <div class="player">
                <div class="player__info">
                    <div class="player__image">
                        <img :src="this.$store.getters.getSongCoverArt" alt="">
                    </div>
                    <div class="player__song-text">
                        <div class="player__song-text-wrapper">
                            <p class="player__song-title">{{ this.$store.getters.getSongTitle }}</p>
                            <p class="player__song-artist">{{ this.$store.getters.getSongArtist }} </p>
                        </div>
                    </div>
                </div>
                <div class="player__main-ctrl">
                    <div class="player__buttons">
                    <div class="loading" v-show="showSpinner">
                        <div class="spinner"></div>

                    </div>
                    <div class="play-pause-btn" v-show="!showSpinner">
                        <div class="pause-btn" v-show="showPause" @click="togglePlayPause()">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 64 64" width="64" height="64"><defs><clipPath id="_clipPath_C7C4ufLkUa5sQnzKZQAOGKlIuOU3xVGb"><rect width="64" height="64"/></clipPath></defs><g clip-path="url(#_clipPath_C7C4ufLkUa5sQnzKZQAOGKlIuOU3xVGb)"><path d=" M 1 32 C 1 14.891 14.891 1 32 1 C 49.109 1 63 14.891 63 32 C 63 49.109 49.109 63 32 63 C 14.891 63 1 49.109 1 32 Z " fill="none" vector-effect="non-scaling-stroke" stroke-width="1.5" stroke="rgb(255,255,255)" stroke-linejoin="miter" stroke-linecap="square" stroke-miterlimit="3"/><rect x="24" y="20.5" width="5.2" height="23" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/><rect x="35" y="20.5" width="5.2" height="23" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/></g></svg>                    </div>
                        <div class="play-btn" v-show="!showPause" @click="togglePlayPause()">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 64 64" width="64" height="64"><defs><clipPath id="_clipPath_eOto5QOSpvHxKbZ0mZKtvhDpJgb6C9rR"><rect width="64" height="64"/></clipPath></defs><g clip-path="url(#_clipPath_eOto5QOSpvHxKbZ0mZKtvhDpJgb6C9rR)"><path d=" M 1 32 C 1 14.891 14.891 1 32 1 C 49.109 1 63 14.891 63 32 C 63 49.109 49.109 63 32 63 C 14.891 63 1 49.109 1 32 Z " fill="none" vector-effect="non-scaling-stroke" stroke-width="1.5" stroke="rgb(255,255,255)" stroke-linejoin="miter" stroke-linecap="square" stroke-miterlimit="3"/><polygon points="44,32.5,25,47,25,18" fill="rgb(255,255,255)"/></g></svg>
                        </div>
                    </div>
                    </div>
                    <div class="player__progress-bar">
                        <span class="current-time">{{ currentTime }} </span>
                        <div class="slider" 
                            @mouseover="showPin = true"
                            @mouseleave="hidePin()"
                            @click="forwardRewind()">
                            <div class="progress" 
                                :style="{width:progressPercent + '%'}">
                                <div class="pin draggable" 
                                    id="progress-pin"
                                    @mousedown="pinMouseDown()"
                                    v-show="showPin">
                                </div>
                            </div>
                        </div>
                        <span class="total-time">{{ totalTime }}</span>
                    </div>
                </div>
                <div class="player__right">
                    <div class="player__sound-ctrl">
                    <div class="player__sound-on" v-show="soundOn" @click="soundOn = false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 8 8">
                            <path d="M3.34 0l-1.34 2h-2v4h2l1.34 2h.66v-8h-.66zm1.66 1v1c.17 0 .34.02.5.06.86.22 1.5 1 1.5 1.94s-.63 1.72-1.5 1.94c-.16.04-.33.06-.5.06v1c.25 0 .48-.04.72-.09h.03c1.3-.33 2.25-1.51 2.25-2.91 0-1.4-.95-2.58-2.25-2.91-.23-.06-.49-.09-.75-.09zm0 2v2c.09 0 .18-.01.25-.03.43-.11.75-.51.75-.97 0-.46-.31-.86-.75-.97-.08-.02-.17-.03-.25-.03z"/>
                        </svg>
                    </div>
                    <div class="player__sound-off" v-show="!soundOn" @click="soundOn = true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 8 8">
                            <path d="M3.34 0l-1.34 2h-2v4h2l1.34 2h.66v-8h-.66z" transform="translate(2)" />
                        </svg>
                    </div>
                </div>
                <div class="player__close-container">
                    <div class="player__close" @click="closePlayer()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 8 8">
                            <path d="M1.41 0l-1.41 1.41.72.72 1.78 1.81-1.78 1.78-.72.69 1.41 1.44.72-.72 1.81-1.81 1.78 1.81.69.72 1.44-1.44-.72-.69-1.81-1.78 1.81-1.81.72-.72-1.44-1.41-.69.72-1.78 1.78-1.81-1.78-.72-.72z" />
                        </svg>
                    </div>
                </div>
                </div>            
            </div>
            <no-ssr>
                <youtube 
                    :video-id="this.$store.getters.getSongYoutubeId" 
                    :player-width="1"
                    :player-height="1"
                    :player-vars="{autoplay: 1}"
                    @ready="ready"
                    @playing="playing"
                    @ended="showPause = false"
                ></youtube>
            </no-ssr>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import VueYouTubeEmbed from 'vue-youtube-embed'
Vue.use(VueYouTubeEmbed)

export default {
    data() {
        return {
            showPlayer: true,
            soundOn: true,
            showSpinner: true,
            showPause: true,
            showPin: false,
            draggingProgressPin: false,
            player: '',
            totalTime: '0:00',
            currentTime: '0:00',
            currentTimeSec: 0,
            progressPercent: 0,
        }
    },
    watch: {
        currentSong() {
            this.showSpinner = true;
        },
        currentTimeSec() {
            this.currentTime = this.formatTime(this.currentTimeSec);
            this.progressPercent = this.currentTimeSec / this.player.getDuration() * 100;
        },
        soundOn() {
            if(this.soundOn) this.player.unMute();
            else this.player.mute();
        }

    },
    methods: {
        toggleSpinner: function() {
            this.showSpinner = false;
        },
        togglePlayPause: function() {
            this.showPause = !this.showPause;
            if(this.showPause) {
                this.play();
            } else this.pause();
        },
        ready(player) {
            this.player = player;
        },
        playing() {
            this.showPause = true;
            this.toggleSpinner();
            this.setDuration();  
            this.checkCurrentTime();
        },
        pause() {
            this.player.pauseVideo();
        },
        play() {
            this.player.playVideo();
        },
        formatTime(length) {
            var min = Math.floor(length / 60);
            var sec = Math.floor(length % 60);
            return min + ':' + (sec < 10 ? '0' + sec : sec);
        },
        setDuration() {
            this.totalTime = this.formatTime(this.player.getDuration());
        },
        checkCurrentTime() {
            setInterval(() => {
                if(!this.draggingProgressPin) this.currentTimeSec = this.player.getCurrentTime();
            },500);
        },
        forwardRewind() {
            this.setCurrentTime(event);
            if(this.showPin) {
                this.seekToTime();
            }
        },
        setCurrentTime(event, elTarget){
            let isPin = elTarget || false;
            const K = this.getRatio(event, isPin);
            this.progressPercent = K * 100;
        },
        setCurrentTimeFromPin(){
            this.currentTimeSec = this.progressPercent / 100 * this.player.getDuration();
        },
        getRatio(event, isPin){
            let rangeBox = event.target.getBoundingClientRect();
            if(isPin){
                rangeBox = this.$el.querySelector('.slider').getBoundingClientRect();
            }
            const offsetX = event.clientX - rangeBox.left;
            const K = offsetX / rangeBox.width;
            return K;
        },
        seekToTime() {
            this.player.seekTo(this.player.getDuration() * this.progressPercent / 100);
        },
        pinMouseDown(){
            this.showPin = true;
            this.draggingProgressPin = true;
            window.addEventListener('mousemove', this.pinSetTime);
        },
        pinSetTime() {
            const isPin = true
            this.setCurrentTime(event, isPin);
            this.setCurrentTimeFromPin();
            window.addEventListener('mouseup', this.pinMouseUp);
        },
        pinMouseUp() {
            this.showPin = false;
            window.removeEventListener('mousemove', this.pinSetTime);
            window.removeEventListener('mouseup', this.pinMouseUp);
            this.seekToTime();
            this.draggingProgressPin = false;
        },
        hidePin() {
            if(!this.draggingProgressPin) this.showPin = false;
        },
        closePlayer() {
            this.$store.dispatch('closePlayer')
        }
    },
    
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/util.scss';

$light-gray: #D8D8D8;
$grey-500: #9E9E9E;
$pink-500: #E91E63;

#player {
    position: fixed;
    bottom: 0;
    z-index: 99;
    width: 100%;
    font-family: 'Lato', sans-serif;
}

.player__container {
    height: 96px;
    background-color: black;
}
.progress__container {
    width: 33%;
}


.player {
    display: grid;
    grid-auto-columns: 4fr 1fr 1fr;
    grid-template-areas: 'info main right'; 


    width: 100%;
    height: 100%;
    align-items: center;

    user-select: none;
    background-color: #191919;
    color: white;
    .play-pause-btn {
        cursor: pointer;
    }
    .spinner {
        width: 18px;
        height: 18px;
        background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/loading.png);
        background-size: cover;
        background-repeat: no-repeat;
        animation: spin 0.4s linear infinite;
        margin: auto;

    }
    .slider {
        flex-grow: 1;
        background-color: $light-gray;
        cursor: pointer;
        position: relative;
        .progress {
            background-color: $pink-500;
            border-radius: inherit;
            position: absolute;
            pointer-events: none;
            .pin {
                height: 12px;
                width: 12px;
                border-radius: 6px;
                background-color: white;
                position: absolute;
                pointer-events: all;
                box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.32);
            }
        }
    }
    .player__progress-bar {
        font-size: 12px;
        line-height: 18px;
        color: white;
        display: flex;
        flex-grow: 1;
        align-items: center;
        margin-left: 24px;
        margin-right: 24px;
        display: none;
        .slider {
            margin-left: 16px;
            margin-right: 16px;
            border-radius: 2px;
            height: 4px;
            // background-color: #D8D8D8;

            .progress {
                width: 0;
                height: 100%;
                .pin {
                    right: -6px;
                    top: -4px;
                }
            }
        }
        span {
            cursor: default;
        }
    }
}
.player__info {
    grid-area: info;
    display: flex;
    margin: 16px;

    .player__image {
        grid-area: image;
        
        img {
            width: 64px;
            display: inline-block;
        }
    }
    .player__song-text {
        grid-area: text;
        display: grid;

        .player__song-text-wrapper {
            margin: auto 16px;

            .player__song-artist {
                color: $grey-500;
            }
        }
    }


    p {
        line-height: 1.4;
        font-size: 10pt;
    }
}
.player__right {
    grid-area: right;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: row;

    * {
        margin: 0 12px;
    }
}


.player__buttons {
    margin: 8px 0;
}
.player__sound-ctrl {
    display: none;
    cursor: pointer;

    .player__sound-on {
        padding-left: 10px;
    }
    path {
        fill: white;
    }

}

.play-pause-btn {
    display: table;
    margin: 0 auto;
    transition: all 0.1s ease-in;
    &:hover {
        transform: scale(1.1);
    }

    .pause-btn,
    .play-btn {
        height: 32px;
        cursor: pointer;
        svg {
            width: 32px;
            height: 32px;
        }
    }

}
.loading {
    height: 32px;
    display: grid;

}
.spinner {
    margin: 0 auto;
    width: 32px;
    height: 32px;
}

@keyframes spin {
    from {
        transform: rotateZ(0);
    }
    to {
        transform: rotateZ(1turn);
    }
}

.player__close-container {
    grid-area: close;
    display: grid;
    transition: all ease-in .1s;

    .player__close {
        margin: auto;
        cursor: pointer;
        path {
            stroke: white;
            fill: white;
        }
    }
    &:hover {
        transform: scale(1.1);
    }
}

@media screen and (min-width: $screen-m) {
    .player {
        grid-auto-columns: 1fr 2fr 1fr;

        .player__progress-bar {
            display: flex;
        }
    }
    .player__sound-ctrl {
        display: initial;
    }
}

</style>


