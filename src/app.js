import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { adicionarRotas } from './rotas.js';

const api = express();
api.use(cors());
api.use(express.json());

// Servir imagens
api.use('/uploads', express.static('public/uploads'));

// Rotas da API
adicionarRotas(api);

const PORT = process.env.PORT || 3000;
api.listen(PORT, () => console.log(`👍 API rodando na porta ${PORT}`));
