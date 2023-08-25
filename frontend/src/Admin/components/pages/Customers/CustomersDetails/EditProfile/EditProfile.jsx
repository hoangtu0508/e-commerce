import React, { useEffect, useState } from 'react'
import './EditProfile.scss'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EditProfile = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        phone: '',
    })
    const [status, setStatus] = useState()
    const [role, setRole] = useState()
    const [inputRole, setInputRole] = useState()

    const { id } = useParams()

    const token = JSON.parse(localStorage.getItem('user'));
    const jwt = token?.jwt;

    useEffect(() => {
        handleGetUser();
        handleGetRole();
    }, [])

    const updateEdit = (e) => {
        const newupdate = { ...user };
        newupdate[e.target.id] = e.target.value;
        setUser(newupdate);
        console.log(newupdate);
    };

    const handleGetUser = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_DEV_URL + `/api/users/${id}?populate=*`, {
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${jwt}`,
                }
            })
            setUser(response.data)
            setStatus(response.data.blocked)
        } catch (error) {
            console.log(error);
        }
    }

    const handleGetRole = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_DEV_URL + '/api/users-permissions/roles', {
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${jwt}`,
                },
            })
            setRole(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(process.env.REACT_APP_DEV_URL + `/api/users/${id}?populate=*`, {
                data: {
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                    role: inputRole,
                    blocked: status
                }
            }, {
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${jwt}`,
                },
            })
            console.log(response);
            // setTimeout(() => {
            //     window.location.reload()
            //   }, [1000])
            const message = ("Upload Success")
            toast.success(message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000, //3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                transition: Slide
            })

        } catch (error) {
            toast.error('Upload Error', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }

    console.log(user);

    return (
        <div className="modal">
            <div className="modal-title">
                <h2>Edit User Information</h2>
                <p>Updating user details will receive a privacy audit.</p>
            </div>

            <div className="toast-container"><ToastContainer limit={2} /></div>
            <form onSubmit={handleUpload}>
                <div className="form-edit-profile">
                    <div className="form-input">
                        <label>Full Name:</label>
                        <input id="username" type='text' value={user?.username} onChange={(e) => updateEdit(e)}></input>
                    </div>
                    <div className="form-input">
                        <label>Email:</label>
                        <input id="email" type='text' value={user?.email} onChange={(e) => updateEdit(e)}></input>
                    </div>
                    <div className="form-input">
                        <label>Phone:</label>
                        <input id='phone' type='text' value={user?.phone} onChange={(e) => updateEdit(e)}></input>
                    </div>
                    <div className="form-input">
                        <label>Blocked:</label>
                        <label class="switch">
                            <input type="checkbox"
                                checked={status}
                                value={status}
                                onChange={() => setStatus(!status)}
                            />
                            <span class="slider round"></span>
                        </label>
                    </div>
                    <div className="form-input">
                        <label>Role:</label>
                        <select name='role'
                            value={role?.roles?.id}
                            onChange={(e) => setInputRole(e.target.value)}
                        >
                            {role?.roles?.map((role) => (
                                <option key={role.id} value={role.id} selected={role.id === user.role.id}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>
                <div className="btn-form">
                    <input type='submit' value='Cancel' className='cancel'></input>
                    <input type='submit' value='Upload' className='upload'></input>
                </div>
            </form >
        </div>
    )
}

export default EditProfile