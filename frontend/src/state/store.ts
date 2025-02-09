import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./User/User";
import NoticationsReducer from "./Notification/Notifcations";
import BlocksReducer from "./Relationships/Blocks";
import FriendRequestsReducer from "./Relationships/FriendRequest";
import FriendsReducer from "./Relationships/Friends";

export  const store = configureStore({
  reducer: {
    user: UserReducer,
    notifications: NoticationsReducer,
    blocks: BlocksReducer,
    friendRequests: FriendRequestsReducer,
    friends: FriendsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
