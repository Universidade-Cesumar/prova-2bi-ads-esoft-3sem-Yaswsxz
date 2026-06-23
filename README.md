# Sistema de Controle de Almoxarifado — SENAC Zona Norte

🔗 **Acesse o projeto no ar:** https://universidade-cesumar.github.io/prova-2bi-ads-esoft-3sem-Yaswsxz/

> Sistema web de controle de estoque desenvolvido para o curso técnico de Enfermagem do SENAC Zona Norte, como atividade avaliativa de Engenharia de Software na Unicesumar.

## Índice

- [Sobre o projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Sobre o visual](#sobre-o-visual)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Como o projeto foi construído](#como-o-projeto-foi-construído)
- [Estrutura dos arquivos](#estrutura-dos-arquivos)
- [Como executar](#como-executar)

## Sobre o projeto

Este projeto foi desenvolvido a partir de um caso real apresentado em sala de aula: a Camila, enfermeira responsável pelo almoxarifado de itens de saúde do curso técnico de Enfermagem do SENAC Zona Norte, controlava todo o estoque em uma planilha simples. Com o aumento do volume de movimentações diárias — entradas de materiais, baixas feitas pelos professores, controle de validade de itens descartáveis — essa planilha já não era mais suficiente.

Faltava visibilidade rápida sobre o que estava acabando, o que estava vencendo, e não havia nenhuma trava que impedisse, por exemplo, registrar a retirada de mais itens do que realmente existiam em estoque.

A proposta foi sair da planilha e construir uma aplicação web simples, mas funcional, que resolvesse esses problemas de forma direta: cadastro centralizado, regras de validação no momento da retirada, e indicadores visuais que dessem uma visão geral do estoque em poucos segundos.

## Funcionalidades

| Funcionalidade | Descrição |
| --- | --- |
| Cadastro de materiais | Nome, categoria (consumo ou permanente), quantidade, unidade de medida, validade, instrutor responsável e observações |
| Registro de retirada (baixa) | Desconta a quantidade informada do estoque, com validação que impede números negativos, zero ou valores maiores do que o disponível |
| Exclusão de materiais | Remove um item do estoque, com confirmação antes de excluir |
| Dashboard de indicadores | Mostra o total de itens cadastrados, quantos estão com validade próxima do vencimento e quantos estão zerados |
| Alertas automáticos | Avisa visualmente quando algum item está vencendo ou chegou a zero |
| Destaque de estoque crítico | Itens com menos de 10 unidades recebem destaque visual na tabela |
| Busca e filtro | Localiza materiais pelo nome ou filtra por categoria |
| Exportação para CSV | Gera um arquivo com todo o estoque atual |
| Feedback de ações | Notificações de sucesso ou erro a cada ação realizada |

## Sobre o visual

A identidade visual foi pensada em tons de verde, fazendo referência ao ambiente de saúde em que o sistema é utilizado. O layout foi organizado em blocos bem definidos — um para cadastro, um para retirada, um para o estoque — para que cada função tenha seu próprio espaço.

A tabela de materiais recebeu atenção especial, já que é onde a Camila e os professores passam mais tempo: linhas bem espaçadas, números alinhados para facilitar comparação, e cores que ganham destaque apenas quando algo precisa de atenção (validade vencendo, estoque baixo ou zerado). O sistema também é responsivo, adaptando-se a diferentes tamanhos de tela.

## Tecnologias utilizadas

| Tecnologia | Uso |
| --- | --- |
| HTML, CSS e JavaScript puro | Estrutura, estilização e lógica da aplicação, sem uso de frameworks |
| Fetch API + async/await | Comunicação assíncrona com o back-end |
| MockAPI.io | API RESTful simulada, utilizada como back-end do projeto |
| try/catch | Tratamento de erros em todas as requisições à API |
| GitHub Pages | Hospedagem e publicação do projeto |

## Como o projeto foi construído

O desenvolvimento foi dividido em três etapas (sprints):

**Sprint 1 — Fundação e Inventário**
Estrutura do formulário de cadastro e da listagem dos materiais já cadastrados.

**Sprint 2 — Regras de Negócio e Saídas**
Lógica de retirada de estoque, com validação das regras de negócio, e funcionalidade de exclusão de materiais.

**Sprint 3 — Dashboard e Polimento**
Dashboard de indicadores, alertas automáticos, busca, filtro, exportação em CSV e tratamento de erros.

## Estrutura dos arquivos

```
almoxarifado-senac/
├── index.html      → estrutura da página
├── style.css       → estilos, layout e responsividade
├── main.js         → lógica da aplicação
└── package.json    → configuração dos testes automatizados
```

## Como executar

1. Baixe os arquivos do projeto
2. Abra o arquivo `index.html` em qualquer navegador

---

Projeto desenvolvido para o SENAC Zona Norte, como atividade avaliativa da prova de Engenharia de Software na Unicesumar.

Yasmin Fernanda de Carvalho — 3º semestre