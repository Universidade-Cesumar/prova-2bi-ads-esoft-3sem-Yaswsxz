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

let toastTimer;
function showToast(msg, tipo = 'ok') {
  clearTimeout(toastTimer);
  toast.textContent = msg;
  toast.className   = `show${tipo === 'erro' ? ' erro' : ''}`;
  toastTimer = setTimeout(() => { toast.className = ''; }, 3500);
}
 

function diasParaVencer(dataStr) {
  if (!dataStr) return null;
  const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
  const venc = new Date(dataStr + 'T00:00:00');
  return Math.floor((venc - hoje) / 86400000);
}
 
function formatarData(dataStr) {
  if (!dataStr) return '–';
  const [a, m, d] = dataStr.split('-');
  return `${d}/${m}/${a}`;
}
 
function classValidade(dataStr) {
  const d = diasParaVencer(dataStr);
  if (d === null) return '';
  if (d < 0)   return 'val-vencido';
  if (d <= 30) return 'val-aviso';
  return 'val-ok';
}
 
function textoValidade(dataStr) {
  const d = diasParaVencer(dataStr);
  if (d === null) return '–';
  if (d < 0)   return `${formatarData(dataStr)} ⚠ VENCIDO`;
  if (d === 0) return 'Vence hoje!';
  if (d <= 30) return `${formatarData(dataStr)} (${d}d)`;
  return formatarData(dataStr);
}
 