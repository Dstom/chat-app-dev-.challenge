import ChannelTopBar from '../ChannelTopBar';
import Sidebar from '../Sidebar';
import { useSelector } from 'react-redux';

import { Transition } from '@headlessui/react';
import { Fragment } from 'react';
import ChannelSidebar from '../ChannelSidebar';

const Dashboard = ({ children }) => {

    const { sidebarToggle, activeChannel, userChannels } = useSelector(state => state.channel);

    return (
        <>
            <div className="flex ">
                <Sidebar />

                <Transition
                    as={Fragment}
                    show={sidebarToggle}
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="-translate-x-80"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-80"
                >
                    <div className="fixed inset-y-0 left-0  max-w-full flex z-10">
                        <ChannelSidebar />
                    </div>

                </Transition>

                <div className="bg-purple w-full h-screen flex flex-col">
                    <ChannelTopBar channelName="&nbsp;" />

                    {children}


                </div>
            </div>

        </>
    )
}

export default Dashboard;