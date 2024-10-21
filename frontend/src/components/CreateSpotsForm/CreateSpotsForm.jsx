import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as spotActions from '../../store/spots';
import './CreateSpotsForm.css';

const CreateSpotsForm = ({ spot }) => {
  const navigate = useNavigate();
  const [country, setCountry] = useState(spot?.country);
  const [address, setAddress] = useState(spot?.address);
  const [city, setCity] = useState(spot?.city);
  const [state, setState] = useState(spot?.state);
  const [latitude, setLatitude] = useState(spot?.latitude);
  const [longitude, setLongitude] = useState(spot?.longitude);
  const [description, setDescription] = useState(spot?.description);
  const [name, setName] = useState(spot?.name);
  const [price, setPrice] = useState(spot?.price);
  const [preview, setPreview] = useState(spot?.preview);
  const [images, setImages] = useState({});

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  // console.log('IM IN THE FORM COMP')

  const reset = () => {
    setCountry(''),
    setAddress(''),
    setCity(''),
    setState(''),
    setLatitude(''),
    setLongitude(''),
    setDescription(''),
    setName(''),
    setPrice(''),
    setPreview(''),
    setImages({})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    spot = {
        country,
        address,
        city,
        state,
        lat: latitude,
        lng: longitude,
        name,
        price,
        description,
        preview,
        images
     };
    // console.log('THUNK AGAIN !!')
    const newSpot = await dispatch(spotActions.createSpot(spot))
    console.log('IM YOUR NEW SPOT', newSpot)
    reset();
    navigate(`/spots/${newSpot.id}`);
  };

  return (
    <div id="create-form">
      <div id='form'>
    <form onSubmit={handleSubmit}>
      <h1>Create a New Spot</h1>
      <section className='form-section' id='location'>
        <h2>Where's your place located?</h2>
        <h4>Guests will only get your exact address once they booked a reservation.</h4>
      {/* <div className="errors">{errors.understanding}</div> */}
      <label>
      Country:
        <input
          type="text"
          placeholder='Country'
          value={country}
          className='form-input'
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </label>
      <label>
      Street Address:
        <input
          type="text"
          placeholder='Street Address'
          value={address}
          className='form-input'
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </label>
      <label>
      City:
        <input
          type="text"
          placeholder='City'
          value={city}
          className='form-input'
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </label>
      <label>
      State:
        <input
          type="text"
          placeholder='State'
          value={state}
          className='form-input'
          onChange={(e) => setState(e.target.value)}
          required
        />
      </label>
      <label>
      Latitude:
        <input
          type="text"
          placeholder='Latitude'
          value={latitude}
          className='form-input'
          onChange={(e) => setLatitude(e.target.value)}
        />
      </label>
      <label>
      Longitude:
        <input
          type="text"
          placeholder='Longitude'
          value={longitude}
          className='form-input'
          onChange={(e) => setLongitude(e.target.value)}
        />
      </label>
      </section>
      <section id='description' className='form-section'>
        <h2>Describe your place to guests</h2>
        <h4>
            Mention the best features of your space,
            any special amentities like fast wifi or parking,
            and what you love about the neighborhood.
        </h4>
      {/* <div className="errors">{errors.improvement}</div> */}
      <label>
        {/* Description: */}
        <textarea
          placeholder='Please write at least 30 characters'
          value={description}
          id="desc-text"
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      </section>
      <section id='spot-name' className='form-section'>
        <h2>Create a title for your spot</h2>
        <h4>Catch guests' attention with a spot title that highlights what makes your place special.</h4>
        <label>
      {/* Name: */}
        <input
          type="text"
          placeholder='Name of your spot'
          value={name}
          className='form-input'
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      </section>
      <section id='price' className='form-section'>
        <h2>Set a base price for your spot</h2>
        <h4>Competitive pricing can help your listing stand out and rank higher in search results.</h4>
        <label>
      $
        <input
          type="number"
          placeholder='Price per night (USD)'
          value={price}
          className='form-input price-input'
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      </section>
      <section id='photos' className='form-section'>
        <h2>Liven up your spot with photos</h2>
        <h4>Submit a link to at least one photo to publish your spot.</h4>
        <label>
      Preview:
        <input
          type="text"
          placeholder='Preview Image URL'
          value={preview}
          className='form-input'
          onChange={(e) => setPreview(e.target.value)}
          required
        />
      </label>
      <label>
      Images:
        <input
          type="text"
          placeholder='Image URL'
        //   value={images}
        className='form-input'
          onChange={(e) => setImages({...images, ...e.target.value})}
        />
      </label>
      <label>
      Images:
        <input
          type="text"
          placeholder='Image URL'
        //   value={images}
        className='form-input'
          onChange={(e) => setImages({...images, ...e.target.value})}
        />
      </label>
      <label>
      Images:
        <input
          type="text"
          placeholder='Image URL'
        //   value={images}
        className='form-input'
          onChange={(e) => setImages({...images, ...e.target.value})}
        />
      </label>
      <label>
      Images:
        <input
          type="text"
          placeholder='Image URL'
        //   value={images}
        className='form-input'
          onChange={(e) => setImages({...images, ...e.target.value})}
        />
      </label>
      <label>
      Images:
        <input
          type="text"
          placeholder='Image URL'
        //   value={images}
        className='form-input'
          onChange={(e) => setImages({...images, ...e.target.value})}
        />
      </label>
      </section>
      <div className='button-box'>
      <button id='create-button' type="submit">Create Spot</button>
      </div>
    </form>
    </div>
    </div>
  );
};

export default CreateSpotsForm;
