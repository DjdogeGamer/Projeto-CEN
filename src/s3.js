const AWS = require('aws-sdk');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const os = require('os');
const path = require('path');

// Configuração do SDK da AWS
AWS.config.update({
    accessKeyId: 'AKIA4ZDOYH5FWHZQYJHU',
    secretAccessKey: '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'
});

// Criação do objeto S3
const s3 = new AWS.S3({apiVersion: '2006-03-01'});

// Parâmetros do bucket e do arquivo SQLite
const bucketName = 'sqlite-js-ispg-test';
const fileName = 'db.sqlite';

// Caminho para a pasta temporária do projeto
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'game-'));

// Caminho para o arquivo SQLite temporário
const tempFilePath = path.join(tempDir, fileName);

// Query para ser executada no banco de dados SQLite
const sql_query = 'SELECT * FROM tabela_teste';

// Baixa o arquivo SQLite para a pasta temporária
s3.getObject({
    Bucket: bucketName,
    Key: fileName
}, function (err, data) {
    if (err) {
        console.error(err);
    } else {
        fs.writeFile(tempFilePath, data.Body, function (err) {
            if (err) {
                console.error(err);
            } else {
                // Cria um objeto SQLite3 a partir do arquivo temporário
                const db = new sqlite3.Database(tempFilePath);

                // Faz uma consulta simples no banco de dados
                db.all(sql_query, function (err, rows) {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(rows);
                    }

                    db.close(); // fechar a conexão com o banco de dados SQLite

                    // Envia o arquivo temporário para o S3
                    fs.readFile(tempFilePath, function (err, data) {
                        if (err) {
                            console.error(err);
                        } else {
                            // Envia o arquivo temporário para o S3
                            s3.putObject({
                                Bucket: bucketName,
                                Key: fileName,
                                Body: data
                            }, function (err, data) {
                                if (err) {
                                    console.error(err);
                                } else {
                                    console.log('Arquivo atualizado no S3 com sucesso');
                                }

                                // Remove o arquivo temporário
                                fs.unlink(tempFilePath, function (err) {
                                    if (err) {
                                        console.error(err);
                                    } else {
                                        console.log('Arquivo temporário removido com sucesso');
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