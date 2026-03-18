[![Publish to npm](https://github.com/exaland/backupdbtos3-commonjs/actions/workflows/npm-publish-github-packages.yml/badge.svg)](https://github.com/exaland/backupdbtos3-commonjs/actions/workflows/npm-publish-github-packages.yml)

# MySQL S3 Backup (CommonJS) - Exaland Concept

A simple library for backing up MySQL databases to AWS S3 using the AWS SDK. This package provides an easy way to create a database backup and store it securely in an S3 bucket.

## Installation

You can install this package via npm:

```bash
npm install backupdbtos3-commonjs
```

## Configuration des Variables d'Environnement

Avant de lancer l'application, vous devez configurer certaines variables d'environnement nécessaires pour le bon fonctionnement de l'application.

Vous pouvez ajouter les variables suivantes dans votre fichier `.env` :

```
AWS_REGION=your_aws_region
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
AWS_BUCKET_NAME=your_s3_bucket_name
BACKUP_FILE_NAME=your_backup_file_name_prefix
BACKUP_FILE_PATH=your_backup_file_path
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
WEBHOOK_PORT=3000  # (optionnel, port pour le webhook)
```

### Description des Variables

- `AWS_REGION`: La région AWS où se trouve votre bucket S3.
- `AWS_ACCESS_KEY_ID`: Votre clé d'accès AWS.
- `AWS_SECRET_ACCESS_KEY`: Votre clé secrète AWS.
- `AWS_BUCKET_NAME`: Le nom de votre bucket S3.
- `BACKUP_FILE_NAME`: Le préfixe du nom du fichier de sauvegarde.
- `BACKUP_FILE_PATH`: Le chemin d'accès où le fichier de sauvegarde sera stocké.
- `DB_USER`: Le nom d'utilisateur de votre base de données.
- `DB_PASSWORD`: Le mot de passe de votre base de données.
- `DB_NAME`: Le nom de votre base de données.
- `WEBHOOK_PORT`: (Optionnel) Port du serveur webhook pour lancer des sauvegardes à distance.

---

## Initialisation et 🚀

```javascript
const MySqlS3Backup = require("backupdbtos3-commonjs");

// Avec planification automatique (par défaut tous les jours à 2h)
const backup = new MySqlS3Backup();

backup.runBackupProcess()
  .then((result) => {
    console.log("Backup process completed successfully.", result);
  })
  .catch((err) => {
    console.error("Error during backup process:", err);
  });
```

## Planification Cron (Optionnelle)

Pour définir une fréquence automatique, passez une chaîne de syntaxe cron lors de l'initialisation. Si vous ne souhaitez pas de planification automatique, vous pouvez passer `false` :

```javascript
// Planification tous les heures
const backupHourly = new MySqlS3Backup('0 * * * *');

// Désactiver la planification automatique
const backupSansCron = new MySqlS3Backup(false);
```

*Note :* Si vous ne spécifiez pas de paramètre ou si vous passez `true`, la planification ne sera pas activée. La valeur `false` désactive la planification automatique.

## Fonctionnalité de Webhook

Pour automatiser le lancement de sauvegardes à distance ou via une plateforme tierce, la librairie inclut maintenant une **fonctionnalité de Webhook**.

### Comment ça marche ?

- La librairie démarre un serveur HTTP (avec Express) qui écoute sur le port défini dans la variable `WEBHOOK_PORT` (par défaut 3000).
- Lorsqu'une requête POST est envoyée à l'endpoint `/webhook/backup`, la sauvegarde est lancée automatiquement.

### Exemple d'utilisation

1. Démarrez votre script principal, qui initialise la classe et démarre le serveur webhook :

```javascript
const MySqlS3Backup = require("backupdbtos3-commonjs");

const backup = new MySqlS3Backup();
console.log("Webhook server is listening...");
```

2. Envoyez une requête POST à l'endpoint pour déclencher une sauvegarde :

```bash
curl -X POST http://localhost:3000/webhook/backup
```

### Sécurité

- Pensez à sécuriser votre webhook (authentification, IP whitelist, etc.) pour éviter tout déclenchement non autorisé.

---

## Remarque

Assurez-vous de ne jamais inclure vos vraies clés d'accès et autres informations sensibles dans votre code source, surtout si vous le partagez sur des plateformes publiques. Il est recommandé d'utiliser un fichier `.env` local et d'ajouter ce fichier au `.gitignore`.

