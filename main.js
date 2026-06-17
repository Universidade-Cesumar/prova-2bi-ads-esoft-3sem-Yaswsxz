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
 
      let validadeHtml = '—';
      if (m.validade) {
        const dias = diasParaVencer(m.validade);
        let classeValidade = 'val-ok';
        if (dias < 0) classeValidade = 'val-vencido';
        else if (dias <= 30) classeValidade = 'val-aviso';
        validadeHtml = `<span class="${classeValidade}">${formatarData(m.validade)}</span>`;
      }
 
      return `
        <tr data-id="${m.id}">
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
 
 