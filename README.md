# 📦 Almoxarifado SENAC — onde os algodões não se perdem mais

🔗 **Confere o site no ar:** https://universidade-cesumar.github.io/prova-2bi-ads-esoft-3sem-Yaswsxz/

## A lenda da planilha que não dava mais conta

Era uma vez a Camila, enfermeira responsável pelo almoxarifado de itens de saúde do curso de Enfermagem do SENAC Zona Norte, vivendo uma rotina digna de filme de suspense: todo dia um professor retirando luvas, seringas, gaze... tudo anotado (quando dava tempo de anotar) numa planilha que parecia ter vontade própria de se desorganizar.

O problema não era falta de esforço — era que planilha não avisa quando algo tá vencendo, não impede ninguém de "retirar" 15 unidades de um item que só tinha 5, e definitivamente não tem um dashboard bonitinho mostrando o que precisa de atenção. Resultado: estoque no papel virando ficção científica em relação ao estoque real.

Foi daí que nasceu esse projeto: trocar a planilha rebelde por um sisteminha web que faz tudo isso de forma automática, visual e — o mais importante — **chata o suficiente pra não deixar passar besteira**. Sim, o sistema é proposital e teimosamente rígido com as regras de retirada. É praticamente um fiscal de estoque que nunca tira férias.

## O que ele realmente faz

🟢 **Cadastra material**
Nome, categoria (consumo ou permanente), quantidade, unidade de medida, validade, instrutor responsável e até um cantinho pra observações tipo "fornecedor X, lote Y" — porque detalhe importa.

🟢 **Dá baixa no estoque (a parte chata, mas necessária)**
Quando alguém retira algo, o sistema desconta sozinho. Só que ele é rigoroso: não deixa tirar mais do que existe, não deixa tirar zero, não deixa tirar número negativo (sim, alguém tentaria, e por isso essa regra existe). Pensa nele como aquele amigo que sempre confere o troco — incômodo na hora, mas salva sua vida depois.

🟢 **Exclui material, com direito a "tem certeza?"**
Antes de apagar de vez um item, o sistema pergunta se você realmente quer fazer isso. Porque clique errado existe, e ninguém merece perder um cadastro inteiro por um dedo bobo no mouse.

🟢 **Dashboard que conta a história em três números**
Total de itens, quantos estão vencendo, quantos zeraram. Em três segundos de olhada você já sabe se o dia vai ser tranquilo ou se alguém vai precisar correr pro fornecedor.

🟢 **Alertas que não deixam passar batido**
Se tem algo vencendo ou zerado, uma faixa de aviso aparece logo no topo — antes mesmo de rolar a página e descobrir o problema na pior hora possível.

🟢 **Estoque crítico com holofote**
Itens com menos de 10 unidades ganham um destaque na tabela, tipo um "ei, olha aqui, eu tô quase acabando" gritando silenciosamente em vermelho.

🟢 **Busca e filtro pra não ficar rolando a vida inteira**
Digita o nome do material e pronto, ele aparece. Ou filtra por categoria se quiser ver só os descartáveis ou só os equipamentos.

🟢 **Exporta pra CSV num clique**
Quer levar os dados pra outro lugar, fazer um relatório, mostrar pra coordenação? Um botão e a planilha cai prontinha.

🟢 **Avisa quando dá certo (e quando dá errado)**
Cada ação — cadastro, baixa, exclusão — gera uma notificação confirmando. E se a internet falhar ou a API der problema, ele avisa também, em vez de fingir que nada aconteceu e te deixar boiando.

## Sobre a cara do site

Verde foi a escolha óbvia (e correta) — remete direto a ambiente de saúde, sem forçar a barra. O layout foi separado em blocos bem definidos: um pedaço pra cadastro, outro pra retirada, outro pra visualizar o estoque inteiro, porque misturar tudo numa tela só vira aquela bagunça visual que ninguém quer encarar de manhã.

A tabela ganhou atenção redobrada, já que é onde a Camila e os professores vão passar mais tempo no dia a dia: espaçamento confortável pra não embolar a vista, números alinhados pra facilitar comparação rápida, e cor só aparece com intenção — quando tem motivo real pra chamar atenção (validade vencendo, estoque baixo, estoque zerado). Fora isso, a tela fica limpa e tranquila, sem gritar o tempo todo.

## Receita por trás dos bastidores

HTML, CSS e JavaScript puro, sem framework — porque às vezes o básico bem feito resolve igual (ou melhor). As conversas com o back-end acontecem via Fetch API com async/await, e quem guarda tudo é o MockAPI.io, uma API RESTful simulada que dispensa servidor de verdade. Ótimo pra um terceiro semestre que ainda tá se entendendo com banco de dados de produção (calma, vai chegar a nossa hora).

## Quer rodar na sua máquina?

1. Baixa os arquivos do projeto
2. Abre o `index.html` em qualquer navegador
3. Pronto. Sem instalar nada, sem configurar servidor, sem drama

---

Feito para o SENAC Zona Norte, como atividade avaliativa da prova de Engenharia de Software na Unicesumar.

Yasmin Fernanda de Carvalho — 3º semestre, sobrevivendo e fazendo bonito 💚