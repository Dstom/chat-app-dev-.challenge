import { useSelector } from "react-redux";

import { MenuIcon } from '@heroicons/react/solid'

const ChannelTopBar = ({ channelName }) => {

    const { activeChannel } = useSelector(state => state.channel);

    return (
        <div className=" pl-8 pr-5 py-4 shadow-md flex items-center ">
            <MenuIcon className="text-white h-6 w-6 mr-4 cursor-pointer"/>

            <h1 className="text-white text-lg font-bold">{activeChannel ? activeChannel?.channel.name.toUpperCase() : channelName}</h1>
        </div>

    );
}

export default ChannelTopBar;