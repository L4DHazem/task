
import React, { useEffect, useState } from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Home() {

    const navigate = useNavigate();

    const name = localStorage.getItem('currentUser');

    const [animation, setAnimtaion] = useState('slide-in');

    const [step, setStep] = useState('hello');

    const [people, setPeople] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        status: '',
        job: '',
    });

    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {

        const saved = localStorage.getItem('people');
        if (saved) {
            setPeople(JSON.parse(saved));
        }


        const timer1 = setTimeout(() => {

            setAnimtaion('slide-out');

        }, 2000);


        const timer2 = setTimeout(() => {

            setStep('loading');

        }, 2000 + 800);


        const timer3 = setTimeout(() => {

            setStep('table');

        }, 2000 + 800 + 2000);

        return () => {

            clearTimeout(timer1);

            clearTimeout(timer2);

            clearTimeout(timer3);

        };

    }, []);

    const handleChange = (e) => {

        setFormData({ ...formData, [e.target.name]: e.target.value });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        let updatedPeople = [...people];

        if (editIndex !== null) {
            
            updatedPeople[editIndex] = formData;

            setEditIndex(null);

            Swal.fire({

                icon: "success",

                title: "has been updated successfully",

                showConfirmButton: false,

                timer: 1500,

                position: "top-end"

            });

        } else {
            
            updatedPeople.push(formData);

            Swal.fire({

                icon: "success",

                title: "has been added successfully",

                showConfirmButton: false,

                timer: 1500,

                position: "top-end"

            });

        }

        setPeople(updatedPeople);

        localStorage.setItem('people', JSON.stringify(updatedPeople));

        setFormData({ name: '', age: '', status: '', job: '' });

    };


    const handleEdit = (index) => {

        const person = people[index];

        setFormData({

            name: person.name,

            age: person.age,

            status: person.status,

            job: person.job

        });

        setEditIndex(index);

        Swal.fire({

            position: "top-end",

            icon: "info",

            title: `This item has been updated successfully`,

            showConfirmButton: false,

            timer: 1500

        });
    };



    const handleDelete = (index) => {

        Swal.fire({

            title: "Are you sure?",

            text: "you won't be able to revert this!",

            icon: "warning",

            showCancelButton: true,

            confirmButtonColor: "#3085d6",

            cancelButtonColor: "#d33",

            confirmButtonText: " Yes, delete this",

            cancelButtonText: "No,cancel",

        }).then((result) => {

            if (result.isConfirmed) {

                const updated = [...people];

                updated.splice(index, 1);

                setPeople(updated);

                localStorage.setItem('people', JSON.stringify(updated));

                Swal.fire({

                    title: "Deleted!",

                    text: "This item has been deleted successfully.",

                    icon: "success"

                });

            }

        });
    };











    return <>


        {step === 'hello' && (

            <div className="hello">


                <div class={`rounded-border-gradient ${animation}`}>

                    <h1>Hello,{name}</h1>


                </div>
            </div>

        )}




        {step === 'loading' && (
            <div className="loading-wrapper">
                <div className="loader"></div>
            </div>
        )}



        {step === 'table' && (

            <>
                <button className="login-button" onClick={() => navigate('/')}>

                    Login

                </button>

                <form className='data' onSubmit={handleSubmit}>
                    <input
                        type="text"

                        name="name"

                        placeholder="الاسم"

                        value={formData.name}
                        onChange={handleChange} />

                    <input
                        type="text"

                        name="age"

                        placeholder="السن"

                        value={formData.age}
                        onChange={handleChange} />

                    <input
                        type="text"

                        name="status"

                        placeholder="الحالة الاجتماعية"

                        value={formData.status}
                        onChange={handleChange} />

                    <input
                        type="text"

                        name="job"

                        placeholder="الوظيفة"

                        value={formData.job}
                        onChange={handleChange} />



                    <button className="super-button">

                        <span>Submit</span>

                        <svg fill="none" viewBox="0 0 24 24" class="arrow">

                            <path
                                stroke-linejoin="round"
                                stroke-linecap="round"
                                stroke-width="2"
                                stroke="currentColor"
                                d="M5 12h14M13 6l6 6-6 6"
                            ></path>

                        </svg>

                    </button>

                </form>

                <table className='people-table'>

                    <thead>

                        <tr>

                            <th>Name</th>

                            <th>Age</th>

                            <th>status</th>

                            <th>Job</th>

                            <th>Update</th>

                            <th>Delete</th>

                        </tr>

                    </thead>

                    <tbody>

                        {people.map((person, index) => (

                            <tr key={index}>

                                <td>{person.name}</td>

                                <td>{person.age}</td>

                                <td>{person.status}</td>

                                <td>{person.job}</td>

                                <td>

                                    <button className='buttonup' onClick={() => handleEdit(index)}>Update</button>

                                </td>

                                <td>

                                    <button className='buttondel' onClick={() => handleDelete(index)}>Delete</button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table></>

        )}

























    </>

}
