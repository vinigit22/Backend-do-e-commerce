import { Router } from 'express';
import * as repo from '../repository/loginRepository.js';
import { gerarToken, verificarToken } from '../utils/jwt.utils.js';

const endpoints = Router();

// POST /api/login
endpoints.post('/login', async (req, resp) => {
    try {
        const { email, senha } = req.body;

        const user = await repo.buscarLoginPorEmail(email);
        if (!user)
            return resp.status(401).send({ erro: 'Email não encontrado' });

        const hash = repo.gerarHashMD5(senha);
        if (hash !== user.senha)
            return resp.status(401).send({ erro: 'Senha incorreta' });

        const token = gerarToken({
            id: user.id,
            nome: user.nome,
            email: user.email
        });

        resp.send({
            token,
            id: user.id,
            nome: user.nome,
            email: user.email
        });

    } catch (err) {
        console.error(err);
        resp.status(500).send({ erro: 'Erro ao fazer login' });
    }
});

// Middleware de admin
export const verifyAdmin = (req, resp, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token)
        return resp.status(401).send({ erro: "Token não fornecido" });

    const user = verificarToken(token);
    if (!user)
        return resp.status(403).send({ erro: "Token inválido" });

    req.user = user;
    next();
};

export default endpoints;
