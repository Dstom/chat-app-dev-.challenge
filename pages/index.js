

import { getSession } from 'next-auth/client';

export default function HomePage() {

  return (
    <div className="m-auto">
      <h1 className="text-white text-3xl">
        Welcome to Chat App
      </h1>
    </div>
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
