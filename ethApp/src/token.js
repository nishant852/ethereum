import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';



export const Token=(props)=>{
   
  const[balance,setBalance]=useState();
  const [address,setAddress]=useState();
  const[showbal,setShowBal]=useState('0.00');
  const[error,setError]=useState('0');
  const[showerror,setShowError]=useState('0');
  const[showHideBal,setShowHideBal]=useState("d-none");
  const[showHideError,setShowHideError]=useState("d-none");


  var { Web3 } = require("web3");
  var provider = "https://mainnet.infura.io/v3/3e84b6532ad841cf97ed82cb493c11d4";
  var web3Provider = new Web3.providers.HttpProvider(provider);
  var web3 = new Web3(web3Provider);
  const handleText=(e)=>{
    setAddress(e.target.value);
  
  }  
  const handleSubmit=(e)=>{
e.preventDefault();
setShowBal(balance);
setShowError(error);
if(error !="0")
{
  setShowHideError("d-flex");
  setShowHideBal("d-none");
}
else{
  setShowHideError("d-none");
  setShowHideBal("d-flex");
}

  }  

  useEffect(() => {
  
    web3.eth.getBalance(address)
    .then((response)=>{
      console.log(response.toString())
      setBalance(response.toString())
      setError('0');
    
    })
    .catch((error)=>{
      console.log("error")
      setBalance("0")
      setError("Please enter correct Ethereum Address !")

    });  
}, [address]);


  return (
    <>
    
     <Container>
      <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <Row >
        <Col>
        <Card.Header className="text-center mb-3" style={{fontWeight:"bold",fontSize:"22px"}} >ERC20 Token Balance</Card.Header>

        <Card style={{width:"20rem",
        padding: "0px",
        boxShadow:"5px 5px 0px 7px #fff"
      }} bg="light"> 

      <Card.Body >
      <Form.Group className="mb-3 "  controlId="formBasicEthAddress">
      <Form.Label  className="mb-1"><span style={{fontSize:"12px",fontWeight:"bold"}}>Ethereum Address</span></Form.Label>

        <Form.Control className='shadow-none' type="text" placeholder="Enter Ethereum Address" style={{height:"25px"}} 
        onChange={handleText}/>
      </Form.Group>
      <Badge pill bg="info" onClick={handleSubmit} style={{fontSize:"10px"}} className='p-2'>
        Submit
      </Badge>
        
      </Card.Body>
    </Card>
        </Col>
      </Row>
</div>
<div style={{display:"flex",justifyContent:"center",alignItems:"center" ,marginTop:"15px"}} className={showHideBal}>

      <Row >
        

      <Card style={{width:"20rem",
        padding: "0px",
        boxShadow:"5px 5px 0px 7px #fff"
      }} bg="white">
               <Card.Header style={{backgroundColor:"#f8f9fa",height:"2rem"}}></Card.Header>
      <Card.Body>
        <Card.Text style={{display:"flex",flexDirection:"row",justifyContent:"space-around"}}>
          <span style={{fontSize:"12px",fontWeight:"600"}}>Total Balance</span>
          <span>{showbal}</span>

        </Card.Text>
      </Card.Body>
    </Card>
      </Row>
      </div>
      <div style={{display:"flex",justifyContent:"center",alignItems:"center" ,marginTop:"15px"}} className={showHideError}>

      <Row >
        

      <Card style={{width:"20rem",
        padding: "0px",
        boxShadow:"5px 5px 0px 7px #fff"
      }} bg="white">
               <Card.Header style={{backgroundColor:"#f8f9fa",fontSize:"12px"}}>
               <span style={{padding:"1.5rem",fontWeight:"500"}}>{showerror}</span>
                </Card.Header>
      
    </Card>
      </Row>
      </div>
    </Container>

    </>
    ); 
}