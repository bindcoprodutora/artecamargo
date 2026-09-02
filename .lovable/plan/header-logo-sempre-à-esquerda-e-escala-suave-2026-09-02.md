# Header: logo sempre à esquerda e escala suave

## Objetivo
Deixar a logo posicionada à esquerda o tempo todo no header fixo, ficando maior quando a página está no topo e reduzindo suavemente de escala quando o usuário rola. Manter a mesma imagem de logo.

## 1. Ajustar posicionamento e animação da logo no Header
**Arquivo:** `src/components/site/Header.tsx`

- Renderizar apenas um componente de logo (manter `BrandLogoFull`) posicionado à esquerda dentro do header o tempo todo.
- No estado expandido (topo da página), exibir a logo em escala maior (`scale-100`, `h-20` / `lg:h-28`, ou equivalente).
- No estado compacto (após scroll), reduzir a escala da mesma logo suavemente (`scale-[0.6]` ou `h-12` / `lg:h-14`, a decidir no ajuste fino) e manter o alinhamento à esquerda.
- Usar `transform` + `transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]` para que a redução seja smooth.
- Reposicionar a navegação desktop para ficar centralizada abaixo da logo no estado expandido, e centralizada em uma única linha ao lado da logo compacta no estado rolado.
- Manter os ícones de busca e carrinho à direita, alinhados com a navegação.
- Garantir que o contêiner do header não quebre de altura durante a transição, limitando `min-h` nos estados.

## 2. Compensar o header na página inicial, se necessário
**Arquivo:** `src/routes/index.tsx`

- Verificar se o padding superior do hero (`pt-36`, `sm:pt-44`, `lg:pt-52`) continua suficiente agora que a logo fica à esquerda e a navegação pode ocupar a mesma faixa.
- Se o conteúdo do hero ainda parecer muito colado no header, ajustar o `padding-top` proporcionalmente.

## 3. Validar
- Executar build local para garantir ausência de erros de tipo.
- Capturar screenshots do preview no topo e após scroll para verificar a logo à esquerda e a suavidade da escala.
