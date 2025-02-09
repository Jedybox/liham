import { createSlice } from "@reduxjs/toolkit";

interface Request {
    id: string | number;
    username: string;
    is_friend: boolean;
}

interface FriendRequestState {
    requests: Request[];
}

const initialState: FriendRequestState = {
    requests: [],
};

const friendRequestSlice = createSlice({
    name: "friendRequest",
    initialState,
    reducers: {
        addRequest(state, action) {
            state.requests.push(action.payload);
        },
        removeRequest(state, action) {
            state.requests = state.requests.filter(
                (request) => request.id !== action.payload
            );
        },
    },
});

export const isInRequests = (state: FriendRequestState, id: string | number) => {
    return state.requests.some((request) => request.id === id);
};

export const { addRequest, removeRequest } = friendRequestSlice.actions;
export default friendRequestSlice.reducer;