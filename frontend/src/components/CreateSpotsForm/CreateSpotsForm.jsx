import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as spotActions from '../../store/spots';
import './CreateSpotsForm.css';

// export const CREATE_A_NEW_SPOT_FORM_LOCATOR = data-testid='create-spot-form'
// export const CREATE_A_NEW_SPOT_LOCATION_INPUT_LOCATOR = data-testid='spot-location'
// export const CREATE_A_NEW_SPOT_FORM_TITLE_LOCATOR = data-testid='form-title'
// export const CREATE_A_NEW_SPOT_SECTION_1_LOCATOR = data-testid='section-1'
// export const CREATE_A_NEW_SPOT_SECTION_2_LOCATOR = data-testid='section-2'
// export const CREATE_A_NEW_SPOT_SECTION_3_LOCATOR = data-testid='section-3'
// export const CREATE_A_NEW_SPOT_SECTION_4_LOCATOR = data-testid='section-4'
// export const CREATE_A_NEW_SPOT_SECTION_5_LOCATOR = data-testid='section-5'
// export const CREATE_A_NEW_SPOT_SECTION_1_HEADING_LOCATOR = data-testid='section-1-heading'
// export const CREATE_A_NEW_SPOT_SECTION_1_CAPTION_LOCATOR = data-testid='section-1-caption'
// export const CREATE_A_NEW_SPOT_SECTION_2_HEADING_LOCATOR = data-testid='section-2-heading'
// export const CREATE_A_NEW_SPOT_SECTION_2_CAPTION_LOCATOR = data-testid='section-2-caption'
// export const CREATE_A_NEW_SPOT_SECTION_3_HEADING_LOCATOR = data-testid='section-3-heading'
// export const CREATE_A_NEW_SPOT_SECTION_3_CAPTION_LOCATOR = data-testid='section-3-caption'
// export const CREATE_A_NEW_SPOT_SECTION_4_HEADING_LOCATOR = data-testid='section-4-heading'
// export const CREATE_A_NEW_SPOT_SECTION_4_CAPTION_LOCATOR = data-testid='section-4-caption'
// export const CREATE_A_NEW_SPOT_SECTION_5_HEADING_LOCATOR = data-testid='section-5-heading'
// export const CREATE_A_NEW_SPOT_SECTION_5_CAPTION_LOCATOR = data-testid='section-5-caption'

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
    // setErrors({});
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
    // const newSpot = await dispatch(spotActions.createSpot(spot))
    // console.log('IM YOUR NEW SPOT', newSpot)
    // reset();
    // navigate(`/spots/${newSpot.id}`);
    return dispatch(spotActions.createSpot(spot))
            .then(navigate(`/spots/${spot.id}`))
            .catch(async (res) => {
            const data = await res.json();
            if ( data ) {
                setErrors({data})
                console.log('here is the problem: ', errors.data.errors)
            }
            });
  };

  return (
    <div className="create-form">
      <div className='form' data-testid='section-1'>
    <form onSubmit={handleSubmit} data-testid='create-spot-form'>
      <h1  data-testid='form-title'>Create a New Spot</h1>
      <section className='form-section' id='location' data-testid='spot-location'>
        <h2  data-testid='section-1-heading'>Where&apos;s your place located?</h2>
        <h4 data-testid='section-1-caption'>Guests will only get your exact address once they booked a reservation.</h4>
      {/* <div className="errors">{errors.understanding}</div> */}
      <label>
      Country:
        <input
          type="text"
          placeholder='Country'
          value={country}
          className='form-input'
          onChange={(e) => setCountry(e.target.value)}
          // required
        />
      </label>
      {errors.data && <p className="errors" >{errors.data.errors.country}</p>}
      <label>
      Street Address:
        <input
          type="text"
          placeholder='Street Address'
          value={address}
          className='form-input'
          onChange={(e) => setAddress(e.target.value)}
          // required
        />
      </label>
      {errors.data && <p className="errors" >{errors.data.errors.address}</p>}
      <label>
      City:
        <input
          type="text"
          placeholder='City'
          value={city}
          className='form-input'
          onChange={(e) => setCity(e.target.value)}
          // required
        />
      </label>
      {errors.data && <p className="errors" >{errors.data.errors.city}</p>}
      <label>
      State:
        <input
          type="text"
          placeholder='State'
          value={state}
          className='form-input'
          onChange={(e) => setState(e.target.value)}
          // required
        />
      </label>
      {errors.data && <p className="errors" >{errors.data.errors.state}</p>}
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
      {errors.data && <p className="errors" >{errors.data.errors.lat}</p>}
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
      {errors.data && <p className="errors" >{errors.data.errors.lng}</p>}
      </section>
      <section id='description' className='form-section' data-testid='section-3'>
        <h2 data-testid='section-2-heading'>Describe your place to guests</h2>
        <h4 data-testid='section-2-caption'>
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
      {errors.data && <p className="errors" >{errors.data.errors.description}</p>}
      </section>
      <section id='spot-name' className='form-section' data-testid='section-3'>
        <h2 data-testid='section-3-heading'>Create a title for your spot</h2>
        <h4 data-testid='section-3-caption'>Catch guests&apos; attention with a spot title that highlights what makes your place special.</h4>
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
      {errors.data && <p className="errors" >{errors.data.errors.name}</p>}
      </section>
      <section id='price' className='form-section' data-testid='section-4'>
        <h2 data-testid='section-4-heading'>Set a base price for your spot</h2>
        <h4 data-testid='section-4-caption'>Competitive pricing can help your listing stand out and rank higher in search results.</h4>
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
      {errors.data && <p className="errors" >{errors.data.errors.price}</p>}
      </section>
      <section id='photos' className='form-section' data-testid='section-5'>
        <h2 data-testid='section-5-heading'> Liven up your spot with photos</h2>
        <h4 data-testid='section-5-caption'>Submit a link to at least one photo to publish your spot.</h4>
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
      {errors.data && <p className="errors" >{errors.data.errors.preview}</p>}
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
      <button className='create-button' type="submit">Create Spot</button>
      </div>
    </form>
    </div>
    </div>
  );
};

export default CreateSpotsForm;
