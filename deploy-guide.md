# Guia de Deploy: Digital Ocean + Hostinger + GitHub

Este é o guia final para colocar a página do **Grupo Cisne** e sua automação no ar.

## Passo 1: Apontamento na Hostinger

1. Faça login na **Hostinger** e acesse a zona de DNS do domínio `grupocisne.com.br`.
2. Delete todos os registros "A" antigos que apontam para servidores web da Hostinger (deixe os de e-mail seguros).
3. Adicione um Registro **A** apontando para o IP do Droplet que você vai criar na Digital Ocean.
   - **Nome/Host:** `@`
   - **Aponta para:** `IP_DA_DIGITAL_OCEAN`
4. Adicione um Registro **CNAME** para subdomínios (Opcional, mas útil):
   - **Nome:** `www`
   - **Aponta para:** `grupocisne.com.br`
5. Adicione um Registro **A** para o n8n:
   - **Nome:** `n8n`
   - **Aponta para:** `IP_DA_DIGITAL_OCEAN`

*(Lembrando que o DNS pode levar até 24 horas para propagar, embora costuma ser em 10 minutos hoje em dia)*.

## Passo 2: O Servidor (Digital Ocean)

1. Entre na **Digital Ocean** e clique em **Create > Droplet**.
2. **Choose an Image:** Escolha a aba "Marketplace" e procure por **Docker** (Ubuntu with Docker).
3. **Choose a Plan:** Suba a máquina mais barata (Basic, $6/month) já é suficiente para começar.
4. **Authentication:** Adicione sua chave SSH ou defina uma senha.
5. Crie o Droplet e anote o IP.

## Passo 3: Colocando o Código no GitHub

1. Abra o **GitHub Desktop**, adicione a pasta atual como seu repositório local e faça o upload (`Publish repository`) para sua conta do GitHub.
2. Certifique-se de que a pasta base do seu repositório inclua os nossos arquivos finais criados aqui (o app Next.js, o `Dockerfile` e o `docker-compose.yml`).

## Passo 4: Subindo o Projeto usando Docker

Conecte-se ao seu Droplet (Terminal/CMD):
```bash
ssh root@IP_DA_DIGITAL_OCEAN
```

Dentro da máquina, faça o clone do seu projeto:
```bash
git clone ENDERECO_DO_SEU_REPOSITORIO.git projeto-cisne
cd projeto-cisne
```

**Suba os contêineres:**
```bash
# Isso vai baixar a imagem do n8n, do traefik e vai criar (build) a imagem do seu Next.js.
docker-compose up -d --build
```

**O que vai acontecer magicamente?**
- O **Traefik** vai nascer na porta 80/443 e interceptar sua conexão. Ele vai solicitar o certificado SSL gratuitamente via Let's Encrypt para `grupocisne.com.br` e `n8n.grupocisne.com.br`.
- O seu site Next.js vai ficar na raiz.
- O seu n8n estará acessível seguro com cadeado verde via `https://n8n.grupocisne.com.br` usando a base SQLite embarcada para extrema velocidade e custos menores.
