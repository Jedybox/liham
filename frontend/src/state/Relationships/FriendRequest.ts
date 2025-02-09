import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FriendRequestState {
    requestsIDs: string[];
}

const initialState: FriendRequestState = {
    requestsIDs: [],
};

const friendRequestSlice = createSlice({
    name: "friendRequest",
    initialState,
    reducers: {
        addRequest(state, action: PayloadAction<string>) {
            state.requestsIDs.push(action.payload);
            console.log(action.payload + " added to friend requests");
        },
        removeRequest(state, action) {
            state.requestsIDs = state.requestsIDs.filter(
                (requestsIDs) => requestsIDs !== action.payload
            );
            console.log(action.payload + " removed from friend requests");
        },
    },
});

export const isInRequests = (state: FriendRequestState, id: string | number): boolean => {
    return state.requestsIDs.some((requestsIDs) => requestsIDs === id);
};

export const { addRequest, removeRequest } = friendRequestSlice.actions;
export default friendRequestSlice.reducer;