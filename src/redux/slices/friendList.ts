import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FriendData {
  nick: string;
  img: string;
  status: string;
}

export const friendList = createSlice({
  name: "friendList",
  initialState: [
    { nick: "sample1", img: "/asset/profileImage/default.png", status: "USST10" },
    { nick: "sample2a", img: "/asset/profileImage/default.png", status: "USST30" },
    { nick: "sample3aa", img: "/asset/profileImage/default.png", status: "USST20" },
    { nick: "sample4aaa", img: "/asset/profileImage/default.png", status: "USST40" },
    { nick: "sample5aa", img: "/asset/profileImage/default.png", status: "USST10" },
    { nick: "sample6a", img: "/asset/profileImage/default.png", status: "USST10" },
    { nick: "sample7", img: "/asset/profileImage/default.png", status: "USST30" },
  ] as FriendData[],
  reducers: {
    addFriend(state, action: PayloadAction<FriendData>) {
      return [...state, action.payload];
    }
  }
});

export const { addFriend } = friendList.actions;
export default friendList.reducer;
