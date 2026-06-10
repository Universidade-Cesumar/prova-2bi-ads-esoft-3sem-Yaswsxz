const API_URL = 'https://mockapi.io/clone/6a29f2f6f59cb8f65f1ddad7s';
 

const inputNome      = document.getElementById('input-nome');
const inputCat       = document.getElementById('input-categoria');
const inputQtd       = document.getElementById('input-quantidade');
const inputUnidade   = document.getElementById('input-unidade');
const inputValidade  = document.getElementById('input-validade');
const inputInstrutor = document.getElementById('input-instrutor');
const inputObs       = document.getElementById('input-obs');
const inputRetirada  = document.getElementById('input-retirada');
const btnCad         = document.getElementById('btn-cadastrar');
const tbody          = document.getElementById('lista-materiais');
const inputBusca     = document.getElementById('input-busca');
const filtroCat      = document.getElementById('filtro-cat');
const btnRefresh     = document.getElementById('btn-refresh');
const btnExportar    = document.getElementById('btn-exportar');
const toast          = document.getElementById('toast');
const painelAlertas  = document.getElementById('painel-alertas');
const totalItens     = document.getElementById('total-itens');
const totalAlertasVal= document.getElementById('total-alertas-val');
const totalZerados   = document.getElementById('total-zerados');
 
let todosOsMateriais = [];