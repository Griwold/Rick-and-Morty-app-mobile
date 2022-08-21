import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { LocationState } from '../../constants/interfaces/location';
import { Character } from '../../constants/interfaces/character';

const initialState: LocationState = {
    status: 'idle',
    residents: []
}

export const fetchResidents = createAsyncThunk<
    string[],
    Character
>('character/fetchResidents', async (character) => {

    if (character.location.url) {
        let ulr_location = character.location.url;

        const response_location = await axios(ulr_location);

        const data_residents = response_location.data.residents.map((resident: string) => resident.split('/').pop());

        const response_residents = await axios(`https://rickandmortyapi.com/api/character/${data_residents}`);

        let residents: string[] = [];

        if (Array.isArray(response_residents.data)) residents = response_residents.data.map(resident => resident.image);
        else residents = [response_residents.data.image];
        return residents;
    }

    return []

})

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(fetchResidents.fulfilled, (state, action) => {
            state.status= 'success'
            state.residents = action.payload
        })
        builder.addCase(fetchResidents.rejected, (state, action) => {
            state.status = 'failed'
        })
        builder.addCase(fetchResidents.pending, (state, action) => {
            state.status = 'loading'
        })
    }
})

export default locationSlice.reducer