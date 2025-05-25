const MySqlS3Backup = require('./src/index.js');


const backup = new MySqlS3Backup
backup.runBackupProcess();