import { AppProps } from 'next/app';
import '../styles/styles.css';

export default function App({ Component, pageProps }: AppProps) {
  // use this component to manage state across pages
  return <Component {...pageProps} />;
}
