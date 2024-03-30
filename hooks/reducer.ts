
import { createSlice } from '@reduxjs/toolkit'


interface stateType {
    optionProjectState: string,
    numberOfRooms: number,
    priceRooms: [number, number],
    squareRoom: [number, number],
    listFlats: [],
    filterOpen: boolean
}
const initialState: stateType = {
    optionProjectState: "Все",
    numberOfRooms: 1,
    priceRooms: [0, 10000000],
    squareRoom: [0, 200],
    listFlats: [],
    filterOpen: false,
}
export const fatsSlice = createSlice({
    name: 'fats',
    initialState,
    reducers: {
        changeOptionProjectState: (state, action) => {
            state.optionProjectState = action.payload.option
        },
        changeNumberRooms: (state, action) => {
            state.numberOfRooms = action.payload.room
        },

        changeListFlats: (state, action) => {
            state.listFlats = action.payload.fats
        },
        changeSquareRoom: (state, action) => {
            state.squareRoom = action.payload.square
        },
        changePriceRoom: (state, action) => {
            state.priceRooms = action.payload.price
        },
        changeFilterOpen: (state) => {
            state.filterOpen = !state.filterOpen
        }

    }
})

export const { changeNumberRooms, changeOptionProjectState, changeListFlats,
    changeSquareRoom, changePriceRoom, changeFilterOpen } = fatsSlice.actions
export default fatsSlice.reducer