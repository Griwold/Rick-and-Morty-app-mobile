import {
    EntityState
} from '@reduxjs/toolkit';

export interface User {
    name: string;
    email: string;
}

export interface CharacterState extends EntityState<Character> {
    status: string,
    user: User | null,
    status_save_character: string,
    current_character: Character | null,
    status_pagining: string,
    filters: {
        name: string
    },
    info: {
        count: number,
        next: string | null,
        pages: number,
        prev: string | null
    }
}

export interface Character {
    id: number,
    name: string
    status: string,
    species: string,
    type: string,
    gender: string,
    origin: {
        name: string,
        url: string
    },
    location: {
        name: string,
        url: string,
        id?: number,
        type?: string,
        dimension?: string,
        residents?: string[],
        created?: string
    },
    image: string,
    episode: string[],
    url: string,
    created: string
}

export interface Characters {
    info: {
        count: number,
        pages: number,
        next: string,
        prev: string | null
    },
    results: Character[]
}

export interface Episode {
    id: number,
    name: string,
    air_date: string,
    episode: string,
    characters: string[],
    url: string,
    created: string
}