# Siberia

![Next.js](https://img.shields.io/badge/Next.js-15.3.1-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-6.7.0-darkblue?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16.0-blue?style=for-the-badge&logo=postgresql)

## 📋 Sobre o Projeto

Este é um projeto desenvolvido com Next.js 15, React 19, TypeScript e Prisma. O projeto implementa um sistema de autenticação completo com suporte a login tradicional e autenticação via Google.

## 🚀 Tecnologias Utilizadas

- **Framework**: Next.js 15.3.1
- **Linguagem**: TypeScript 5.0
- **Banco de Dados**: PostgreSQL
- **ORM**: Prisma 6.7.0
- **Autenticação**: NextAuth.js 5.0.0-beta.27
- **UI Components**: shadcn/ui
- **Estilização**: Tailwind CSS 4
- **Formulários**: React Hook Form + Zod
- **Gerenciamento de Estado**: React Hooks
- **Notificações**: Sonner

## 🛠️ Configuração do Ambiente

### Pré-requisitos

- Node.js (versão 18 ou superior)
- PostgreSQL
- pnpm (gerenciador de pacotes)

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DB_URL="postgresql://usuario:senha@localhost:5432/siberia"
NEXTAUTH_SECRET="sua-chave-secreta"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="seu-client-id"
GOOGLE_CLIENT_SECRET="seu-client-secret"
```

### Instalação

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
cd siberia
```

2. Instale as dependências:
```bash
pnpm install
```

3. Execute as migrações do Prisma:
```bash
pnpm prisma migrate dev
```

4. Inicie o servidor de desenvolvimento:
```bash
pnpm dev
```

## 📁 Estrutura do Projeto

```
src/
├── app/            # Rotas e páginas (App Router)
├── components/     # Componentes reutilizáveis
├── config/         # Configurações do projeto
├── lib/            # Utilitários e funções auxiliares
├── pages/          # Rotas e páginas (Pages Router)
├── styles/         # Estilos globais
├── types/          # Definições de tipos TypeScript
├── validations/    # Schemas de validação Zod
├── auth.ts         # Configuração de autenticação
└── middleware.ts   # Middleware Next.js
```

## 🔐 Autenticação

O projeto implementa dois métodos de autenticação:

1. **Autenticação Tradicional**
   - Login com email e senha
   - Senhas são hasheadas com bcryptjs

2. **Autenticação Google**
   - Login via OAuth 2.0
   - Integração com NextAuth.js

## 📦 Principais Dependências

- **@prisma/client**: ORM para interação com o banco de dados
- **next-auth**: Gerenciamento de autenticação
- **react-hook-form**: Gerenciamento de formulários
- **zod**: Validação de dados
- **@radix-ui**: Componentes de UI acessíveis
- **tailwindcss**: Framework CSS
- **sonner**: Sistema de notificações

## 🚀 Scripts Disponíveis

- `pnpm dev`: Inicia o servidor de desenvolvimento
- `pnpm build`: Gera a build de produção
- `pnpm start`: Inicia o servidor de produção
- `pnpm lint`: Executa o linter

## 📝 Modelo de Dados

### User
- `id`: Int (PK)
- `email`: String (Unique)
- `password`: String
- `phone`: String (Optional)
- `createdAt`: DateTime
- `updatedAt`: DateTime

### UserGoogle
- `id`: Int (PK)
- `userId`: String
- `googleId`: String
- `createdAt`: DateTime
- `updatedAt`: DateTime

## 🤝 Contribuição

Este é um projeto de entrevista, mas sinta-se à vontade para explorar o código e sugerir melhorias!

## 📄 Licença

Este projeto está sob a licença MIT.
