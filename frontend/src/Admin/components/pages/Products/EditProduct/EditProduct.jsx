import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import '../NewProducts/NewProducts.scss'
import { Link, useParams } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi'
import { FiCamera } from 'react-icons/fi'
import { Context } from '../../../../../utils/AppContext';
import useFetch from '../../../../../hooks/useFetch';

function EditProducts() {
  const { id } = useParams();

  const {categories} = useContext(Context)

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [updatesData, setUpdatesData] = useState({
    ProductName: '',
    ProductDesc: '',
    ProductPrice: '',
    ProductQuantity: null,
  });

  const [status, setStatus] = useState(1)
  const [visibility, setVisibility] = useState(1)
  const [stockAvailabilitty, setStockAvailabilitty] = useState(1)
  const [sale, setSale] = useState(1)
  const [inputCategories, setInputCategories] = useState()

  useEffect(() => {
    getProductId()
  }, [])

  const token = JSON.parse(localStorage.getItem('user'));
  const jwt = token?.jwt;
  console.log(inputCategories);

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

      const res = await axios.put(
        `http://localhost:1337/api/products/${id}`,
        {
          data: {
            ProductName: updatesData.ProductName,
            ProductDesc: updatesData.ProductDesc,
            ProductPrice: updatesData.ProductPrice,
            ProductImg: uploadResponse.data[0].id,
            ProductStatus: status,
            ProductVisibility: visibility,
            ProductStock: stockAvailabilitty,
            ProductSale: sale,
            ProductQuantity: updatesData.ProductQuantity,
            categories: inputCategories,
          }
        },
        // {
        //   mode: 'no-cors',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     Authorization: `Bearer ${jwt}`,
        //   },
        // }
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

  const getProductId = async () => {
    try {
      const response = await axios.get(`http://localhost:1337/api/products/${id}?populate=*`, {
        mode: 'no-cors',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${jwt}`,
        },
      })
      setUpdatesData(response.data.data.attributes)
      setInputCategories(response.data.data.attributes.categories)

    } catch (error) {
      
    }
  }

  console.log(updatesData)


  return (
    <div className='new-product'>
      <div className="new-product-title">
        <Link to="/admin/product"><BiArrowBack className='icon-back' /></Link>
        <h2>Edit Product</h2>
      </div>

      <div className='new-product-form'>
        <form onSubmit={handleSubmit}>
          <div className="form-content">
            <div className='form-left'>
              <div className='form form-genenal'>
                <h4>General</h4>
                <div className='form-input'>
                  <label>Product Name</label>
                  <input
                    onChange={(e) => updateEdit(e)}
                    id="ProductName"
                    value={updatesData?.ProductName}
                    type="text"
                    placeholder="Product Name"
                  />
                </div>

                <div className="form-input">
                  <label>Product Description</label>
                  <textarea
                    rows="4" cols="50"
                    onChange={(e) => updateEdit(e)}
                    id="ProductDesc"
                    value={updatesData?.ProductDesc}
                    type="text"
                    placeholder="Description"
                  ></textarea>
                </div>

                <div className="form-input">
                  <label>Product Price</label>
                  <input
                    onChange={(e) => updateEdit(e)}
                    id="ProductPrice"
                    value={updatesData?.ProductPrice}
                    type="number"
                    min={1}
                    placeholder="Price"
                  />
                </div>

                <div className="form-categories">
                  <label>
                    Choose a category: {""}
                  </label>
                  <select
                    name="categories"
                    defaultValue={updatesData?.categories}
                    value={categories?.attributes?.CategoryName}
                    onChange={(e) => setInputCategories(e.target.value)}
                    required
                    className="categories-select"
                  >
                    {categories?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.attributes.CategoryName}
                      </option>
                    ))}
                  </select>
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
                    {imageUrl ? (
                      <img src={imageUrl} alt="Selected Image" />
                    ) : (
                      <img src={process.env.REACT_APP_DEV_URL + updatesData?.data?.attributes?.ProductImg?.data[0]?.attributes?.url} alt="Product Image" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className=' form-right'>
              <div className="form form-status">
                <h4>Product Status</h4>
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
                    <input type='radio' name='status' value="1" onChange={(e) => setStatus(parseInt(e.target.value))}
                      checked={status === 1}
                    ></input>
                    <label>Enabled</label>
                  </div>
                </div>
                <div className="radio visibility-radio">
                  <h5>VISIBILITY</h5>
                  <div className="input-admin input-visibility">
                    <input type='radio' name='visibility' value='0' onChange={(e) => setVisibility(parseInt(e.target.value))}
                      checked={visibility === 0}
                    ></input>
                    <label>No Visibility</label>
                  </div>
                  <div className="input-admin input-visibility">
                    <input type='radio' name='visibility' value='1' onChange={(e) => setVisibility(parseInt(e.target.value))}
                      checked={visibility === 1}
                    ></input>
                    <label>Visibility</label>
                  </div>

                </div>


              </div>

              <div className="form form-inventory">
                <h4>Inventory</h4>
                <div className="radio stock-availability-radio">
                  <h5>STOCK AVAILABILITY</h5>
                  <div className="input-admin input-stock">
                    <input type='radio' name='stockAvailabilitty' value='0' onChange={(e) => setStockAvailabilitty(parseInt(e.target.value))}
                      checked={stockAvailabilitty === 0}
                    ></input>
                    <label>No</label>

                  </div>
                  <div className="input-admin input-stock">
                    <input type='radio' name='stockAvailabilitty' value='1' onChange={(e) => setStockAvailabilitty(parseInt(e.target.value))}
                      checked={stockAvailabilitty === 1}
                    ></input>
                    <label>Yes</label>

                  </div>
                </div>

                <div className="radio visibility-radio">
                  <h5>SALE</h5>
                  <div className="input-admin input-visibility">
                    <input type='radio' name='sale' value='0' onChange={(e) => setSale(parseInt(e.target.value))}
                      checked={sale === 0}
                    ></input>
                    <label>No </label>

                  </div>
                  <div className="input-admin input-visibility">
                    <input type='radio' name='sale' value='1' onChange={(e) => setSale(parseInt(e.target.value))}
                      checked={sale === 1}
                    ></input>
                    <label>Yes</label>
                  </div>

                </div>

                <div className="input-quantity">
                  <h5>QUANTITY</h5>
                  <input onChange={(e) => updateEdit(e)}
                    id="ProductQuantity"
                    value={updatesData?.data?.attributes?.ProductQuantity}
                    type="number"
                    min={1}
                    placeholder="Quantity"
                  ></input>
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
  );
}

export default EditProducts;