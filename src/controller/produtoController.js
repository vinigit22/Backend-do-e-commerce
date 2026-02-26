import * as repo from '../repository/produtoRepository.js';
import { Router } from 'express';
import multer from 'multer';
import path from 'path';

const endpoints = Router();

// Configuração do multer para salvar imagens no diretório /uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads'),
  filename: (req, file, cb) => {
    const nome = Date.now() + path.extname(file.originalname);
    cb(null, nome);
  }
});
const upload = multer({ storage });


// ======================== ENDPOINTS ========================

// [GET] /api/produto → lista todos os produtos
endpoints.get('/produto', async (req, resp) => {
  try {
    const produtos = await repo.listarProdutos();
    resp.status(200).send(produtos);
  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: 'Erro ao listar produtos' });
  }
});

// [GET] /api/produto/:id → busca produto por ID
endpoints.get('/produto/:id', async (req, resp) => {
  try {
    const produto = await repo.buscarProdutoPorId(req.params.id);
    if (!produto)
      return resp.status(404).send({ erro: 'Produto não encontrado' });

    resp.send(produto);
  } catch (err) {
    resp.status(500).send({ erro: 'Erro ao buscar produto' });
  }
});

// [POST] /api/produto → cria novo produto com imagem
endpoints.post('/produto', upload.single('img'), async (req, resp) => {
  try {
    const { nome, quantidade, descricao, preco } = req.body;
    const img = req.file ? req.file.filename : null;

    const novoProduto = { nome, quantidade, descricao, preco, img };
    const id = await repo.inserirProduto(novoProduto);

    resp.status(201).send({ novoId: id, mensagem: 'Produto criado com sucesso!' });
  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: 'Erro ao criar produto' });
  }
});

// [PUT] /api/produto/:id → atualiza produto (opcionalmente com nova imagem)
endpoints.put('/produto/:id', upload.single('img'), async (req, resp) => {
  try {
    const { nome, quantidade, descricao, preco } = req.body;
    const img = req.file ? req.file.filename : req.body.img;
    const produto = { nome, quantidade, descricao, preco, img };

    const linhasAfetadas = await repo.alterarProduto(req.params.id, produto);
    if (linhasAfetadas === 0)
      return resp.status(404).send({ erro: 'Produto não encontrado' });

    resp.send({ mensagem: 'Produto atualizado com sucesso!' });
  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: 'Erro ao atualizar produto' });
  }
});

// [DELETE] /api/produto/:id → remove produto
endpoints.delete('/produto/:id', async (req, resp) => {
  try {
    const linhasAfetadas = await repo.deletarProduto(req.params.id);
    if (linhasAfetadas === 0)
      return resp.status(404).send({ erro: 'Produto não encontrado' });

    resp.send({ mensagem: 'Produto excluído com sucesso!' });
  } catch (err) {
    console.error(err);
    resp.status(500).send({ erro: 'Erro ao excluir produto' });
  }
});

export default endpoints;
