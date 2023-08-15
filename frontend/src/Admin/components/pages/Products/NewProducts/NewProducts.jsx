import React, { useState } from 'react';
import axios from 'axios';
import './NewProducts.scss'
import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi'
import { FiCamera } from 'react-icons/fi'

function NewProducts() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [updatesData, setUpdatesData] = useState({
    ProductName: '',
    ProductDesc: '',
    ProductPrice: '',
  });

  const token = JSON.parse(localStorage.getItem('user'));
  const jwt = token?.jwt;
  console.log(jwt);

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
      console.log(formData);
      const uploadResponse = await axios.post('http://localhost:1337/api/upload', formData, {
        mode: 'no-cors',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log(uploadResponse);

      const res = await axios.post(
        'http://localhost:1337/api/products',
        {
          data: {
            ProductName: updatesData.ProductName,
            ProductDesc: updatesData.ProductDesc,
            ProductPrice: updatesData.ProductPrice,
            ProductImg: uploadResponse.data[0].id,
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

      console.log(res);

      if (res.status === 200) {
        console.log('Success');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };


  return (
    <div className='new-product'>
      <div className="new-product-title">
        <Link><BiArrowBack className='icon-back' /></Link>
        <h2>Create A New Product</h2>
      </div>

      <div className='new-product-form'>
        <form onSubmit={handleSubmit}>
          <div className='form-left'>
            <div className='form form-genenal'>
              <h4>General</h4>
              <div className='form-input'>
                <label>Product Name</label>
                <input
                  onChange={(e) => updateEdit(e)}
                  id="ProductName"
                  value={updatesData.ProductName}
                  type="text"
                  placeholder="Title"
                />
              </div>

              <div className="form-input">
                <label>Product Description</label>
                <input
                  onChange={(e) => updateEdit(e)}
                  id="ProductDesc"
                  value={updatesData.ProductDesc}
                  type="text"
                  placeholder="Description"
                />
              </div>

              <div className="form-input">
                <label>Product Price</label>
                <input
                  onChange={(e) => updateEdit(e)}
                  id="ProductPrice"
                  value={updatesData.ProductPrice}
                  type="number"
                  placeholder="Price"
                />
              </div>
            </div>

            <div className="form form-media">
              <h4>Media</h4>
              <div className="media">
                <div className="media-input">
                  <input type="file" onChange={handleFileChange} className='input-img' id='file-input' />
                  <label htmlFor="file-input" className='icon-camera'>
                    <FiCamera className='icon' />
                  </label>
                </div>

                <div className="media-img">
                  {imageUrl && <img src={imageUrl} alt="Selected Image" />}
                </div>
              </div>

            </div>
          </div>

          <div className=' form-right'>
            <input type="submit" value="Upload" className="btn" />
          </div>

        </form>
      </div>

    </div>
  );
}

export default NewProducts;