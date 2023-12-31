import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import { FiCamera } from 'react-icons/fi'
import './NewCategories.scss'
import { fetchData } from '../../../../../utils/api'
import { Context } from '../../../../../utils/AppContext'
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewCategories = () => {
    const { categories } = useContext(Context)

    const navigate = useNavigate()

    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [updatesData, setUpdatesData] = useState({
        CategoryName: '',
        CategoryDesc: '',
    });
    const [status, setStatus] = useState(1)
    const [visibility, setVisibility] = useState(1)
    const [showList, setShowList] = useState(false);

    const handleToggleList = () => {
        setShowList(!showList);
    };

    const updateEdit = (e) => {
        const newupdate = { ...updatesData };
        newupdate[e.target.id] = e.target.value;
        setUpdatesData(newupdate);
        console.log(newupdate);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('files', image);

        try {
            const uploadResponse = await fetchData.post('/api/upload', formData);

            const res = await fetchData.post(
                '/api/categories',
                {
                    data: {
                        CategoryName: updatesData.CategoryName,
                        CategoryDesc: updatesData.CategoryDesc,
                        CategoryImg: uploadResponse.data[0].id,
                        CategoryStatus: status,
                        CategoryVisibility: visibility,
                    }
                }
            );

            setUpdatesData({
                CategoryName: '',
                CategoryDesc: '',
            });
            setStatus(1);
            setVisibility(1);
            setImage(null);
            setImageUrl(null);

            setTimeout(() => {
                navigate('/admin/categories')
            }, [1000])
            const message = ("New Category Success")
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
            toast.error('New Category Error', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

    const handleFileChange = (e) => {
        console.log(e.target.files[0]);
        setImage(e.target.files[0]);
        setImageUrl(URL.createObjectURL(e.target.files[0]));
    };

    return (
        <div className='new-category'>
            <div className="new-category-title">
                <Link to="/admin/categories"><BiArrowBack className='icon-back' /></Link>
                <h2>Create A New Categories</h2>
            </div>
            <div className="toast-container"><ToastContainer limit={2} /></div>
            <div className="new-category-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-content">
                        <div className="form-left">
                            <div className='form form-genenal'>
                                <h4>General</h4>
                                <div className='form-input'>
                                    <label>Category Name</label>
                                    <input
                                        onChange={(e) => updateEdit(e)}
                                        id="CategoryName"
                                        value={updatesData.CategoryName}
                                        type="text"
                                        placeholder="Category Name"
                                    />
                                </div>

                                <div className='form-input'>
                                    <label>Category Description</label>
                                    <textarea
                                        rows="4" cols="50"
                                        onChange={(e) => updateEdit(e)}
                                        id="CategoryDesc"
                                        value={updatesData.CategoryDesc}
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
                                        <h5><Link onClick={handleToggleList}>{showList ? "Hide category" : "Select category"}</Link></h5>
                                    </div>
                                    {showList && (
                                        <div className="list-category">
                                            <ul>
                                                {categories?.map(cate => {
                                                    return (
                                                        <li>{cate.attributes.CategoryName}</li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    )}
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
                                            onChange={(e) => setStatus(parseInt(e.target.value))}
                                            checked={status === 0}
                                        >
                                        </input>
                                        <label>Disabled</label>
                                    </div>
                                    <div className="input-admin input-radio">
                                        <input type='radio' name='status' value="1"
                                            onChange={(e) => setStatus(parseInt(e.target.value))}
                                            checked={status === 1}
                                        ></input>
                                        <label>Enabled</label>
                                    </div>
                                </div>
                                <div className="radio visibility-radio">
                                    <h5>INCLUDE IN STORE MENU</h5>
                                    <div className="input-admin input-visibility">
                                        <input type='radio' name='visibility' value='0'
                                            onChange={(e) => setVisibility(parseInt(e.target.value))}
                                            checked={visibility === 0}
                                        ></input>
                                        <label>No</label>
                                    </div>
                                    <div className="input-admin input-visibility">
                                        <input type='radio' name='visibility' value='1'
                                            onChange={(e) => setVisibility(parseInt(e.target.value))}
                                            checked={visibility === 1}
                                        ></input>
                                        <label>Yes</label>
                                    </div>

                                </div>


                            </div>
                        </div>
                    </div>

                    <div className="form-btn">
                        <input value="Cancel" type='submit' className='btn-cancel' name='cancel' />
                        <input type="submit" value="Upload" className="btn-upload" name='upload' />
                    </div>
                </form>
            </div>

        </div>
    )
}

export default NewCategories