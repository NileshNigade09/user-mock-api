import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';

function User() {

  let nvaigate = useNavigate();
  let { id } = useParams();


  let [user, setUser] = useState({
    name: "",
    email: "",
    mobileno: ""
  })

  useEffect(()=>{
    if(id !== undefined){
      axios.get("https://6389f6d0c5356b25a20dd7c3.mockapi.io/api/v1/users/" +id).then((result)=>{
        console.log(result.data);
        setUser({
          name : result.data.name,
          email : result.data.email,
          mobileno : result.data.mobileno}
        )
      },(err)=>{
        console.log(err);
      })
    }
    else{
      setUser({
        name : "",
        email : "",
        mobileno : ""}
      )
    }
  }, [ id ])

  let [userValidations, setUserValidations ]= useState({
    'nameMessage': "",
    'emailMessage': "",
    'mobilenoMessage': ""
  })

  function handleChange(e) {
    e.preventDefault();
    setUser({...user, [e.target.id]:e.target.value});
  }

  function submit(e) {
    e.preventDefault(); 
    let validated = true;
    let nameMessage = "";
    let emailMessage = "";
    let mobilenoMessage = "";

    if(user.name.trim() === ""){
      nameMessage = "Please enter name";
      validated = false;
    }
    if(user.email.trim() === ""){
      emailMessage = "Please enter email";
      validated = false;
    }
    else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)){
      emailMessage = "Please enter valid email";
      validated = false;
    }
    if(user.mobileno.trim() === ""){
      mobilenoMessage = "Please enter mobile number";
      validated = false;
    }
    else if (!/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/.test(user.mobileno)){
      mobilenoMessage = "Please enter valid mobile number";
      validated = false;
    }
    setUserValidations(
      {
        nameMessage: nameMessage,
        emailMessage: emailMessage,
        mobilenoMessage: mobilenoMessage
      }
    )
    // alert("Hello")
    if (validated){
      if(id === undefined){
      axios.post("https://6389f6d0c5356b25a20dd7c3.mockapi.io/api/v1/users", user).then((result)=>{
        nvaigate("/")
        console.log(result);
      }, (err)=>{
        console.log(err);
      })
     //call api
    }
    else{
      axios.post("https://6389f6d0c5356b25a20dd7c3.mockapi.io/api/v1/users/" +id, user).then((result)=>{
        nvaigate("/")
        console.log(result);
      }, (err)=>{
        console.log(err);
      })
    }
    }
    else{
      return;
    }
  }

  return (
    <div>
      <h1>User</h1>
      <hr />
      <Form onSubmit={(e)=>{submit(e)}}>
        <Form.Group className="mb-3">
          <Form.Label>Name<span className='text-danger'>{ userValidations.nameMessage }</span></Form.Label>
          <Form.Control type="text" placeholder="Enter Name" value={ user.name } id="name" onChange={(e) => { handleChange(e) }} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email address<span className='text-danger'>{ userValidations.emailMessage }</span></Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={ user.email } id="email" onChange={(e) => { handleChange(e) }} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mobile Number<span className='text-danger'>{ userValidations.mobilenoMessage }</span></Form.Label>
          <Form.Control type="text" placeholder="Mobile Number" value={ user.mobileno } id="mobileno" onChange={(e) => { handleChange(e) }} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default User
