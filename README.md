# 📦 Sistema de Controle de Almoxarifado — SENAC Zona Norte

> Aplicação web para gerenciamento de materiais e insumos do Curso Técnico de Enfermagem do SENAC Zona Norte.

---

## 🩺 Contexto do Problema

A **Camila**, enfermeira responsável pelo almoxarifado de itens de saúde do curso técnico de Enfermagem, realizava o controle do estoque por meio de uma planilha básica que não suportava mais o volume de movimentações diárias. Isso dificultava o acompanhamento de entradas, saídas, validades e as baixas realizadas pelos professores ao longo do dia.

---

## 💡 A Solução

Uma aplicação web com front-end conectado a uma **API RESTful simulada via MockAPI.io**, modernizando toda a rotina de controle do almoxarifado. Os dados dos materiais — estoques, entradas e saídas — são armazenados e consumidos pela aplicação em tempo real, sem necessidade de servidor próprio ou banco de dados real.

---

## ✨ Funcionalidades

- **Dashboard de indicadores** — exibe em tempo real o total de itens cadastrados, alertas de validade próxima e itens com estoque zerado
- **Cadastro de materiais** — formulário completo com nome, categoria, quantidade, unidade de medida, data de validade, instrutor responsável e observações
- **Registro de retirada (baixa)** — desconta quantidade do estoque diretamente pela tabela, com validação para não negativar
- **Alertas automáticos** — painel visual que destaca itens com validade vencida ou próxima do vencimento (30 dias) e itens zerados
- **Filtro e busca** — filtragem por nome e categoria (consumo / permanente) em tempo real
- **Exportação CSV** — exporta o estoque atual para arquivo `.csv` com um clique
- **Feedback visual** — notificações toast para confirmação de ações e erros
- **Layout responsivo** — adaptado para desktop e dispositivos móveis

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Uso |
|---|---|
| **HTML5** | Estrutura semântica da interface |
| **CSS3** | Estilização, responsividade e variáveis CSS |
| **JavaScript (ES6+)** | Lógica da aplicação, manipulação do DOM |
| **Fetch API** | Requisições HTTP assíncronas |
| **async / await** | Controle de fluxo assíncrono |
| **MockAPI.io** | Back-end simulado via API RESTful |

---

## 🗂️ Estrutura do Projeto

```
almoxarifado-senac/
├── index.html       # Estrutura e marcação da aplicação
├── style.css        # Estilos, variáveis de tema e responsividade
└── main.js          # Lógica: requisições, CRUD, alertas, filtros, CSV
```

---

## 🔌 API — MockAPI.io

A aplicação consome uma API RESTful simulada criada no [MockAPI.io](https://mockapi.io). O endpoint principal segue o padrão:

```
https://mockapi.io/clone/6a29f2f6f59cb8f65f1ddad7
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

### Operações utilizadas

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/materiais` | Lista todos os materiais |
| `POST` | `/materiais` | Cadastra novo material |
| `PUT` | `/materiais/:id` | Atualiza quantidade (baixa) |
| `DELETE` | `/materiais/:id` | Remove material do estoque |

---

## 🚀 Como Executar

1. Clone ou baixe os arquivos do projeto
2. Crie um projeto no [MockAPI.io](https://mockapi.io) e adicione o recurso `materiais` com os campos acima
3. No arquivo `main.js`, configure a variável com a URL da sua API:
   ```js
   const API_URL = 'https://mockapi.io/clone/6a29f2f6f59cb8f65f1ddad7';
   ```
4. Abra o `index.html` no navegador — não é necessário servidor local

---

## 📐 Identidade Visual

O sistema utiliza uma paleta verde institucional, alinhada ao contexto de saúde:

| Variável | Cor | Uso |
|---|---|---|
| `--verde` | `#1a6b45` | Header, botões primários, títulos |
| `--verde-c` | `#2a9964` | Hover, destaques |
| `--verde-l` | `#e6f4ee` | Fundos de cards e chips |
| `--aviso` | `#b45309` | Alertas de validade próxima |
| `--erro` | `#c0392b` | Itens zerados, ações destrutivas |

---

## 👩‍💻 Autora Yasmin Fernanda de Carvalho

Desenvolvido como projeto de avaliação para o SENAC — **SENAC Zona Norte**.

---

*Sprint 1-2-3 — Almoxarifado SENAC — MockAPI.io*