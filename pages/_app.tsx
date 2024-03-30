import store from '@/hooks/store';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

const App = ({
  Component,
  pageProps,
}: AppProps) => (
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>


);

export default App;
