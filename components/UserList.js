import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { channelStartUserChannelLoad } from "../actions/channels";
import UserItem from "./UserItem";


const UserList = () => {


    const { activeChannel } = useSelector(state => state.channel);
    const { channel } = activeChannel;

    return (
        <>
            {
                channel.members.map(user => (
                    <UserItem
                        key={user._id}
                        profile={user.profile}                        
                        username={user.username} />
                ))
            }
        </>




    );
}

export default UserList;