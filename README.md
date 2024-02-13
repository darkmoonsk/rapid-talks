# Rapid Talks

![rapid-talks](https://github.com/darkmoonsk/rapid-talks/assets/101902194/844b5430-e417-47ae-abcd-82be3224c34d)

## Visão Geral
**Rapid Talks** é uma POC (proof of concept) de uma aplicação de chat dinâmica, interativa desenvolvida com o objetivo de realizar a comunicação em tempo real. Utilizando uma combinação de tecnologias modernas e práticas de desenvolvimento avançadas.

O projeto é estruturado de maneira modular e escalável, com uma clara separação entre lógica de aplicação, componentes de interface do usuário, gestão de estado, e acesso a dados. Esta organização facilita a manutenção e contribuição para o projeto, além de proporcionar uma base sólida para futuras expansões e funcionalidades.

Cada componente e módulo é construído com foco na reusabilidade, acessibilidade e em dar feedback visual ao usuario, seguindo as melhores práticas de desenvolvimento web moderno. O projeto oferece uma experiência de usuário fluida e responsiva, adequada para a rápida troca de mensagens em tempo real.

## Características Principais

- **Comunicação em Tempo Real**: Troque mensagens instantaneamente com outros usuários, sem atrasos ou necessidade de atualizar a página.
- **Grupos e Conversas Individuais**: Crie grupos para conversas colaborativas ou envie mensagens privadas para contatos individuais.
- **Autenticação Segura**: Acesse sua conta com segurança, utilizando sistemas de autenticação modernos e confiáveis.
- **Notificações e Alertas**: Receba notificações em tempo real para novas mensagens ou atividades importantes dentro de seus chats.
- **Customização de Perfil**: Personalize seu perfil com uma imagem, nome de usuário e outras informações para se destacar na comunidade.
- **Customização de Grupo**: Personalize seu grupo com uma imagem, nome de usuário.
- **Pesquisa e Adição de Contatos**: Encontre e conecte-se com outros usuários facilmente, expandindo sua rede de contatos.
- **Interface Responsiva**: Desfrute de uma experiência de usuário consistente em dispositivos móveis e desktops, graças a uma interface adaptável.

## Como testar online 
1. [clique aqui](https://rapidtalks.brunosouzadev.com/) para ir ao site
2. Abra uma aba anonima do navegador para logar na segunda conta ou use outro perfil do navegador
3. Logue usando as seguintes contas abaixo ou crie duas contas:
```
testuser1@test.com
Test@123

testuser2@test.com
Test@123
```
4. Busque pelo nome do usuario que você quer iniciar o chat, o usuario 1 se chama HAL 9000 e o usuario 2 se chama Cortana, selecione o contato e clique em começar um novo chat.
5. Teste enviando mensagens em cada usuário e veja o chat acontecendo em tempo real.

## Como Começar localmente

### É necessario ter o docker instalado para rodar o projeto localmente!

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
4. Inicie o servidor de desenvolvimento local:
   ```
   npm run dev:local
   ```
5. Abra seu navegador e acesse `http://localhost:3000` para ver a aplicação em ação.

## Tecnologias Utilizadas

- **Frontend**: React, Next.js para renderização server-side e geração de sites estáticos, Tailwind CSS para estilos personalizados e responsivos.
- **Backend**: Node.js, com Next.js para as APIs de servidor.
- **Banco de Dados**: MongoDB, utilizando Mongoose como ODM para uma manipulação de dados mais eficiente e organizada.
- **Autenticação**: Next-auth, proporcionando uma camada segura e flexível para autenticação de usuários.
- **Comunicação em Tempo Real**: Pusher, integrado para permitir comunicações bidirecionais em tempo real entre clientes e servidores.

## Estrutura do Projeto

- `public/`: Contém imagens e outros recursos estáticos usados na aplicação.
- `src/`: Diretório principal do código fonte.
  - `app/`: Código específico da aplicação, incluindo autenticação e páginas principais.
  - `components/`: Componentes React reutilizáveis para UI.
  - `contexts/`: Contextos React para gerenciamento de estados globais.
  - `database/`: Configurações e scripts relacionados ao banco de dados.
  - `models/`: Definições dos modelos de dados usando TypeScript/Mongoose.
  - `utils/`: Funções utilitárias e helpers.

### Estrutura Detalhada do Projeto

#### `public/`
Esta pasta contém todos os recursos estáticos utilizados na aplicação, como imagens, ícones e arquivos de estilo que não são processados pelo Webpack. Isso inclui:
- **Imagens**: Logotipos, ícones de usuário padrão, imagens de fundo de stickers e outras imagens utilizadas na interface do usuário.

#### `src/`
Diretório principal que contém a lógica da aplicação, componentes, contextos, e mais. É subdividido nas seguintes subpastas:

##### `app/`
Contém o código específico da aplicação, estruturado de acordo com as funcionalidades e páginas:
- **`(auth)/`**: Inclui os componentes e lógica para o fluxo de autenticação e registro de usuários.
- **`(root)/`**: Contém os componentes das páginas principais da aplicação, como a lista de chats, detalhes do chat, informações do grupo e perfil do usuário.
- **`api/`**: Armazena as definições das rotas da API, organizadas por módulo (autenticação, usuários, chats, mensagens), facilitando a manutenção e expansão das funcionalidades da API.

##### `components/`
Armazena os componentes React reutilizáveis divididos por funcionalidade:
- **`AuthForm.tsx`**: Componente de formulário utilizado para login e registro de usuários.
- **`Chats/`**: Diretório contendo componentes relacionados às funcionalidades de chat, como a caixa de chat (`ChatBox.tsx`), lista de chats (`ChatList.tsx`).
- **`UI/`**: Componentes de interface do usuário, como botões, loaders, campos de pesquisa, etc., que podem ser reutilizados em diferentes partes da aplicação.

##### `contexts/`
Provedores de contexto React para gerenciamento de estado global, como autenticação de usuários e notificações.

##### `database/`
Contém os scripts e configurações relacionadas ao banco de dados MongoDB, incluindo a inicialização da conexão com o banco de dados e definições dos modelos de dados.

##### `models/`
Define as interfaces e classes TypeScript/Mongoose para os modelos de dados, como `User`, `Chat`, e `Message`. Isso proporciona uma base de tipos segura para o desenvolvimento e manutenção do código.

##### `utils/`
Funções utilitárias e helpers.

#### Arquivos de Configuração

- **`.editorconfig`**, **`.eslintrc.json`**, **`.prettierrc`**: Configurações para garantir consistência de estilo e qualidade do código entre diferentes ambientes de desenvolvimento.
- **`next.config.mjs`**, **`tailwind.config.ts`**, **`tsconfig.json`**: Arquivos de configuração para Next.js, Tailwind CSS e TypeScript, respectivamente, definindo as regras e personalizações para o projeto.

## Contribuindo

Contribuições são sempre bem-vindas! Se você tem uma ideia para melhorar o aplicativo ou encontrou um bug, sinta-se à vontade para criar uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo [LICENSE.md](LICENSE.md) para obter mais detalhes.