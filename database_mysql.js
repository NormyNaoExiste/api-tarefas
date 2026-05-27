import {randomUUID} from 'node:crypto';
import { sql } from "./db.js";

export class DatabaseMYSQL{

    async create(tarefa){
        const tarefaId = randomUUID();
        const { title, description, status } = tarefa;

        await sql.execute(
            'INSERT INTO tarefas (id, titulo, descricao, status) VALUES (?, ?, ?, ?)',
            [tarefaId, title, description, status ?? false]
        );
    }

    async update(id, tarefa){
        const { titulo, descricao, status } = tarefa;

        await sql.execute(
            'UPDATE tarefas SET titulo = ?, descricao = ?, status = ? WHERE id = ?',
            [titulo, descricao, status, id]
        );
    }

    async delete(id){
        await sql.execute('DELETE FROM tarefas WHERE id = ?', [id]);
    }


}