# Youtube-Video-Downloader :
Youtube-Video-Downloader est un projet open source pour convertir des vidéos YouTube en MP3 ou MP4. Libre d’utilisation et de modification, il est dédié uniquement à YouTube.

# Requirements :
> - Express ^4.18.2
> - Ffmpeg-static ^5.2.0
> - Fluent-ffmpeg ^2.1.2
> - Ytdl-core ^4.11.5

# Installation :
### Ce site a était réalisé pour fonctionner en localhost, les explications ci-dessous sont pour faire fonctionner le site sur votre PC sous Windows 11.

Étape 1 :
> Installez tous les packages require via le terminal en tapant **npm install nom_du_packages**.

Étape 2 :
> Installez ffmpeg sur votre pc : [Download FFmpeg](https://ffmpeg.org/download.html#build-windows).

# Installation ffmpeg :
Étape 1 :
```
> Extrayez le fichier ffmpeg téléchargé plus haut.
```

Étape 2 :
```
> Renommez le dossier extrait en FFmpeg.
```

Étape 3 :
```
> Déplacez le dossier FFmpeg à la racine de votre disque dur.
```

Étape 4 :
```
> Ajoutez FFmpeg à votre chemin système.
```
```
- Ouvrez l’invite de commande en tant qu’administrateur, puis tapez la commande suivante pour ajouter FFmpeg à votre chemin système : setx /m PATH "C:\\ffmpeg\\bin;%PATH%".
```
