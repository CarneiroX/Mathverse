// incluir a dependência MySql
const mysql = require('mysql2');

// criar a conexão com o MySql
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mathverse',
});

connection.connect( function(err){
    console.log("Conexão com o banco de dados realizada com sucesso.")
})

connection.query(" SELECT * FROM atividades", function(err, rows, fields){
    if (!err) {
        console.log("Resultadp: ", rows);
    } else {
        console.log('Erro: consulta não realizada.');
    }
})