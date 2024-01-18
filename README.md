# Sistema de Registro e Login

Este é um projeto prático que implementa um sistema de registro e login utilizando Node.js, Express, MongoDB, e TypeScript. A aplicação oferece recursos essenciais para autenticação de usuários e gerenciamento de contas.

## Tecnologias Utilizadas

- **Node.js e Express:** Servidor backend para manipulação de requisições HTTP.
- **MongoDB com Mongoose:** Banco de dados NoSQL para armazenar dados de usuários.
- **bcrypt:** Criptografia segura de senhas para armazenamento seguro.
- **jsonwebtoken:** Geração e verificação de tokens para autenticação.
- **dotenv:** Configuração de variáveis de ambiente para ambientes diferentes.
- **TypeScript:** Linguagem de programação tipada para maior robustez no código.

## Configuração do Ambiente

1. **Instalação de Dependências:**
   ```bash
   npm install
Configuração do Banco de Dados:

Configure as variáveis de ambiente no arquivo .env (copie o exemplo em .env.example).
Certifique-se de ter um servidor MongoDB em execução.

Execução do Projeto:

npm run start

## Funcionalidades

Registro de Usuários: Cadastro de novos usuários com validação de campos.
Login: Autenticação de usuários registrados.
Proteção de Rotas: Utilização de tokens para proteger rotas sensíveis.
Consulta de Usuários: Recurso para visualizar informações do próprio usuário.

## Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues, enviar pull requests ou fornecer sugestões para melhorias
