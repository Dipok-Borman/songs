const searchMusic = async () => {
    const inputMusic = document.getElementById("inputMusic").value;
    const url = `https://api.lyrics.ovh/suggest/${inputMusic}`;
    // another step of fetch:
    const res = await fetch(url);
    const data = await res.json();
    displayMusic(data.data);
    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => displayMusic(data.data))
}

const displayMusic = musics => {
    const musicContainer = document.getElementById("musicContainer");
    musicContainer.innerHTML = "";
    musics.forEach(music => {
        const songDiv = document.createElement('div')
        songDiv.className = "single-result row align-items-center my-3 p-3";
        const song = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${music.title}</h3>
            <p class="author lead">Album by <span>${music.artist.name}</span></p>
            <audio controls>
                <source src = "${music.preview}" type = "audio/mpeg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick = "getLyric('${music.artist.name}','${music.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `
        songDiv.innerHTML = song;
        musicContainer.appendChild(songDiv);
    });
    console.log(musics);
}

const getLyric = async (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    // another step of fetch:

    // const res = await fetch(url);
    // const data = await res.json();
    // displayLyrics(data.lyrics);

    //async catch system:
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayLyrics(data.lyrics);
    }
    catch(error){
        displayError("Sorry!! Something went wrong. Try again later.");
    }
    // fetch(url)
    // .then(res => res.json())
    // .then(data => displayLyrics(data.lyrics))
}
const displayError = error => {
    const errorTag = document.getElementById('error');
    errorTag.innerText = error;
}

const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('musicLyrics');
    lyricsDiv.innerText = lyrics;
}