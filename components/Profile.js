import { ChevronDownIcon, UserIcon, LogoutIcon } from '@heroicons/react/solid';

import { useState, Fragment } from 'react';

import { Dialog, Menu, Transition } from '@headlessui/react';

import { signOut, useSession } from 'next-auth/client';
import ProfileModal from './ProfileModal';



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const logoutHandler = () => {
    signOut();
}


export default function Profile() {

    const [session, loading] = useSession();
    /*  <img className="h-12 w-12 rounded-lg" 
                        src={} /> */
    return (
        <>
            <div className="bg-purple-black w-full pl-8 pr-5 py-4 flex items-center justify-between" >
                <div className="flex items-center gap-5">

                    <ProfileModal image={ session && session.user.image} />
                    <h1 className="text-gris">{session && session.user.name}</h1>
                </div>

                <Menu as="div" className="relative">
                    {({ open }) => (
                        <>
                            <div>
                                <Menu.Button className="">
                                    <ChevronDownIcon className="w-4 h-4" />
                                </Menu.Button>
                            </div>
                            <Transition
                                show={open}
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items
                                    static
                                    className="bg-purple-mid origin-top-right absolute -top-12 right-0 w-48 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none"
                                >

                                    <Menu.Item>
                                        {({ active }) => (
                                            <button onClick={logoutHandler}
                                                className={classNames(
                                                    active ? 'bg-red-200' : '',
                                                    'flex items-center w-full px-6 py-2 text-sm text-red-700'
                                                )}
                                            >
                                                <LogoutIcon className="w-4 h-4 mr-4" />

                                                Logout</button>

                                        )}
                                    </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </>
                    )}
                </Menu>
            </div>
        </>

    )
}
