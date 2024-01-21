const express = require('express');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const path = require('path');

// Spécifier le chemin vers ffmpeg
ffmpeg.setFfmpegPath(ffmpegPath);

// Créer une application Express
const app = express();

// Utiliser le middleware pour traiter les requêtes JSON
app.use(express.json());

// Servir les fichiers statiques depuis le répertoire 'Public'
app.use(express.static(path.join(__dirname, 'Public')));

// Gérer la route principale
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Views', 'index.html'));
});

// Définir le port d'écoute pour le serveur
const PORT = process.env.PORT || 3000;
// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port http://localhost:${PORT}/`);
});


// Route pour convetir l'url
app.post('/convert', async (req, res) => {
    const { videoLink, selectedFormat } = req.body;

    try {
        function cleanFileName(fileName) {
            const cleanedFileName = fileName.replace(/[^\w\s.-]/gi, '-').replace(/\s+/g, '-');
            return cleanedFileName.replace(/-+/g, '-');
        }

        // Recupérer les info de la vidéo
        const info = await ytdl.getInfo(videoLink);
        if (info.player_response.playabilityStatus.status === "UNPLAYABLE") {
            console.log("Erreur la vidéo ne peux pas être lu :", info.player_response.playabilityStatus.reason)
            return res.status(500).json({ status: "PAY_TO_WATCH", error: `Erreur ${info.player_response.playabilityStatus.reason}` });
        }

        // Obtenir le nom de la vidéo
        const videoTitle = info.videoDetails.title || 'untitled';
        const outputFileName = `output-${cleanFileName(videoTitle)}.${selectedFormat}`;

        // Télécharger la vidéo avec ytdl-core
        const format = info.formats.find(f => f.itag === 18);
        if (!format) {
            console.log("Erreur le format de la vidéo n'est pas disponible.")
            return res.status(500).json({ status: "FORMAT_UNDEFINED", error: 'Erreur le format de la vidéo n\'est pas disponible.' });
        }
        const videoReadableStream = ytdl.downloadFromInfo(info, { format });

        // Définir le codec en fonction de selectedFormat
        const audioCodec = selectedFormat === 'mp3' ? 'libmp3lame' : 'aac';
        const videoCodec = selectedFormat === 'mp4' ? 'libx264' : 'libvpx';

        // Convertir la vidéo avec fluent-ffmpeg
        const ffmpegCommand = ffmpeg()
            .input(videoReadableStream)
            .audioCodec(audioCodec)
            .videoCodec(videoCodec)
            .audioBitrate(320)
            .toFormat(selectedFormat)
            .output(path.join(__dirname, 'Views', 'uploaded', outputFileName))
            .on('end', () => {
                console.log('Conversion d\'une vidéo réussie.');
                const downloadLink = `/download/${outputFileName}`;
                res.json({ success: true, downloadLink });
            })
            .on('error', (err) => {
                console.log("Erreur lors de la conversion d'une vidéo via ffmpeg :", err.message)
                res.status(500).json({ error: 'Erreur de conversion ffmpeg.' });
            });
        ffmpegCommand.run();
    } catch (err) {
        console.log("Erreur lors de la conversion d'une vidéo :", err.message)
        res.status(500).json({ error: 'Erreur de conversion.' });
    }
});

// Route pour télécharger les fichiers convertis
app.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    res.download(path.join(__dirname, 'Views', 'uploaded', filename));
});

// Route pour obtenir des infomation sur la vidéo
app.get('/videoInfo', async (req, res) => {
    try {
        let videoLink = req.query.videoLink;
        let info = await ytdl.getInfo(videoLink);
        let thumbnail_url = info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url;
        let title = info.videoDetails.title;
        res.send({ thumbnail_url: thumbnail_url, title: title });
    } catch (err) {
        console.log("Erreur lors de la récupération des informations d'une vidéo :", err.message)
        res.status(404).json({ error: 'Erreur lors de la récupération des informations.' });
    }
});