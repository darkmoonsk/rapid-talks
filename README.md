# RapidTalks

## Descrição

RapidTalks é uma aplicação web em React construída com o framework Next.js. O objetivo principal da aplicação é realizar a comunicação em tempo real entre usuários por meio de mensagens.

## Tecnologias Utilizadas

- **React**: Uma biblioteca JavaScript para construir interfaces de usuário.
- **Next.js**: Um framework React para construir aplicações web renderizadas no servidor e estáticas, foi escolhido para possibilitar implementação do lado backend da aplicação.
- **TypeScript**: Um superconjunto tipado de JavaScript para desenvolvimento robusto e escalável.
- **Mongoose**: Um ODM (Object Data Modeling) para MongoDB e Node.js.
- **Next-auth**: Uma biblioteca para autenticação em aplicações Next.js.
- **Pusher**: Um serviço para comunicação e colaboração em tempo real.

## Estrutura do Projeto

O projeto é organizado nos seguintes diretórios e arquivos:

- `public`: Contém imagens e outros recursos estáticos.
- `src`: Diretório principal do código fonte.
  - `app`: Contém o código específico da aplicação.
    - `auth`: Código relacionado à autenticação.
    - `root`: Código das páginas principais da aplicação.
    - `api`: Rotas da API, organizadas por módulos.
    - `favicon.ico`: Ícone da aplicação.
    - `globals.css`: Estilos globais para a aplicação.
  - `components`: Componentes React reutilizáveis.
  - `contexts`: Provedores de contexto React para gerenciamento de estado(Popups e Autenticação).
  - `database`: Código relacionado a configuração do banco de dados.
  - `middleware.ts`: Funções de middleware para manipulação de requisições(Autenticação).
  - `models`: Interfaces e classes TypeScript para definição de modelos de dados.
  - `utils`: Funções e módulos utilitários.
- `tailwind.config.ts`: Configuração do framework Tailwind CSS.
- `tsconfig.json`: Arquivo de configuração do TypeScript.

## Instalação e Execução

Para instalar e executar o projeto localmente, siga os passos abaixo:

1. Clone o repositório:
   ```
   git clone https://github.com/darkmoonsk/rapid-talks.git
   ```
2. Navegue até o diretório do projeto:
   ```
   cd rapid-talks
   ```
3. Instale as dependências:
   ```
   npm install
   ```
4. Inicie o servidor de desenvolvimento:
   ```
   npm run dev
   ```
5. Abra o navegador e acesse `http://localhost:3000`.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
```