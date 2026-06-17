📦 Sistema de Controle de Almoxarifado — SENAC Zona Norte


Aplicação web para gerenciamento de materiais e insumos do Curso Técnico de Enfermagem do SENAC Zona Norte.




🩺 Contexto do Problema

A Camila, enfermeira responsável pelo almoxarifado de itens de saúde do curso técnico de Enfermagem, realizava o controle do estoque por meio de uma planilha básica que não suportava mais o volume de movimentações diárias. Isso dificultava o acompanhamento de entradas, saídas, validades e as baixas realizadas pelos professores ao longo do dia.


💡 A Solução

Uma aplicação web com front-end conectado a uma API RESTful simulada via MockAPI.io, modernizando toda a rotina de controle do almoxarifado. Os dados dos materiais — estoques, entradas e saídas — são armazenados e consumidos pela aplicação em tempo real, sem necessidade de servidor próprio ou banco de dados real.


✨ Funcionalidades


Dashboard de indicadores — exibe em tempo real o total de itens cadastrados, alertas de validade próxima e itens com estoque zerado
Cadastro de materiais — formulário completo com nome, categoria, quantidade, unidade de medida, data de validade, instrutor responsável e observações
Registro de retirada (baixa de estoque) — desconta a quantidade informada diretamente na linha do material, com validação que impede números negativos, zero ou valores maiores que o estoque disponível
Exclusão de materiais — remove um item permanentemente do estoque, com confirmação antes da exclusão
Alertas automáticos — painel visual que destaca itens com validade vencida ou próxima do vencimento (30 dias) e itens com estoque zerado
Filtro e busca — filtragem por nome e categoria (consumo / permanente) em tempo real
Exportação CSV — exporta o estoque atual para arquivo .csv com um clique
Feedback visual — notificações toast para confirmação de ações e erros
Tratamento de erros — todas as chamadas à API são protegidas com try/catch, exibindo mensagens claras em caso de falha
Layout responsivo — adaptado para desktop e dispositivos móveis



🛠️ Tecnologias Utilizadas

TecnologiaUsoHTML5Estrutura semântica da interfaceCSS3Estilização, responsividade e variáveis CSSJavaScript (ES6+)Lógica da aplicação, manipulação do DOMFetch APIRequisições HTTP assíncronasasync / awaitControle de fluxo assíncronoMockAPI.ioBack-end simulado via API RESTfulJest + jsdomTestes automatizados de front-end


🗂️ Estrutura do Projeto

almoxarifado-senac/
├── index.html          # Estrutura e marcação da aplicação
├── style.css           # Estilos, variáveis de tema e responsividade
├── main.js             # Lógica: requisições, CRUD, alertas, filtros, CSV
└── __tests__/          # Testes automatizados (Jest)
    ├── sprint1.test.js
    ├── sprint2.test.js
    └── sprint3.test.js


🔌 API — MockAPI.io

A aplicação consome uma API RESTful simulada criada no MockAPI.io.

https://6a29f2f6f59cb8f65f1ddad6.mockapi.io/materiais

Modelo de recurso material

json{
  "id": "1",
  "nome": "Luvas de procedimento",
  "categoria": "consumo",
  "quantidade": 50,
  "unidade": "Caixa",
  "validade": "2025-12-31",
  "instrutor": "Prof. Ana",
  "obs": "Fornecedor: MedSupply"
}

Operações implementadas

MétodoEndpointAção no sistemaGET/materiaisLista todos os materiais e atualiza dashboard/alertasPOST/materiaisCadastra novo materialPUT/materiais/:idRegistra retirada (baixa), subtraindo do estoqueDELETE/materiais/:idRemove material do estoque


⚙️ Regra de Negócio — validarRetirada

Toda retirada passa pela função validarRetirada(estoqueAtual, quantidadeRetirada), que retorna true somente quando a operação é permitida:


❌ Quantidade negativa
❌ Quantidade igual a zero
❌ Quantidade maior que o estoque disponível
✅ Quantidade positiva e menor ou igual ao estoque


jsvalidarRetirada(10, 5);   // true  — retirada válida
validarRetirada(5, 10);   // false — maior que o estoque
validarRetirada(10, -2);  // false — valor negativo
validarRetirada(10, 0);   // false — valor zero


🧪 Testes Automatizados

O projeto inclui testes com Jest cobrindo os três sprints de desenvolvimento:

ArquivoCoberturasprint1.test.jsPresença dos IDs obrigatórios do formulário e da lista de materiaissprint2.test.jsClasses de baixa/exclusão e regras lógicas de validarRetiradasprint3.test.jsIDs de busca e dashboard, e tratamento de erros (try/catch)

Como executar os testes

bashnpm install --save-dev jest jest-environment-jsdom
npx jest --testEnvironment=jsdom


🚀 Como Executar


Clone ou baixe os arquivos do projeto
Crie um projeto no MockAPI.io e adicione o recurso materiais com os campos listados acima
No arquivo main.js, configure a constante API_URL com a URL do seu projeto MockAPI
Abra o index.html no navegador — não é necessário servidor local



📐 Identidade Visual

Paleta institucional em tons de verde, com hierarquia clara para níveis de urgência (normal, aviso, erro):

VariávelCorUso--verde#0f5c3fBotões primários, destaques de título--verde-c#16804fHover de botões e foco de campos--verde-l#eef7f2Fundos suaves, chips de status--aviso#9a5b00Alertas de validade próxima--erro#b3261eItens zerados, ações destrutivas


👩‍💻 Autora Yasmin Fernanda de Carvalho

Projeto desenvolvido para o SENAC Zona Norte, como atividade avaliativa (AEP) do curso de Engenharia de Software da Unicesumar.


Sprint 1-2-3 — Almoxarifado SENAC — MockAPI.io