import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function Read() {
    const { id } = useParams();
    const [student, setStudent] = useState(null); // Start with `null` instead of an empty array

    useEffect(() => {
        axios.get(`http://localhost:8081/read/${id}`)
            .then(res => {
                setStudent(res.data[0]);
            })
            .catch(err => console.log(err));
    }, [id]);

    // Ensure student data exists before accessing it
    if (!student || student.length === 0) {
        return <div>Loading...</div>; // Add a loading indicator
    }

    return (
        <div
            className='d-flex vh-100 justify-content-center align-items-center'
            style={{ backgroundColor: 'pink' }}
        >
            <div className='w-50 bg-white rounded p-3'>
                <h2>Information</h2>
                <h2>Name:{student.name}</h2>
                <h2>Email:{student.email}</h2>
                <Link
                    to="/"
                    style={{ textDecoration: 'none', backgroundColor: 'yellowgreen' }}
                    className="btn btn-sm"
                >
                    Back to home
                </Link>
            </div>
        </div>
    );
}

export default Read;
