import { sql } from './db.js';

const createTableQuery = `
CREATE TABLE IF NOT EXISTS tarefas (
    id VARCHAR(255) PRIMARY KEY,
    titulo VARCHAR(255), 
    descricao TEXT,
    status ENUM('pendente', 'em andamento', 'concluida') DEFAULT 'pendente'
    );
    `;

sql.query(createTableQuery)
    .then(() =>{
        console.log("Deu certo pohaaa");
    })
    .catch((err) =>{
        console.error("Deu errado: ", err);
    });