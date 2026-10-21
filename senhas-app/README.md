# Meu Cofre — v4 Retro Refatorada

Versão baseada na v4 funcional, mantendo as mesmas regras, rotas e armazenamento.

## Alterações desta versão

- Visual preto e verde preservado.
- Tela inicial centralizada.
- Formulário de nova conta alinhado em um contêiner central.
- Estilos inline removidos.
- `src/lib/styles.ts` contém apenas tema e estilos realmente compartilhados.
- Cada componente possui seu próprio `StyleSheet.create(...)` para estilos específicos da tela.

## Executar

```bash
npm install
npx expo start --clear
```

Senha inicial: `1234`.
