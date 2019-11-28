

export const createTodo = (todo) => {
    return  (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection("todos").add({
            title : "",
            content: ""
        }).then(() => {
            dispatch({
                type: "CREATE_TODO",
                todo: todo
            })
        }).catch((err) => {
            dispatch({
                type: "CREATE_TODO_ERROR",
                err
            })
        })
    }
    
}

export const updateTodo = (todo) => {
    return  (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const col = firestore.collection("todos").doc(todo.id)
        
        
        col.update({
            title : todo.title,
            content: todo.content
        }).then(() => {
            dispatch({
                type: "UPDATE_TODO",
                todo: todo
            })
        }).catch((err) => {
            dispatch({
                type: "UPDATE_TODO_ERROR",
                err
            })
        })
    }
    
}
 

export const deleteTodo = (todo) => {
    return  (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const col = firestore.collection("todos").doc(todo.id)
        col.delete()
        .then(() => {
            dispatch({
                type: "DELETE_TODO",
                todo: todo
            })
        }).catch((err) => {
            dispatch({
                type: "UPDATE_TODO_ERROR",
                err
            })
        })
    }
    
}