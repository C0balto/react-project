import React, { useEffect, useState } from 'react';
import Modal from "react-modal";
import { Form, Card } from "react-bootstrap";
import './App.css';
import axios from 'axios';

Modal.setAppElement("#root");
const url = 'https://crudcrud.com/api/7dc57921d52c4ae0b2adfe7593fc5290/profile';

// Render of post list
function RenderList() {
  let [register, setRegister] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
       setRegister(data);
        
      })
      
  }, []);

  const listItems = register.map(
    (profile) => {
     
        return (
          <section className='profile'>
            <Card  style={{ width: '18rem'}}>
              <Card.Body>
                <Card.Title>
                  {profile.name}
                </Card.Title>
                <Card.Text>
                  <ul>
                    <li className="blindfold">{profile._id}</li>
                    <li>{profile.name}</li>
                    <li>{profile.birthdate}</li>
                    <li>{profile.email}</li>
                    <li>{profile.cpf}</li>
                    <li>{profile.gender}</li>
                    <li>{profile.startdate}</li>  
                    <li>{profile.team}</li>  
                  </ul>
                  <button className='del' onClick={() => axios.delete(url + `/${profile._id}`)}>delete</button>
                  
                </Card.Text>      
              </Card.Body>
            </Card>
          </section>
        )
    }
  )
  return (
      <section>
          {listItems}
      </section>
  )
}
function App() {
  
  //submit method
    const[name, setName] = useState("");
    const[birthdate, setBirthdate] = useState("");
    const[gender, setGender] = useState("");
    const[email, setEmail] = useState("");
    const[cpf, setCPF] = useState("");
    const[startdate, setStartDate] = useState("");
    const[team, setTeam] = useState("");
    const [register, setRegister] = useState([]);
    
    const fields = {
      name: name,
      birthdate: birthdate,
      gender: gender,
      email: email,
      cpf: cpf,
      startdate: startdate,
      team: team
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(fields);

      try {
          await axios.post(url, fields, {
              body: JSON.stringify({
              name: name,
              birthdate: birthdate,
              gender: gender,
              email: email,
              cpf: cpf,
              startdate: startdate,
              team: team,
              })
             
          })
          window.location.reload();
        } catch(error) {
          console.log(error.response);
        }
         
      
    }
   
  
  //get info to console and reload
  const  getProfiles = async (e) => {
    e.preventDefault();
    const a = await axios.get(url);
    console.log(a.data);

    if(a.data.length === 0){
      console.log('sem registros na base');
      
    }else {
     console.log('a base possui registros');
    }
  
  };

  const Refresh = () => {
    window.location.reload();
  }
/* 
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setRegister(data);   
      })
  }, []) */
  
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
    <section>
     <button className="panelbuttons" onClick={openModal}>Register</button>        
     <br/><br/><br/>
     <button className="panelbuttons" onClick={getProfiles}>Read datas</button>
     <br/><br/><br/>
     <button className="panelbuttons" onClick={Refresh}>Reload</button>
    </section>

    <section className='profiles'>
     <h2>Employee Register</h2>
     <RenderList />
    </section>
  
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
              <Form.Control 
                className="input-control" 
                type="text" 
                name="name" 
                placeholder="Enter your Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="BirthDate">
              <Form.Label className="label-title">Birth Date</Form.Label>
              <Form.Control 
                className="input-control" 
                type="date" 
                name="birthdate" 
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)} 
                required
              />              
            </Form.Group>

            <Form.Group className="mb-3" placeholder="gender"> 
              <Form.Label className="label-title"> Select your Gender</Form.Label>
              <select 
                className="input-control" 
                name="gender" 
                value={gender} 
                onChange={(e) => setGender(e.target.value)}
                required
                >
                <option defaultValue="">-----</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other gender">Other Gender</option>
              </select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="label-title">E-mail</Form.Label>
              <Form.Control 
                className="input-control" 
                type="e-mail" 
                name="email" 
                placeholder="Enter your e-mail" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="label-title">CPF</Form.Label>
              <Form.Control 
                className="input-control" 
                type="number" name="cpf" 
                value={cpf} 
                onChange={(e) => setCPF(e.target.value)}
                maxLength="14" 
                placeholder="Enter your CPF number" 
                pattern="(\d{3}\.?\d{3}\.?\d{3}-?\d{2})" 
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="label-title">Start Date</Form.Label>
              <Form.Control 
                className="input-control" 
                value={startdate} 
                onChange={(e) => setStartDate(e.target.value)}
                type="month" 
                min="2015-01" 
              />
            </Form.Group>
            <Form.Group className="mb-3" placeholder="gender">
              <Form.Label className="label-title"> Team</Form.Label>
              <select 
                className="input-control" 
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                >
                <option defaultValue="null">-----</option>
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
