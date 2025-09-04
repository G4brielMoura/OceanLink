# 🧠 GMCreative - Portfólio com Next.js

Este é um projeto moderno de portfólio desenvolvido com [Next.js](https://nextjs.org/), utilizando TypeScript, componentes reutilizáveis e boas práticas de organização. Ideal para exibição de projetos, contatos e informações pessoais de forma profissional.

---

## 🚀 Tecnologias Utilizadas

- [Next.js](https://nextjs.org/)
- TypeScript
- CSS Modules
- Estrutura de rotas por pastas (`app/`)
- Fontes otimizadas com `next/font`
- Deploy com [Vercel](https://vercel.com)

---

## 🧭 Estrutura do Projeto

```bash
GMCREATIVE/
│
├── public/                # Imagens e ícones públicos
│   └── images/            # SVGs e logos
│
├── src/
│   ├── app/               # Estrutura de páginas (routes)
│   │   ├── _components/   # Componentes reutilizáveis (header, footer, etc)
│   │   ├── about/         # Página "Sobre mim"
│   │   ├── contacts/      # Página de contato
│   │   └── page.tsx       # Página inicial (home)
│
│   ├── lib/               # Utilitários e funções auxiliares
│
├── .env.local             # Variáveis de ambiente (não versionadas)
├── next.config.js         # Configuração do Next.js
├── tsconfig.json          # Configuração do TypeScript
└── README.md              # Este arquivo
```

---

## 🛠️ Como Rodar Localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn
# ou
pnpm install
```

### 3. Inicie o servidor de desenvolvimento

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para ver o resultado.

---

## ✍️ Como Editar o Projeto

As páginas principais estão localizadas em `src/app/`:

- `page.tsx`: página principal
- `about/page.tsx`: sobre mim
- `contacts/page.tsx`: contato

Os componentes reutilizáveis ficam em `src/app/_components/`:

- `header.tsx`
- `footer.tsx`
- `form.tsx` (formulário de contato)
- `pagewrapper.tsx`, etc.

---

## 🔄 Deploy

Este projeto está pronto para deploy automático com a [Vercel](https://vercel.com):

1. Crie uma conta na [Vercel](https://vercel.com)
2. Clique em "New Project"
3. Conecte seu repositório GitHub
4. A Vercel detecta automaticamente que é um projeto Next.js

---

## 📚 Recursos Adicionais

- [Documentação do Next.js](https://nextjs.org/docs)
- [Tutorial interativo Next.js](https://nextjs.org/learn)
- [Repositório oficial no GitHub](https://github.com/vercel/next.js)

---

## 📩 Contato

Caso queira entrar em contato ou contribuir, envie uma mensagem ou abra uma _issue_ no repositório.

---

### ✅ To-Do Futuro (Sugestões)

- Integração com banco de dados (Ex: MySQL/PostgreSQL)
- Formulário com backend real
- Tema escuro/claro
- Testes automatizados com Jest ou Playwright
