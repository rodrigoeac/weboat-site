# 🔧 PROMPTS DO AGENTE VERIFICADOR

Copie e cole estes prompts no Claude Code para ativar o verificador.

---

## VERIFICAÇÃO COMPLETA (usar após cada fase)

```
Leia VERIFICADOR.md e execute verificação COMPLETA:

1. Execute: ./scripts/verificar.sh
2. Para cada erro encontrado, CORRIJA imediatamente
3. Para cada aviso, avalie e corrija se necessário
4. Gere relatório final do que foi corrigido

Não peça permissão, apenas corrija.
```

---

## VERIFICAÇÃO RÁPIDA (usar durante desenvolvimento)

```
Verificação rápida - execute e corrija:
1. grep -r "Playfair" . (deve retornar vazio)
2. Verifique se todas as páginas HTML têm WhatsApp flutuante
3. Verifique se todas as páginas têm <title> e meta description
Corrija o que encontrar.
```

---

## VERIFICAR APENAS FONTES

```
Verifique todas as ocorrências de fontes no projeto:
- Playfair Display é PROIBIDO (substituir por Plus Jakarta Sans)
- H1/H2 devem usar Plus Jakarta Sans
- H3/H4/botões devem usar DM Sans
- Body deve usar Source Sans 3

Execute grep para encontrar e corrija automaticamente.
```

---

## VERIFICAR APENAS WHATSAPP

```
Verifique WhatsApp em todo o projeto:
1. Número correto: 5521977724114 (sem formatação)
2. Link correto: https://wa.me/5521977724114
3. Botão flutuante em TODAS as páginas HTML
4. Mensagens contextualizadas por página

Liste páginas sem WhatsApp e adicione.
```

---

## VERIFICAR APENAS SEO

```
Verificação SEO completa:
1. Todas as páginas têm <title> único?
2. Todas têm meta description (150-160 chars)?
3. Todas têm canonical?
4. Todas têm Open Graph tags?
5. Todas têm Schema.org (LocalBusiness + específico)?

Liste o que falta e adicione usando docs/weboat_schema_org.md como referência.
```

---

## VERIFICAR APENAS ACESSIBILIDADE

```
Verificação de acessibilidade:
1. Todas as imagens têm alt?
2. Todos os inputs têm label ou aria-label?
3. Todas as páginas têm skip-link?
4. Botões de ícone têm aria-label?
5. Contraste está OK?

Corrija o que encontrar.
```

---

## VERIFICAR CONSISTÊNCIA VISUAL

```
Verifique consistência do Design System:
1. Cores usando variáveis CSS (não hardcoded)
2. Espaçamentos na escala de 8px
3. Header idêntico em todas as páginas
4. Footer idêntico em todas as páginas
5. Botões seguindo padrão de components.css

Corrija inconsistências.
```

---

## CORREÇÃO EM MASSA (após encontrar problemas)

```
Execute correções em massa:

1. Substituir Playfair por Plus Jakarta Sans:
find . -name "*.css" -exec sed -i '' "s/Playfair Display/Plus Jakarta Sans/g" {} \;

2. Corrigir número WhatsApp:
find . -name "*.html" -exec sed -i '' "s/wa\.me\/[0-9]*/wa.me\/5521977724114/g" {} \;

3. Relatar o que foi alterado.
```

---

## RELATÓRIO FINAL (antes de deploy)

```
Gere relatório completo do projeto:

1. Execute ./scripts/verificar.sh
2. Liste todas as páginas criadas
3. Verifique se todas as fases do CLAUDE.md foram completadas
4. Liste pendências (se houver)
5. Confirme que está pronto para deploy

Formato do relatório:
- Total de páginas: X
- Erros: X
- Avisos: X
- Status: PRONTO / PENDENTE
```

---

## DICA: Como usar

1. **Após cada FASE**: Use "VERIFICAÇÃO COMPLETA"
2. **Durante desenvolvimento**: Use "VERIFICAÇÃO RÁPIDA"  
3. **Antes do deploy**: Use "RELATÓRIO FINAL"
4. **Se encontrar problemas específicos**: Use verificações específicas

O verificador foi feito para CORRIGIR automaticamente, não apenas reportar!
