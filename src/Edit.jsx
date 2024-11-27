import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

function Edit() {
    const {id} = useParams();
    
    useEffect(() => {
        axios.get(`http://localhost:8081/read/${id}`)
            .then(res => {
                setValues({...values,name: res.data[0].name,email:res.data[0].email})
            })
            .catch(err => console.log(err));
    }, [id]);

    const [values,setValues] = useState({
        name:'',
        email:''
    })
    const navigate = useNavigate();
    const handleUpdate = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:8081/update/${id}`,values)
        .then(res => {
            console.log(res)
            navigate('/')
        }).catch(err => console.log(err));
    }
  return (
    <div className='d-flex vh-100 justify-content-center align-items-center' style={{backgroundColor:'pink'}}>
    <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleUpdate}>
            <div>
                <h2>Update Info</h2>
            </div>
            <div className='mb-2'>
                <label htmlFor=''>Name</label>
                <input type='text'  className='form-control' value={values.name}
                onChange={e => setValues({...values,name:e.target.value})}/>
            </div>
            <div className='mb-2'>
                <label htmlFor=''>Email</label>
                <input type='email'  className='form-control' value={values.email}
                onChange={e => setValues({...values,email:e.target.value})} />
            </div>
            <button type='submit' className='btn btn-sm' style={{backgroundColor:'greenyellow',marginTop:'22'}}>Update</button>
        </form>
    </div>
</div>
  )
}

export default Edit