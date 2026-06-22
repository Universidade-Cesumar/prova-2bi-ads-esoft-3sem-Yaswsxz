# Sistema de Controle de Almoxarifado — SENAC Zona Norte

🔗 **Acesse o projeto no ar:** https://universidade-cesumar.github.io/prova-2bi-ads-esoft-3sem-Yaswsxz/

Aplicação web para gerenciamento de materiais e insumos do Curso Técnico de Enfermagem do SENAC Zona Norte.

## Contexto do Problema

A Camila, enfermeira responsável pelo almoxarifado de itens de saúde do curso técnico de Enfermagem, realizava o controle do estoque por meio de uma planilha básica que não suportava mais o volume de movimentações diárias. Isso dificultava o acompanhamento de entradas, saídas, validades e as baixas realizadas pelos professores ao longo do dia.

## A Solução

Uma aplicação web com front-end conectado a uma API RESTful simulada via MockAPI.io, modernizando toda a rotina de controle do almoxarifado. Os dados dos materiais — estoques, entradas e saídas — são armazenados e consumidos pela aplicação em tempo real, sem necessidade de servidor próprio ou banco de dados real.

## Funcionalidades

- Dashboard de indicadores em tempo real (total de itens, alertas de validade, itens zerados)
- Cadastro de materiais com nome, categoria, quantidade, unidade, validade, instrutor e observações
- Registro de retirada (baixa de estoque), com validação contra negativos, zero ou valores acima do estoque
- Exclusão de materiais, com confirmação antes de remover
- Alertas automáticos de validade próxima (30 dias) e estoque zerado
- Destaque visual de estoque crítico para itens com menos de 10 unidades
- Filtro por nome e categoria em tempo real
- Exportação do estoque para CSV
- Notificações toast de sucesso e erro
- Tratamento de erros com try/catch em todas as chamadas à API
- Layout responsivo para desktop e mobile

## Tecnologias Utilizadas

| Tecnologia | Uso |
| --- | --- |
| HTML5 | Estrutura semântica da interface |
| CSS3 | Estilização, responsividade e variáveis CSS |
| JavaScript (ES6+) | Lógica da aplicação e manipulação do DOM |
| Fetch API | Requisições HTTP assíncronas |
| async / await | Controle de fluxo assíncrono |
| MockAPI.io | Back-end simulado via API RESTful |
| Jest + jsdom | Testes automatizados de front-end |
| GitHub Pages | Hospedagem e publicação do projeto |

## Estrutura do Projeto

```
almoxarifado-senac/
├── index.html
├── style.css
├── main.js
├── package.json
└── __tests__/
    ├── sprint1.test.js
    ├── sprint2.test.js
    └── sprint3.test.js
```

## API — MockAPI.io

A aplicação consome uma API RESTful simulada criada no MockAPI.io:

```
https://6a29f2f6f59cb8f65f1ddad6.mockapi.io/materiais
```

### Modelo de recurso `material`

```json
{
  "id": "1",
  "nome": "Luvas de procedimento",
  "categoria": "consumo",
  "quantidade": 50,
  "unidade": "Caixa",
  "validade": "2025-12-31",
  "instrutor": "Prof. Ana",
  "obs": "Fornecedor: MedSupply"
}
```

### Operações implementadas

| Método | Endpoint | Ação no sistema |
| --- | --- | --- |
| GET | /materiais | Lista todos os materiais e atualiza dashboard/alertas |
| POST | /materiais | Cadastra novo material |
| PUT | /materiais/:id | Registra retirada (baixa), subtraindo do estoque |
| DELETE | /materiais/:id | Remove material do estoque |

## Regra de Negócio — validarRetirada

A função `validarRetirada(estoqueAtual, quantidadeRetirada)` retorna `true` somente quando a retirada é permitida:

- Quantidade negativa → inválida
- Quantidade igual a zero → inválida
- Quantidade maior que o estoque disponível → inválida
- Quantidade positiva e menor ou igual ao estoque → válida

```js
validarRetirada(10, 5);   // true
validarRetirada(5, 10);   // false
validarRetirada(10, -2);  // false
validarRetirada(10, 0);   // false
```

## Estoque Crítico

Cada linha da tabela recebe a classe `estoque-critico` sempre que a quantidade do item for menor que 10 unidades, destacando visualmente quem precisa de reposição urgente. A classe é aplicada dinamicamente pelo `main.js` na renderização da tabela.

## Testes Automatizados

| Arquivo | Cobertura |
| --- | --- |
| sprint1.test.js | IDs obrigatórios do formulário e da lista de materiais |
| sprint2.test.js | Classes de baixa/exclusão e regras lógicas de validarRetirada |
| sprint3.test.js | IDs de busca e dashboard, e tratamento de erros (try/catch) |

Para executar:

```bash
npm install
npm run test:sprint1
npm run test:sprint2
npm run test:sprint3
```

## Como Executar Localmente

1. Clone ou baixe os arquivos do projeto
2. Crie um projeto no MockAPI.io e adicione o recurso `materiais` com os campos listados acima
3. No arquivo `main.js`, configure a constante `API_URL` com a URL do seu projeto MockAPI
4. Abra o `index.html` no navegador

## Identidade Visual

| Variável | Cor | Uso |
| --- | --- | --- |
| --verde | #0f5c3f | Botões primários, destaques de título |
| --verde-c | #16804f | Hover de botões e foco de campos |
| --verde-l | #eef7f2 | Fundos suaves, chips de status |
| --aviso | #9a5b00 | Alertas de validade próxima |
| --erro | #b3261e | Itens zerados, estoque crítico, ações destrutivas |

## Autora

Yasmin Fernanda de Carvalho

Projeto desenvolvido para o SENAC Zona Norte, como atividade avaliativa (AEP) do curso de Engenharia de Software da Unicesumar.

---

Sprint 1-2-3 — Almoxarifado SENAC — MockAPI.io