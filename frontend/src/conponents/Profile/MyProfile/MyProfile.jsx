import React, { useContext } from 'react'
import './MyProfile.scss'
import { Context } from '../../../utils/AppContext'

const MyProfile = () => {
    
    const {userLogin} = useContext(Context)

    return (
        <div className='my-profile'>
            <h1>My Profile</h1>
            <div className='right-profile-content'>
                <div className='right-profile-content-info'>
                    <label><h3>Full Name:</h3></label>
                    <div className='content-info-title'>
                        <label>{userLogin?.username}</label>
                    </div>

                </div>
                <div className='right-profile-content-info'>
                    <label><h3>Email:</h3></label>
                    <div className='content-info-title'>
                        <label>{userLogin?.email}</label>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default MyProfile