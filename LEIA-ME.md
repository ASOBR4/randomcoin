# RandomCoin — projeto para gerar o APK (edualC gaming)

Este pacote converte o jogo (`www/index.html`) em um app Android usando o Capacitor.
O jogo funciona **sem internet** (a fonte já está dentro do arquivo).

> O arquivo `.apk` em si não vem pronto aqui: para compilar é preciso o Android SDK, que não
> dá para baixar no ambiente onde este projeto foi criado. Por isso o pacote traz tudo configurado
> e uma "receita" que compila o APK por você. Escolha um dos dois caminhos abaixo.

---

## Caminho A — pelo GitHub (não precisa instalar nada)

1. Crie uma conta em https://github.com e um repositório novo (pode ser privado).
2. Envie **todo o conteúdo desta pasta** para o repositório.
   - Pelo GitHub Desktop ou pelo Git, isso funciona direto.
   - Pelo site (arrastar arquivos), a pasta `.github` pode ficar de fora por ser "oculta". Se for o seu caso:
     clique em **Add file → Create new file**, digite o nome `.github/workflows/android.yml`
     e cole o conteúdo do arquivo `workflow-android.yml` (que está na raiz deste pacote).
3. No repositório, abra a aba **Actions → Gerar APK → Run workflow**.
4. Espere uns 5 a 10 minutos. Quando ficar verde, abra a execução e baixe o arquivo
   **RandomCoin-apk** (na parte "Artifacts"). Ele vem dentro de um .zip: extraia e você terá o `app-debug.apk`.
5. Passe o APK para o celular e abra-o. O Android vai pedir para permitir a instalação de apps desta fonte
   (isso é normal para APKs instalados fora da Play Store).

## Caminho B — no seu computador

Precisa de: Node.js 22 ou mais novo, Java (JDK) 21 e o Android SDK (o jeito mais fácil é instalar o Android Studio).

```bash
npm ci
npm run apk
```

O APK fica em `android/app/build/outputs/apk/debug/app-debug.apk`.
Para abrir no Android Studio: rode `npx cap add android`, `node scripts/patch-android.mjs`,
`npx capacitor-assets generate --android`, `npx cap sync android` e abra a pasta `android/`.

---

## O que já está configurado

- **Nome:** RandomCoin · **Pacote:** `com.edualc.randomcoin` · **Versão:** 0.1.2 (a mesma do jogo)
- **Ícone e tela de abertura:** a moeda da edualC gaming (gerados a partir da pasta `assets/`).
- **Tela cheia** (sem a barra de status) e **permissão de vibração** (`scripts/patch-android.mjs`).
- O jogo tem 3 idiomas (português, English e Español), que se troca em OPÇÕES > IDIOMA.
- Os recordes, o idioma e os ajustes dos controles ficam salvos no aparelho.

## Atualizar o jogo depois

Troque o arquivo `www/index.html` pela nova versão e rode a receita de novo (Caminho A ou B).
Obs.: o `index.html` deste pacote já tem a fonte embutida. Se você usar o jogo publicado no Claude,
ele carrega a fonte da internet (Google Fonts) — para o app, mantenha a versão deste pacote ou peça uma nova versão offline.

## Para publicar na Play Store (mais adiante)

O APK gerado aqui é de teste ("debug"). Para a Play Store é preciso um pacote **AAB assinado** com uma chave sua
(`./gradlew bundleRelease` + keystore). Quando quiser, peça que eu prepare essa receita.

## Limitações conhecidas

- O botão voltar do Android fecha o app (ainda não pausa o jogo).
- O botão "Tela cheia" do menu pode não ter efeito no app (ele já abre em tela cheia).
- Não consegui compilar o APK nem abrir o app num Android de verdade; o fluxo foi conferido até a etapa do Gradle. Se o Actions mostrar algum erro, copie a mensagem e me envie.
