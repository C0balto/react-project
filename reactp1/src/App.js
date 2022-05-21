import React, { useEffect, useState } from 'react';
import Modal from "react-modal";
import { Form } from "react-bootstrap";
import './App.css';
import axios from 'axios';


Modal.setAppElement("#root");
const url = 'https://crudcrud.com/api/0d1af44e13c745e3a7a1f0f283fea3c0/register';


function App() {
  
  
  //submit method
    /* const[name, setName] = useState("");
    const[birthdate, setBirthdate] = useState("");
    const[gender, setGender] = useState("");
    const[email, setEmail] = useState("");
    const[cpf, setCPF] = useState("");
    const[startdate, setStartDate] = useState("");
    const[team, setTeam] = useState("");
    const[message, setMessage] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("entrou");
      console.log(name, gender);
      try {
          const res = await axios.post("url", {
              body: JSON.stringify({
              name: name,
              birthdate: birthdate,
              gender: gender,
              email: email,
              cpf: cpf,
              startdate: startdate,
              team: team,
              }),
          });
          let resJson = await res.json();      
          if(res.status === 200) {
            setName("");
            setBirthdate("");
            setGender("");
            setEmail("");
            setCPF("");
            setStartDate("");
            setTeam("");
            setMessage("Registro feito com sucesso!");
          } else {
          setMessage("Deu um erro do além!");
          }
        } catch(error => {
          console.warn('fuuudeu de vez')
        }) {
          console.log(err);
      }
      
    }
   */
  // la vamos nos
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [startdate, setStartDate] = useState('');
  const [register, setRegister] = useState([]);
  
  const fields = {
    name: name,
    gender: gender,
    startdate: startdate
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, gender, startdate);
    //await axios.post(url, fields , {config} ).then(response => element.innerHTML = response.data.id);
    try{
      const resp = await axios.post(url, fields , 
        {
        body: JSON.stringify({ 
        name: name,
        gender: gender,
        startdate: startdate 
        })
      })
      console.log(resp.data);
    } catch(error) {
      console.log(error.response);
    }
  };

  const  test = async (e) => {
    e.preventDefault();
    const a = await axios.get(url);
    console.log(a.data);
  } ;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRegister(data);
        
      })
  }, [])

  
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
      {/* <section> {message? <p>{message}</p> : null } </section> */}
      {/* <p>Name:{name}</p>
      <p>Email:{email}</p>
      <p>StartDate :{startdate}</p>
      <p>Team :{team}</p> */}
      <section>
        {register.map( (register) => {
        return <p>Name: {register.name}</p>;
        })}
      </section>
      <section>
        {register.map((register) => {
        return <p>{register.gender} </p>;
        })}
      </section>
      <button onClick={test}>test</button>
      
      <br/>
      
      <br/>

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
              />
            </Form.Group>
            <Form.Group className="mb-3" placeholder="gender"> 
              <Form.Label className="label-title"> Select your Gender</Form.Label>
              <select 
                className="input-control" 
                name="gender" 
                value={gender} 
                onChange={(e) => setGender(e.target.value)} 
                >
                <option defaultValue="">-----</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other gender">Other Gender</option>
              </select>
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
            
            <button className="submitbt" type='submit'>Submit</button>

          </Form>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Desafio PopUP"
        className="content"
        overlayClassName="modal-overlay"
        >
          <button onClick={closeModal}>close</button>
          {/* <h2>Employee Registration</h2>
          
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
                //pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$" 
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
                //pattern="(\d{3}\.?\d{3}\.?\d{3}-?\d{2})" 
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
          </Form> */}

         
      </Modal>
      
    </div>
    
  );
}

export default App;
