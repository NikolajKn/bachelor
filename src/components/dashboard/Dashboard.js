import React, {setState, useState,Component} from "react";
import Notifications from "./Notifications";
import TodoList from "../todo/ToDoList";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import {Container, Row, Col} from "react-bootstrap";
import {updateTodo,createTodo,deleteTodo} from "../../store/actions/todoActions"
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'



class Dashboard extends Component{
    
    render(){
        
        console.log(this.props.todos)
        const {todos} = this.props;
        const {cardOrder} = this.props;
        

        
        if(!todos || !cardOrder){
            return(
                <Container>
                    <Row>
                        <Col > Loading...</Col>
                    </Row>
                </Container>
            )
        }else{
            
            console.log("DASHBOARD TODOS",this.props)
            return(
                <Container>
                <Row>
                    <Col />
                    <Col sm = {10}>  
                        <DndProvider backend={HTML5Backend}>
                            <TodoList todos = {todos} cardOrder={cardOrder} /> 
                        </DndProvider>
                    </Col>
                    <Col />
                </Row>
                        
                </Container>
                
            )
            }
    }
}


const mapStateToProps = (state) => {
    return {
        todos:state.firestore.data.todos,
        cardOrder:state.firestore.ordered.cardOrder
    }
}




export default compose(firestoreConnect([{collection:'todos'},{collection:'cardOrder'}]),connect(mapStateToProps))(Dashboard)

