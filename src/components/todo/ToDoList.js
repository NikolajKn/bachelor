import React , { useState, useCallback } from "react";
import ToDoSummary from "./ToDoSummary";
import {Link} from "react-router-dom";
import {ListGroup} from "react-bootstrap";
import Editor from "./ToDoEditor";
import ToDo from "./ToDo"
import {updateTodo,createTodo,deleteTodo,updateOrder} from "../../store/actions/todoActions"

import update from 'immutability-helper';




const ToDoList = ({todos,cardOrder}) => {
   
    const [cards, setCards] = useState([])

    const [order, setOrder] = useState(cardOrder[0].order)
    console.log(order)
    console.log(cards)
    console.log(order.length)
    console.log(cards.length)


    
    const temp = []
    if(order.length > cards.length){
        order.map(item => {
            todos.map(card => {
                if (card.id == item){
                    temp.push(card)
                    /*
                    setCards({...cards,
                        card})
                        */
                }
            })
        })
        setCards(temp)
    }
    console.log(temp)  
    console.log(cards)


    const moveCard = useCallback(
        (dragIndex, hoverIndex) => {
          const dragCard = cards[dragIndex]
          console.log("AAAAAAAAAA")
          updateTodo(
            update(todos, {
              $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard]
              ],
            }),
          )
        },
        [cards],
      )
  
    const renderTodo = (todo, index) => {
        return(
            <ListGroup.Item key={todo.id}>
                <ToDo 
                    todo = {todo}
                    index = {index}
                    cardOrder = {order}
                    moveCard = {moveCard}/>
           </ListGroup.Item>
            
        )
    }
   
    return(
        
        <ListGroup >
  
            {cards && cards.map( (todo,i) => {
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