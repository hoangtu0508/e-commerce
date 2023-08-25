import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import { FiCamera } from 'react-icons/fi'
import '../NewCategories/NewCategories.scss'
import axios from 'axios'
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditCategory = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [updatesData, setUpdatesData] = useState({
        CategoryName: '',
        CategoryDescription: '',
    });

    const [status, setStatus] = useState()
    const [visibility, setVisibility] = useState()

    const [dataCate, setDataCate] = useState()

    const [showList, setShowList] = useState(false);

    const token = JSON.parse(localStorage.getItem('user'));
    const jwt = token?.jwt;

    useEffect(() => {
        handleGetCategory();
        getCategoryId();
    }, [id])

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
            let uploadResponse;

            if (image) {
                uploadResponse = await axios.post('http://localhost:1337/api/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${jwt}`,
                    },
                });

                console.log(uploadResponse)

            }

            let imgUrlData

            if (image) {
                imgUrlData = uploadResponse?.data[0].id
            } else {
                imgUrlData = updatesData?.CategoryImg?.data[0]?.id
            }

            const res = await axios.put(
                `http://localhost:1337/api/categories/${id}`,
                {
                    data: {
                        CategoryName: updatesData.CategoryName,
                        CategoryDescription: updatesData.CategoryDescription,
                        CategoryImg: imgUrlData,
                        CategoryStatus: status,
                        CategoryVisibility: visibility,
                    }
                },
                {
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );

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
            setTimeout(() => {
                navigate("/admin/categories")
                window.location.reload()
            }, [1000])

        } catch (error) {
            toast.error('Upload Error', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
        
    };

    const handleFileChange = (e) => {
        console.log(e.target.files[0]);
        setImage(e.target.files[0]);
        setImageUrl(URL.createObjectURL(e.target.files[0]));
    };

    const handleGetCategory = async () => {
        try {
            const data = await axios.get('http://localhost:1337/api/categories/', {
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${jwt}`,
                },
            })
            setDataCate(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getCategoryId = async () => {
        try {
            const response = await axios.get(`http://localhost:1337/api/categories/${id}?populate=*`, {
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${jwt}`,
                },
            })

            setUpdatesData(response.data.data.attributes)
            setStatus(response.data.data.attributes.CategoryStatus)
            setVisibility(response.data.data.attributes.CategoryVisibility)
        } catch (error) {

        }
    }

    console.log(updatesData)

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
                                        value={updatesData?.CategoryName}
                                        type="text"
                                        placeholder="Category Name"
                                    />
                                </div>

                                <div className='form-input'>
                                    <label>Category Description</label>
                                    <textarea
                                        rows="4" cols="50"
                                        onChange={(e) => updateEdit(e)}
                                        id="CategoryDescription"
                                        value={updatesData?.CategoryDescription}
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
                                        {imageUrl ? (
                                            <img src={imageUrl} alt="Selected Image" />
                                        ) : (
                                            <img src={process.env.REACT_APP_DEV_URL + updatesData?.CategoryImg?.data[0]?.attributes?.url} alt="Product Image" />
                                        )}
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
                                                {dataCate.data?.map(cate => {
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
                                            value='false'
                                            onChange={() => setStatus(false)}
                                            checked={!status}
                                        >
                                        </input>
                                        <label>Disabled</label>
                                    </div>
                                    <div className="input-admin input-radio">
                                        <input type='radio' name='status' value="true"
                                            onChange={() => setStatus(true)}
                                            checked={status}
                                        ></input>
                                        <label>Enabled</label>
                                    </div>
                                </div>
                                <div className="radio visibility-radio">
                                    <h5>INCLUDE IN STORE MENU</h5>
                                    <div className="input-admin input-visibility">
                                        <input type='radio' name='visibility' value='false'
                                            onChange={() => setVisibility(false)}
                                            checked={!visibility}
                                        ></input>
                                        <label>No</label>
                                    </div>
                                    <div className="input-admin input-visibility">
                                        <input type='radio' name='visibility' value='true'
                                            onChange={() => setVisibility(true)}
                                            checked={visibility}
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

export default EditCategory