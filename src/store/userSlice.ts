import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserState {
    name: string,
    age: number
}

const initialState: UserState = {
    name: '测试用户',
    age: 18
}

export const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        updateUserName: (state, action: PayloadAction<string>) => {
            state.name = action.payload
        }
    }
})

export const {updateUserName} = userSlice.actions
export default userSlice.reducer
