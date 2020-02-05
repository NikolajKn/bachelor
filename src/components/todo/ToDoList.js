import React , { useState, useCallback } from "react";

import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {ListGroup} from "react-bootstrap";
import ToDo from "./ToDo"
import {updateOrder,newOrder} from "../../store/actions/todoActions"

import update from 'immutability-helper';




const ToDoList = ({cards,cardOrder, changeOrder, updateOrder,taskName}) => {
    
/*
    console.log(cardOrder)
    if(cardOrder.order !== order){
        console.log("BBBBBBBBBBBBBBBBBBBBBBBBB")
        console.log("ORDER1: ",order)
        console.log("ORDER2: ",cardOrder)
        
        //updateOrder(order)
        setOrder(cardOrder.order) 
        setCards(Object.values(order).map(item => ({...todos[item], id: item}) ));
    
       
    }
  

    if(cardOrder.length !== order.length){
        console.log("2. IF: ",order)
        setOrder(cardOrder.order) 
        setCards(Object.values(order).map(item => ({...todos[item], id: item}) ));
        console.log("2. IF:: ",order)
    }
 
    if(order.length !== cards.length){
        console.log("3. IF:: ",order)
        setCards(Object.values(order).map(item => ({...todos[item], id: item}) ));
        console.log("3. IF:: ",order)
    }
 */
    const moveCard = useCallback(
        (dragIndex, hoverIndex) => {
          const dragCard = cardOrder[dragIndex]
          console.log("BEFORE MOVE ",cardOrder)
          changeOrder(
            update(cardOrder, {
              $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard]
              ],
            }),
          )
        },
        [cardOrder],
        
        console.log("ORDER: ",cardOrder)
      )
  


    const renderTodo = (item, index) => {
        return(
            <ListGroup.Item className = "card" key={item.id}>
                <ToDo 
                    todo = {item}
                    index = {index}
                    cardOrder = {cardOrder}
                    moveCard = {moveCard}
                    setOrder = {changeOrder}
                    taskName = {taskName}
                    />
           </ListGroup.Item>  
        )
    }
   
    return(
        
        <ListGroup variant="flush">
            {cards && cards.map( (item,i) => {
                return( 
                    renderTodo(item,i)
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


const mapDispatchToProps = (dispatch) => {
    return {
        updateOrder: (cardOrder, taskName) => dispatch(updateOrder(cardOrder,taskName)) 
    }
}


export default connect(null,mapDispatchToProps)(ToDoList)














  
/*
    if(JSON.stringify((cardOrder[0].order) !== JSON.stringify(order)) && order.length > 1){
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAaa")
        console.log("ORDER1: ",order)
        console.log("ORDER2: ",cardOrder[0].order)
        newOrder(order)
    }



    if((cardOrder[0].order !== order) && order.length > 1){
        console.log("BBBBBBBBBBBBBBBBBBBBBBBBB")
        console.log("ORDER1: ",order)
        console.log("ORDER2: ",cardOrder[0].order)
        updateOrder(order)

    }
   */
    /*
    if(JSON.stringify(cardOrder[0].order) !== JSON.stringify(order) ){
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAaa")
        console.log("ORDER1: ",order)
        console.log("ORDER2: ",cardOrder[0].order)
        //setOrder(cardOrder[0].order)
        updateOrder(order)
        console.log("ORDER3: ",order)
        console.log("ORDER4: ",cardOrder[0].order)
        setCards(order.map(item => ({...todos[item], id: item}) ));
        
    }
    

*/