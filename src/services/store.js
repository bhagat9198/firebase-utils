import create from 'zustand'

export const useAppStore = create((set) => ({
  allRecords: [],
  setAllRecords: (val) => set(state => ({allRecords: val}))
}))
