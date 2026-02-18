
# 🚗 Rovera Consórcio – Desafio Front-End

Landing page e dashboard desenvolvidos como solução para o desafio técnico de Front-End.

O projeto simula a jornada de um usuário interessado em realizar uma simulação de consórcio, incluindo autenticação social e persistência de dados.

Link Vercel: https://rovera-lp.vercel.app/
Link Repositório: https://github.com/LidianeAlencar/rovera
Link .env.local ( pra facilitar o teste local ) **enviado separado**

---

## 📌 Tecnologias Utilizadas

- **Next.js 16**
- **React 19**
- **TailwindCSS 4**
- **NextAuth (GitHub + Google OAuth)**
- **Supabase (Banco de Dados)**
- **Framer Motion (animações)**
- **Lucide React (ícones)**
- **Vercel (deploy)**

---

## 🎯 Funcionalidades Implementadas

### 🔐 Autenticação
- Login com GitHub
- Login com Google
- Redirecionamento automático após autenticação
- Proteção de área interna (Dashboard)

### 🏠 Landing Page
- Layout Desktop e Mobile
- Animações suaves
- Estrutura otimizada com Tailwind

### 📊 Dashboard
- Exibição de dados do usuário autenticado
- Simulação de consórcio
- Cálculo dinâmico de parcelas
- Feedback visual da simulação
- Tela de sucesso

### 🧾 Persistência de Dados
- Integração com Supabase
- Registro de leads
- Armazenamento de simulações

---

## 🗂 Estrutura do Projeto

app/  
├── api/  
│ ├── auth/  
│ └── leads/  
├── dashboard/  
├── leads/  
├── page.tsx  
components/  
lib/  
├── auth.ts  
└── supabase.ts


### Organização

- `app/` → Rotas (App Router)
- `components/` → Componentes reutilizáveis
- `lib/` → Configurações (Auth, Supabase)
- `api/` → Rotas server-side

---

## 🛠 Como Rodar Localmente

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/LidianeAlencar/rovera
cd rovera-landing

npm install

GITHUB_ID=
GITHUB_SECRET=
GOOGLE_ID=
GOOGLE_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

npm run dev
http://localhost:3000
