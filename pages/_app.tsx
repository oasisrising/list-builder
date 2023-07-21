import { AppProps } from 'next/app';
import { CustomTheme } from '../styles/CustomTheme';

export default function App({ Component, pageProps }: AppProps) {
  // use this component to manage state across pages
  return (
    <CustomTheme>
      <Component {...pageProps} />
    </CustomTheme>
  );
}
