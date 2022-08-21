import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { Character } from '../../constants/interfaces/character';
import { Episode, EpisodeState } from '../../constants/interfaces/episode';

const episodesAdapter = createEntityAdapter<Episode>({
    selectId: (episode) => episode.id,
})

const initialState: EpisodeState = episodesAdapter.getInitialState({
    status: 'idle'
})

export const fetchEpisodes = createAsyncThunk<
    Episode[],
    Character
>('episode/fetchEpisodes', async (character) => {

    
    const episodes = character.episode.map(episode => episode.split('/').pop())
    
    const url = `https://rickandmortyapi.com/api/episode/${episodes}`;

    const response_episodes = await axios(url);

    let new_episodes: Episode[] = [];

    if (Array.isArray(response_episodes.data)) new_episodes = response_episodes.data;
    else new_episodes = [response_episodes.data];
    
    return new_episodes;
})

const episodeSlice = createSlice({
    name: 'episode',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(fetchEpisodes.fulfilled, (state, action) => {
            state.status = 'success'
            episodesAdapter.setAll(state, action.payload)
        })
        builder.addCase(fetchEpisodes.rejected, (state, action) => {
            state.status = 'failed'
        })
        builder.addCase(fetchEpisodes.pending, (state, action) => {
            state.status = 'loading'
        })
    }
})

export default episodeSlice.reducer