import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import '../NewProducts/NewProducts.scss'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi'
import { FiCamera } from 'react-icons/fi'
import { Context } from '../../../../../utils/AppContext';
import useFetch from '../../../../../hooks/useFetch';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditProducts() {
  const navigate = useNavigate()
  const { id } = useParams();

  const { categories } = useContext(Context)

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [updatesData, setUpdatesData] = useState({
    ProductName: '',
    ProductDesc: '',
    ProductPrice: '',
    ProductQuantity: null,
  });

  const [status, setStatus] = useState(true)
  const [visibility, setVisibility] = useState(1)
  const [stockAvailabilitty, setStockAvailabilitty] = useState(1)
  const [sale, setSale] = useState(1)
  const [inputCategories, setInputCategories] = useState()

  console.log(inputCategories)

  useEffect(() => {
    getProductId()
  }, [id])

  const token = JSON.parse(localStorage.getItem('user'));
  const jwt = token?.jwt;
  console.log(updatesData);

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
        imgUrlData = updatesData?.ProductImg?.data[0]?.id
      }
      console.log(inputCategories);
      const res = await axios.put(
        `http://localhost:1337/api/products/${id}?populate=*`,
        {
          data: {
            ProductName: updatesData.ProductName,
            ProductDesc: updatesData.ProductDesc,
            ProductPrice: updatesData.ProductPrice,
            ProductImg: imgUrlData,
            ProductStatus: status,
            ProductVisibility: visibility,
            ProductStock: stockAvailabilitty,
            ProductSale: sale,
            ProductQuantity: updatesData.ProductQuantity,
            category: {
              set: [inputCategories]
            }
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
      setTimeout(() => {
        navigate("/admin/product")
        window.location.reload()
      }, [1000])
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
    
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    console.log(e.target.files[0]);
    setImage(selectedFile);
    setImageUrl(URL.createObjectURL(selectedFile));
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
      setInputCategories(response.data.data.attributes.category.data)
      setStatus(response.data.data.attributes.ProductStatus)
      setVisibility(response.data.data.attributes.ProductVisibility)
      setStockAvailabilitty(response.data.data.attributes.ProductStock)
      setSale(response.data.data.attributes.ProductSale)

    } catch (error) {

    }
  }

  return (
    <div className='new-product'>
      <div className="new-product-title">
        <Link to="/admin/product"><BiArrowBack className='icon-back' /></Link>
        <h2>Edit Product</h2>
      </div>
      <div className="toast-container"><ToastContainer limit={2} /></div>
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
                    value={categories?.id}
                    onChange={(e) => setInputCategories(e.target.value)}
                    required
                    className="categories-select"
                  >
                    {categories?.map((category) => (
                      <option key={category.id} value={category.id} selected={category.id === inputCategories?.id}>
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
                      <img src={process.env.REACT_APP_DEV_URL + updatesData?.ProductImg?.data[0]?.attributes?.url} alt="Product Image" />
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
                      type="radio"
                      name="status"
                      value="false"
                      onChange={() => setStatus(false)}
                      checked={!status}
                    />
                    <label>Disabled</label>
                  </div>
                  <div className="input-admin input-radio">
                    <input
                      type="radio"
                      name="status"
                      value="true"
                      onChange={() => setStatus(true)}
                      checked={status}
                    />
                    <label>Enabled</label>
                  </div>
                </div>
                <div className="radio visibility-radio">
                  <h5>VISIBILITY</h5>
                  <div className="input-admin input-visibility">
                    <input type='radio' name='visibility' value='false' onChange={(e) => setVisibility(false)}
                      checked={!visibility}
                    ></input>
                    <label>No Visibility</label>
                  </div>
                  <div className="input-admin input-visibility">
                    <input type='radio' name='visibility' value='true' onChange={(e) => setVisibility(true)}
                      checked={visibility}
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
                    <input type='radio' name='stockAvailabilitty' value='false' onChange={(e) => setStockAvailabilitty(false)}
                      checked={!stockAvailabilitty}
                    ></input>
                    <label>No</label>

                  </div>
                  <div className="input-admin input-stock">
                    <input type='radio' name='stockAvailabilitty' value='true' onChange={(e) => setStockAvailabilitty(true)}
                      checked={stockAvailabilitty}
                    ></input>
                    <label>Yes</label>

                  </div>
                </div>

                <div className="radio visibility-radio">
                  <h5>SALE</h5>
                  <div className="input-admin input-visibility">
                    <input type='radio' name='sale' value='false' onChange={(e) => setSale(false)}
                      checked={!sale}
                    ></input>
                    <label>No </label>

                  </div>
                  <div className="input-admin input-visibility">
                    <input type='radio' name='sale' value='true' onChange={(e) => setSale(true)}
                      checked={sale}
                    ></input>
                    <label>Yes</label>
                  </div>

                </div>

                <div className="input-quantity">
                  <h5>QUANTITY</h5>
                  <input onChange={(e) => updateEdit(e)}
                    id="ProductQuantity"
                    value={updatesData?.ProductQuantity}
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