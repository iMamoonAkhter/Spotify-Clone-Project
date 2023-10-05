console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "295", filePath: "songs/1.mp3", coverPath: "covers/1.jpg", duration: "04:32"},
    {songName: "Famous", filePath: "songs/2.mp3", coverPath: "covers/1.jpg", duration:"04:14"},
    {songName: "Dark Love", filePath: "songs/3.mp3", coverPath: "covers/1.jpg", duration:"05:05"},
    {songName: "Death Route", filePath: "songs/4.mp3", coverPath: "covers/1.jpg", duration:"03:56"},
    {songName: "Devil", filePath: "songs/5.mp3", coverPath: "covers/1.jpg", duration:'04:23'},
    {songName: "East Side Flow", filePath: "songs/6.mp3", coverPath: "covers/1.jpg", duration:'04:19'},
    {songName: "Forget About It", filePath: "songs/7.mp3", coverPath: "covers/1.jpg", duration:'03:55'},
    {songName: "ISSA Jutt", filePath: "songs/8.mp3", coverPath: "covers/1.jpg", duration:"04:04"},
    {songName: "Its All About You", filePath: "songs/9.mp3", coverPath: "covers/1.jpg", duration:"04:14"},
    {songName: "Jatt Da Muqabala", filePath: "songs/10.mp3", coverPath: "covers/1.jpg", duration:'03:58'},
    {songName: "Old Skool", filePath: "songs/11.mp3", coverPath: "covers/1.jpg", duration:'04:19'},
    {songName: "Same Beef", filePath: "songs/12.mp3", coverPath: "covers/1.jpg", duration:'04:22'},
    {songName: "Dollar", filePath: "songs/13.mp3", coverPath: "covers/1.jpg", duration:'02:53'},
    {songName: "So High", filePath: "songs/14.mp3", coverPath: "covers/1.jpg", duration:'03:53'},
    {songName: "Tochan", filePath: "songs/15.mp3", coverPath: "covers/1.jpg", duration:'04:30'},
    
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
    element.getElementsByClassName("timeduration")[0].innerText = songs[i].duration
})
 



// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;

        // Toggle play/pause icon inside the specific songItem
        const specificSongItem = songItems[songIndex];
        const specificSongItemPlayIcon = specificSongItem.querySelector('.songItem i');
        if (specificSongItemPlayIcon.classList.contains('fa-play-circle')) {
            specificSongItemPlayIcon.classList.remove('fa-play-circle');
            specificSongItemPlayIcon.classList.add('fa-pause-circle');
        }
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;

        // Toggle play/pause icon inside the specific songItem
        const specificSongItem = songItems[songIndex];
        const specificSongItemPlayIcon = specificSongItem.querySelector('.songItem i');
        if (specificSongItemPlayIcon.classList.contains('fa-pause-circle')) {
            specificSongItemPlayIcon.classList.remove('fa-pause-circle');
            specificSongItemPlayIcon.classList.add('fa-play-circle');
        }
    }

    masterSongName.innerText = songs[songIndex].songName;
    
});
// Next Button
document.getElementById('next').addEventListener('click', () => {
    // Increment songIndex or loop back to the beginning
    const prevSongIndex = songIndex;
    songIndex = (songIndex + 1) % songs.length;

    // Update audio source and play the song
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();

    // Update the masterPlay icon
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;

    // Toggle play/pause icon inside the specific songItem
    const prevSpecificSongItem = songItems[prevSongIndex];
    const prevSpecificSongItemPlayIcon = prevSpecificSongItem.querySelector('.songItem i');
    prevSpecificSongItemPlayIcon.classList.remove('fa-pause-circle');
    prevSpecificSongItemPlayIcon.classList.add('fa-play-circle');
    // Update the name
    
    // Toggle play/pause icon inside the next specific songItem
    const specificSongItem = songItems[songIndex];
    const specificSongItemPlayIcon = specificSongItem.querySelector('.songItem i');
    specificSongItemPlayIcon.classList.remove('fa-play-circle');
    specificSongItemPlayIcon.classList.add('fa-pause-circle');

    masterSongName.innerText = songs[songIndex].songName;

});

// Previous Button
document.getElementById('previous').addEventListener('click', () => {
    // Decrement songIndex or loop back to the end
    const prevSongIndex = songIndex;
    songIndex = (songIndex - 1 + songs.length) % songs.length;

    // Update audio source and play the song
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();

    // Update the masterPlay icon
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;

    // Toggle play/pause icon inside the specific songItem
    const prevSpecificSongItem = songItems[prevSongIndex];
    const prevSpecificSongItemPlayIcon = prevSpecificSongItem.querySelector('.songItem i');
    prevSpecificSongItemPlayIcon.classList.remove('fa-pause-circle');
    prevSpecificSongItemPlayIcon.classList.add('fa-play-circle');
    
    // Toggle play/pause icon inside the next specific songItem
    const specificSongItem = songItems[songIndex];
    const specificSongItemPlayIcon = specificSongItem.querySelector('.songItem i');
    specificSongItemPlayIcon.classList.remove('fa-play-circle');
    specificSongItemPlayIcon.classList.add('fa-pause-circle');

    masterSongName.innerText = songs[songIndex].songName;
});

