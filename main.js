const API_URL = 'https://6a29f2f6f59cb8f65f1ddad6.mockapi.io/materiais';
 
let materiais = []; 
function validarRetirada(estoqueAtual, quantidadeRetirada) {
  const estoque = Number(estoqueAtual);
  const retirada = Number(quantidadeRetirada);
 
  if (Number.isNaN(estoque) || Number.isNaN(retirada)) return false;
  if (retirada <= 0) return false;
  if (retirada > estoque) return false;
 
  return true;
}
 function mostrarToast(mensagem, tipo = 'ok') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = mensagem;
  toast.className = tipo === 'erro' ? 'show erro' : 'show';
  setTimeout(() => {
    toast.className = '';
  }, 3000);
}
 
function formatarData(dataStr) {
  if (!dataStr) return '—';
  const [ano, mes, dia] = dataStr.split('-');
  return `${dia}/${mes}/${ano}`;
}
 
function diasParaVencer(dataStr) {
  if (!dataStr) return null;
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const validade = new Date(dataStr + 'T00:00:00');
  const diffMs = validade - hoje;
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  }
async function carregarMateriais() {
  const tbody = document.getElementById('lista-materiais');
  tbody.innerHTML = '<tr class="empty-row"><td colspan="8"><span class="spinner"></span> Carregando…</td></tr>';
 
  try {
    const resposta = await fetch(API_URL);
    if (!resposta.ok) throw new Error('Falha ao buscar materiais (status ' + resposta.status + ')');
 
    materiais = await resposta.json();
    renderizarTabela(materiais);
    atualizarDashboard(materiais);
    atualizarAlertas(materiais);
  } catch (erro) {
    console.error('Erro ao carregar materiais:', erro);
    tbody.innerHTML = '<tr class="empty-row"><td colspan="8">Erro ao carregar dados. Tente atualizar novamente.</td></tr>';
    mostrarToast('Erro ao carregar materiais da API.', 'erro');
  }
}