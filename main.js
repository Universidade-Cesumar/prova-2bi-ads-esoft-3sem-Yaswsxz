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
  setTimeout(() => { toast.className = ''; }, 3000);
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
 
async function cadastrarMaterial(material) {
  try {
    const resposta = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(material)
    });
 
    if (!resposta.ok) throw new Error('Falha ao cadastrar material (status ' + resposta.status + ')');
 
    await carregarMateriais();
    mostrarToast('Material cadastrado com sucesso!');
  } catch (erro) {
    console.error('Erro ao cadastrar material:', erro);
    mostrarToast('Erro ao cadastrar material.', 'erro');
  }
}
 
async function registrarBaixa(id, quantidadeRetirada) {
  const material = materiais.find((m) => String(m.id) === String(id));
  if (!material) {
    mostrarToast('Material não encontrado.', 'erro');
    return;
  }
 
  const valido = validarRetirada(material.quantidade, quantidadeRetirada);
  if (!valido) {
    mostrarToast('Quantidade inválida para retirada.', 'erro');
    return;
  }
 
  const novaQuantidade = Number(material.quantidade) - Number(quantidadeRetirada);
 
  try {
    const resposta = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...material, quantidade: novaQuantidade })
    });
 
    if (!resposta.ok) throw new Error('Falha ao atualizar estoque (status ' + resposta.status + ')');
 
    await carregarMateriais();
    mostrarToast(`Baixa de ${quantidadeRetirada} unidade(s) registrada em "${material.nome}".`);
  } catch (erro) {
    console.error('Erro ao registrar baixa:', erro);
    mostrarToast('Erro ao registrar baixa no servidor.', 'erro');
  }
}
 async function excluirMaterial(id) {
  const material = materiais.find((m) => String(m.id) === String(id));
  const nome = material ? material.nome : 'material';
 
  if (!confirm(`Tem certeza que deseja excluir "${nome}" do estoque?`)) return;
 
  try {
    const resposta = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!resposta.ok) throw new Error('Falha ao excluir material (status ' + resposta.status + ')');
 
    await carregarMateriais();
    mostrarToast(`"${nome}" excluído do estoque.`);
  } catch (erro) {
    console.error('Erro ao excluir material:', erro);
    mostrarToast('Erro ao excluir material.', 'erro');
  }
}
 
function renderizarTabela(lista) {
  const tbody = document.getElementById('lista-materiais');
 
  if (!lista || lista.length === 0) {
    tbody.innerHTML = '<tr class="empty-row"><td colspan="8">Nenhum material cadastrado.</td></tr>';
    return;
  }
 
  tbody.innerHTML = lista
    .map((m, index) => {
      const qtd = Number(m.quantidade) || 0;
      const qtdClasse = qtd === 0 ? 'qtd-zero' : 'qtd-normal';
      const chipClasse = m.categoria === 'permanente' ? 'chip-permanente' : 'chip-consumo';
      const chipLabel = m.categoria === 'permanente' ? 'Permanente' : 'Consumo';
 
      const linhaClasse = qtd < 10 ? 'estoque-critico' : '';
 
      let validadeHtml = '—';
      if (m.validade) {
        const dias = diasParaVencer(m.validade);
        let classeValidade = 'val-ok';
        if (dias < 0) classeValidade = 'val-vencido';
        else if (dias <= 30) classeValidade = 'val-aviso';
        validadeHtml = `<span class="${classeValidade}">${formatarData(m.validade)}</span>`;
      }
 
      return `
        <tr data-id="${m.id}" class="${linhaClasse}">
          <td>${index + 1}</td>
          <td>${m.nome || '—'}</td>
          <td><span class="chip ${chipClasse}">${chipLabel}</span></td>
          <td class="qtd ${qtdClasse}">${qtd}</td>
          <td>${m.unidade || '—'}</td>
          <td>${validadeHtml}</td>
          <td>${m.instrutor || '—'}</td>
          <td class="acoes">
            <button class="btn-baixar" data-id="${m.id}">Baixar</button>
            <button class="btn-excluir" data-id="${m.id}">Excluir</button>
          </td>
        </tr>
      `;
    })
    .join('');
}
 
function atualizarDashboard(lista) {
  const totalItens = lista.length;
  const totalZerados = lista.filter((m) => Number(m.quantidade) === 0).length;
  const totalAlertasValidade = lista.filter((m) => {
    if (!m.validade) return false;
    const dias = diasParaVencer(m.validade);
    return dias !== null && dias <= 30;
  }).length;
 
  document.getElementById('total-itens').textContent = totalItens;
  document.getElementById('total-alertas-val').textContent = totalAlertasValidade;
  document.getElementById('total-zerados').textContent = totalZerados;
}
 

