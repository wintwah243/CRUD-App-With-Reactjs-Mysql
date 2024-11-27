import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Create() {
    const [values,setValues] = useState({
        name:'',
        email:''
    })
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/student',values)
        .then(res => {
            navigate("/")
        })
        .catch(err => console.log(err))
    }
  return (
<div className='d-flex vh-100 justify-content-center align-items-center' style={{backgroundColor:'pink'}}>
    <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleSubmit}>
            <div className='mb-2'>
                <label htmlFor=''>Name</label>
                <input type='text' placeholder='Enter name' className='form-control'
                onChange={e => setValues({...values,name:e.target.value})}/>
            </div>
            <div className='mb-2'>
                <label htmlFor=''>Email</label>
                <input type='email' placeholder='Enter email' className='form-control'
                onChange={e => setValues({...values,email:e.target.value})} />
            </div>
            <button className='btn btn-sm' style={{backgroundColor:'greenyellow',marginTop:'22'}}>Submit</button>
        </form>
    </div>
</div>
  )
}

export default Create