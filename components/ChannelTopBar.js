import { useSelector } from "react-redux";

import { MenuIcon } from '@heroicons/react/solid'

const ChannelTopBar = ({ channelName }) => {

    const { activeChannel } = useSelector(state => state.channel);

    return (
        <div className=" pl-8 pr-5 py-4 shadow-md flex items-center justify-between ">


            <h1 className="text-white text-lg font-bold">{activeChannel ? activeChannel?.channel.name.toUpperCase() : channelName}</h1>
            <button className="p-2 focus:outline-none focus:bg-gray-700 ">
                <MenuIcon className="text-white h-6 w-6 cursor-pointer" />
            </button>

        </div>

    );
}

export default ChannelTopBar;