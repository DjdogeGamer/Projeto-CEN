const SQLiteS3 = require('./SQLiteS3');

const bucketName = 'sqlite-js-ispg-test';
const fileName = 'db.sqlite';
const accessKeyId = 'AKIA4ZDOYH5F6H3ASIGQ';
const secretAccessKey = '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';

const sql_query = 'SELECT * FROM tabela_teste';

const sqliteS3 = new SQLiteS3(bucketName, fileName, accessKeyId, secretAccessKey);

sqliteS3.executeQuery(sql_query, (rows) => {
    console.log(rows);
} );


