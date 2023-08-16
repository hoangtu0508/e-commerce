import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import { FiCamera } from 'react-icons/fi'
import './NewCategories.scss'

const NewCategories = () => {
    const [imageUrl, setImageUrl] = useState(null);

    const handleFileChange = (e) => {
        setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
    return (
        <div className='new-category'>
            <div className="new-category-title">
                <Link><BiArrowBack className='icon-back' /></Link>
                <h2>Create A New Categories</h2>
            </div>

            <div className="new-category-form">
                <form>
                    <div className="form-content">
                        <div className="form-left">
                            <div className='form form-genenal'>
                                <h4>General</h4>
                                <div className='form-input'>
                                    <label>Category Name</label>
                                    <input
                                        // onChange={(e) => updateEdit(e)}
                                        id="ProductName"
                                        // value={updatesData.ProductName}
                                        type="text"
                                        placeholder="Category Name"
                                    />
                                </div>

                                <div className='form-input'>
                                    <label>Category Description</label>
                                    <textarea
                                        rows="4" cols="50"
                                        // onChange={(e) => updateEdit(e)}
                                        id="ProductName"
                                        // value={updatesData.ProductName}
                                        type="text"
                                        placeholder="Category Description"
                                    />
                                </div>
                            </div>

                            <div className="form form-media-category">
                                <h4>Media</h4>
                                <div className="media-category">
                                    <div className="media-input-category">
                                        <input type="file" onChange={handleFileChange} className='input-img-category' id='file-input' />
                                        <label htmlFor="file-input" className='icon-camera-category'>
                                            <FiCamera className='icon' />
                                        </label>
                                    </div>

                                    <div className="media-img-category">
                                        {imageUrl && <img src={imageUrl} alt="Selected Image" />}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-right">
                            <div className="form">
                                <h4>Parent</h4>
                                <div className='form-input'>
                                    <h5>PARENT CATEGORY</h5>
                                    <div className="parent-categories">
                                        <h5><Link>Select category</Link></h5>
                                    </div>
                                </div>
                            </div>

                            <div className="form form-status">
                                <h4>Category Status</h4>
                                <div className="radio status-radio">
                                    <h5>STATUS</h5>
                                    <div className="input-admin input-radio">
                                        <input
                                            type='radio'
                                            name='status'
                                            value='0'
                                            // onChange={(e) => setStatus(parseInt(e.target.value))}
                                            // checked={status === 0}
                                        >
                                        </input>
                                        <label>Disabled</label>
                                    </div>
                                    <div className="input-admin input-radio">
                                        <input type='radio' name='status' value="1" 
                                        // onChange={(e) => setStatus(parseInt(e.target.value))}
                                            // checked={status === 1}
                                        ></input>
                                        <label>Enabled</label>
                                    </div>
                                </div>
                                <div className="radio visibility-radio">
                                    <h5>INCLUDE IN STORE MENU</h5>
                                    <div className="input-admin input-visibility">
                                        <input type='radio' name='visibility' value='0' 
                                        // onChange={(e) => setVisibility(parseInt(e.target.value))}
                                            // checked={visibility === 0}
                                        ></input>
                                        <label>No</label>
                                    </div>
                                    <div className="input-admin input-visibility">
                                        <input type='radio' name='visibility' value='1' 
                                        // onChange={(e) => setVisibility(parseInt(e.target.value))}
                                            // checked={visibility === 1}
                                        ></input>
                                        <label>Yes</label>
                                    </div>

                                </div>


                            </div>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default NewCategories