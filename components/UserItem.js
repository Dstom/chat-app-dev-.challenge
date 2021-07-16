import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { channelSetActive, channelSidebarToggle } from '../actions/channels';

const UserItem = ({ profile, username }) => {

    return (
        <div
            className="flex gap-3 items-center mb-5 ">

            <img className="h-12 w-12 rounded-lg"
                src={profile} />

            <h1>{username}</h1>
        </div>

    );
}

export default UserItem;