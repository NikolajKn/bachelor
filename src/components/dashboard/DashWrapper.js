import React, {Component} from "react";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import {Container, Row, Col, Spinner} from "react-bootstrap";
import Dashboard from "./Dashboard";




class DashWrapper extends Component{

    render(){
        const {todos} = this.props
        var {cardOrder} = this.props

        if(!todos || !cardOrder){
            return(
                <Container>
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </Container>
            )
        }else{
            return(
                <Dashboard cards = {todos} cardOrder = {cardOrder}></Dashboard>
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




export default compose(firestoreConnect([{collection:'todos'},{collection:'cardOrder'}]),connect(mapStateToProps))(DashWrapper)







/*
else{
            const changeTask = (name) => {
                this.setState({task:name})
            }
    
            
            console.log(this.props.cardOrder[0])
            
            this.setState({...this.state, order : this.props.cardOrder[0].order})
            console.log(this.state)
        
            const changeOrder = (item) => {
                this.setState({task:item.id, order:item.order})
                console.log(this.state)
        } 

        
       
            var names = []
            console.log("DASHBOARD TODOS",this.props)
            this.props.cardOrder.map(item => (
                names = [...names,item.id],
                item.id === this.state.task ? 
                    changeOrder(item)
                : 
                    console.log("NIE HURA")
            ))

            return(
                
                <Row>
                    <Col sm = {2} >
                        <div className="secondnav">
                            <SecondNavbar names ={names} changeTask = {changeTask} />
                        </div>
                        
                    </Col>
                  
                    <Col sm = {9}>  
                        <DndProvider backend={HTML5Backend}>
                            <TodoList todos = {todos} cardOrder={cardOrder} taskName = {this.state.task}/> 
                        </DndProvider>
                    </Col>
                    <Col />
                </Row>
             
                
            )
            }
    }
}

*/