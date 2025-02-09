import { createSlice } from "@reduxjs/toolkit";

interface Friend {
    id: string | number;
    username: string;
}

interface FriendsState {
    friends: Friend[];
}

const initialState: FriendsState = {
    friends: [],
};

const friendsSlice = createSlice({
    name: "friends",
    initialState,
    reducers: {
        addFriend(state, action) {
            state.friends.push(action.payload);
        },
        removeFriend(state, action) {
            state.friends = state.friends.filter(
                (friend) => friend.id !== action.payload
            );
        },
    },
});

export const { addFriend, removeFriend } = friendsSlice.actions;
export default friendsSlice.reducer;