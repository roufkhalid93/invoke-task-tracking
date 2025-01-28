import { createContext, useReducer } from 'react'

//create custom context provider component
export const TasksContext = createContext()

export const tasksReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TASKS':
            return {
                tasks: action.payload
            }
        case 'CREATE_TASK':
            return {
                tasks: [action.payload, ...state.tasks]
            }
        default: 
            return state
    }
}

//return actual provider of created context
export const TasksContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(tasksReducer, {
        tasks: null
    })

    return (
        <TasksContext.Provider value={{...state, dispatch}}>
            { children }
        </TasksContext.Provider>
    )
}