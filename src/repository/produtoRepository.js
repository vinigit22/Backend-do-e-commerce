import {connection } from '../repository/connection.js';

export async function listarProdutos() {
    const comando = `
    SELECT * from produto
    `;
    const [registros] = await connection.query(comando);
    return registros;
}

export async function inserirProduto(produto) {
    const comando = `
    INSERT INTO produto(nome, quantidade, descricao, img, preco)
    VALUES(?, ?, ?, ?, ?)
    `;
    const [info] = await connection.query(comando, [
        produto.nome,
        produto.quantidade,
        produto.descricao,
        produto.img,
        produto.preco
    ]);

    return info.insertId;
}

export async function deletarProduto(id) {
    const comando = `
    DELETE FROM produto WHERE id = ?
    `;
    const [info] = await connection.query(comando, [id]);
    return info.affectedRows;
}

export async function alterarProduto(id, produto) {
    const comando = `
    UPDATE produto
    SET nome = ?,
        quantidade = ?,
        descricao = ?,
        img = ?,
        preco = ?
        WHERE id = ?
    `;
    const [info] = await connection.query(comando, [
         produto.nome,
        produto.quantidade,
        produto.descricao,
        produto.img,
        produto.preco,
        id  
    ]);
    return info.affectedRows;
}

export async function buscarporId(id) {
    const comando = `
    SELECT *
    FROM produto
    WHERE id = ?
    `;
    const [registros] = await connection.query(comando, [id]);
    return registros[0];
}
   
        