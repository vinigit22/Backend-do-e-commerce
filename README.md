# 🧶 E-commerce Amigurumi(nome do e-commerce) - Backend

API REST em Node.js para gerenciamento de loja de amigurumi com finalização de pedidos via WhatsApp.

## 💡 Sobre o Projeto

Sistema de e-commerce onde o cliente realiza o pedido pelo site e finaliza o atendimento via WhatsApp.

## 🛠️ Tecnologias

- Node.js
- Express
- MySQL
- JWT (autenticação)
- MD5 (criptografia de senha)
- Dotenv

## 🚀 Como rodar

1. Clone o repositório:
```bash
git clone https://github.com/vinigit22/amigurumi-backend.git
```

2. Instale as dependências:
```bash
npm install
```

3. Crie as tabelas no MySQL com o script:
```sql
CREATE TABLE IF NOT EXISTS login (...)
CREATE TABLE IF NOT EXISTS produto (...)
CREATE TABLE IF NOT EXISTS pedido (...)
CREATE TABLE IF NOT EXISTS pedido_final (...)
CREATE TABLE IF NOT EXISTS rendimento (...)
```
no proprio backend tera o script do banco e da senha ja colocada para acessar o admin(Usamos md5 login feito pelo banco de dados) para testar e cadastrar novos produtos.

5. Rode o projeto:

npm start

## 📡 Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /api/login | Autenticação JWT |
| GET | /api/produtos | Listar produtos |
| POST | /api/produtos | Criar produto (admin) |
| PUT | /api/produtos/:id | Editar produto (admin) |
| DELETE | /api/produtos/:id | Excluir produto (admin) |
| POST | /api/pedidos | Criar pedido |
| GET | /api/pedidos | Listar pedidos (admin) |

## 🗄️ Banco de Dados

| Tabela | Descrição |
|--------|-----------|
| login | Administradores do sistema |
| produto | Catálogo de produtos |
| pedido | Pedidos realizados |
| pedido_final | Itens de cada pedido |
| rendimento | Controle de rendimento |

## 👤 Autor
[vinigit22](https://github.com/vinigit22)
