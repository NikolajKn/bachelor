

const initState = {
    todos:[
        {id: '1', title: 'help me find peach', content: 'blah blah blah'},
        {id: '2', title: 'collect all the stars', content: 'blah blah blah'},
        {id: '3', title: 'egg hunt with yoshi', content: 'blah blah blah'}
    ]
};


const todoReducer = (state = initState, action) => {
    switch(action.type){
        case "CREATE_TODO" : 
        console.log(state)

            console.log("todo created", action.todo)
            console.log(state)

            return state;
        case "UPDATE_TODO" : 
            console.log(state)
            console.log("todo updated", action.todo)
            console.log(state)
            return state;    
        case "DELETE_TODO" : 
            console.log(state)
            console.log("todo deleted", action.todo)
            console.log(state)

            return state;    
        case "CREATE_TODO_ERROR":
            console.log("Error", action.err)
            return state;
        default:
            return state;
    }
}

export default todoReducer;