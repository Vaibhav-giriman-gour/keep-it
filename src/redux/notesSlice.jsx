import { createSlice } from '@reduxjs/toolkit'

const notesSlice = createSlice({
    name: 'notes',
    initialState: [],
    reducers:{
        setNotes:(state, action) =>{
            return action.payload.sort((a, b)=> b.createdOn - a.createdOn)
        },
        addNotes:(state, action)=>{
            state.unshift(action.payload)
        },
        removeNotes:(state, action)=>{
            return state.filter((note)=>note.id !== action.payload.id)
        },
        updateNotes:(state, action)=>{
            const index = state.findIndex((note)=> note.id !== action.payload.id)
            if(index !== -1){
                state[index] = {...state[index], ...action.payload}
            }
        }
    }
})

export const {setNotes, addNotes, removeNotes, updateNotes} = notesSlice.actions
export default notesSlice.reducer
