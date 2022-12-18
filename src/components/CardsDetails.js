    import React, { useEffect, useState } from 'react'
    import { Table } from 'react-bootstrap';
    import { useNavigate, useParams } from 'react-router-dom';
    import { useDispatch, useSelector } from 'react-redux';
    import { DLT,ADD,REMOVE } from '../redux/actions/action';

    const CardsDetails = () => {
        const [data,setData] = useState([]);
        console.log(data)
        const {id} = useParams();
        // console.log(id);

        const history = useNavigate()

        const dispatch = useDispatch();

        const getdata = useSelector((state)=>state.cartreducer.carts);
        // console.log(getdata);
        
        const  compare = ()=>{
            let comparedata = getdata.filter((e)=>{
                return e.id == id
            });
            setData(comparedata);
        } 
        // delete button
        const dlt = (id)=>{
            dispatch(DLT(id));
            history("/");
        }
        // Remove button
        const  remove = (item)=>{
            dispatch(REMOVE(item))
        }
        useEffect(()=>{
        compare();
        },[])

        const send = (e)=>{
            console.log(e);
            dispatch(ADD(e));
        }
    return (
        <div>
            <div className="container mt-2">
                <h2>Items Details Page</h2>
                <section className='container mt-3'>
                    <div className="iteamsdetails">
                        {
                            data.map((ele)=>{
                                return(
                                    <>
                                    <div className="items_img">
                            <img src={ele.imgdata} alt="" />
                        </div>
                        <div className="details">
                            <Table>
                                <tr>
                                    <td>
                                        <p><strong>Restaurant </strong> : {ele.rname}</p>
                                        <p><strong>Price </strong> : ₹{ele.price}</p>
                                        <p><strong>Dishes </strong> : {ele.address}</p>
                                        <p><strong>Total </strong> : ₹{ele.price *ele.qnty}</p>
                                        <div className='mt-5 d-flex jusify-content-center align-items-center'
                                        style={{width:100,cursor:"pointer" ,background:"orange"}}>
                                            <span style={{fontSize:30}} 
                                            onClick={ele.qnty<=1 ? ()=>dlt(ele.id):()=>remove(ele)}> - </span>
                                            <span style={{fontSize:22}}> {ele.qnty} </span>
                                            <span style={{fontSize:30}} onClick={()=>send(ele)}> + </span>
                                        </div>
                                    </td>
                                    <td>
                                        <p><strong>Ratting :</strong>
                                        <span style={{background:"green",color:"white"
                                        ,padding:"2px 5px "
                                        ,borderRadius:"5px"}}> {ele.rating} ★</span></p>
                                        <p><strong>Order Review :</strong>

                                        <span > {ele.somedata}</span></p>
                                        <p><strong></strong>

                                        <span><strong>Remove: </strong> 
                                        <i className='fas fa-trash' style={{color:"red"
                                        ,fontsize:"20",cursor:"pointer"}}
                                        onClick={()=>dlt(ele.id)}></i> </span></p>
                                        
                                    </td>
                                </tr>
                            </Table>

                        </div>
                                    </>
                                )
                            })
                        }
                    
                    </div>
                </section>
            </div>
        </div>
    )
    }

    export default CardsDetails
