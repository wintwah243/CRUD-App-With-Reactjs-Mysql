import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Home() {
    const location = useLocation();
    const [data,setData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8081/')
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    },[]);
    const handleDelete = (id) => {
        axios.delete('http://localhost:8081/delete/' + id)
            .then(res => {
                // Remove the deleted student from the state
                setData(prevData => prevData.filter(student => student.id !== id));
            })
            .catch(err => console.log(err));
    }
    
  return (
    <div className='d-flex vh-100 justify-content-center align-items-center' style={{backgroundColor:'pink'}}>
        <div className='w-90 bg-white rounded p-3'>
            <div>
                <Link to='/create' className='btn btn-sm' style={{textDecoration:'none',backgroundColor:'greenyellow'}} >Create +</Link>
            </div>
            <table className='table'>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                    {data.map((student,index) => {
                        return (
                            <tr key={index}>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td style={{display:'flex',flexDirection:'row',gap:'10px'}}>
                                    <Link to={`/read/${student.id}`} className='btn btn-sm btn-info' style={{textDecoration:'none'}}>Read</Link>
                                    <Link to={`/edit/${student.id}`} className='btn btn-sm ' style={{backgroundColor:'lightpink',textDecoration:'none'}}>Edit</Link>
                                    <button onClick={() => handleDelete(student.id)} className='btn btn-sm btn-danger'>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Home