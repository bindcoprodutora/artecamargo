# Ajustes no header, hero e botão de carrinho

## Objetivo
Tornar a transição da logo no header sticky mais suave, afastar o conteúdo do hero do header expandido no topo e padronizar o hover do botão de carrinho com o botão de busca.

## 1. Transição mais suave da logo no header
**Arquivo:** `src/components/site/Header.tsx`

- Substituir o "aparecer/sumir" brusco entre `BrandLogoFull` e `BrandLogo` por uma transição contínua.
- Técnica sugerida: manter um único container de logo que, no estado expandido, fica centralizado e maior; no estado compacto, escala para o tamanho pequeno e desliza para a esquerda.
- Usar `transform` + `transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]` para o movimento lateral e o scale.
- Evitar trocar elementos via `opacity: 0 / opacity: 100` sem transição coordenada; se mantiver duas logos, animar ambas em sincronia com `transition-all` e delay zero.
- Garantir que a altura final do header compacto não aumente por causa do container maior.

## 2. Descer o conteúdo do hero no topo
**Arquivo:** `src/routes/index.tsx`

- Aumentar o `padding-top` do container de texto do hero para que o bloco de título/botões comece mais abaixo, deixando o header expandido respiar.
- Ajustar proporcionalmente em mobile e desktop (`sm:`, `lg:`).
- Manter o alinhamento vertical central (`items-center`) e o texto alinhado à esquerda.

## 3. Padronizar hover do botão de carrinho
**Arquivo:** `src/components/site/CartDrawer.tsx`

- No `SheetTrigger`/`Button`, adicionar as mesmas classes de hover do botão de busca: `hover:bg-transparent hover:opacity-70`.
- Manter `variant="ghost"` e `size="icon"`.

## Validação
- Executar build local para garantir ausência de erros de tipo.
- Capturar screenshots do preview no topo e após scroll para verificar suavidade da logo e posição do hero.
