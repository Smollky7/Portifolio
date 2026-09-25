# Preview Deployments de performance

As variantes são selecionadas no build pela variável privada `PERF_VARIANT`.

| Preview | Valor |
| --- | --- |
| Baseline | `baseline` |
| Sem Sphere/R3F | `no-sphere` |
| Sem Lenis | `no-lenis` |
| Sem Motion do Hero | `no-hero-motion` |

Valores ausentes ou desconhecidos usam `baseline`. A variável não utiliza o prefixo `NEXT_PUBLIC_` e não é exposta como configuração pública no navegador.

## Vercel com branches separadas

1. Crie quatro branches a partir do mesmo commit deste projeto.
2. Na Vercel, abra **Project Settings > Environment Variables**.
3. Cadastre `PERF_VARIANT` no ambiente **Preview** com um override específico para cada branch.
4. Use os valores da tabela acima.
5. Faça o deploy de cada branch e anote a URL gerada.
6. Não cadastre essa variável no ambiente **Production**. Sem variável, produção permanece em `baseline`.

## Vercel CLI

Também é possível gerar previews independentes, sempre a partir do mesmo commit:

```powershell
vercel --build-env PERF_VARIANT=baseline
vercel --build-env PERF_VARIANT=no-sphere
vercel --build-env PERF_VARIANT=no-lenis
vercel --build-env PERF_VARIANT=no-hero-motion
```

Cada comando cria um Preview Deployment e retorna sua própria URL. Não use `--prod`.

## Verificação

- Todo Preview Deployment da Vercel recebe `noindex, nofollow` em todas as páginas, inclusive o baseline de controle.
- Produção conserva `index, follow` e, sem variável, todo o comportamento original.
- Canonical, sitemap, JSON-LD, domínio e conteúdo não mudam.
- Execute cada URL três vezes no PageSpeed Desktop e compare a mediana de Performance, FCP, LCP, TBT e CLS.
