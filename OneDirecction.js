// 🎵 Lista de canciones del reproductor personalizado
const songs = {
  1: {
    src: "audios/dont forget where.mp3",
    cover: "dont forget where1.webp",
  },
  2: {
    src: "audios/History.mp3",
    cover: "History.jpg",
  },
  7: {
    src: "audios/Strong .mp3",
    cover: "Strong .jpg",
  },
  8: {
    src: "audios/Infinity.mp3",
    cover: "Infinity.jpg",
  },
};

const selector = document.getElementById("trackSelector");
const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const bgAudio = document.getElementById("backgroundAudio");

// 🟢 Cuando cambia la canción en el selector
selector.addEventListener("change", () => {
  const track = songs[selector.value];
  audio.src = track.src;
  cover.src = track.cover;
  audio.play();
  bgAudio.pause(); // Pausar fondo al reproducir desde el reproductor
});

// 🟢 Cuando el usuario da "play" en el reproductor personalizado
audio.addEventListener("play", () => {
  bgAudio.pause();
});

// 🔴 Si el usuario pausa o la canción termina, vuelve a reproducir el fondo
audio.addEventListener("pause", () => {
  if (audio.currentTime < audio.duration) {
    bgAudio.play();
  }
});
audio.addEventListener("ended", () => {
  bgAudio.play();
});

// ✅ Cargar primer tema al iniciar y mostrar portada correctamente
document.addEventListener("DOMContentLoaded", () => {
  const bgAudio = document.getElementById("backgroundAudio");

  // Mostrar portada y fuente del primer tema seleccionado
  const selectedTrack = songs[selector.value];
  audio.src = selectedTrack.src;
  cover.src = selectedTrack.cover;

  // Forzar reproducción automática (si el navegador lo permite)
  const tryPlay = () => {
    const playPromise = bgAudio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log("✅ Música de fondo iniciada automáticamente.");
        })
        .catch(() => {
          console.warn("⚠️ Autoplay bloqueado. Requiere interacción.");
        });
    }
  };

  tryPlay();
  document.addEventListener("click", tryPlay, { once: true });
  document.addEventListener("scroll", tryPlay, { once: true });
});
