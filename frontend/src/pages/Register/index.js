import React, { useState } from "react";
import "./styles.css";

import { Link, useHistory } from "react-router-dom";
import logoImg from "../../assets/logo.svg";
import { FiArrowLeft } from "react-icons/fi";
//api
import api from "../../services/api";
const mystorage = window.localStorage;

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  //History
  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    //variables must have the same name as their controller in the req.body
    const data = {
      name,
      email,
      whatsapp,
      city,
      state,
    };

    try {
      console.log(data);
      const res = await api.post("/ngos", data);

      if (!mystorage.getItem("ID")) {
        mystorage.setItem("ID", res.data.id);
      }

      alert(`Your ID access: ${res.data.id}`);

      history.push("/");
    } catch (error) {
      alert("Register failed\n Try again");
      console.error(error.message);
    }
  }

  return (
    <div className='register-container'>
      <div className='content'>
        <section>
          <img src={logoImg} alt='Be the hero logo' />
          <h1>Your Registration</h1>
          <p>Register and enter the platform to help NGOs rescuing animals.</p>
          <Link className='back-link' to='/'>
            <FiArrowLeft size={16} color='#E02041' />I already have an ID
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="NGO's name"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            placeholder='E-mail'
          />
          <input
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder='WhatsApp'
          />

          <div className='input-group'>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder='City'
            />
            <input
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder='State'
              style={{ width: 180 }}
            />
          </div>

          <button className='button' type='submit'>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
