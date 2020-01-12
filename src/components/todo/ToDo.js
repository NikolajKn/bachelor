import React, { useState, useRef } from 'react'
import {connect} from "react-redux";

import ReactMarkdown from "react-markdown"
import {Card,Form,Button, ButtonGroup} from "react-bootstrap";
import {updateTodo,createTodo,deleteTodo, updateOrder} from "../../store/actions/todoActions"
import {useDrag, useDrop } from "react-dnd"
import { ItemTypes } from '../../constants/ItemTypes';


const ToDo = ({todo,createTodo,updateTodo,deleteTodo, updateOrder, cardOrder, index,moveCard, taskName}) => {

    const ref = useRef(null)
    const [stateTodo, setStateTodo] = useState(todo) 
    const [edit, setEdit] = useState({edit:false})

    
    const [, drop] = useDrop({
        accept: ItemTypes.TODO,
        hover(item, monitor){
         
            if (!ref.current){
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            /*
            console.log("Drag: ",dragIndex)
            console.log("Hover: ",hoverIndex)
            */
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
            
            moveCard(dragIndex, hoverIndex)
            console.log(item.index)
        
            item.index = hoverIndex
        },
    })
  

    const [{isDragging}, drag] = useDrag({
        item : {type : ItemTypes.TODO,todo,index},
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        }),
    })
   
    drag(drop(ref))


    const handleEdit = () => {
         setEdit({edit:true})
    }



    
    const handleChange = (e) => {
       /* const tempState = stateTodo
        tempState["content"] = e.target.value
        console.log("TEMP STATE:",tempState)*/
        setStateTodo({...stateTodo,
            content: e.target.value})
    }

    const handleEditChange = (e) => {
        /* const tempState = stateTodo
         tempState["content"] = e.target.value
         console.log("TEMP STATE:",tempState)*/
         setStateTodo({...stateTodo,
             assignment: e.target.value})
     }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateTodo(stateTodo)
        /*
        this.props.updateTodo(this.state)
        */
    }

    const handleEditSubmit = (e) => {
        e.preventDefault();
        updateTodo(stateTodo)
        setEdit({edit:false})
        /*
        this.props.updateTodo(this.state)
        */
    }

    const handleCreate = (e) => {
        e.preventDefault()
        createTodo(cardOrder,taskName)
    }
    
    const handleDelete = (e) => {
        
        e.preventDefault()
        deleteTodo(stateTodo)

        var array = [...cardOrder]; // make a separate copy of the array
        var index = array.indexOf(stateTodo.id)

        if (index !== -1) {
            array.splice(index, 1);
            updateOrder(array,taskName)
        }
    }
    
  


    return(
        <div className="card"> 
            <Card bg="white" text="black" ref={ref} >
                <div className="toolbar">
                    <ButtonGroup aria-label="Controls">
                        <Button  className="text-right"  variant="light" onClick={handleCreate}>+</Button>
                        <Button  className="text-right"  variant="light" onClick={handleDelete}>X</Button>
                        <Button  className="text-right"  variant="light" onClick={handleEdit}>O</Button>
                    </ButtonGroup>
                </div>
                <Card.Body>

                    <Card.Title>1. Zadanie</Card.Title>

                    {
                        edit.edit ? 
                            <Form onSubmit={handleEditSubmit}>
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Control as = "textarea" value ={stateTodo.assignment} onChange={handleEditChange} rows="3"/>
                                </Form.Group>
                                <Button className="float-right" variant="secondary" type="submit">Save</Button>
                            </Form>
                        :
                            <ReactMarkdown source={stateTodo.assignment}/>
                    }

                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label> Odpoveď: </Form.Label>
                            <Form.Control as = "textarea" value ={stateTodo.content} onChange={handleChange} rows="3"/>
                        </Form.Group>
                        <Button className="float-right" variant="secondary" type="submit">Save</Button>
                    </Form>
                    
                </Card.Body>
            </Card>
        </div>
    )}
   
   



const mapDispatchToProps = (dispatch) => {
    return {
        updateTodo: (todo) => dispatch(updateTodo(todo)),
        createTodo: (cardOrder,taskName) => dispatch(createTodo(cardOrder,taskName)),
        deleteTodo: (todo) => dispatch(deleteTodo(todo)),
        updateOrder: (cardOrder,taskName) => dispatch(updateOrder(cardOrder,taskName)) 

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