document.addEventListener("DOMContentLoaded", () => {
  const videoGallery = document.getElementById("videoGallery");

  // Dados de vídeos (exemplo)
  const videos = [
    {
      src: "videos/video1.mp4",
      title: "Ate Você voltar ",
      caption: "videos/video1.vtt",
    },
    {
      src: "videos/video2.mp4",
      title: "Meu Coração deo PT",
      caption: "videos/video2.vtt",
    },
    {
      src: "videos/video3.mp4",
      title: "Música 3",
      caption: "videos/video3.vtt",
    },
    {
      src: "videos/video4.mp4",
      title: "Música 4",
      caption: "videos/video4.vtt",
    },
  ];

  // Carregar vídeos
  function loadVideos() {
    videoGallery.innerHTML = "";
    videos.forEach((video) => {
      const videoCard = document.createElement("div");
      videoCard.className = "video-card";
      videoCard.setAttribute("role", "article");
      videoCard.setAttribute("aria-label", `Vídeo: ${video.title}`);
      videoCard.innerHTML = `
                <video controls preload="metadata" aria-label="Vídeo ${
                  video.title
                }">
                    <source src="${getAdaptiveSrc(video.src)}" type="video/mp4">
                    Seu navegador não suporta vídeo.
                </video>
                <div class="video-info">
                    <h3>${video.title}</h3>
                </div>
                <div class="download-btn">
                    <button onclick="downloadVideo('${
                      video.src
                    }')" aria-label="Baixar ${video.title}">Baixar</button>
                </div>
            `;
      videoGallery.appendChild(videoCard);
    });
  }

  // Compressão adaptativa
  function getAdaptiveSrc(src) {
    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;
    if (
      connection &&
      (connection.effectiveType === "2g" || connection.effectiveType === "3g")
    ) {
      return src.replace(".mp4", "-low.mp4");
    }
    return src;
  }

  // Função de download
  window.downloadVideo = function (videoSrc) {
    const link = document.createElement("a");
    link.href = videoSrc;
    link.download = videoSrc.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Inicialização
  loadVideos();
});
