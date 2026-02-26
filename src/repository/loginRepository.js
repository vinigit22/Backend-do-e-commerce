import { connection } from '../repository/connection.js';
import crypto from 'crypto';

// Buscar login por email
export async function buscarLoginPorEmail(email) {
    const comando = `
        SELECT * FROM login WHERE email = ?
    `;
    const [registros] = await connection.query(comando, [email]);
    return registros[0];
}

// Gerar hash MD5
export function gerarHashMD5(senha) {
    return crypto.createHash('md5').update(senha).digest('hex');
}

// Criar admin manualmente
export async function criarAdmin(nome, email, senha) {
    const hash = gerarHashMD5(senha);

    const comando = `
        INSERT INTO login (nome, email, senha)
        VALUES (?, ?, ?)
    `;

    const [info] = await connection.query(comando, [nome, email, hash]);
    return info.insertId;
}
