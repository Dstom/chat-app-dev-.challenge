

import { getSession } from 'next-auth/client';

import Home from '../components/Home'

export default function HomePage() {

  return (
    <Home />
  )
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }
}
