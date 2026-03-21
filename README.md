# CineFinder - Catálogo de Filmes e Séries

Aplicação web completa para descoberta, navegação e gerenciamento de filmes e séries de TV, construída com React e integrada à API do TMDB (The Movie Database). O projeto oferece uma experiência cinematográfica imersiva com player nativo, sistema de watchlist pessoal e interface responsiva para todos os dispositivos.

## Funcionalidades

### Navegação e Descoberta
- **Home**: Exibe filmes em destaque com backdrop hero, tendências do dia/semana e carrosséis interativos de categorias (populares, mais bem avaliados, em cartaz, próximos lançamentos)
- **Filmes**: Catálogo completo com filtros por gênero, ano, país, ordenação (popularidade, nota, data), paginação e infinite scroll
- **Séries**: Catálogo de séries com filtros por gênero, status (em exibição, finalizada, planejada), tipo (documentário, reality, scripted) e ordenação
- **Próximos Lançamentos**: Filmes que serão lançados brevemente com contagem regressiva

### Busca Inteligente
- **Busca multi-tipo**: Pesquisa simultânea de filmes e séries em uma única consulta
- **Resultados separados**: Exibição organizada por categoria (Filmes e Séries) com contagem individual
- **Paginação**: Navegação entre páginas de resultados

### Página de Detalhes Cinematográfica
- **Hero backdrop**: Background dinâmico com gradientes e blur baseados na imagem do título
- **Informações completas**: Sinopse expandível, nota IMDb/TMDB, gêneros, idioma, duração
- **Elenco**: Carrossel horizontal com fotos e nomes dos atores
- **Vídeos**: Player nativo para trailers e teasers com seletor de vídeos
- **Mais detalhes**: Cards com informações de produção, orçamento, bilheteria, redes
- **Sugestões**: Lista de títulos similares para descoberta

### Player de Vídeo
- Reprodução de trailers e vídeos de prévia via YouTube/Vimeo
- Controles de play/pause, mute, fullscreen
- Seletor de vídeos alternativos
- Autoplay no hover com delay configurável
- Overlays cinematográficos (vignette, gradientes)

### Sistema de Watchlist
- Adicionar/remover títulos da lista pessoal
- Sincronização com backend Appwrite
- Persistência de dados na nuvem
- Notificações toast para feedback de ações

### Interface e UX
- **Tema escuro**: Design premium otimizado para consumo de mídia
- **Responsividade**: Adaptada para desktop, tablet e mobile
- **Animações suaves**: Transições e hover effects com carrosséis drag-free
- **Performance**: Cache inteligente com TanStack Query, lazy loading de imagens
- **Acessibilidade**: Navegação por teclado, atributos ARIA

## Stack Tecnológica

### Frontend
- **React 18** - Framework principal com Concurrent Features
- **TypeScript** - Tipagem estática para maior segurança
- **Vite** - Build tool ultrarrápido com HMR
- **TailwindCSS v4** - Framework CSS utility-first com designs responsivos

### Estado e Dados
- **TanStack Query v5** - Gerenciamento de cache, paginação e sincronização
- **React Router v7** - Roteamento declarativo com nested routes

### Integrações
- **TMDB API v3** - Base de dados completa de filmes, séries e celebridades
- **Appwrite** - Backend BaaS para persistência da watchlist

### Bibliotecas UI
- **Embla Carousel** - Carrosséis touch-friendly e drag-free
- **React Player** - Player universal para YouTube/Vimeo/Daily Motion
- **Lucide React** - Ícones consistentes e minimalistas
- **Sonner** - Notificações toast elegantes
- **React Use** - Hooks utilitários (debounce, localStorage, etc.)

## Pré-requisitos

