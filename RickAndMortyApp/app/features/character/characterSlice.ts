import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { Character, CharacterState, Characters, Episode } from '../../constants/interfaces/character';
import { RootState } from '../../store';

const characterAdapter = createEntityAdapter<Character>({
    selectId: (character) => character.id,
})

const initialState: CharacterState = characterAdapter.getInitialState({
    status: 'idle',
    user: null,
    status_save_character: 'idle',
    current_character: null,
    status_pagining: 'idle',
    filters: {
        name: ''
    },
    info: {
        count: 0,
        next: null,
        prev: null,
        pages: 0
    }
})

export const fetchCharacters = createAsyncThunk<
    Characters,
    { name?: string }
>('signin/fetchCharacters', async ({ name }) => {

    let url: string = "https://rickandmortyapi.com/api/character/";

    if (name) url += `?name=${name}`;

    const character_response = await axios(url);

    const characters: Characters = character_response.data;

    return characters;
})

export const fetchCharactersPagining = createAsyncThunk<
    Characters | null,
    void,
    { state: RootState }
>('signin/fetchCharactersPagining', async (args, { getState }) => {

    const filterName = getState().character.filters.name;
    const info = getState().character.info;

    let character_response = null;
    if (info.next) {
        let url: string = info.next;
        if (filterName) url += `&name=${filterName}`;
        character_response = await axios(url);
        const characters: Characters = character_response.data;
        return characters;
    }

    return null

})

export const saveCurrentCharacter = createAsyncThunk<
    Character,
    Character
>('signin/saveCurrentCharacter', async (character) => {

    let url_episodes = 'https://rickandmortyapi.com/api/episode/';

    const episodes = character.episode.map(episode => episode.split('/').pop())

    if (!!episodes.length) url_episodes += `${episodes}`;

    const response_episodes = await axios(url_episodes);

    let new_character: Character = { ...character };

    if (response_episodes.data) {
        if (Array.isArray(response_episodes.data)) new_character.episode = response_episodes.data.map((episode: Episode) => episode.name);
        else new_character.episode = [response_episodes.data.name];
    }

    if (character.location.url) {
        let ulr_location = character.location.url;

        const response_location = await axios(ulr_location);
        if (response_location.data) {
            new_character.location = response_location.data;
        }

        let url_residents = 'https://rickandmortyapi.com/api/character/';

        let residents = new_character.location.residents?.map(resident => resident.split('/').pop());

        if (!!residents?.length) url_residents += `${residents}`;

        const response_residents = await axios(url_residents);

        if (response_residents.data) {
            new_character.location.residents = response_residents.data.map((resident: Character) => resident.image);;
        }
    }

    return new_character;
})

export const clearCurrentCharacter = createAsyncThunk<
    null,
    void
>('signin/clearCurrentCharacter', async () => {
    return null;
})

export const setFilter = createAsyncThunk<
    string,
    string
>('signin/setFilter', async (name) => {
    return name;
})


const characterSlice = createSlice({
    name: 'character',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(fetchCharacters.fulfilled, (state, action) => {
            state.status = 'success'
            state.info = action.payload.info
            characterAdapter.setAll(state, action.payload.results)
        })
        builder.addCase(fetchCharacters.rejected, (state, action) => {
            state.status = 'failed'
            state.entities = {};
        })
        builder.addCase(fetchCharacters.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(saveCurrentCharacter.fulfilled, (state, action) => {
            state.status_save_character = 'success'
            state.current_character = action.payload
        })
        builder.addCase(saveCurrentCharacter.rejected, (state, action) => {
            state.status_save_character = 'failed'
        })
        builder.addCase(saveCurrentCharacter.pending, (state, action) => {
            state.status_save_character = 'loading'
        })
        builder.addCase(clearCurrentCharacter.fulfilled, (state, action) => {
            state.status_save_character = 'idle'
            state.current_character = action.payload
        })
        builder.addCase(setFilter.fulfilled, (state, action) => {
            state.filters.name = action.payload
        })
        builder.addCase(fetchCharactersPagining.fulfilled, (state, action) => {
            state.status_pagining = 'success'
            if (action.payload?.info) state.info = action.payload.info
            if (action.payload?.results) characterAdapter.addMany(state, action.payload.results)
            if (!action.payload) state.status_pagining = 'idle';
        })
        builder.addCase(fetchCharactersPagining.pending, (state, action) => {
            state.status_pagining = 'loading'
        })
        builder.addCase(fetchCharactersPagining.rejected, (state, action) => {
            state.status_pagining = 'failed'
        })
    }
})

export default characterSlice.reducer