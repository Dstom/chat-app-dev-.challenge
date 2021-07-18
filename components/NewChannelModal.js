import { Fragment, useState, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react';

import { PlusIcon } from '@heroicons/react/solid';
import { useDispatch } from 'react-redux';
import { channelStartAddNew } from '../actions/channels';


export default function NewChannelModal() {

    const [isOpen, setIsOpen] = useState(false);
    const [errors, setErrors] = useState({ name: '', description: '' })

    const inputName = useRef();
    const inputDescription = useRef();

    const dispatch = useDispatch();

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const enteredName = inputName.current.value;
        const enteredDescription = inputDescription.current.value;

        if (!enteredName) { setErrors((prevState) => { return { ...prevState, name: 'Enter a name for your channel' } }) }

        if (!enteredDescription) {
            setErrors((prevState) => {
                return {
                    ...prevState,
                    description: 'Enter a description for your channel'
                }
            }
            )
        }
        if (enteredName) { setErrors((prevState) => { return { ...prevState, name: '' } }) }
        if (enteredDescription) { setErrors((prevState) => { return { ...prevState, description: '' } }) }

        if (!enteredName || !enteredDescription) {
            return;
        }

        dispatch(channelStartAddNew(
            {
                name: enteredName.trim(),
                description: enteredDescription.trim()
            }
        ))
        closeModal();

    }
    return (
        <>
            <div className="bg-purple w-6 h-6 rounded-lg cursor-pointer"
                onClick={openModal}
            >
                <PlusIcon className="w-6 h-6" />
            </div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
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
                                    className="text-lg font-bold leading-6 text-white"
                                >
                                    NEW CHANNEL
                                </Dialog.Title>
                                <form onSubmit={handleSubmit}>
                                    <div className="mt-2">
                                        <label className="text-red-600">{(errors.name) && errors.name}</label>
                                        <input
                                            ref={inputName}
                                            className="ring-indigo-700 mb-4 w-full placeholder-gris bg-true-gray py-1 rounded-lg text-white pl-4" placeholder="Channel Name" />
                                    </div>

                                    <div className="mt-2">
                                        <label className="text-red-600">{(errors.description) && errors.description}</label>
                                        <textarea rows="3" placeholder="Description"

                                            ref={inputDescription}
                                            className="w-full ring-indigo-700 placeholder-gris bg-true-gray py-1 rounded-lg text-white pl-4 resize-none"></textarea>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>

                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
