/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from 'axios';
import React, { useState } from 'react';
import ReactModal from 'react-modal';
import StarRating from 'react-ratings-declarative';
import ImageModal from './ImageModal.jsx';

export default function WriteReviewModal(input) {
  const {
    characteristicsData, newReviewModalOpen, setNewReviewModalOpen, productId,
  } = input;
  const [submitError, setSubmitError] = useState(false);
  const [starRating, setStartRating] = useState(0);
  const [recommend, setRecommend] = useState(false);
  const [newReviewCharacteristics, setNewReviewCharacteristics] = useState({});
  // replace(/\n/g, '')
  const [summeryInput, setSummeryInput] = useState('');
  const [reviewBody, setReviewBody] = useState('');
  const [nickName, setNickName] = useState('');

  const [photoArray, setPhotoArray] = useState([]);
  const [photoUrl, setPhotoUrl] = useState('');
  const [email, setEmail] = useState('');

  const starInfo = () => {
    switch (starRating) {
      case 1:
        return 'Poor';
      case 2:
        return 'Fair';
      case 3:
        return 'Average';
      case 4:
        return 'Good';
      case 5:
        return 'Great';
      default:
        return 'Select a star rating';
    }
  };

  const showCurrentSelection = (type) => {
    if (newReviewCharacteristics[type] && type === 'Size') {
      const size = newReviewCharacteristics.Size.value;
      switch (size) {
        case 1:
          return 'A size too small';
        case 2:
          return '1/2 a size too small';
        case 3:
          return 'Perfect';
        case 4:
          return '1/2 a size too wide';
        case 5:
          return 'A size too big';
        default:
          return '';
      }
    }
    if (newReviewCharacteristics[type] && type === 'Width') {
      const width = newReviewCharacteristics.Width.value;
      switch (width) {
        case 1:
          return 'Too narrow';
        case 2:
          return 'Slightly narrow';
        case 3:
          return 'Perfect';
        case 4:
          return 'Slightly wide';
        case 5:
          return 'Too wide';
        default:
          return '';
      }
    }
    if (newReviewCharacteristics[type] && type === 'Comfort') {
      const comfort = newReviewCharacteristics.Comfort.value;
      switch (comfort) {
        case 1:
          return 'Uncomfortable';
        case 2:
          return 'Slightly uncomfortable';
        case 3:
          return 'OK';
        case 4:
          return 'Comfortable';
        case 5:
          return 'Perfect';
        default:
          return '';
      }
    }
    if (newReviewCharacteristics[type] && type === 'Quality') {
      const quality = newReviewCharacteristics.Quality.value;
      switch (quality) {
        case 1:
          return 'Poor';
        case 2:
          return 'Below average';
        case 3:
          return 'What I expected';
        case 4:
          return 'Pretty great';
        case 5:
          return 'Perfect';
        default:
          return '';
      }
    }
    if (newReviewCharacteristics[type] && type === 'Length') {
      const length = newReviewCharacteristics.Length.value;
      switch (length) {
        case 1:
          return 'Runs short';
        case 2:
          return 'Runs slightly short';
        case 3:
          return 'Perfect';
        case 4:
          return 'Runs slightly long';
        case 5:
          return 'Runs long';
        default:
          return '';
      }
    }
    if (newReviewCharacteristics[type] && type === 'Fit') {
      const fit = newReviewCharacteristics.Fit.value;
      switch (fit) {
        case 1:
          return 'Runs short';
        case 2:
          return 'Runs slightly short';
        case 3:
          return 'Perfect';
        case 4:
          return 'Runs slightly long';
        case 5:
          return 'Runs long';
        default:
          return '';
      }
    }
    return 'None selected';
  };

  const checkBodyLength = () => {
    if (reviewBody.length > 50 || 50 - reviewBody.length === 0) {
      return 'Minimum reached';
    }
    return `Minimum required characters left: ${50 - reviewBody.length}`;
  };

  const checkPhoto = (url) => {
    const a = document.createElement('a');
    a.href = url;
    return (a.host && a.host !== window.location.host);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      starRating !== 0
      && Object.keys(newReviewCharacteristics).length === Object.keys(characteristicsData).length
      && summeryInput !== ''
      && reviewBody.length > 50
      && nickName !== ''
      && (photoArray.every((photo) => checkPhoto(photo)) || photoArray.length === 0)
      && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
    ) {
      const config = {
        url: '/api/reviews',
        method: 'POST',
        data: {
          product_id: productId,
          rating: starRating,
          summary: summeryInput.replaceAll(/\n/g, ' '),
          body: reviewBody.replaceAll(/\n/g, ' '),
          recommend,
          name: nickName.replaceAll(/\n/g, ' '),
          email,
          photos: photoArray,
          characteristics: newReviewCharacteristics,
        },
      };
      try {
        await axios(config);
        setNewReviewModalOpen(false);
      } catch (e) {
        setSubmitError(true);
        return;
      }
    }
    setSubmitError(true);
  };

  const handleFile = (event) => {
    event.preventDefault();
    if (checkPhoto(photoUrl)) {
      setPhotoArray((prev) => (
        [...prev, photoUrl]
      ));
      setPhotoUrl('');
    }
  };

  const displayPhoto = (photo, index) => {
    const objPhoto = { id: index, url: photo };
    return <ImageModal key={index} photo={objPhoto} />;
  };

  return (
    <ReactModal
      isOpen={newReviewModalOpen}
      contentLabel="review Modal"
    >
      <div className="modal-container">
        <button type="button" className="closeButton" onClick={() => setNewReviewModalOpen(false)}>close</button>
        <div className="reviewForm">
          <StarRating
            rating={starRating}
            changeRating={(newRating) => setStartRating(newRating)}
            widgetRatedColors="gold"
            widgetDimensions="15px"
            widgetSpacings="4px"
          >
            <StarRating.Widget />
            <StarRating.Widget />
            <StarRating.Widget />
            <StarRating.Widget />
            <StarRating.Widget />
          </StarRating>
          <p style={{ display: 'inline' }}>
            {` ${starInfo()}`}
          </p>
          <div style={{ backgroundColor: 'black', height: '4px' }} />
          <br />

          <form>
            <p>Do you recommend this product?</p>
            <label htmlFor="yes">Yes</label>
            <input id="yes" type="radio" name="recommendation" onChange={() => setRecommend(true)} />
            <label htmlFor="no">No</label>
            <input id="no" type="radio" name="recommendation" onChange={() => setRecommend(false)} />
            <div style={{ backgroundColor: 'black', height: '4px' }} />
            <br />

            <p>Characteristics:</p>
            {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
            <>
              {characteristicsData.Size && (
              <>
                <div className="reviewCharacteristic-container">
                  <p className="characteristicCat">Size:</p>
                  <p className="characteristicCurrentSelect">{showCurrentSelection('Size')}</p>
                  <input className="reviewInput1" id="1" type="radio" name="size" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, [characteristicsData.Size.id]: 1 }))} />
                  <input className="reviewInput2" id="2" type="radio" name="size" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, [characteristicsData.Size.id]: 2 }))} />
                  <input className="reviewInput3" id="3" type="radio" name="size" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, [characteristicsData.Size.id]: 3 }))} />
                  <input className="reviewInput4" id="4" type="radio" name="size" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, [characteristicsData.Size.id]: 4 }))} />
                  <input className="reviewInput5" id="5" type="radio" name="size" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, [characteristicsData.Size.id]: 5 }))} />
                  <br />
                  <label className="reviewLabel1" htmlFor="1">A size too small</label>
                  <label className="reviewLabel2" htmlFor="2">1/2 a size too small</label>
                  <label className="reviewLabel3" htmlFor="3">Perfect</label>
                  <label className="reviewLabel4" htmlFor="4">1/2 a size too big</label>
                  <label className="reviewLabel5" htmlFor="5">A size too big</label>
                </div>
                <div style={{ backgroundColor: 'black', height: '4px' }} />
                <br />
              </>
              )}
              {characteristicsData.Width && (
              <>
                <div className="reviewCharacteristic-container">
                  <p className="characteristicCat">Width:</p>
                  <p className="characteristicCurrentSelect">{showCurrentSelection('Width')}</p>
                  <input className="reviewInput1" id="1" type="radio" name="width" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, [characteristicsData.Width.id]: 1 }))} />
                  <input className="reviewInput2" id="2" type="radio" name="width" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, [characteristicsData.Width.id]: 2 }))} />
                  <input className="reviewInput3" id="3" type="radio" name="width" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, [characteristicsData.Width.id]: 3 }))} />
                  <input className="reviewInput4" id="4" type="radio" name="width" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, [characteristicsData.Width.id]: 4 }))} />
                  <input className="reviewInput5" id="5" type="radio" name="width" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, [characteristicsData.Width.id]: 5 }))} />
                  <br />
                  <label className="reviewLabel1" htmlFor="1">Too narrow</label>
                  <label className="reviewLabel2" htmlFor="2">Slightly narrow</label>
                  <label className="reviewLabel3" htmlFor="3">Perfect</label>
                  <label className="reviewLabel4" htmlFor="4">Slightly wide</label>
                  <label className="reviewLabel5" htmlFor="5">Too wide</label>
                </div>
                <div style={{ backgroundColor: 'black', height: '4px' }} />
                <br />
              </>
              )}
              {characteristicsData.Comfort && (
              <>
                <div className="reviewCharacteristic-container">
                  <p className="characteristicCat">Comfort:</p>
                  <p className="characteristicCurrentSelect">{showCurrentSelection('Comfort')}</p>
                  <input className="reviewInput1" id="1" type="radio" name="comfort" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, [characteristicsData.Comfort.id]: 1 }))} />
                  <input className="reviewInput2" id="2" type="radio" name="comfort" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, [characteristicsData.Comfort.id]: 2 }))} />
                  <input className="reviewInput3" id="3" type="radio" name="comfort" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, [characteristicsData.Comfort.id]: 3 }))} />
                  <input className="reviewInput4" id="4" type="radio" name="comfort" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, [characteristicsData.Comfort.id]: 4 }))} />
                  <input className="reviewInput5" id="5" type="radio" name="comfort" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, [characteristicsData.Comfort.id]: 5 }))} />
                  <br />
                  <label className="reviewLabel1" htmlFor="1">Uncomfortable</label>
                  <label className="reviewLabel2" htmlFor="2">Slightly uncomfortable</label>
                  <label className="reviewLabel3" htmlFor="3">OK</label>
                  <label className="reviewLabel4" htmlFor="4">Comfortable</label>
                  <label className="reviewLabel5" htmlFor="5">Perfect</label>
                </div>
                <div style={{ backgroundColor: 'black', height: '4px' }} />
                <br />
              </>
              )}
              {characteristicsData.Quality && (
              <>
                <div className="reviewCharacteristic-container">
                  <p className="characteristicCat">Quality:</p>
                  <p className="characteristicCurrentSelect">{showCurrentSelection('Quality')}</p>
                  <input className="reviewInput1" id="1" type="radio" name="quality" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, [characteristicsData.Quality.id]: 1 }))} />
                  <input className="reviewInput2" id="2" type="radio" name="quality" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, [characteristicsData.Quality.id]: 2 }))} />
                  <input className="reviewInput3" id="3" type="radio" name="quality" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, [characteristicsData.Quality.id]: 3 }))} />
                  <input className="reviewInput4" id="4" type="radio" name="quality" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, [characteristicsData.Quality.id]: 4 }))} />
                  <input className="reviewInput5" id="5" type="radio" name="quality" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, [characteristicsData.Quality.id]: 5 }))} />
                  <br />
                  <label className="reviewLabel1" htmlFor="1">Poor</label>
                  <label className="reviewLabel2" htmlFor="2">Below average</label>
                  <label className="reviewLabel3" htmlFor="3">What I expected</label>
                  <label className="reviewLabel4" htmlFor="4">Pretty great</label>
                  <label className="reviewLabel5" htmlFor="5">Perfect</label>
                </div>
                <div style={{ backgroundColor: 'black', height: '4px' }} />
                <br />
              </>
              )}
              {characteristicsData.Length && (
              <>
                <div className="reviewCharacteristic-container">
                  <p className="characteristicCat">Length:</p>
                  <p className="characteristicCurrentSelect">{showCurrentSelection('Length')}</p>
                  <input className="reviewInput1" id="1" type="radio" name="length" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, [characteristicsData.Length.id]: 1 }))} />
                  <input className="reviewInput2" id="2" type="radio" name="length" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, [characteristicsData.Length.id]: 2 }))} />
                  <input className="reviewInput3" id="3" type="radio" name="length" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, [characteristicsData.Length.id]: 3 }))} />
                  <input className="reviewInput4" id="4" type="radio" name="length" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, [characteristicsData.Length.id]: 4 }))} />
                  <input className="reviewInput5" id="5" type="radio" name="length" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, [characteristicsData.Length.id]: 5 }))} />
                  <br />
                  <label className="reviewLabel1" htmlFor="1">Runs short</label>
                  <label className="reviewLabel2" htmlFor="2">Runs slightly short</label>
                  <label className="reviewLabel3" htmlFor="3">Perfect</label>
                  <label className="reviewLabel4" htmlFor="4">Runs slightly long</label>
                  <label className="reviewLabel5" htmlFor="5">Runs long</label>
                </div>
                <div style={{ backgroundColor: 'black', height: '4px' }} />
                <br />
              </>
              )}
              {characteristicsData.Fit && (
              <>
                <div className="reviewCharacteristic-container">
                  <p className="characteristicCat">Fit:</p>
                  <p className="characteristicCurrentSelect">{showCurrentSelection('Fit')}</p>
                  <input className="reviewInput1" id="1" type="radio" name="fit" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, [characteristicsData.Fit.id]: 1 }))} />
                  <input className="reviewInput2" id="2" type="radio" name="fit" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, [characteristicsData.Fit.id]: 2 }))} />
                  <input className="reviewInput3" id="3" type="radio" name="fit" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, [characteristicsData.Fit.id]: 3 }))} />
                  <input className="reviewInput4" id="4" type="radio" name="fit" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, [characteristicsData.Fit.id]: 4 }))} />
                  <input className="reviewInput5" id="5" type="radio" name="fit" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, [characteristicsData.Fit.id]: 5 }))} />
                  <br />
                  <label className="reviewLabel1" htmlFor="1">Runs short</label>
                  <label className="reviewLabel2" htmlFor="2">Runs slightly short</label>
                  <label className="reviewLabel3" htmlFor="3">Perfect</label>
                  <label className="reviewLabel4" htmlFor="4">Runs slightly long</label>
                  <label className="reviewLabel5" htmlFor="5">Runs long</label>
                </div>
                <div style={{ backgroundColor: 'black', height: '4px' }} />
                <br />
              </>
              )}
            </>

            <p>Review Summary</p>
            <textarea
              name="summaryInput"
              value={summeryInput}
              placeholder="Example: Best purchase ever!"
              style={{ height: '31px', width: '346px', resize: 'none' }}
              maxLength="60"
              onChange={(event) => setSummeryInput(event.target.value)}
            />
            <div style={{ backgroundColor: 'black', height: '4px' }} />
            <br />

            <p>Review Body</p>
            <textarea
              name="bodyInput"
              value={reviewBody}
              placeholder="Why did you like the product or not?"
              style={{ height: '75px', width: '566px', resize: 'none' }}
              maxLength="1000"
              onChange={(event) => setReviewBody(event.target.value)}
            />
            <p>{checkBodyLength()}</p>
            <div style={{ backgroundColor: 'black', height: '4px' }} />
            <br />

            <p>Upload Photos:</p>
            <span style={{ display: 'block' }}>{photoArray.map((photo) => displayPhoto(photo)) }</span>
            {photoArray.length < 5 && (
              <>
                <input
                  id="images"
                  type="url"
                  value={photoUrl}
                  placeholder="Example: jackson11/exampleImage.com"
                  style={{ width: '250px' }}
                  onChange={(event) => setPhotoUrl(event.target.value)}
                />
                <button type="submit" htmlFor="images" onClick={(event) => handleFile(event)}>Upload</button>
              </>
            )}
            <div style={{ backgroundColor: 'black', height: '4px' }} />
            <br />

            <p>What is your nickName</p>
            <textarea
              name="nickNameInput"
              value={nickName}
              placeholder="Example: jackson11!"
              style={{ height: '31px', width: '346px', resize: 'none' }}
              maxLength="60"
              onChange={(event) => setNickName(event.target.value)}
            />
            <p>For privacy reasons, do not use your full name or email address.</p>
            <div style={{ backgroundColor: 'black', height: '4px' }} />
            <br />

            <p>What is your email</p>
            <input
              name="emailInput"
              type="email"
              value={email}
              style={{ width: '200px' }}
              placeholder="Example: jackson11@email.com"
              maxLength="60"
              onChange={(event) => setEmail(event.target.value)}
            />
            <p>For authentication reasons, you will not be emailed</p>
            <div style={{ backgroundColor: 'black', height: '4px' }} />
            <br />

            <button type="submit" style={{ display: 'block' }} onClick={(event) => handleSubmit(event)}>Submit!</button>
            {submitError && (
              <p style={{ backgroundColor: 'red' }}>
                <strong>
                  This error will occur if:
                  <br />
                  Any mandatory fields are blank
                  <br />
                  The review body is less than 50 characters
                  <br />
                  The email address provided is not in correct email format
                  <br />
                  The images selected are invalid or unable to be uploaded.
                  <br />
                  Or it is just broken 😢
                </strong>
              </p>
            )}
          </form>
        </div>
      </div>
    </ReactModal>
  );
}
