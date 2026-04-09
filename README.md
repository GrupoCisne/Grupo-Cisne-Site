# Grupo Cisne — Agência de Marketing 360° & Soluções Tech

Este é o repositório oficial da Landing Page do **Grupo Cisne**. Uma interface premium construída com tecnologia de ponta para orquestrar metamorfoses digitais.

## 🚀 Tecnologias

- **Framework:** Next.js 14 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS + Framer Motion
- **Infraestrutura:** Docker + Traefik (HTTPS Automático)
- **Automação:** n8n (Integrado via Docker)
- **IA:** OpenRouter (Qwen 3.6 Plus) para Qualificação de Leads

## 🛠️ Configuração Local

1. Clone o repositório:
   ```bash
   git clone https://github.com/GrupoCisne/Grupo-Cisne-Site.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure o arquivo `.env` baseando-se no `.env.example`.
4. Rode o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## 🚢 Deploy (Produção)

O projeto está configurado para deploy via **Docker Compose** com suporte nativo a HTTPS via Traefik. Veja o [Guia de Deploy](deploy-guide.md) para detalhes.

```bash
docker-compose up -d --build
```

---
© 2026 Grupo Cisne. Todos os direitos reservados.