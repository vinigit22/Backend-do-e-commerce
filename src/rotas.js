
import produtoController from '../src/controller/produtoController.js';
import loginController from '../src/controller/loginController.js';
import pedidoController from '../src/controller/pedidoController.js'
import express from 'express';

export function adicionarRotas(api) {
    api.use('/public/storage', express.static('public/storage'));
    api.use('/api', produtoController);
    api.use('/api', loginController);
    api.use('/api', pedidoController);
}

