import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Cardsdata from './CardsData';
import './style.css';
import { ADD } from '../redux/actions/action';

const Cards = () => {
    const [data,setdata]= useState(Cardsdata);

    const dispatch = useDispatch();

    const send = (e)=>{
      console.log(e);
      dispatch(ADD(e));
    }
    
  return (
    <div className='container mt-3'>
        <h2>Add To Cart Projects</h2>
        <div className="row d-flex justify-content-center align-item-center">
            {
                data.map((element,id)=>{
                    return(
                        <>
                         <Card style={{ width: '22rem',border:"none" }}
                          className="mx-2 mt-4 card_style">
      <Card.Img variant="top" 
      src={element.imgdata} style={{height:"16rem"}} 
      className="mt-3" />

      <Card.Body>
        <Card.Title>{element.rname}</Card.Title>
        <Card.Text>
        price:₹{element.price}
        </Card.Text>
        <div className="button_div d-flex">

        <Button variant="primary" onClick={()=> send(element)}
        style={{background:"green"}} className="col-lg-6">Add To Cart</Button>
        </div>
      </Card.Body>
    </Card>
                        
                        </>
                    )
                })
            }
       
        </div>
    </div>
  )
}

export default Cards