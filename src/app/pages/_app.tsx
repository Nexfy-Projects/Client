import { RecoilRoot } from 'recoil';
import '../styles/globals.css'; // グローバルなCSSファイルがあればインポート

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
