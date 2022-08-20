import {
    createSlice,
    createAsyncThunk
} from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AUTH } from '../../constants/storage'

interface User {
    name: string;
    email: string;
}

interface SiginState {
    status: string,
    user: User | null;
    status_logout: string;
}

const initialState: SiginState = ({
    status: 'idle',
    user: null,
    status_logout: 'idle'
})

export const checkUser = createAsyncThunk<
    User,
    void
>('signin/checkUser', async () => {

    let user_data = await AsyncStorage.getItem(AUTH);
    if (!user_data) throw new Error('User Not Found');
    let user_data_object: User = JSON.parse(user_data);
    
    return user_data_object
})

export const signin = createAsyncThunk<
    User,
    { name: string, email: string }
>('signin/signin', async (args) => {

    await AsyncStorage.setItem(AUTH, JSON.stringify(args));

    return args
})

export const logout = createAsyncThunk<
    Boolean
>('signin/logout', async () => {

    let user_data = await AsyncStorage.getItem(AUTH);
    if (!user_data) throw new Error('User Not Found');
    
    await AsyncStorage.setItem(AUTH, '');

    return true
})

const signinSlice = createSlice({
    name: 'signin',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(checkUser.fulfilled, (state, action) => {
            state.status = 'success'
            state.user = {
                name: action.payload.name,
                email: action.payload.email
            }
        })
        builder.addCase(checkUser.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(checkUser.rejected, (state, action) => {
            state.status = 'failed'
        })
        builder.addCase(signin.fulfilled, (state, action) => {
            state.status = 'success'
            state.user = {
                name: action.payload.name,
                email: action.payload.email
            }
        })
        builder.addCase(signin.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(signin.rejected, (state, action) => {
            state.status = 'failed'
        })
        builder.addCase(logout.fulfilled, (state, action) => {
            state.status_logout = 'success'
            state.status = 'idle'
        })
        builder.addCase(logout.rejected, (state, action) => {
            state.status_logout = 'failed'
        })
        builder.addCase(logout.pending, (state, action) => {
            state.status_logout = 'loading'
        })
        
    },
})

export default signinSlice.reducer