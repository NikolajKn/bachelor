import React , { useState, useCallback } from "react";
import ToDoSummary from "./ToDoSummary";
import {Link} from "react-router-dom";
import {ListGroup} from "react-bootstrap";
import Editor from "./ToDoEditor";
import ToDo from "./ToDo"
import {updateTodo,createTodo,deleteTodo} from "../../store/actions/todoActions"

import update from 'immutability-helper';




const ToDoList = ({todos,positions}) => {
    
    console.log(todos)

    const [cards, setCards] = useState([])
   
    
    console.log(cards)

    const moveCard = useCallback(
        (dragIndex, hoverIndex) => {
          const dragCard = todos[dragIndex]
          
          updateTodo(
            update(todos, {
              $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard]
              ],
            }),
          )
        },
        [todos],
      )
  
    const renderTodo = (todo, index) => {
        return(
            <ListGroup.Item key={todo.id}>
               
                <ToDo 
                    todo = {todo}
                    index = {index}
                    moveCard = {moveCard}/>
           </ListGroup.Item>
            
        )
    }
   
    return(
        
        <ListGroup >
  
            {todos && todos.map( (todo,i) => {
                return( 
                    renderTodo(todo,i)
                )
            })}

        </ListGroup>
      


        /*

        <ListGroup.Item>{
                        <Link to={"/todo/" + todo.id}>
                            <ToDoSummary todo={todo} key={todo.id}/> 
                        </Link>}
                    </ListGroup.Item>



        <div className="project-list section">
           {todos && todos.map( todo => {
               return(
                   <Link to={"/todo/" + todo.id}>
                        <ToDoSummary todo={todo} key={todo.id}/>
                   </Link>
               )
           })}
        </div>
        */
    
    )
}

export default ToDoList;