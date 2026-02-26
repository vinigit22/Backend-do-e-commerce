// src/controller/pedidoController.js
import * as repo from '../repository/pedidoRepository.js';
import { Router } from 'express';

const endpoints = Router();

// [POST] /api/pedido → cria novo pedido
endpoints.post('/pedido', async (req, resp) => {
  try {
    const { nome_cliente, email, telefone, cpf, observacao, itens } = req.body;

    // Validações básicas
    if (!nome_cliente || !email || !itens || itens.length === 0) {
      return resp.status(400).send({ 
        erro: 'Dados incompletos. Nome, email e itens são obrigatórios.' 
      });
    }

    // Inserir pedido principal
    const pedidoData = {
      nome_cliente,
      email,
      telefone: telefone || null,
      cpf: cpf || null,
      observacao: observacao || null,
      data_pedido: new Date()
    };

    const idPedido = await repo.inserirPedido(pedidoData);

    // Inserir itens do pedido
    for (const item of itens) {
      await repo.inserirItemPedido({
        idPedido,
        idProduto: item.idProduto,
        quantidade: item.quantidade,
        preco_unitario: item.preco_unitario
      });
    }

    resp.status(201).send({ 
      idPedido, 
      mensagem: 'Pedido criado com sucesso!' 
    });

  } catch (err) {
    console.error('Erro ao criar pedido:', err);
    resp.status(500).send({ erro: 'Erro ao criar pedido' });
  }
});

endpoints.get('/pedido', async (req, resp) => {
  try {
    const pedidos = await repo.listarPedidos();
    resp.status(200).send(pedidos);
  } catch (err) {
    console.error('Erro ao listar pedidos:', err);
    resp.status(500).send({ erro: 'Erro ao listar pedidos' });
  }
});


endpoints.get('/pedido/:id', async (req, resp) => {
  try {
    const pedido = await repo.buscarPedidoPorId(req.params.id);
    if (!pedido) {
      return resp.status(404).send({ erro: 'Pedido não encontrado' });
    }

    const itens = await repo.buscarItensPedido(req.params.id);
    
    resp.send({ ...pedido, itens });
  } catch (err) {
    console.error('Erro ao buscar pedido:', err);
    resp.status(500).send({ erro: 'Erro ao buscar pedido' });
  }
});

export default endpoints;