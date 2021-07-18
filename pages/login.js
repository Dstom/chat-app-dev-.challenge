import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/client';
import Login from '../components/Login';

const LoginPage = () => {

    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        getSession().then(session => {
            if (session) {
                router.replace('/')
            } else {
                setIsLoading(false)
            }
        })
    }, [router])

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <Login />

    );
}

export default LoginPage;