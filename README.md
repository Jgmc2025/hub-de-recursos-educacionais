# 🚀 Hub Inteligente de Recursos Educacionais

Este projeto é uma aplicação Fullstack desenvolvida para centralizar e otimizar o gerenciamento de materiais didáticos. O diferencial estratégico é o **Smart Assist**, um assistente de IA configurado como um **Assistente Pedagógico** para gerar descrições e tags automáticas, agilizando o trabalho de conteudistas.

## 🛠️ Tecnologias Utilizadas

### Backend
- **Linguagem:** Python 3.12+
- **Framework:** FastAPI (RESTful API)
- **Validação:** Pydantic
- **ORM:** SQLAlchemy
- **Banco de Dados:** SQLite (persistência local)
- **IA:** Integração com LLM via Groq/OpenAI SDK

### Frontend
- **Framework:** React.js (SPA)
- **Estilização:** Tailwind CSS
- **Estado:** React Hooks e gerenciamento de *loading states* para IA

### DevOps & Observabilidade (Diferenciais)
- **CI:** Pipeline via GitHub Actions com Linting (Flake8)
- **Logs Estruturados:** Monitoramento de `TokenUsage` e `Latency`
- **Health Check:** Endpoint dedicado para verificação de status do sistema

## ✨ Funcionalidades

- [x] **CRUD de Recursos:** Cadastro, listagem com paginação, edição e exclusão de materiais.
- [x] **Campos Suportados:** Título, Descrição, Tipo (Vídeo, PDF, Link), URL e Tags.
- [x] **Smart Assist (IA):** Botão para geração automática de metadados pedagógicos.
- [x] **Observabilidade:** Logs técnicos detalhados para cada requisição de IA.
- [x] **Resiliência:** Tratamento de erros e mecanismo de *fallback* caso a API de IA falhe.
- [x] **Segurança:** Gestão de API Keys via variáveis de ambiente (.env).

## 🏗️ Arquitetura e IA (Prompt Engineering)

O sistema utiliza um **Prompt de Sistema** eficiente para garantir que a IA responda em formato **JSON estrito**. A IA é instruída a atuar como um "Assistente Pedagógico", garantindo que as descrições sejam úteis e educativas para os alunos.

Exemplo de log estruturado gerado (conforme requisito):
`[INFO] AI Request: Title="Matemática Financeira", TokenUsage=150, Latency=1.2s`

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- Python 3.10+
- Node.js 18+
- Uma API Key (Groq, Gemini ou OpenAI)

### Configuração do Backend
1. Navegue até a pasta: `cd backend`.
2. Crie e ative um ambiente virtual:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # Windows: .\venv\Scripts\activate