// Ajustes no projeto Android gerado pelo Capacitor (roda depois de "npx cap add android"):
//  1) permissão de vibração (o jogo vibra ao pular, atacar etc.)
//  2) tela cheia sem a barra de status
//  3) versão do app = versão do jogo
import { readFileSync, writeFileSync } from 'node:fs';

const edit = (file, fn) => {
  const antes = readFileSync(file, 'utf8');
  const depois = fn(antes);
  if (depois === antes) console.log('já estava ajustado:', file);
  else { writeFileSync(file, depois); console.log('ajustado:', file); }
};

edit('android/app/src/main/AndroidManifest.xml', s =>
  s.includes('android.permission.VIBRATE') ? s :
  s.replace('<uses-permission android:name="android.permission.INTERNET" />',
            '<uses-permission android:name="android.permission.INTERNET" />\n    <uses-permission android:name="android.permission.VIBRATE" />'));

edit('android/app/src/main/res/values/styles.xml', s =>
  s.includes('windowFullscreen') ? s :
  s.replace('<item name="android:background">@null</item>',
            '<item name="android:background">@null</item>\n        <item name="android:windowFullscreen">true</item>'));

const versao = JSON.parse(readFileSync('package.json', 'utf8')).version;
edit('android/app/build.gradle', s => s.replace(/versionName "[^"]*"/, `versionName "${versao}"`));
