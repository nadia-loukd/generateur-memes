// Variables
const imageUpload = document.getElementById('imageUpload');
const memeText = document.getElementById('memeText');
const memePreview = document.getElementById('memePreview');
const memeImage = document.getElementById('memeImage');
const textOverlay = document.getElementById('textOverlay');
const downloadButton = document.getElementById('downloadButton');
const facebookShareButton = document.getElementById('facebookShareButton');
const whatsappShareButton = document.getElementById('whatsappShareButton');
const twitterShareButton = document.getElementById('twitterShareButton');
const gallery = document.getElementById('gallery');

// Fonction pour ajuster l'image à 300x170px
function resizeImage(image) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 300;
    canvas.height = 170;
    ctx.drawImage(image, 0, 0, 300, 170);
    return canvas;
}

// Gestion du téléchargement de l'image
imageUpload.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                // Ajuster l'image et l'afficher
                memeImage.src = e.target.result;
                const resizedCanvas = resizeImage(img);
                memeImage.src = resizedCanvas.toDataURL();
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Mise à jour du texte du mème en temps réel
memeText.addEventListener('input', function () {
    textOverlay.textContent = memeText.value;
});

// Fonction pour télécharger le mème
downloadButton.addEventListener('click', function () {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 300;
    canvas.height = 170;
    ctx.drawImage(memeImage, 0, 0);
    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    ctx.textShadow = '2px 2px 5px rgba(0, 0, 0, 0.7)';
    ctx.fillText(memeText.value, 10, 150);

    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'meme.png';
    link.click();

    // Ajouter à la galerie après téléchargement
    const memeUrl = canvas.toDataURL();
    addToGallery(memeUrl);
});

// Ajouter le mème à la galerie
function addToGallery(memeUrl) {
    const galleryItem = document.createElement('div');
    galleryItem.classList.add('gallery-item');
    const img = document.createElement('img');
    img.src = memeUrl;
    galleryItem.appendChild(img);
    gallery.appendChild(galleryItem);
}

// Fonction de partage sur Facebook
facebookShareButton.addEventListener('click', function () {
    const memeUrl = memeImage.src; // Assurez-vous que l'URL est correcte
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(memeUrl)}`;
    window.open(facebookUrl, '_blank');
});

// Fonction de partage sur WhatsApp
whatsappShareButton.addEventListener('click', function () {
    const memeUrl = memeImage.src; // L'URL de l'image du mème
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(memeUrl)}`;
    window.open(whatsappUrl, '_blank');
});

// Fonction de partage sur Twitter
twitterShareButton.addEventListener('click', function () {
    const memeUrl = memeImage.src; // L'URL de l'image du mème
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(memeUrl)}&text=${encodeURIComponent('Voici un mème génial!')}%20#MemeGenerator`;
    window.open(twitterUrl, '_blank');
});