/* Bouton convertir. */
async function convertAndDownload() {
    const videoLink = document.getElementById('videoLink').value;
    const formatSelect = document.getElementById('formatSelect');
    const selectedFormat = formatSelect.options[formatSelect.selectedIndex].value;

    if (!videoLink) {
        return displayMessage('Aucun lien défini.');
    }

    const downloadLink = document.getElementById('downloadLink');
    downloadLink.style.display = 'none';

    const loadingMessage = document.getElementById('loadingMessage');
    loadingMessage.style.display = 'block';

    try {
        const responseInfo = await fetch(`/videoInfo?videoLink=${videoLink}`);
        const data = await responseInfo.json();
        if (data.error) {
            return displayMessage('Erreur lors de la récupération des informations de la vidéo.');
        }

        const imgVideo = document.getElementById('imageVideo')
        imgVideo.src = data.thumbnail_url;
        imgVideo.style.display = 'block'
        document.getElementById('titleVideo').innerText = data.title;

        const response = await fetch('/convert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ videoLink, selectedFormat }),
        });

        if (response.ok) {
            const result = await response.json();
            const downloadLinkElement = document.getElementById('downloadLink');

            downloadLinkElement.href = result.downloadLink;
            downloadLinkElement.style.display = 'flex';
        } else {
            const errorData = await response.json();
            if (errorData.status === "PAY_TO_WATCH") {
                displayMessage(errorData.error);
            } else {
                displayMessage('Erreur lors de la conversion.');
            }
        }
    } catch (error) {
        return displayMessage('Erreur lors de la requête de conversion.');
    } finally {
        loadingMessage.style.display = 'none';
    }
}


/* Message d'err. */
function displayMessage(message) {
    const existingMessageDiv = document.getElementById('messageDiv');
    if (existingMessageDiv) {
        document.body.removeChild(existingMessageDiv);
    }

    const messageDiv = document.createElement('div');
    messageDiv.id = 'messageDiv';
    messageDiv.className = 'message';

    const infoIcon = document.createElement('div');
    infoIcon.className = 'info';
    infoIcon.innerHTML = '&#8505;';

    const textDiv = document.createElement('div');
    textDiv.className = 'text';
    textDiv.textContent = message;

    messageDiv.appendChild(infoIcon);
    messageDiv.appendChild(textDiv);
    document.body.appendChild(messageDiv);

    setTimeout(() => {
        try { document.body.removeChild(messageDiv); } catch (err) { };
    }, 10000);
}


/* Menu hamburger. */
window.addEventListener('DOMContentLoaded', (event) => {
    let overlay = document.getElementById('overlay');
    let menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            if (overlay.style.display === "flex") {
                overlay.style.display = 'none';
            } else {
                overlay.style.display = 'flex';
            }
            menuToggle.classList.toggle('cross');
        });
    }
});