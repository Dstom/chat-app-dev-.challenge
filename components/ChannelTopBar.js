import { useSelector } from "react-redux";

const ChannelTopBar = ({ channelName }) => {

    const { activeChannel } = useSelector(state => state.channel);

    return (
        <div className=" pl-8 pr-5 py-4 shadow-md">
            <h1 className="text-white text-lg font-bold">{activeChannel ? activeChannel?.channel.name.toUpperCase() : channelName}</h1>
        </div>

    );
}

export default ChannelTopBar;