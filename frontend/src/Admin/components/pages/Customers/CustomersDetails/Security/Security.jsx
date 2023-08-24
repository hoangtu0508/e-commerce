import React from 'react'
import './Security.scss'

const Security = () => {
  return (
    <div className='security'>
      <div className="form security-change-password">
        <h3>Change Password</h3>
        <div className="change-password-title">
          <h4>Ensure that these requirements are met</h4>
          <h4>Minimum 8 characters long, uppercase & symbol</h4>
        </div>

        <div className="change-password-form">
          <form>
            <div className="form-input">
              <label>New Password</label>
              <input type='password' placeholder='********'></input>
            </div>
            <div className="form-input">
              <label>Confirm New Password</label>
              <input type='password' placeholder='********'></input>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Security