const playPauseBtn = document.getElementById('play-pause');
const progressBar = document.getElementById('progress');
const volumeControl = document.getElementById('volume');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const audio = document.getElementById('audio');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');

const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');


let isPlaying = false;

// Converter segundos para formato MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Alternar play/pause
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
    } else {
        audio.play();
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
    }
    isPlaying = !isPlaying;
});

// Atualizar barra de progresso e tempo
audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    progressBar.value = (currentTime / duration) * 100;
    currentTimeEl.textContent = formatTime(currentTime);
    durationEl.textContent = formatTime(duration);
});

// Buscar
progressBar.addEventListener('input', (e) => {
    const duration = audio.duration;
    const newTime = (e.target.value / 100) * duration;
    audio.currentTime = newTime;
});

// Atualizar volume
// volumeControl.addEventListener('input', (e) => {
//     audio.volume = e.target.value / 100;
// });

// Carregar nova música
function loadSong(source, title, artist) {
    audio.src = source;
    songTitle.textContent = title;
    songArtist.textContent = artist;
    audio.load();
    console.log("passou aqui")
}

// Exemplo: carregar uma música
loadSong('https://stream-171.zeno.fm/3je2xlxqezwtv?zt=eyJhbGciOiJIUzI1NiJ9.eyJzdHJlYW0iOiIzamUyeGx4cWV6d3R2IiwiaG9zdCI6InN0cmVhbS0xNzEuemVuby5mbSIsInJ0dGwiOjUsImp0aSI6IjNDNlFLOE43UnJ1dTljYmFZR3BiYkEiLCJpYXQiOjE3MTcwMDIxMzksImV4cCI6MTcxNzAwMjE5OX0.T_vO-xrhOhV1ckQjZg28r5K0CFcunvysxvkH3Cuoc2g', 'Assembleia de Deus - Rádio ADPV', 'Assembleia de Deus Profetizando Vida');
