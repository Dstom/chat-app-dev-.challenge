import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { createUser } from "../services/auth";

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);

    const router = useRouter();

    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const usernameInputRef = useRef();


    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    }

    const [errorMesage, setErrorMesage] = useState('');
    const [error, setError] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        if (isLogin) {
            const result = await signIn('credentials',
                {
                    redirect: false,
                    email: enteredEmail,
                    password: enteredPassword
                })

            if (result.error) {
                setErrorMesage(result.error);
                setError(true);
            }

            if (!result.error) {
                router.replace('/');
            }

        } else {
            try {

                const enteredUsername = usernameInputRef.current.value;

                const result = await createUser(enteredEmail, enteredPassword, enteredUsername);

                if (result.ok) {
                    const signInResult = await signIn('credentials', {
                        redirect: false,
                        email: enteredEmail,
                        password: enteredPassword
                    })
                    if (!signInResult.error) {
                        router.replace('/');
                    }
                }
            } catch (e) {
                console.log(e);
            }
        }


    }

    const clearError = () => {
        setError(false);
        setErrorMesage('');
    }


    return (
        <div className="bg-purple-mid w-full h-screen flex items-center justify-center">

            <div className="w-80 rounded-md h-80 px-10 py-5">
                <h1 className="font-bold text-3xl w-full text-white text-center mb-5">
                    Chat Group
                </h1>

                {error &&
                    <div
                        className="mb-5 bg-red-900 border border-red-600 text-red-200 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{errorMesage}</span>
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3"
                            onClick={clearError}
                        >
                            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                        </span>
                    </div>
                }


                <form onSubmit={submitHandler}
                    className="flex flex-col  items-center justify-center">
                    <input
                        ref={emailInputRef}
                        className="w-60 mb-3 " placeholder="Email" type="email" />

                    <input
                        ref={passwordInputRef}
                        className="w-60 mb-3 " placeholder="Password" type="password" />
                    {
                        (!isLogin &&
                            <input
                                ref={usernameInputRef}
                                className="w-60 mb-3 " placeholder="Username" type="text" />
                        )
                    }


                    <button className="w-60 border-2 text-white hover:bg-purple-black border-purple-black h-10">
                        {isLogin ? 'Login' : 'Create Account'}
                    </button>
                </form>

                <button
                    type='button'
                    onClick={switchAuthModeHandler}
                    className="text-xs text-white text-right"
                >
                    {isLogin ? 'Create new account' : 'Login with existing account'}

                </button>
            </div>

        </div>

    );
}

export default Login;

