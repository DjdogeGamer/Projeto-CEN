const S3Util = require('./S3Util');
const bucketName = 'sqlite-js-ispg-test';
const fileName = 'db.sqlite';
const accessKeyId = 'AKIA4ZDOYH5F6H3ASIGQ';
const secretAccessKey = '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';

const sql_query = 'SELECT * FROM tabela_teste';

const s3Util = new S3Util(bucketName, accessKeyId, secretAccessKey);

s3Util.executeQuery(sql_query, fileName, (rows) => {
    console.log(rows);
});


