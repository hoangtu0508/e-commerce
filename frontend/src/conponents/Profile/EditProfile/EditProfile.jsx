import React, { useContext, useEffect, useState } from 'react'
import './EditProfile.scss'
import axios from 'axios'
import { getUserProfile } from '../../../utils/api'
import { Context } from '../../../utils/AppContext'

const EditProfile = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const userId = user.user.id
    console.log(userId)

    const { userData, setUserData } = useContext(Context)

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        // Lấy thông tin người dùng hiện tại từ API của Strapi và cập nhật state
        const fetchUserData = async () => {
            try {
                const response = await getUserProfile.get(`/api/users/${userId}`); // Thay đổi URL tương ứng với API của Strapi
                setUserData({ ...response.data, password: '', newPassword: '', confirmPassword: '' });
            } catch (error) {
                console.error('Lỗi khi lấy thông tin người dùng:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (userData.newPassword !== '' && userData.newPassword !== userData.confirmPassword) {
            setUserData({ ...userData });
            alert('Mật khẩu mới và xác nhận mật khẩu không khớp') 
            return;
        } 
        try {
            const response = await getUserProfile.put(`/api/users/${userId}`, {
                name: userData.name,
                email: userData.email,
                password: userData.newPassword,
            }); // Thay đổi URL tương ứng với API của Strapi
            console.log('Thông tin người dùng đã được cập nhật:', response.data);
            // Thực hiện các hành động sau khi cập nhật thành công
        } catch (error) {
            console.error('Lỗi khi cập nhật thông tin người dùng:', error);
            // Xử lý lỗi khi cập nhật không thành công
        }
    };

    return (
        <div className='edit-profile'>
            <h1>Edit Profile</h1>
            <div className='edit-profile-content'>
                <div className='edit-profile-title'>
                    <form onSubmit={handleSubmit}>
                        <div className='title-item'>
                            <label><h3>Full Name:</h3></label>
                            <div className='title-item-input'>
                                <input type="text" id="name" name="username" value={userData.username} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='title-item'>
                            <label><h3>Email:</h3></label>
                            <div className='title-item-input'>
                                <input type="email" id="email" name="email" value={userData.email} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='title-item'>
                            <label><h3>Current Password:</h3></label>
                            <div className='title-item-input'>
                                <input type="password" id="password" name="password" value={userData.password} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='title-item'>
                            <div className='new-pass'>
                                <div className='title-item-new-pass'>
                                    <label><h3>A new Password:</h3></label>
                                    <div className='title-item-input'>
                                        <input type="password" id="newPassword" name="newPassword" value={userData.newPassword} onChange={handleChange} />
                                    </div>
                                </div>

                                <div className='title-item-new-pass'>
                                    <label><h3>Enter the Password:</h3></label>
                                    <div className='title-item-input'>
                                        <input type="password" id="confirmPassword" name="confirmPassword" value={userData.confirmPassword} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>

                        </div>


                        <button type='submit'>Save</button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditProfile