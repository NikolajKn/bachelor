

export const createTodo = (cardOrder) => {
    console.log(cardOrder)
    return  (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection("todos").add({
            title : "",
            content: ""
        }).then(
            function(docRef){
                cardOrder.push(docRef.id)
                dispatch(updateOrder(cardOrder))
            }
        )
        .then(() => {
            dispatch({
                type: "CREATE_TODO",
            
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


export const updateOrder = (cardOrder) => {
    console.log("UPDATE ORDER", cardOrder)
    return  (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const col = firestore.collection("cardOrder").doc("order")
        
        col.update({
            order:cardOrder            
        }).then(() => {
            dispatch({
                type: "UPDATE_ORDER",
            })
        }).catch((err) => {
            dispatch({
                type: "UPDATE_TODO_ERROR",
                err
            })
        })
    }
    
}