import { fastify } from 'fastify';
import 'dotenv/config';
import { DatabaseMySQL } from './database_mysql.js'

const database = new DatabaseMySQL();

const {PORT} = process.env;
console.log(`Variaveis de ambiente carregadas: ${PORT}`)

const server = fastify();

server.get('/', (request, reply) =>{
    return {message: 'Puta api foda caralho'};
});

server.listen({port:PORT}, (err, address) =>{
    if (err){
        console.error(err)
        process.exit(1)
    }
    console.log(`Servidor rodando em ${address}`);
})

server.post('/tarefas', async (request, reply) =>{
    const {titulo, descricao, status} = request.body;
    await database.create({
        titulo,
        descricao,
        status
    });
    console.log(await database.list());
    return reply.status(201).send();
})

server.get('/tarefas', async (request) =>{
    const search = request.query.search;
    console.log(search);
    const tarefas = await database.list(search);
    return tarefas;
})

server.put('/tarefas/:id', async (request, reply) =>{
    const tarefaId = request.params.id;
    const {titulo, descricao, status} = request.body;

    const tarefa = await database.update(tarefaId, {
        titulo,
        descricao,
        status
    });
    return reply.status(204).send();
})

server.delete('/tarefas/:id', async (request, reply) =>{
    const tarefaId = request.params.id;
    await database.delete(tarefaId);
    return reply.status(204).send();
})