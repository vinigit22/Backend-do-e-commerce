// src/repository/pedidoRepository.js
import { connection } from './connection.js';

// ========== PEDIDO ==========

export async function inserirPedido(pedido) {
  const comando = `
    INSERT INTO pedido (nome_cliente, email, telefone, cpf, observacao, data_pedido)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  
  const [info] = await connection.query(comando, [
    pedido.nome_cliente,
    pedido.email,
    pedido.telefone,
    pedido.cpf,
    pedido.observacao,
    pedido.data_pedido
  ]);

  return info.insertId;
}

export async function listarPedidos() {
  const comando = `
    SELECT 
      p.*,
      COUNT(pf.id) as total_itens,
      SUM(pf.quantidade * pf.preco_unitario) as valor_total
    FROM pedido p
    LEFT JOIN pedido_final pf ON p.id = pf.idPedido
    GROUP BY p.id
    ORDER BY p.data_pedido DESC
  `;
  
  const [registros] = await connection.query(comando);
  return registros;
}

export async function buscarPedidoPorId(id) {
  const comando = `
    SELECT * FROM pedido WHERE id = ?
  `;
  
  const [registros] = await connection.query(comando, [id]);
  return registros[0];
}

// ========== ITENS DO PEDIDO ==========

export async function inserirItemPedido(item) {
  const comando = `
    INSERT INTO pedido_final (idPedido, idProduto, quantidade, preco_unitario)
    VALUES (?, ?, ?, ?)
  `;
  
  const [info] = await connection.query(comando, [
    item.idPedido,
    item.idProduto,
    item.quantidade,
    item.preco_unitario
  ]);

  return info.insertId;
}

export async function buscarItensPedido(idPedido) {
  const comando = `
    SELECT 
      pf.*,
      p.nome as nome_produto,
      p.img as img_produto,
      p.descricao as descricao_produto,
      (pf.quantidade * pf.preco_unitario) as subtotal
    FROM pedido_final pf
    INNER JOIN produto p ON pf.idProduto = p.id
    WHERE pf.idPedido = ?
  `;
  
  const [registros] = await connection.query(comando, [idPedido]);
  return registros;
}