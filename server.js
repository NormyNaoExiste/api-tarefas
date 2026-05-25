import { fastify } from 'fastify';
import 'dotenv/config';

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