import { create } from 'zustand'

type Store = {
    shouldUpdateOpp: boolean
    setShouldUpdateOpp: (value: boolean) => void;

    shouldUpdateAccDetails: boolean
    setShouldUpdateAccDetails: (value: boolean) => void;
}

export const useRefreshStore = create<Store>((set) => ({
    shouldUpdateOpp: false,
    setShouldUpdateOpp: (value: boolean) => set({shouldUpdateOpp: value}),

    shouldUpdateAccDetails: false,
    setShouldUpdateAccDetails: (value: boolean) => set({shouldUpdateAccDetails: value})
}));