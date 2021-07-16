import { types } from '../types/types';
const initialState = {
    userChannels: [],
    activeChannel: null,
    sidebarToggle: false

}

export const channelReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.channelUserChannelsLoaded:
            return {
                ...state,
                userChannels: [...action.payload]
            }
        case types.channelAddNew:
            return {
                ...state,
                userChannels: [...state.userChannels, action.payload]
            }
        case types.channelSetActive:
            return {
                ...state,
                activeChannel: action.payload
            }
        case types.channelSidebarToggle:
            return {
                ...state,
                sidebarToggle: !state.sidebarToggle
            }
        case types.channelJoinChannel: {
            console.log(action.payload);
            return {
                ...state,
                userChannels: state.userChannels.map(e =>
                    e._id === action.payload.channelId ? { ...e, isMember: true, members: [...e.members, action.payload.user] } : e
                )
            }
        }
        default:
            return state;
    }
}