- Node.js 18+
- NPM ou PNPM
- Conta no [TMDB](https://www.themoviedb.org/) com API key
- (Opcional) Conta no [Appwrite](https://appwrite.io/) para watchlist

## Configuração

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd movie-app
```

2. Instale as dependências:
```bash
npm install
# ou
pnpm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Edite o arquivo `.env` com suas credenciais:

```env
# TMDB API (obrigatório)
VITE_TMDB_API_KEY=sua_chave_api_tmdb
VITE_API_BASE_URL=https://api.themoviedb.org/3

# Appwrite (opcional - para watchlist)
VITE_APPWRITE_PROJECT_ID=seu_project_id
VITE_APPWRITE_DATABASE_ID=seu_database_id
VITE_APPWRITE_COLLECTION_ID=sua_collection_id
```

### Obtendo a API Key do TMDB

1. Acesse [themoviedb.org](https://www.themoviedb.org/)
2. Crie uma conta ou faça login
3. Vá em **Settings** > **API**
4. Gere uma nova API key
5. Copie a chave para `VITE_TMDB_API_KEY`

### Configurando o Appwrite (opcional)

Para ativar a funcionalidade de watchlist:

1. Crie um projeto no [Appwrite](https://appwrite.io/)
2. Crie um banco de dados com os seguintes campos:
   - `userId` (string) - ID do usuário
   - `mediaId` (integer) - ID do filme/série
   - `mediaType` (string) - "movie" ou "tv"
   - `title` (string) - Título
   - `posterPath` (string) - Caminho do poster
   - `createdAt` (datetime) - Data de adição
3. Adicione os IDs nas variáveis de ambiente

## Executando o Projeto

### Desenvolvimento
```bash
npm run dev
```
A aplicação estará disponível em `http://localhost:5173`

### Build para Produção
```bash
npm run build
```

### Preview do Build
```bash
npm run preview
```

## Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Gera build de produção |
| `npm run preview` | Preview do build de produção |
| `npm run lint` | Executa linter ESLint |

## Estrutura do Projeto

```
src/
├── api/           # Cliente Axios com interceptors
├── components/    # Componentes reutilizáveis
│   ├── dialog/    # Modais de detalhes e tendências
│   ├── movie-card/    # Card de filme
│   ├── tv-show-card/ # Card de série
│   ├── movie-carousel/   # Carrossel de filmes
│   ├── tv-show-carousel/ # Carrossel de séries
│   ├── nav.tsx    # Navegação principal
│   ├── player.tsx # Player de vídeo
│   └── ...
├── constants/     # Rotas, opções de filtro, configurações
├── hooks/        # Custom hooks (debounce, localStorage)
├── lib/          # Utilitários (Appwrite, query client)
├── pages/        # Páginas da aplicação
│   ├── home/     # Página inicial
│   ├── movies/    # Catálogo de filmes
│   ├── series/   # Catálogo de séries
│   ├── search/   # Busca multi-tipo
│   ├── upcoming/ # Próximos lançamentos
│   ├── watch/    # Detalhes de filme
│   └── watch/tv-show/ # Detalhes de série
├── provider/     # Context providers (query, router)
├── queries/      # Hooks TanStack Query (useGetMovie, useGetSeries, etc)
├── services/     # Serviços API (filmes, séries, busca)
└── types/        # Definições TypeScript (interfaces TMDB)
```

## API Reference

Este projeto utiliza a [TMDB API v3](https://developer.themoviedb.org/docs/getting-started). Endpoints principais:

- `/movie/popular` - Filmes populares
- `/movie/upcoming` - Próximos lançamentos
- `/movie/now_playing` - Em cartaz
- `/trending/movie/{time_window}` - Tendências de filmes
- `/trending/tv/{time_window}` - Tendências de séries
- `/tv/popular` - Séries populares
- `/tv/{id}` - Detalhes de série
- `/search/multi` - Busca multi-tipo (filmes + séries)
- `/discover/movie` - Descobrir filmes com filtros
- `/discover/tv` - Descobrir séries com filtros
- `/{type}/{id}/videos` - Vídeos de um título
- `/{type}/{id}/credits` - Elenco e crew

## Licença

MIT
