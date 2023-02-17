import { Todo } from "../todos/models/todo.model";

export const Filters = {
    All: 'all',
    Completed: 'completed',
    Pending: 'Pending'
}

const state = {
    todos: [
        // new Todo('Piedra del alma'),
        // new Todo('Piedra del infinito'),
        // new Todo('Piedra del amor'),
        // new Todo('Piedra del campo'),
    ],
    filter: Filters.All,
}

const initStore = () => {
    loadStore();
    console.log('initStore');
}


const loadStore = () => {
    if (!localStorage.getItem('state')) return;

    const {todos = [], filter = Filters.All} = JSON.parse(localStorage.getItem('state'));

    state.todos = todos;
    state.filter = filter;
}


const saveStateTodoLocalStorage = () => {

    // console.log(JSON.stringify(state));

    localStorage.setItem('state', JSON.stringify(state));

}


const getTodos = (filter = Filters.All) => {

    switch(filter) {
        case Filters.All:
            return [...state.todos];
            // break;
        case Filters.Completed:
            return state.todos.filter(todo => todo.done);

        case Filters.Pending:
            return state.todos.filter(todo => !todo.done);

        default:
            throw new Error(`Option ${filter} is not valid`); 
    }
}

/**
 * 
 * @param {String} description 
 */
const addTodo = (description) => {
    if (! description) throw new Error('Description is required');

    state.todos.push(new Todo(description));

    saveStateTodoLocalStorage();
}


/**
 * 
 * @param {String} todoId 
 */
const toggleTodo = (todoId) => {
    // mas eficiente utilizar un find y reemplazar el objeto en el todo en la posicion indicada

    state.todos = state.todos.map(todo => {
        if (todo.id === todoId) todo.done = !todo.done;
        return todo;
    });

    saveStateTodoLocalStorage();
}

/**
 * 
 * @param {String} todoId 
 */
const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);
    saveStateTodoLocalStorage();
}


const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done);
    saveStateTodoLocalStorage();
}


/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = (newFilter = Filters.All) => {
    // if (newFilter !== Filters.All || newFilter !== Filters.Completed || newFilter !== Filters.Pending ) {
    //     throw new Error(`${newFilter} is not valid`);
    // }

    state.filter = newFilter;
    saveStateTodoLocalStorage();
}

const getCurrentFilter = () => {
    return state.filter;
}


export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}
