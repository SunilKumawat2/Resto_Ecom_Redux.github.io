import React,{useEffect, useState} from 'react';
import { Navbar,Container,Nav } from 'react-bootstrap';
import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import gif from '../components/1.gif';
import { useDispatch, useSelector } from 'react-redux';
import {Table} from 'react-bootstrap';
import { DLT } from '../redux/actions/action';
  
const Header = () => {
  const [price,setPrice] = useState(0)
  console.log(price);

  const getdata = useSelector((state)=>state.cartreducer.carts);
  console.log(getdata);

  const dispatch = useDispatch();


    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const dlt = (id)=>{
      dispatch(DLT(id));
    }
    const total = ()=>{
      let price =0;
      getdata.map((ele,k)=>{
        price=ele.price + price
      });
      setPrice(price);
    }
    useEffect(()=>{
       total();
    },[total])
  return (
    <div>
       <Navbar bg="success" variant="dark" style={{height:"60px"}}>
        <Container>
          <Link to="/" className='text-decoration-none text-dark mx-5 'style={{fontSize:"24px"}}>Add-To-Cart</Link>
          <Nav className="me-auto">
            <Link to="/" className='text-decoration-none text-dark mx-5'style={{fontSize:"24px"}}>Home</Link>
            
          </Nav>
          <Badge badgeContent={getdata.length} color="warning"
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
        <i class="fa-solid fa-cart-shopping text-light" 
        style={{fontSize:25,cursor:"pointer"}}></i>
    </Badge>
        </Container>
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {
          getdata.length ?
          <div className='card_details' style={{width:"22rem",padding:10}}>
            <Table>
              <thead>
                <tr>
                  <th>Photos</th>
                  <th>Restaurant Name</th>
                
                </tr>
              </thead>
              <tbody>
                {
                  getdata.map((e)=>{
                    return(
                      <>
                      <tr>
                        <td>
                          <Link to={`/cart/${e.id}`} onClick={handleClose}>
                            <img src={e.imgdata} alt="" style={{width:"6rem" ,height:"6rem"}} />
                                  </Link>
                          
                        </td>
                        <td>
                          <p>{e.rname}</p>
                          <p>price: ₹ {e.price}</p>
                          <p>Quantity: {e.qnty}</p>
                          <p style={{color:"red",fontSize:20,cursor:"pointer"}} 
                          onClick={()=>dlt(e.id)}>
                            <i className='fas fa-trash smalltrash'></i>
                          </p>
                      
                        </td>
                        <td className='mt-5' style={{color:"red",fontSize:20,cursor:"pointer"}}
                        onClick={()=>dlt(e.id)} 
                        >
                          <i className='fas fa-trash largetrash'></i>
                        </td>
                      </tr>
                      </>
                    )
                  })
                }
                <p className='text-center'>Total :₹ {price}</p>
              </tbody>
            </Table>

          </div>:
             <div className='card_details d-flex justify-content-center align-items-center' 
             style={{width:"24rem",padding:10,position:"relative"}}>
             <i className="fa-solid fa-trash"
             onClick={handleClose}
             style={{position:"absolute",top:2,right:20,fontsize:22,cursor:"pointer"}}></i>
              <p style={{fontSize:22}}>Your cart is Empty</p>
              <img src={gif} alt="" className='emptycart_img'style={{width:"6rem",padding:10}}/>
             </div>
        }
      
      </Menu>
       
      </Navbar>
    </div>
  )
}

export default Header
