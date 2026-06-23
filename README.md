# 📦 Almoxarifado SENAC — onde os algodões não se perdem mais

🔗 **Confere o site no ar:** https://universidade-cesumar.github.io/prova-2bi-ads-esoft-3sem-Yaswsxz/

## A lenda da planilha que não dava mais conta

Era uma vez a Camila, enfermeira responsável pelo almoxarifado de itens de saúde do curso de Enfermagem do SENAC Zona Norte, vivendo uma rotina digna de filme de suspense: todo dia um professor retirando luvas, seringas, gaze... tudo anotado (quando dava tempo de anotar) numa planilha que parecia ter vontade própria de se desorganizar.

O problema não era falta de esforço — era que planilha não avisa quando algo tá vencendo, não impede ninguém de "retirar" 15 unidades de um item que só tinha 5, e definitivamente não tem um dashboard bonitinho mostrando o que precisa de atenção. Resultado: estoque no papel virando ficção científica em relação ao estoque real.

Foi daí que nasceu esse projeto: trocar a planilha rebelde por um sisteminha web que faz tudo isso de forma automática, visual e — o mais importante — **chata o suficiente pra não deixar passar besteira**. Sim, o sistema é proposital e teimosamente rígido com as regras de retirada. É praticamente um fiscal de estoque que nunca tira férias.

## O que ele realmente faz

| Funcionalidade | O que rola na prática |
| --- | --- |
| 🟢 Cadastra material | Nome, categoria (consumo ou permanente), quantidade, unidade, validade, instrutor responsável e um cantinho pra observações tipo "fornecedor X, lote Y" |
| 🟢 Dá baixa no estoque | Desconta sozinho quando alguém retira algo — e é rigoroso: nada de tirar mais do que existe, tirar zero ou tirar número negativo |
| 🟢 Exclui material | Pergunta "tem certeza?" antes de apagar, porque clique errado existe e ninguém merece perder cadastro por dedo bobo |
| 🟢 Dashboard | Três números no topo contam a história: total de itens, quantos vencendo, quantos zerados |
| 🟢 Alertas automáticos | Avisa antes de você rolar a tela e descobrir o problema na pior hora |
| 🟢 Estoque crítico | Itens com menos de 10 unidades ganham destaque, tipo um "psiu, tô quase acabando" |
| 🟢 Busca e filtro | Acha qualquer material pelo nome, ou filtra por categoria |
| 🟢 Exporta CSV | Um clique e a planilha cai prontinha no seu computador |
| 🟢 Avisos de sucesso/erro | Confirma cada ação, e avisa se algo deu errado em vez de te deixar boiando |

## Sobre a cara do site

Verde foi a escolha óbvia (e correta) — remete direto a ambiente de saúde, sem forçar a barra. O layout foi separado em blocos bem definidos: um pedaço pra cadastro, outro pra retirada, outro pra visualizar o estoque inteiro, porque misturar tudo numa tela só vira aquela bagunça visual que ninguém quer encarar de manhã.

A tabela ganhou atenção redobrada, já que é onde a Camila e os professores vão passar mais tempo no dia a dia: espaçamento confortável pra não embolar a vista, números alinhados pra facilitar comparação rápida, e cor só aparece com intenção — quando tem motivo real pra chamar atenção (validade vencendo, estoque baixo, estoque zerado). Fora isso, a tela fica limpa e tranquila, sem gritar o tempo todo.

## Receita por trás dos bastidores

| Ingrediente | Pra que serve |
| --- | --- |
| HTML, CSS e JavaScript puro | A base de tudo, sem framework — porque o básico bem feito resolve igual (ou melhor) |
| Fetch API + async/await | As conversas entre o site e o back-end, sem travar a tela enquanto espera resposta |
| MockAPI.io | Guarda os dados de verdade, simulando uma API RESTful sem precisar de servidor próprio |

## Quer rodar na sua máquina?

1. Baixa os arquivos do projeto
2. Abre o `index.html` em qualquer navegador
3. Pronto. Sem instalar nada, sem configurar servidor, sem drama

---

Feito para o SENAC Zona Norte, como atividade avaliativa da prova de Engenharia de Software na Unicesumar.

Yasmin Fernanda de Carvalho — 3º semestre, sobrevivendo e fazendo bonito 💚