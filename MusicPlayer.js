const allSong = [
  {
    id: "song",
    name: "O Mahi",
    artist: "Arijit",
    img: "/images/arijitsingh11650885572.webp",
    genre: "pop",
    source: "/mp3/O Mahi O Mahi_320(PagalWorld.com.sb).mp3",
  },
  {
    id: "song",
    name: "admiral",
    artist: "Karn Aujla",
    img: "/images/channels4_profile.jpg",
    genre: "hip hop",
    source: "/mp3/Admirin You_320(PagalWorld.com.sb).mp3",
  },
  {
    id: "song",
    name: "Tauba Tauba",
    artist: "Karn Aujla",
    img: "/images/images.jpeg",
    genre: "rock",
    source: "/mp3/_Tauba Tauba_320(PagalWorld.com.sb).mp3",
  },

  {
    id: "song",
    name: "Defender",
    artist: "Mankirt Aulakh",
    img: "/images/mankirt-aulakh-biography.webp",
    genre: "hip hop",
    source: "/mp3/Defender_320(PagalWorld.com.sb).mp3",
  },
  {
    id: "song",
    name: "admiral",
    artist: "Karn Aujla",
    img: "/images/channels4_profile.jpg",
    genre: "rock",
    source: "/mp3/Admirin You_320(PagalWorld.com.sb).mp3",
  },
  {
    id: "song",
    name: "Judge",
    artist: "Mankirt Aulakh",
    img: "/images/mani.webp",
    genre: "pop",
    source: "/mp3/Judge_320(PagalWorld.com.sb).mp3",
  },
 
 
 
];
const playlists = {}; // Object to hold playlists

// Toggle theme
const toggleButton = document.getElementById("toggle-button");

function toggleTheme() {
  let toggleState = false;
  const bodyHtml = document.querySelector("body");

  toggleButton.addEventListener("click", () => {
    toggleState = !toggleState;
    if (toggleState) {
      toggleButton.classList.add("active");
      toggleButton.querySelector(".toggle-text").textContent = "Dark";
      bodyHtml.style.backgroundColor = "grey";
    } else {
      toggleButton.classList.remove("active");
      toggleButton.querySelector(".toggle-text").textContent = "Light";
      bodyHtml.style.backgroundColor = "white";
    }
  });
}

toggleTheme();

// Filter songs
const AllSongs = document.getElementById("song");
const showFilterSong = document.getElementById("showFilterSong");

let currentIndex = 0;
let filteredSongs = [];

function showSongs() {
  AllSongs.addEventListener("change", (e) => {
    const selectGenre = e.target.value;

    // Clear previous results
    showFilterSong.innerHTML = `<h1>${
      selectGenre === "all" ? "All Songs" : `${selectGenre} Songs`
    }</h1>`;

    filteredSongs =
      selectGenre === "all"
        ? allSong
        : allSong.filter(
            (song) => song.genre.toLowerCase() === selectGenre.toLowerCase()
          );

    // Clear previous buttons
    showFilterSong.innerHTML = "";

    // Display filtered songs as buttons
    filteredSongs.forEach((song, index) => {
      const songButton = document.createElement("button");
      songButton.textContent = `${song.name} - ${song.artist}`;
      songButton.addEventListener("click", () => {
        currentIndex = index; // Update currentIndex
        renderCurrentSong(song);
      });

      showFilterSong.appendChild(songButton);
    });
  });
}

// Render selected song
function renderCurrentSong(song) {
  const layer1 = document.getElementById("layer1");
  const layer2 = document.getElementById("layer2");

  // Clear previous content
  layer1.innerHTML = "";
  layer2.innerHTML = "";

  // Create and display the image
  const image = document.createElement("img");
  image.id = "singer";
  image.src = song.img;
  image.alt = song.name;
  image.style.width = "100%";
  image.style.height = "300px";

  // Create and display the song name and artist
  const songName = document.createElement("h4");
  const songArtist = document.createElement("h4");

  songName.textContent = `Song Name: ${song.name}`;
  songArtist.textContent = `Artist: ${song.artist}`;

  // Create and display the audio element
  const audio = document.createElement("audio");
  audio.controls = true;
  audio.src = song.source;

  // Append image, text, and audio
  layer1.appendChild(image);
  layer2.append(songName, songArtist, audio);

  const leftBtn = document.getElementById("left");
  const rightBtn = document.getElementById("right");

  leftBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--; // Move to the previous song
      renderCurrentSong(filteredSongs[currentIndex]);
    }
  });

  rightBtn.addEventListener("click", () => {
    if (currentIndex < filteredSongs.length - 1) {
      currentIndex++; // Move to the next song
      renderCurrentSong(filteredSongs[currentIndex]);
    }
  });

  const addPlayListbtn = document.getElementById("addPlayList");
  addPlayListbtn.addEventListener("click", addPlayList);
}

