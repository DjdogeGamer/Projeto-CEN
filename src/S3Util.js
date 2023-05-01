// S3Util.js
const AWS = require('aws-sdk');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const os = require('os');
const path = require('path');

class S3Util {
    constructor(bucketName, accessKeyId, secretAccessKey) {
        // Configuração do SDK da AWS
        AWS.config.update({
            accessKeyId,
            secretAccessKey
        });

        // Criação do objeto S3
        this.s3 = new AWS.S3({apiVersion: '2006-03-01'});
        this.bucketName = bucketName;
    }


    executeQuery(sqlQuery, fileName, callback) {
        // Baixa o arquivo SQLite para a pasta temporária
        this.tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'game-'));
        this.tempFilePath = path.join(this.tempDir, fileName);

        this.s3.getObject({
            Bucket: this.bucketName,
            Key: fileName
        }, (err, data) => {
            if (err) {
                console.error(err);
            } else {
                fs.writeFile(this.tempFilePath, data.Body, (err) => {
                    if (err) {
                        console.error(err);
                    } else {
                        // Cria um objeto SQLite3 a partir do arquivo temporário
                        const db = new sqlite3.Database(this.tempFilePath);

                        // Faz uma consulta simples no banco de dados
                        db.all(sqlQuery, (err, rows) => {
                            if (err) {
                                console.error(err);
                            } else {
                                callback(rows);
                            }

                            db.close(); // fechar a conexão com o banco de dados SQLite

                            // Envia o arquivo temporário para o S3
                            fs.readFile(this.tempFilePath, (err, data) => {
                                if (err) {
                                    console.error(err);
                                } else {
                                    // Envia o arquivo temporário para o S3
                                    this.s3.putObject({
                                        Bucket: this.bucketName,
                                        Key: fileName,
                                        Body: data
                                    }, (err) => {
                                        if (err) {
                                            console.error(err);
                                        } else {
                                            console.log('Arquivo atualizado no S3 com sucesso.');
                                        }

                                        // Remove o arquivo temporário
                                        fs.unlink(this.tempFilePath, (err) => {
                                            if (err) {
                                                console.error(err);
                                            } else {
                                                console.log('Arquivo temporário removido com sucesso.');
                                            }
                                        });
                                    });
                                }
                            });
                        });
                    }
                });
            }
        });
    }

    loadAsset(fileName, callback) {
        // Pega o arquivo do S3 e retorna o conteúdo para o callback
        this.s3.getObject({
            Bucket: this.bucketName,
            Key: fileName
        }, (err, data) => {
            if (err) {
                console.error(err);
            } else {
                callback(data.Body);
            }
        });
    }
}

module.exports = S3Util;
