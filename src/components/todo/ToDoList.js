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
    /*
    console.log(todos)
    console.log(order)
    console.log(cards)
    console.log(cardOrder)
    console.log(cardOrder[0].order.length)
    console.log(Object.keys(todos).length)
    console.log(order.length)
    console.log(cards.length)
*/
    if(cardOrder[0].order !== order){
        setOrder(cardOrder[0].order)
        setCards(order.map(item => ({...todos[item], id: item}) ));
    }
    if(cardOrder[0].order.length !== order.length){
        setOrder(cardOrder[0].order)
        setCards(order.map(item => ({...todos[item], id: item}) ));
    }
    if(order.length != cards.length){
        setCards(order.map(item => ({...todos[item], id: item}) ));
    }
    
    
    console.log(cards)


    const moveCard = useCallback(
        (dragIndex, hoverIndex) => {
          const dragCard = order[dragIndex]
          updateOrder(
            update(order, {
              $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard]
              ],
            }),
          )
        },
        [order],
        console.log("ORDER: ",order)
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