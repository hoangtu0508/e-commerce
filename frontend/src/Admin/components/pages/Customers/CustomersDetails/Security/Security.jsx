import React, { useEffect, useState } from 'react'
import './Security.scss'
import { useParams } from 'react-router-dom'
import { TbEdit } from 'react-icons/tb'
import { MdDeleteOutline } from 'react-icons/md'
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchData } from '../../../../../../utils/api'

const Security = () => {
  const [user, setUser] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [newPassword, setNewPassword] = useState()

  const { id } = useParams()

  useEffect(() => {
    getUserDetails();
  }, [])

  const getUserDetails = async () => {
    try {
      const response = await fetchData.get(`/api/users/${id}?populate=*`)
      setUser(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = 'fetched-nationalities';

    if (newPassword !== '' && newPassword !== confirmPassword) {
      toast.error('NewPassword and ConfirmPassword mismatched, please try again later', {
        position: toast.POSITION.TOP_CENTER,
        toastId
      });
      return;
    }
    
    try {
      const response = await fetchData.put(`/api/users/${id}`, {
        data: {
          password: newPassword,
        }
      })
      const message = ("Change Password Success")
      toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, //3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        toastId,
        transition: Slide
      })
      // window.location.reload()
    } catch (error) {
      toast.error('Change Password Error, please try again later', {
        position: toast.POSITION.TOP_RIGHT,
        toastId
      });
    }
  }

  return (
    <div className='security'>
      <div className="form security-change-password">
        <h3>Change Password</h3>
        <div className="change-password-title">
          <h4>Ensure that these requirements are met</h4>
          <h4>Minimum 8 characters long, uppercase & symbol</h4>
        </div>
        <div className="toast-container"><ToastContainer limit={2}/></div>
        <div className="change-password-form">
          <form onSubmit={handleSubmit}>
            <div className="change-password-form-input">
              <div className="form-input">
                <label>New Password</label>
                <input type="password" id="newPassword" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder='********' />
              </div>
              <div className="form-input">
                <label>Confirm New Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='********' />
              </div>
            </div>
            <input type='submit' value="Change Password" className='btn-submit' onClick={handleSubmit}></input>
          </form>
        </div>
      </div>

      <div className="form two-steps">
        <h3>Two-steps verification</h3>
        <p>Keep your account secure with authentication step.</p>
        <h4>SMS</h4>
        <div className='two-steps-phone'>
          <p>+{user?.phone}</p>
          <div className="actions">
            <span><TbEdit className='icon' /></span>
            <span><MdDeleteOutline className='icon' /></span>
          </div>
        </div>
        <p>Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to log in. Learn more.</p>
      </div>
    </div>
  )
}

export default Security