// Initialize the showSongs function to set up event listeners
showSongs();

function addPlayList() {
  const currentPlaylist = document.querySelector("#playDiv3 .active");
  if (!currentPlaylist) {
    alert("Please select a playlist first.");
    return;
  }

  const playlistName = currentPlaylist.textContent;
  const currentSong = filteredSongs[currentIndex];

  if (!playlists[playlistName]) {
    playlists[playlistName] = [];
  }

  playlists[playlistName].push(currentSong);

  alert(`${currentSong.name} added to ${playlistName} playlist.`);
}

function createPlaylist() {
  const create = document.getElementById("create");
  const playlistContainer = document.getElementById("playDiv3");

  create.addEventListener("click", () => {
    const playlistNameInput = document.getElementById("createPlaylist");
    const playlistName = playlistNameInput.value.trim().toUpperCase();

    if (playlistName) {
      if (!playlists[playlistName]) {
        playlists[playlistName] = []; // Initialize the playlist
      }

      const newPlayListBtn = document.createElement("button");
      newPlayListBtn.id = "newPlayBtn";
      newPlayListBtn.textContent = playlistName;

      playlistContainer.append(newPlayListBtn);

      newPlayListBtn.addEventListener("click", () => {
        renderPlaylistSong(playlistName);

        document
          .querySelectorAll("#playDiv3 button")
          .forEach((btn) => btn.classList.remove("active"));
        newPlayListBtn.classList.add("active");
      });

      playlistNameInput.value = "";
    } else {
      alert("Please enter a valid playlist name.");
    }
  });
}

function renderPlaylistSong(playlistName) {
    const playlistSongsContainer = document.getElementById("playDiv2");
    playlistSongsContainer.innerHTML = `<h3>${playlistName} Playlist</h3>`;
  
    const songs = playlists[playlistName] || [];
  
    songs.forEach((song, index) => {
      const songButton = document.createElement("button");
      songButton.textContent = `${song.name} - ${song.artist}`;
  
      const removeButton = document.createElement("button");
      removeButton.id = "removeBtn"
      removeButton.textContent = "Remove";
      removeButton.style.marginLeft = "10px"; // Add some space between the buttons
  
      removeButton.addEventListener("click", () => {
        removeSongFromPlaylist(playlistName, index);
      });
  
      const songContainer = document.createElement("div");
      songContainer.style.display = "flex"; // Make the container flex
      songContainer.style.alignItems = "center"; // Center the buttons vertically
      songContainer.appendChild(songButton);
      songContainer.appendChild(removeButton);
  
      playlistSongsContainer.appendChild(songContainer);
    });
  }
  
  function removeSongFromPlaylist(playlistName, songIndex) {
    playlists[playlistName].splice(songIndex, 1); // Remove the song from the playlist
    renderPlaylistSong(playlistName); // Re-render the playlist to reflect the change
  }
  
  createPlaylist();



  // Search songs based on name
function searchSongs() {
    const searchSongInput = document.getElementById("searchSong");
    const showFilterSong = document.getElementById("showFilterSong");
  
    searchSongInput.addEventListener("input", () => {
      const searchTerm = searchSongInput.value.toLowerCase();
  
      showFilterSong.innerHTML = `<h1>${searchTerm ? 'Search Results' : 'All Songs'}</h1>`;
  
      const filtered = allSong.filter(song =>
        song.name.toLowerCase().includes(searchTerm)
      );
  
      filtered.forEach((song, index) => {
        const songButton = document.createElement("button");
        songButton.textContent = `${song.name} - ${song.artist}`;
        songButton.addEventListener("click", () => {
          currentIndex = index;
          renderCurrentSong(song);
        });
  
        showFilterSong.appendChild(songButton);
      });
    });
  }
  
  // Search playlists based on name
  function searchPlaylists() {
    const searchPlaylistInput = document.getElementById("searchPlaylist");
    const playlistContainer = document.getElementById("playDiv3");
  
    searchPlaylistInput.addEventListener("input", () => {
      const searchTerm = searchPlaylistInput.value.toLowerCase();
      const playlistButtons = playlistContainer.querySelectorAll("button");
  
      playlistButtons.forEach(button => {
        const playlistName = button.textContent.toLowerCase();
        if (playlistName.includes(searchTerm)) {
          button.style.display = "block";
        } else {
          button.style.display = "none";
        }
      });
    });
  }
  
  // Initialize the search functionality
  searchSongs();
  searchPlaylists();
  
