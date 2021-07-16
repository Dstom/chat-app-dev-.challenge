import { getSession } from "next-auth/client";
import { fetchData } from "../lib/fetch";
import { types } from '../types/types';

export const channelStartAddNew = (channel) => {
    return async (dispatch) => {
        try {
            const resp = await fetchData('channels/addChannel', channel, 'POST');
            const body = await resp.json();

            if (body.ok) {
                console.log(body.channelAdded);
                dispatch(channelAddNew(body.channelAdded))
            }
        } catch (error) {
            console.log("Error: ", error)

        }
    }
}

const channelAddNew = (channel) => {
    return {
        type: types.channelAddNew,
        payload: channel
    }
}

export const channelStartUserChannelLoad = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchData('channels/loadUserChannels', {}, 'POST');
            const body = await resp.json();

            console.log(body);

            if (body.ok) {
                dispatch(channelUserChannelsLoaded(body.channels));
            }

        } catch (error) {
            console.log("Error: ", error);
        }
    }
}

const channelUserChannelsLoaded = (channels) => {
    return {
        type: types.channelUserChannelsLoaded,
        payload: channels
    }
}

export const channelSetActive = (channel) => {
    return {
        type: types.channelSetActive,
        payload: channel
    }
}

export const channelSidebarToggle = () => {
    return {
        type: types.channelSidebarToggle
    }
}

export const channelStartJoinChannel = (id) => {
    return async (dispatch) => {
        try {
            const resp = await fetchData('channels/addMemberToChannel', { id: id }, 'POST');
            const body = await resp.json();

            if (body.ok) {
                console.log(body);
                dispatch(channelJoinChannel(id,body.userUpdated))
            }
        } catch (error) {
            console.log("Error: ", error)

        }
    }

}

const channelJoinChannel = (channelId, user) => {
    return {
        type: types.channelJoinChannel,
        payload: {channelId, user}
    }
}
