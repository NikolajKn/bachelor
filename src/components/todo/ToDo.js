import React, { useState,useRef, Component } from 'react'
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import ReactMarkdown from "react-markdown"
import Editor from "./ToDoEditor";
import {Card,Form,Button, ButtonGroup} from "react-bootstrap";
import {updateTodo,createTodo,deleteTodo} from "../../store/actions/todoActions"
import ToDoCreate from "./ToDoCreate"
import {useDrag, useDrop } from "react-dnd"
import { ItemTypes } from '../../constants/ItemTypes';


const ToDo = ({todo,createTodo,updateTodo,deleteTodo, index, moveCard}) => {


    const ref = useRef(null)
    const [stateTodo, setStateTodo] = useState(todo) 

    const [, drop] = useDrop({
         
        accept: ItemTypes.TODO,
        hover(item, monitor){
            console.log("Pustene")
            if (!ref.current){
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            if(dragIndex === hoverIndex){
                return
            }

            const hoverBoundingRect = ref.current.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
              }
          
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
              }
            console.log("MOVEEEEEEE", dragIndex)
            moveCard(dragIndex, hoverIndex)
            item.index = hoverIndex
        },
    })
  

    const [{isDragging}, drag] = useDrag({
        item : {type : ItemTypes.TODO},
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    })
   
    drag(drop(ref))
    
    const handleChange = (e) => {

       /* const tempState = stateTodo
        tempState["content"] = e.target.value
        console.log("TEMP STATE:",tempState)*/
        setStateTodo({...stateTodo,
            content: e.target.value})
        console.log("CHANGED STATE:",stateTodo)
      
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        updateTodo(stateTodo)
        /*
        this.props.updateTodo(this.state)*/
    }

    const handleCreate = (e) => {
        e.preventDefault()
        createTodo()
    }
    
    const handleDelete = (e) => {
        e.preventDefault()
        deleteTodo(stateTodo)
    }
    
   
        return(

            <Card bg="dark" text="white" ref={drag}>
                <Card.Header>
                    {stateTodo.title}
                    <ButtonGroup aria-label="Controls">
                        <Button  variant="outline-light" onClick={handleCreate}>+</Button>
                        <Button  variant="outline-light" onClick={handleDelete}>X</Button>
                    </ButtonGroup>
                    
                    
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label> Zadanie </Form.Label>
                                <Form.Control as = "textarea" value ={stateTodo.content} onChange={handleChange} rows="3"/>
                            </Form.Group>
                            <Button variant="primary" type="submit">Save</Button>
                        </Form>
                    </Card.Text>
                    
                </Card.Body>
            </Card>
        )}
   
   



const mapDispatchToProps = (dispatch) => {
    return {
        updateTodo: (todo) => dispatch(updateTodo(todo)),
        createTodo: () => dispatch(createTodo({title:"", content:""})),
        deleteTodo: (todo) => dispatch(deleteTodo(todo))
    }
}
/*


<ReactMarkdown source={this.state.content} />
                        <Editor content = {"AAAAAAAAAAAAAAAAAAAAAAAAAA " + this.state.content}/>
                        

const mapStatetoProps = (state, ownProps) => {
    const id = ownProps.match.params.id
    const todos = state.firestore.data.todos
    const todo = todos ? todos[id] : null
    return {
        todo:todo
    }
}
export default compose(
    connect(mapStatetoProps),
    firestoreConnect([{collection: "todos"}])
)(ToDo)
*/
export default connect(null,mapDispatchToProps)(ToDo)




/*


 
    state = {
        id:"",
        title:"",
        content:""
    }

    componentDidMount(){
        this.setState({
            id: this.props.todo.id,
            title : this.props.todo.title,
            content: this.props.todo.content
        })
        
    }
    

    handleChange = (e) => {
        const tempState = this.state
        tempState["content"] = e.target.value
        this.setState({tempState})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.updateTodo(this.state)
    }

    handleCreate = (e) => {
        e.preventDefault()
        this.props.createTodo({title:"", content:""})
    }
    
    handleDelete = (e) => {
        e.preventDefault()
        this.props.deleteTodo(this.state)
    }
    
    render(){
        return(

            <Card bg="dark" text="white">
                <Card.Header>
                    {this.state.title}
                    <ButtonGroup aria-label="Controls">
                        <Button  variant="outline-light" onClick={this.handleCreate}>+</Button>
                        <Button  variant="outline-light" onClick={this.handleDelete}>X</Button>
                    </ButtonGroup>
                    
                    
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label> Zadanie </Form.Label>
                                <Form.Control as = "textarea" value ={this.state.content} onChange={this.handleChange} rows="3"/>
                            </Form.Group>
                            <Button variant="primary" type="submit">Save</Button>
                        </Form>
                    </Card.Text>
                    
                </Card.Body>
            </Card>
        )}



        */