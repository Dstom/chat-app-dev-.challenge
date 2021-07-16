import { combineReducers } from "redux";
import { channelReducer } from "./channelReducer";


export const rootReducer = combineReducers({
    channel: channelReducer
});

