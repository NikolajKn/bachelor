

export const createTodo = (cardOrder,taskName) => {
    console.log(cardOrder)
    return  (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection("todos").add({
            title : "",
            assignment:"",
            content: ""
        }).then(
            (docRef) => _updateOrder([...cardOrder,docRef.id], taskName, dispatch, firestore)
        ) /*
        .then(() => {
            dispatch({
                type: "CREATE_TODO",
            
            })
        })*/
        .catch((err) => {
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
            assignment:todo.assignment,
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



export const updateOrder = (cardOrder, name) => {
    console.log("UPDATE ORDER", cardOrder)
    console.log("UPDATE ORDER", name)
    return  (dispatch, getState, { getFirebase, getFirestore }) => {
        _updateOrder(cardOrder, name, dispatch, getFirestore());
    }
    
}

const _updateOrder = (cardOrder, name, dispatch, firestore) => {
    console.log("_updateOrder:", cardOrder, name);
    firestore.collection("cardOrder").doc(name).update({
        order:cardOrder,
        __thisisjustatest: 1
    }).then(() => {
        console.log("dispatch after _updateOrder");
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

