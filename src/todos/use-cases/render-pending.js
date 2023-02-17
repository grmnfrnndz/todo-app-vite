import todoStore, { Filters } from "../../store/todo.store";

let element;

/**
 * 
 * @param {String} elementID 
 */
export const renderpending = (elementID) => {
    // referencia
    if (!element) element = document.querySelector(elementID);    
    if (!element) throw new Error(`elementId ${elementID} not found`);

    element.innerHTML = todoStore.getTodos(Filters.Pending).length;
}