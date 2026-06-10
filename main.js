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
 
function validarRetirada(estoqueAtual, quantidadeRetirar) {
  if (quantidadeRetirar <= 0) return false;
  if (quantidadeRetirar > estoqueAtual) return false;
  return true;
}
 

function atualizarDashboard(lista) {
  const DIAS_ALERTA = 30;
  const comValidade = lista.filter(i => {
    const d = diasParaVencer(i.validade);
    return d !== null && d <= DIAS_ALERTA;
  });
  const zerados = lista.filter(i => Number(i.quantidade) === 0);
 
  totalItens.textContent      = lista.length;
  totalAlertasVal.textContent = comValidade.length;
  totalZerados.textContent    = zerados.length;
 

  const vencidos = lista.filter(i => { const d = diasParaVencer(i.validade); return d !== null && d < 0; });
  const vencendo = lista.filter(i => { const d = diasParaVencer(i.validade); return d !== null && d >= 0 && d <= DIAS_ALERTA; });
 
  painelAlertas.innerHTML = '';
  if (vencidos.length)
    painelAlertas.innerHTML += `<div class="alerta-item validade">⛔ ${vencidos.length} material(is) com validade VENCIDA: ${vencidos.map(i => escHtml(i.nome)).join(', ')}</div>`;
  if (vencendo.length)
    painelAlertas.innerHTML += `<div class="alerta-item validade">⚠ ${vencendo.length} material(is) vencem em até ${DIAS_ALERTA} dias: ${vencendo.map(i => escHtml(i.nome)).join(', ')}</div>`;
  if (zerados.length)
    painelAlertas.innerHTML += `<div class="alerta-item zerado">🔴 ${zerados.length} material(is) zerado(s): ${zerados.map(i => escHtml(i.nome)).join(', ')}</div>`;
}

function renderTabela(lista) {
  if (!lista.length) {
    tbody.innerHTML = '<tr class="empty-row"><td colspan="8">Nenhum material encontrado.</td></tr>';
    return;
  }
  tbody.innerHTML = lista.map((item, i) => {
    const qtd      = Number(item.quantidade ?? 0);
    const catLabel = item.categoria === 'permanente'
      ? '<span class="chip chip-permanente">Permanente</span>'
      : '<span class="chip chip-consumo">Consumo</span>';
    const qtdClass = qtd === 0 ? 'qtd qtd-zero' : 'qtd qtd-normal';
    const valClass = classValidade(item.validade);
    const valTexto = textoValidade(item.validade);
    return `<tr>
      <td>${i + 1}</td>
      <td><strong>${escHtml(item.nome ?? '–')}</strong>${item.obs ? `<br><small style="color:var(--sub)">${escHtml(item.obs)}</small>` : ''}</td>
      <td>${catLabel}</td>
      <td class="${qtdClass}">${qtd}</td>
      <td>${escHtml(item.unidade ?? '–')}</td>
      <td class="${valClass}">${valTexto}</td>
      <td>${escHtml(item.instrutor ?? '–')}</td>
      <td class="acoes">
        <button class="btn-baixar" data-id="${item.id}" data-qtd="${qtd}" title="Registrar retirada">📤 Baixar</button>
        <button class="btn-excluir" data-id="${item.id}" title="Excluir material">🗑 Excluir</button>
      </td>
    </tr>`;
  }).join('');
 
 
  tbody.querySelectorAll('.btn-baixar').forEach(btn => {
    btn.addEventListener('click', () => {
      const id  = btn.dataset.id;
      const qtd = Number(btn.dataset.qtd);
      registrarRetirada(id, qtd);
    });
  });
  tbody.querySelectorAll('.btn-excluir').forEach(btn => {
    btn.addEventListener('click', () => excluirMaterial(btn.dataset.id));
  });
}
 

function filtrar() {
  const termo = inputBusca.value.trim().toLowerCase();
  const cat   = filtroCat.value;
  const lista = todosOsMateriais.filter(item => {
    const nome     = (item.nome ?? '').toLowerCase();
    const matchNome = !termo || nome.includes(termo);
    const matchCat  = !cat   || item.categoria === cat;
    return matchNome && matchCat;
  });
  renderTabela(lista);
}
 

async function carregarMateriais() {
  tbody.innerHTML = '<tr class="empty-row"><td colspan="8"><span class="spinner"></span> Carregando…</td></tr>';
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    todosOsMateriais = await res.json();
    atualizarDashboard(todosOsMateriais);
    filtrar();
  } catch (e) {
    tbody.innerHTML = `<tr class="empty-row"><td colspan="8">❌ Erro ao carregar. Verifique a URL da API.<br><small>${e.message}</small></td></tr>`;
    totalItens.textContent = 'erro';
  }
}
