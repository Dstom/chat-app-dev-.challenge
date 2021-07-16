import { PlusIcon, SearchIcon, ChevronLeftIcon } from '@heroicons/react/solid';
import { useDispatch, useSelector } from 'react-redux';
import { channelSidebarToggle } from '../actions/channels';
import ChannelList from './ChannelList'
import NewChannelModal from './NewChannelModal';
import Profile from './Profile';
import UserList from './UserList';

const ChannelSidebar = () => {

    const { activeChannel } = useSelector(state => state.channel);
    const { channel } = activeChannel;

    const dispatch = useDispatch();
    const closeSidebar = () => {
        dispatch(channelSidebarToggle())
    }
    return (
        <>
            <div className="h-screen flex flex-col w-80 bg-purple-mid text-white font-bold " >

                <div className="w-80 pl-8 pr-5 py-4 
                flex shadow-md items-center">
                    <ChevronLeftIcon className="w-6 h-6 cursor-pointer"
                        onClick={closeSidebar}
                    />
                    <h1 className="text-lg">All Channels</h1>

                </div>

                <div className="pl-8 pt-5 pr-6 flex-grow scrollbar-thin scrollbar-thumb-purple-black scrollbar-purple-mid  overflow-y-auto">

                    <h1 className="text-white text-lg font-bold mb-4">{channel.name.toUpperCase()}</h1>
                    <p className="text-gray-200 mb-8">
                        {channel.description}
                    </p>

                    <h1 className="text-white text-lg font-bold mb-4">MEMBERS</h1>


                    <UserList />
                </div>
                <Profile />

            </div>
        </>



    );
}

export default ChannelSidebar;