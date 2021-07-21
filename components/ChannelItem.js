import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { channelOpenSidebarToggle, channelSetActive, channelSidebarToggle } from '../actions/channels';

const ChannelItem = ({ acronym, channelName, id, channel }) => {

    const router = useRouter();
    const dispatch = useDispatch();

    const handleClick = () => {

        dispatch(channelSetActive({
            channel
        }))

        dispatch(channelOpenSidebarToggle())
        router.push(`/channels/${id}`)
    }

    return (
        <div
            onClick={handleClick}
            className="flex gap-3 items-center mb-5 hover:bg-purple-black hover:rounded-lg cursor-pointer">
            <div className=" rounded-lg bg-purple h-12 w-12 flex items-center justify-center">
                {acronym}
            </div>
            <h1>{channelName}</h1>
        </div>

    );
}

export default ChannelItem;