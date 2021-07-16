import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { channelStartUserChannelLoad } from "../actions/channels";
import ChannelItem from "./ChannelItem";


const ChannelList = ({ searchTerm }) => {

    const { userChannels } = useSelector(state => state.channel);

    const dispatch = useDispatch();

    const getAcronym = (text) => {
        return text
            .split(/\s/)
            .reduce((accumulator, word) => accumulator + word.charAt(0).toUpperCase(), '');
    }

    useEffect(() => {
        dispatch(channelStartUserChannelLoad());
    }, [dispatch])


    return (
        <>
            {
                userChannels.filter(channel => channel.name.toLowerCase().includes(searchTerm.toLowerCase()) && channel)
                    .map(channel => (
                        <ChannelItem
                            channel={channel}
                            id={channel._id}
                            key={channel._id}
                            acronym={getAcronym(channel.name)} channelName={channel.name} />
                    ))
            }
        </>
    );
}

export default ChannelList;