import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { UserIcon } from '@heroicons/react/solid';
import { editAvatar } from '../services/edtAvatar';


export default function ProfileModal({ image }) {

    const [isOpen, setIsOpen] = useState(false);

    const [file, setFile] = useState(null);


    const fileInputRef = useRef();

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const handleFileUpload = (e) => {
        if (e.target.files[0]) {
            setFile(
                //URL.createObjectURL(e.target.files[0])
                e.target.files[0]
            )
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (file) {
            const resp = editAvatar(file)
            console.log(resp);
        }
    }        
    return (
        <>
            {/* <button
                onClick={openModal}
                className='flex items-center w-full px-6 py-2 text-sm text-white'

            >
                <UserIcon className="w-4 h-4 mr-4" />Your Profile
            </button> */}

            <img className="h-12 w-12 rounded-lg cursor-pointer"
                onClick={openModal}
                src={image} />

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-50 overflow-y-auto"
                    onClose={closeModal}
                >

                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black opacity-40" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-purple-mid shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-white"
                                >
                                    Profile
                                </Dialog.Title>
                                <div className="mt-2 flex justify-center">
                                    {
                                        (file) ? <img src={URL.createObjectURL(file)} width={200} height={200} /> :
                                            <Image src={image} width={200} height={200} />
                                    }
                                </div>

                                <form className="mt-4" onSubmit={handleSubmit}>
                                    <input
                                        onChange={handleFileUpload}
                                        ref={fileInputRef}
                                        type="file"
                                        className="hidden"
                                        multiple={false}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current.click()}
                                        className="mr-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                    >
                                        Upload Avatar
                                    </button>

                                    <button
                                        type="submit"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                    >
                                        Save
                                    </button>
                                </form>

                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>


        </>


    )
}
