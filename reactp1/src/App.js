import React, { useEffect, useState } from 'react';
import Modal from "react-modal";
import { Form } from "react-bootstrap";
import './App.css';
import api from "./services/api";
import axios from 'axios';


Modal.setAppElement("#root");

function App() {
  //submit method
  const [data, setData] = useState({
  name: "",
  birthdate: "",
  gender: "",
  email: "",
  cpf:"",
  stardate: "",
  team:""
  
  });
  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventdefault();
    const userData = {
      name: data.name,
      birthdate: data.birthdate,
      gender: data.gender,
      email: data.gender,
      cpf: data.cpf,
      startdate: data.startdate,
      team: data.team
    };
  
    axios.post("https://crudcrud.com/api/a01fc2b816d5414d94212dd0e2a79c13", userData).then((response)=> {
      console.log(response.status);
      console.log(response.data);
    });
  };


  const [user, setUser] = useState();

  useEffect(() => {
    api
      .get("users/romulo27")
      .then((response) => setUser(response.data))
      .catch((err)=> {
        console.error("deu erro do além" + err);
      });
  }, []);


  // modal operation
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal(){
     setIsOpen(true); 
    }
  function closeModal() {
     setIsOpen(false); 
    }

  return (

   <div className="Container">

      <button onClick={openModal}>Register</button>
      <p>Name:{user?.name}</p>
      <p>Email:{user?.email}</p>
      <p>StartDate :{user?.startdate}</p>
      <p>Team :{user?.team}</p>
      
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Desafio PopUP"
        className="content"
        overlayClassName="modal-overlay"
        >
          <button onClick={closeModal}>close</button>
          <h2>Employee Registration</h2>
          
          <hr />
          <Form className='reg-form' onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="Name">
              <Form.Label className="label-title">Name</Form.Label>
              <Form.Control className="input-control" type="text" name="name" placeholder="Enter your Name" value={data.name} onChange={handleChange} required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="BirthDate">
              <Form.Label className="label-title">Birth Date</Form.Label>
              <Form.Control className="input-control" type="date" name="birthdate" value={data.birthdate} onChange={handleChange} required></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" placeholder="gender"> 
              <Form.Label className="label-title"> Select your Gender</Form.Label>
              <select className="input-control" name="gender" value={data.gender} onChange={handleChange} required>
                <option selected value="">-----</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other gender">Other Gender</option>
              </select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="label-title">E-mail</Form.Label>
              <Form.Control className="input-control" type="e-mail" name="email" placeholder="Enter your e-mail" value={data.email} onChange={handleChange} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$" required/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="label-title">CPF</Form.Label>
              <Form.Control className="input-control" type="number" name="cpf" value={data.cpf} onChange={handleChange} maxLength="14" placeholder="Enter your CPF number" pattern="(\d{3}\.?\d{3}\.?\d{3}-?\d{2})" required/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="label-title">Start Date</Form.Label>
              <Form.Control  className="input-control" type="month" min="2015-01" />
            </Form.Group>
            <Form.Group className="mb-3" placeholder="gender">
              <Form.Label className="label-title"> Team</Form.Label>
              <select className="input-control">
                <option selected value="null">-----</option>
                <option value="frontend">Front End</option>
                <option value="backend">Back End</option>
                <option value="mobile">Mobile</option>
              </select>
            </Form.Group>
            <button className="submitbt" type='submit'>Submit</button>
          </Form>

         
      </Modal>
      
    </div>
    
  );
}

export default App;
