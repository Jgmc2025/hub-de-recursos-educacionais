# 🚀 Hub Inteligente de Recursos Educacionais

Este projeto é uma aplicação Fullstack desenvolvida para centralizar e otimizar o cadastro de materiais didáticos. O grande diferencial é o **Smart Assist**, um assistente de IA que sugere descrições e tags automaticamente com base no título do recurso.

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **Linguagem:** Python 3.10+
- **Framework:** FastAPI
- **Validations:** Pydantic
- **Banco de Dados:** SQLite (ou PostgreSQL)
- **IA:** Google Gemini API (LLM)

### Frontend
- **Framework:** React.js
- **Estilização:** Tailwind CSS
- **Gerenciamento de Estado:** Hooks (useState/useEffect)

### DevOps & Qualidade
- **CI/CD:** GitHub Actions (Linting com Flake8)
- **Logs:** Logging estruturado com métricas de latência da IA.

---

## 🏗️ Arquitetura do Sistema

A aplicação segue o padrão de separação de responsabilidades:
- **Client-Side:** React com hooks para gerenciamento de estado assíncrono.
- **Server-Side:** FastAPI utilizando Injeção de Dependências para persistência de dados.
- **AI Layer:** Integração com LLMs via Groq com estratégia de **Fallback** (resiliência caso a API falhe).

## ✨ Funcionalidades

- [x] **CRUD Completo:** Gestão de vídeos, PDFs e links.
- [x] **Smart Assist:** Geração de metadados via IA para agilizar o trabalho do conteudista.
- [x] **Observabilidade:** Logs detalhados de tempo de resposta e uso de tokens da IA.
- [x] **Interface Responsiva:** Feedback visual de carregamento e tratamento de erros.
- [x] **Resiliência:** Mecanismo de fallback que garante o funcionamento do app mesmo com instabilidades na API de IA.

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- Python 3.10+
- Node.js 18+
- Uma API Key do Google Gemini (gratuita)

### Configuração do Backend
1. Entre na pasta `/backend`.
2. Crie um arquivo `.env` seguindo o modelo `.env.example`.
3. Instale as dependências: `pip install -r requirements.txt`.
4. Inicie o servidor: `uvicorn app.main:app --reload`.

### Configuração do Frontend
1. Entre na pasta `/frontend`.
2. Instale as dependências: `npm install`.
3. Inicie a aplicação: `npm start`.

---

## 🛡️ Segurança
As chaves de API são gerenciadas via variáveis de ambiente e o arquivo `.env` está devidamente listado no `.gitignore` para evitar vazamentos.