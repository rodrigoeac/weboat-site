/**
 * servicos-configurator.js — Lógica interativa do configurador "Monte seu Pacote"
 * Depende de: js/data/servicos-data.js (window.WeBoatServicos)
 *
 * Segurança: Todos os dados renderizados via innerHTML vêm de constantes
 * hardcoded em servicos-data.js, não de input do usuário. Nenhum dado externo
 * é inserido no DOM sem sanitização.
 */
(function () {
  'use strict';

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    var S = window.WeBoatServicos;
    if (!S) return;

    var state = {
      numPessoas: 10,
      selecionados: {},
      tamanhoEmbarcacao: null,
    };

    // ─── Elementos ──────────────────────────────────

    var elPessoas = document.getElementById('configurador-num-pessoas');
    var elTabsContainer = document.querySelector('.configurador__tabs');
    var elPanelsContainer = document.querySelector('.configurador__panels');
    var elResumoLista = document.getElementById('configurador-resumo-lista');
    var elResumoVazio = document.getElementById('configurador-resumo-vazio');
    var elAvisos = document.getElementById('configurador-avisos');
    var elTotal = document.getElementById('configurador-total');
    var elTotalValor = document.getElementById('configurador-total-valor');
    var elTotalPP = document.getElementById('configurador-total-pp');
    var elWhatsAppBtn = document.getElementById('configurador-whatsapp-btn');
    var elEscolherLanchaBtn = document.getElementById('configurador-escolher-lancha-btn');

    if (!elPessoas || !elTabsContainer) return;

    restoreFromURL();
    renderTabs();
    renderAllPanels();
    updateAll();

    // ─── Input de pessoas ───────────────────────────

    elPessoas.addEventListener('input', function () {
      var val = parseInt(this.value, 10);
      if (!isNaN(val)) {
        state.numPessoas = Math.max(5, Math.min(65, val));
      }
      updateAll();
    });

    elPessoas.addEventListener('blur', function () {
      this.value = state.numPessoas;
    });

    document.querySelectorAll('.configurador__stepper-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (this.dataset.action === 'increment') {
          state.numPessoas = Math.min(65, state.numPessoas + 1);
        } else {
          state.numPessoas = Math.max(5, state.numPessoas - 1);
        }
        elPessoas.value = state.numPessoas;
        updateAll();
      });
    });

    // ─── Smooth scroll para "Montar meu pacote" ────

    document.querySelectorAll('.servicos-montar-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var target = document.getElementById('configurador');
        if (target) {
          var headerH = document.getElementById('header');
          var offset = (headerH ? headerH.offsetHeight : 72) + 16;
          window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
        }
      });
    });

    // ─── Renderizar tabs ────────────────────────────

    function renderTabs() {
      elTabsContainer.textContent = '';
      S.CATEGORIAS.forEach(function (cat, idx) {
        var btn = document.createElement('button');
        btn.setAttribute('data-tab', 'cat-' + cat.id);
        btn.className = 'configurador__tab' + (idx === 0 ? ' active' : '');
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');

        var icon = document.createElement('i');
        icon.className = 'ph ' + cat.icone;
        btn.appendChild(icon);

        var span = document.createElement('span');
        span.textContent = ' ' + cat.nome;
        btn.appendChild(span);

        btn.addEventListener('click', function () {
          var targetId = this.getAttribute('data-tab');

          // Deactivate all tabs
          elTabsContainer.querySelectorAll('.configurador__tab').forEach(function (t) {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
          });
          // Activate clicked tab
          this.classList.add('active');
          this.setAttribute('aria-selected', 'true');

          // Switch panels
          elPanelsContainer.querySelectorAll('.configurador__panel').forEach(function (panel) {
            if (panel.getAttribute('data-tab-panel') === targetId) {
              panel.classList.add('active');
              panel.setAttribute('aria-hidden', 'false');
            } else {
              panel.classList.remove('active');
              panel.setAttribute('aria-hidden', 'true');
            }
          });
        });

        elTabsContainer.appendChild(btn);
      });
    }

    // ─── Renderizar painéis ─────────────────────────

    function renderAllPanels() {
      elPanelsContainer.textContent = '';

      S.CATEGORIAS.forEach(function (cat, idx) {
        var panel = document.createElement('div');
        panel.setAttribute('data-tab-panel', 'cat-' + cat.id);
        panel.className = 'configurador__panel' + (idx === 0 ? ' active' : '');
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('aria-hidden', idx === 0 ? 'false' : 'true');

        var cardsWrap = document.createElement('div');
        cardsWrap.className = 'configurador__cards';

        var servicos = S.getServicosPorCategoria(cat.id);
        servicos.forEach(function (servico) {
          cardsWrap.appendChild(buildCard(servico));
        });

        panel.appendChild(cardsWrap);
        elPanelsContainer.appendChild(panel);
      });
    }

    function buildCard(servico) {
      var card = document.createElement('div');
      card.className = 'configurador__card' + (state.selecionados[servico.id] ? ' configurador__card--selected' : '');
      card.setAttribute('data-servico-id', servico.id);
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');

      // Header: checkbox + nome + badge
      var header = document.createElement('div');
      header.className = 'configurador__card-header';

      var label = document.createElement('label');
      label.className = 'configurador__card-label';

      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'configurador__card-check';
      checkbox.checked = !!state.selecionados[servico.id];
      checkbox.setAttribute('tabindex', '-1');

      var nomeSpan = document.createElement('span');
      nomeSpan.className = 'configurador__card-nome';
      nomeSpan.textContent = servico.nome;

      label.appendChild(checkbox);
      label.appendChild(nomeSpan);
      header.appendChild(label);

      if (servico.premium) {
        var badge = document.createElement('span');
        badge.className = 'configurador__card-badge configurador__card-badge--premium';
        badge.textContent = 'Premium';
        header.appendChild(badge);
      }

      card.appendChild(header);

      // Descrição
      var desc = document.createElement('p');
      desc.className = 'configurador__card-descricao';
      desc.textContent = servico.descricao;
      card.appendChild(desc);

      // Preço
      var precoDiv = document.createElement('div');
      precoDiv.className = 'configurador__card-preco';
      precoDiv.setAttribute('data-servico-preco', servico.id);
      updatePrecoElement(precoDiv, servico);
      card.appendChild(precoDiv);

      // Seletor embarcação
      if (servico.tipo === 'por_embarcacao') {
        var embDiv = document.createElement('div');
        embDiv.className = 'configurador__card-embarcacao';

        var embLabel = document.createElement('label');
        embLabel.textContent = 'Tamanho da embarcação:';

        var select = document.createElement('select');
        select.setAttribute('data-embarcacao-select', '');

        var optDefault = document.createElement('option');
        optDefault.value = '';
        optDefault.textContent = 'Selecione...';
        select.appendChild(optDefault);

        var opt36 = document.createElement('option');
        opt36.value = 'ate36pes';
        opt36.textContent = 'Até 36 pés — R$ ' + servico.precoPorEmbarcacao.ate36pes.toLocaleString('pt-BR');
        if (state.tamanhoEmbarcacao === 'ate36pes') opt36.selected = true;
        select.appendChild(opt36);

        var opt50 = document.createElement('option');
        opt50.value = 'ate50pes';
        opt50.textContent = 'Até 50 pés — R$ ' + servico.precoPorEmbarcacao.ate50pes.toLocaleString('pt-BR');
        if (state.tamanhoEmbarcacao === 'ate50pes') opt50.selected = true;
        select.appendChild(opt50);

        select.addEventListener('change', function () {
          state.tamanhoEmbarcacao = this.value || null;
          var cardEl = this.closest('.configurador__card');
          var id = cardEl.dataset.servicoId;
          if (!state.selecionados[id]) {
            state.selecionados[id] = true;
            cardEl.classList.add('configurador__card--selected');
            var cb = cardEl.querySelector('.configurador__card-check');
            if (cb) cb.checked = true;
          }
          updateAll();
        });

        embDiv.appendChild(embLabel);
        embDiv.appendChild(select);
        card.appendChild(embDiv);
      }

      // Click handler
      card.addEventListener('click', function (e) {
        if (e.target.closest('.configurador__card-embarcacao')) return;
        toggleServico(servico.id);
      });

      return card;
    }

    function updatePrecoElement(el, servico) {
      el.textContent = '';

      var valorSpan = document.createElement('span');
      valorSpan.className = 'configurador__preco-valor';

      var tipoSpan = document.createElement('span');
      tipoSpan.className = 'configurador__preco-tipo';

      if (servico.tipo === 'fixo') {
        valorSpan.textContent = 'R$ ' + servico.precoFixo.toLocaleString('pt-BR');
        tipoSpan.textContent = '(valor fixo)';
      } else if (servico.tipo === 'por_embarcacao') {
        if (state.tamanhoEmbarcacao && servico.precoPorEmbarcacao) {
          var precoEmb = servico.precoPorEmbarcacao[state.tamanhoEmbarcacao];
          if (precoEmb) {
            valorSpan.textContent = 'R$ ' + precoEmb.toLocaleString('pt-BR');
            tipoSpan.textContent = '(por embarcação)';
          }
        }
        if (!valorSpan.textContent) {
          valorSpan.textContent = 'A partir de R$ ' + servico.precoPorEmbarcacao.ate36pes.toLocaleString('pt-BR');
          tipoSpan.textContent = '(selecione o tamanho)';
        }
      } else {
        var valorPP = S.getValorPorPessoa(servico, state.numPessoas);
        if (valorPP !== null) {
          var total = valorPP * state.numPessoas;
          valorSpan.textContent = 'R$ ' + valorPP.toLocaleString('pt-BR') + '/pessoa';
          tipoSpan.textContent = '(R$ ' + total.toLocaleString('pt-BR') + ' total)';
        } else {
          var resultado = S.calcularPrecoServico(servico, state.numPessoas, state.tamanhoEmbarcacao);
          if (resultado.cobrancaMinima) {
            valorSpan.textContent = 'R$ ' + resultado.preco.toLocaleString('pt-BR') + ' total';
            tipoSpan.textContent = '(mín. ' + resultado.cobrancaMinima + ' pessoas)';
          } else {
            valorSpan.textContent = 'Consulte';
          }
        }
      }

      el.appendChild(valorSpan);
      el.appendChild(tipoSpan);
    }

    // ─── Toggle serviço ─────────────────────────────

    function toggleServico(id) {
      if (state.selecionados[id]) {
        delete state.selecionados[id];
      } else {
        state.selecionados[id] = true;
      }

      var card = elPanelsContainer.querySelector('[data-servico-id="' + id + '"]');
      if (card) {
        card.classList.toggle('configurador__card--selected', !!state.selecionados[id]);
        var checkbox = card.querySelector('.configurador__card-check');
        if (checkbox) checkbox.checked = !!state.selecionados[id];
      }

      updateAll();
    }

    // Keyboard support
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        var card = e.target.closest('.configurador__card');
        if (card && !e.target.closest('.configurador__card-embarcacao')) {
          e.preventDefault();
          toggleServico(card.dataset.servicoId);
        }
      }
    });

    // ─── Atualizar tudo ─────────────────────────────

    function updateAll() {
      updatePrecos();
      updateResumo();
      updateURL();
      saveToSession();
    }

    function updatePrecos() {
      document.querySelectorAll('[data-servico-preco]').forEach(function (el) {
        var id = el.dataset.servicoPreco;
        var servico = S.getServicoPorId(id);
        if (servico) updatePrecoElement(el, servico);
      });
    }

    function getServicosSelecionados() {
      return Object.keys(state.selecionados).map(function (id) {
        return S.getServicoPorId(id);
      }).filter(Boolean);
    }

    function updateResumo() {
      var selecionados = getServicosSelecionados();
      var temServicos = selecionados.length > 0;

      elResumoVazio.style.display = temServicos ? 'none' : '';
      elTotal.style.display = temServicos ? '' : 'none';
      elWhatsAppBtn.style.display = temServicos ? '' : 'none';
      if (elEscolherLanchaBtn) elEscolherLanchaBtn.style.display = temServicos ? '' : 'none';

      if (!temServicos) {
        elResumoLista.textContent = '';
        elAvisos.textContent = '';
        return;
      }

      // Limpar e rebuild lista
      elResumoLista.textContent = '';

      var total = 0;
      var temChurrasqueira = S.precisaChurrasqueira(selecionados);
      var taxaChurrasqueira = temChurrasqueira ? S.calcularTaxaChurrasqueira(selecionados) : 0;

      selecionados.forEach(function (servico) {
        var resultado = S.calcularPrecoServico(servico, state.numPessoas, state.tamanhoEmbarcacao);
        var li = document.createElement('li');
        li.className = 'configurador__resumo-item';

        var nomeSpan = document.createElement('span');
        nomeSpan.className = 'configurador__resumo-item-nome';
        nomeSpan.textContent = servico.nome;

        var precoSpan = document.createElement('span');
        precoSpan.className = 'configurador__resumo-item-preco';

        if (resultado.preco != null) {
          total += resultado.preco;
          precoSpan.textContent = 'R$ ' + resultado.preco.toLocaleString('pt-BR');
        } else if (resultado.consultar) {
          precoSpan.textContent = 'A consultar';
        }

        li.appendChild(nomeSpan);
        li.appendChild(precoSpan);
        elResumoLista.appendChild(li);
      });

      // Taxa churrasqueira
      if (temChurrasqueira) {
        total += taxaChurrasqueira;
        var taxaLi = document.createElement('li');
        taxaLi.className = 'configurador__resumo-item configurador__resumo-item--taxa';

        var taxaNome = document.createElement('span');
        taxaNome.className = 'configurador__resumo-item-nome';
        taxaNome.textContent = 'Taxa churrasqueira';

        var taxaPreco = document.createElement('span');
        taxaPreco.className = 'configurador__resumo-item-preco';
        if (taxaChurrasqueira === 0) {
          taxaPreco.textContent = 'INCLUSA';
          taxaPreco.classList.add('configurador__resumo-item-preco--inclusa');
        } else {
          taxaPreco.textContent = 'R$ ' + taxaChurrasqueira;
        }

        taxaLi.appendChild(taxaNome);
        taxaLi.appendChild(taxaPreco);
        elResumoLista.appendChild(taxaLi);
      }

      // Total
      elTotalValor.textContent = 'R$ ' + total.toLocaleString('pt-BR');
      var pp = state.numPessoas > 0 ? Math.round(total / state.numPessoas) : 0;
      elTotalPP.textContent = '~ R$ ' + pp.toLocaleString('pt-BR') + '/pessoa';

      // Avisos de conflito
      elAvisos.textContent = '';
      var avisos = S.verificarConflitos(selecionados);
      avisos.forEach(function (aviso) {
        var avisoDiv = document.createElement('div');
        avisoDiv.className = 'configurador__aviso';

        var icon = document.createElement('i');
        icon.className = 'ph ph-warning';
        avisoDiv.appendChild(icon);

        var text = document.createElement('span');
        text.textContent = aviso;
        avisoDiv.appendChild(text);

        var closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.className = 'configurador__aviso-fechar';
        closeBtn.setAttribute('aria-label', 'Fechar aviso');
        closeBtn.textContent = '\u00D7';
        closeBtn.addEventListener('click', function () {
          avisoDiv.remove();
        });
        avisoDiv.appendChild(closeBtn);

        elAvisos.appendChild(avisoDiv);
      });

      // WhatsApp URL
      var mensagem = S.gerarMensagemWhatsApp(selecionados, state.numPessoas, total, state.tamanhoEmbarcacao);
      elWhatsAppBtn.href = S.getWhatsAppURL(mensagem);
    }

    // ─── URL State ──────────────────────────────────

    function updateURL() {
      var params = new URLSearchParams();
      params.set('pessoas', state.numPessoas);
      var ids = Object.keys(state.selecionados);
      if (ids.length > 0) {
        params.set('servicos', ids.join(','));
      }
      if (state.tamanhoEmbarcacao) {
        params.set('embarcacao', state.tamanhoEmbarcacao);
      }

      var newURL = window.location.pathname + '?' + params.toString() + window.location.hash;
      history.replaceState(null, '', newURL);
    }

    // ─── Save to sessionStorage for cart flow ──
    function saveToSession() {
      try {
        var ids = Object.keys(state.selecionados);
        if (ids.length === 0) {
          sessionStorage.removeItem('weboat_servicos_cart');
          return;
        }
        var cart = {
          numPessoas: state.numPessoas,
          servicosIds: ids,
          tamanhoEmbarcacao: state.tamanhoEmbarcacao,
        };
        sessionStorage.setItem('weboat_servicos_cart', JSON.stringify(cart));
      } catch (e) {
        // sessionStorage unavailable (private browsing, quota exceeded)
      }
    }

    // "Escolher Lancha" button handler
    if (elEscolherLanchaBtn) {
      elEscolherLanchaBtn.addEventListener('click', function (e) {
        e.preventDefault();
        saveToSession();
        window.location.href = '/lanchas/';
      });
    }

    function restoreFromURL() {
      var params = new URLSearchParams(window.location.search);

      var pessoas = parseInt(params.get('pessoas'), 10);
      if (!isNaN(pessoas) && pessoas >= 5 && pessoas <= 65) {
        state.numPessoas = pessoas;
        elPessoas.value = pessoas;
      }

      var servicos = params.get('servicos');
      if (servicos) {
        servicos.split(',').forEach(function (id) {
          if (S.getServicoPorId(id)) {
            state.selecionados[id] = true;
          }
        });
      }

      var embarcacao = params.get('embarcacao');
      if (embarcacao === 'ate36pes' || embarcacao === 'ate50pes') {
        state.tamanhoEmbarcacao = embarcacao;
      }
    }
  }
})();
