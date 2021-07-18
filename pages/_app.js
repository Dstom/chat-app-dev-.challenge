import 'tailwindcss/tailwind.css'

import { Provider } from 'next-auth/client';
import { Provider as ReduxProvider } from 'react-redux';
import { useStore } from '../store/store';
import Dashboard from '../components/dashboard/Dashboard';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  const router = useRouter();
  const { pathname } = router;

  const sessionOptions = {
    clientMaxAge: 60, // Re-fetch session if cache is older than 2 hours
    keepAlive: 60 * 60 // Send keepAlive message every hour
  };

  return (
    <ReduxProvider store={store}>
      <Provider session={pageProps.session}>
        {
          pathname === '/login' ?
            <Component {...pageProps} />
            :
            <Dashboard>
              <Component {...pageProps} />
            </Dashboard>
        }

      </Provider>
    </ReduxProvider>
  )

}

export default MyApp
