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
- Extrayez le fichier ffmpeg téléchargé plus haut.
```

Étape 2 :
```
- Renommez le dossier extrait en FFmpeg.
```

Étape 3 :
```
- Déplacez le dossier FFmpeg à la racine de votre disque dur.
```

Étape 4 :
```
- Ajoutez FFmpeg à votre chemin système.
```
Option 1.
```
- Ouvrez l'invite de commande en tant qu'administrateur.
- Tapez la commande suivante pour ajouter FFmpeg à votre chemin système : setx /m PATH "C:\\ffmpeg\\bin;%PATH%".
- Appuyez sur Entrée.
- Redémarrez votre ordinateur pour que les modifications prennent effet.
- Pour vérifier que FFmpeg a été correctement ajouté à votre chemin système, ouvrez une nouvelle fenêtre d'invite de commande et tapez `ffmpeg -version`. Si FFmpeg est correctement installé, vous devriez voir des informations sur la version de FFmpeg s'afficher.
```
Option 2.
```
- Appuyez sur la touche Windows pour ouvrir le menu Démarrer.
- Tapez "path" dans la barre de recherche des applications et ouvrez le premier résultat obtenu.
- Une fois l'application ouverte, cliquez sur "Variables d'environnement".
- Dans la fenêtre des variables d'environnement, sous l'onglet "Variables système", recherchez et sélectionnez "Path", puis cliquez sur "Modifier".
- Dans la fenêtre d'édition, cliquez sur "Nouveau", puis tapez le chemin d'accès complet à votre dossier bin de FFmpeg, qui devrait être "C:\FFMPEG\bin".
- Cliquez sur "OK" pour fermer toutes les fenêtres.
- Redémarrez votre ordinateur pour que les modifications prennent effet.
- Pour vérifier que FFmpeg a été correctement ajouté à votre chemin système, ouvrez une nouvelle fenêtre d'invite de commande et tapez `ffmpeg -version`. Si FFmpeg est correctement installé, vous devriez voir des informations sur la version de FFmpeg s'afficher.
```
