# Ponto Track Rastreamento App


Este é um projeto de cadastro de usuários para um sistema de rastreamento de veículos, utilizando React no frontend e Node.js no backend.


## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Executando o Projeto](#executando-o-projeto)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Acessando o Aplicativo](#acessando-o-aplicativo)
- [Contato](#contato)


## Sobre o Projeto

Este projeto tem como objetivo criar um sistema de cadastro de usuários para um sistema de rastreamento de veículos para um teste na Ponto Track Rastreamento de veículos.
O frontend foi desenvolvido com React utilizando Vite, Material UI com Styled Components e TypeScript. O backend foi desenvolvido com Node.js.
No banco de dados local está sendo utilizado o sqlite e em produção utilizou-se o Postgres

## Tecnologias Utilizadas

### Frontend

- React
- Vite
- Material UI
- Styled Components
- TypeScript

### Backend

- Node.js
- Fastify
- TypeScript

## Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install) ou [npm](https://www.npmjs.com/get-npm)

## Instalação

### Clonando o Repositório

```bash
git clone https://github.com/GabrielDomingoss/ponto-track-app.git
```

### Instalando as dependencias

#### Frontend 

```bash
cd ponto-track-app/ponto-track-web
yarn install
# ou
npm install
```

#### Backend

```bash
cd ponto-track-app/ponto-track-api
yarn install
# ou
npm install
```

## Executando o Projeto

### Frontend

Para iniciar o servidor de desenvolvimento do frontend:

```bash
cd ponto-track-app/ponto-track-web
yarn dev
# ou
npm run dev
```

### Backend

Para iniciar o servidor do backend:

```bash
cd ponto-track-app/ponto-track-api
yarn dev
# ou
npm run dev
```

## Estrutura do projeto

```plaintext
ponto-track-app/
├── ponto-track-web/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
├── ponto-track-api/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── index.ts
│   ├── package.json
│   ├── tsconfig.json
├── README.md
```

## Acessando o Aplicativo

O aplicativo pode ser acessado via nuvem nos seguintes links:

    Frontend: https://ponto-track-app.vercel.app
    Backend: https://ponto-track-app.onrender.com/

## Contato

Gabriel Domingos - gdomingoss11@gmail.com

Link do Projeto: https://github.com/GabrielDomingoss/ponto-track-app.git