import {v1} from "uuid";

import {FilterValuesType, TodolistStateType} from "../App";

export type TodoReducerAT = ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodoAC>
    | ReturnType<typeof changeTodoFilterAC>
    | ReturnType<typeof changeTodoTitleAC>

const initialState: Array<TodolistStateType> =  [];

export const todolistsReducer = (state: Array<TodolistStateType> = initialState, action: TodoReducerAT): Array<TodolistStateType> => {
    switch (action.type) {
        case "TL/TODOLIST/REMOVE_TODOLIST": {
            let stateCopy = [...state];
            return stateCopy.filter(tl => tl.id !== action.todoId);
        }
        case "TL/TODOLIST/ADD_TODOLIST": {
            let stateCopy = [...state];
            return [{id: action.todoId, title: action.title, filter: "All"}, ...stateCopy];
        }
        case "TL/TODOLIST/CHANGE_TODO_FILTER": {
            return state.map(tl => tl.id !== action.todoId ? tl : {...tl, filter: action.filter});
        }
        case "TL/TODOLIST/CHANGE_TODO_TITLE":{
            return state.map(tl=> tl.id !== action.todoId ? tl : {...tl, title: action.title});
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todoId: string) => {
    return {type: "TL/TODOLIST/REMOVE_TODOLIST", todoId} as const
}
export const addTodoAC = (title: string) => {
    return {type: "TL/TODOLIST/ADD_TODOLIST", title, todoId: v1()} as const
}
export const changeTodoFilterAC = (todoId: string, filter: FilterValuesType) => {
    return {type: "TL/TODOLIST/CHANGE_TODO_FILTER", todoId, filter} as const
}
export const changeTodoTitleAC = (todoId: string, title: string) => {
    return {type: "TL/TODOLIST/CHANGE_TODO_TITLE", todoId, title} as const
}