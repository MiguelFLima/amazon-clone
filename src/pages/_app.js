import { Provider } from 'react-redux';
import { store } from '../app/store';
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
  <SessionProvider useSession={pageProps.useSession}>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </SessionProvider>
  )
}

export default MyApp;