function atualizarAlertas(lista) {
  const painel = document.getElementById('painel-alertas');
  if (!painel) return;
 
  const vencendoOuVencidos = lista.filter((m) => {
    if (!m.validade) return false;
    const dias = diasParaVencer(m.validade);
    return dias !== null && dias <= 30;
  });
  const zerados = lista.filter((m) => Number(m.quantidade) === 0);
 
  let html = '';
  if (vencendoOuVencidos.length > 0) {
    html += `<div class="alerta-item validade">⚠️ ${vencendoOuVencidos.length} item(ns) com validade vencida ou próxima do vencimento.</div>`;
  }
  if (zerados.length > 0) {
    html += `<div class="alerta-item zerado">⛔ ${zerados.length} item(ns) com estoque zerado.</div>`;
  }
 
  painel.innerHTML = html;
}
 function aplicarFiltros() {
  const termoBusca = document.getElementById('input-busca').value.trim().toLowerCase();
  const categoria = document.getElementById('filtro-cat').value;
 
  let listaFiltrada = materiais;
 
  if (termoBusca) {
    listaFiltrada = listaFiltrada.filter((m) => (m.nome || '').toLowerCase().includes(termoBusca));
  }
  if (categoria) {
    listaFiltrada = listaFiltrada.filter((m) => m.categoria === categoria);
  }
 
  renderizarTabela(listaFiltrada);
}
 
function exportarCSV() {
  if (!materiais || materiais.length === 0) {
    mostrarToast('Não há materiais para exportar.', 'erro');
    return;
  }
 
  const cabecalho = ['Nome', 'Categoria', 'Quantidade', 'Unidade', 'Validade', 'Instrutor', 'Observacoes'];
  const linhas = materiais.map((m) => [
    m.nome || '',
    m.categoria || '',
    m.quantidade ?? '',
    m.unidade || '',
    m.validade || '',
    m.instrutor || '',
    (m.obs || '').replace(/,/g, ';')
  ]);
 
  const conteudoCSV = [cabecalho, ...linhas].map((linha) => linha.join(',')).join('\n');
 
  const blob = new Blob([conteudoCSV], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'almoxarifado_senac.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
 
  mostrarToast('CSV exportado com sucesso!');
}
 function configurarFormularioCadastro() {
  const btnCadastrar = document.getElementById('btn-cadastrar');
 
  btnCadastrar.addEventListener('click', async () => {
    const nome = document.getElementById('input-nome').value.trim();
    const categoria = document.getElementById('input-categoria').value;
    const quantidade = document.getElementById('input-quantidade').value;
    const unidade = document.getElementById('input-unidade').value.trim();
    const validade = document.getElementById('input-validade').value;
    const instrutor = document.getElementById('input-instrutor').value.trim();
    const obs = document.getElementById('input-obs').value.trim();
 
    if (!nome || !categoria || quantidade === '' || Number(quantidade) < 0) {
      mostrarToast('Preencha os campos obrigatórios corretamente.', 'erro');
      return;
    }
 
    const novoMaterial = { nome, categoria, quantidade: Number(quantidade), unidade, validade, instrutor, obs };
 
    btnCadastrar.disabled = true;
    await cadastrarMaterial(novoMaterial);
    btnCadastrar.disabled = false;
 
    // Limpa o formulário após o cadastro
    document.getElementById('input-nome').value = '';
    document.getElementById('input-categoria').value = '';
    document.getElementById('input-quantidade').value = '';
    document.getElementById('input-unidade').value = '';
    document.getElementById('input-validade').value = '';
    document.getElementById('input-instrutor').value = '';
    document.getElementById('input-obs').value = '';
  });
}
 
function configurarEventosTabela() {
  const tbody = document.getElementById('lista-materiais');
 
  tbody.addEventListener('click', async (evento) => {
    const id = evento.target.getAttribute('data-id');
    if (!id) return;
 
    if (evento.target.classList.contains('btn-baixar')) {
      const inputRetirada = document.getElementById('input-retirada');
      const quantidadeRetirada = Number(inputRetirada.value);
 
      if (!inputRetirada.value || quantidadeRetirada <= 0) {
        mostrarToast('Informe a quantidade a retirar antes de clicar em Baixar.', 'erro');
        return;
      }
 
      await registrarBaixa(id, quantidadeRetirada);
      inputRetirada.value = '';
    }
 
    if (evento.target.classList.contains('btn-excluir')) {
      await excluirMaterial(id);
    }
  });
}
 
function configurarFiltrosEAcoes() {
  document.getElementById('input-busca').addEventListener('input', aplicarFiltros);
  document.getElementById('filtro-cat').addEventListener('change', aplicarFiltros);
  document.getElementById('btn-exportar').addEventListener('click', exportarCSV);
  document.getElementById('btn-refresh').addEventListener('click', carregarMateriais);
}
 
document.addEventListener('DOMContentLoaded', () => {
  configurarFormularioCadastro();
  configurarEventosTabela();
  configurarFiltrosEAcoes();
  carregarMateriais();
});