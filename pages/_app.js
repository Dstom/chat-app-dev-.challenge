import 'tailwindcss/tailwind.css'

import { Provider } from 'next-auth/client';

import { Provider as ReduxProvider } from 'react-redux';
import { useStore } from '../store/store';
import Dashboard from '../components/dashboard/Dashboard';
import { Fragment } from 'react';
import { useRouter } from 'next/router';
import Login from '../components/Login';


const layouts = {
  YES: Dashboard,
  NO: Fragment
};

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  const router = useRouter();
  const { pathname } = router;
  
  /*console.log(Component);
  const Layout = layouts[Component.layout] || ((children) => <>{children}</>);
  console.log(Layout);*/

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
