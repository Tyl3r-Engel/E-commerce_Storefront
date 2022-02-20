/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import ReactModal from 'react-modal';
import StarRating from 'react-ratings-declarative';
import ImageModal from './ImageModal.jsx';

export default function WriteReviewModal(input) {
  const { characteristicsData, newReviewModalOpen, setNewReviewModalOpen } = input;
  const [submitReady, setSubmitReady] = useState(false);
  const [starRating, setStartRating] = useState(0);
  const [recommend, setRecommend] = useState(false);
  const [newReviewCharacteristics, setNewReviewCharacteristics] = useState({});
  // replace(/\n/g, '')
  const [summeryInput, setSummeryInput] = useState('');
  const [reviewBody, setReviewBody] = useState('');
  const [nickName, setNickName] = useState('');

  const [photoArray, setPhotoArray] = useState([]);
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

  const handleSubmit = () => {

  };

  const handleFile = (file) => {
    setPhotoArray((prev) => (
      [...prev, { id: photoArray.length + 1, url: URL.createObjectURL(file) }]
    ));
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
                  <input className="reviewInput1" id="1" type="radio" name="size" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, Size: { id: characteristicsData.Size.id, value: 1 } }))} />
                  <input className="reviewInput2" id="2" type="radio" name="size" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, Size: { id: characteristicsData.Size.id, value: 2 } }))} />
                  <input className="reviewInput3" id="3" type="radio" name="size" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, Size: { id: characteristicsData.Size.id, value: 3 } }))} />
                  <input className="reviewInput4" id="4" type="radio" name="size" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, Size: { id: characteristicsData.Size.id, value: 4 } }))} />
                  <input className="reviewInput5" id="5" type="radio" name="size" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, Size: { id: characteristicsData.Size.id, value: 5 } }))} />
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
                  <input className="reviewInput1" id="1" type="radio" name="width" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, Width: { id: characteristicsData.Width.id, value: 1 } }))} />
                  <input className="reviewInput2" id="2" type="radio" name="width" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, Width: { id: characteristicsData.Width.id, value: 2 } }))} />
                  <input className="reviewInput3" id="3" type="radio" name="width" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, Width: { id: characteristicsData.Width.id, value: 3 } }))} />
                  <input className="reviewInput4" id="4" type="radio" name="width" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, Width: { id: characteristicsData.Width.id, value: 4 } }))} />
                  <input className="reviewInput5" id="5" type="radio" name="width" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, Width: { id: characteristicsData.Width.id, value: 5 } }))} />
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
                  <input className="reviewInput1" id="1" type="radio" name="comfort" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, Comfort: { id: characteristicsData.Comfort.id, value: 1 } }))} />
                  <input className="reviewInput2" id="2" type="radio" name="comfort" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, Comfort: { id: characteristicsData.Comfort.id, value: 2 } }))} />
                  <input className="reviewInput3" id="3" type="radio" name="comfort" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, Comfort: { id: characteristicsData.Comfort.id, value: 3 } }))} />
                  <input className="reviewInput4" id="4" type="radio" name="comfort" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, Comfort: { id: characteristicsData.Comfort.id, value: 4 } }))} />
                  <input className="reviewInput5" id="5" type="radio" name="comfort" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, Comfort: { id: characteristicsData.Comfort.id, value: 5 } }))} />
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
                  <input className="reviewInput1" id="1" type="radio" name="quality" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, Quality: { id: characteristicsData.Quality.id, value: 1 } }))} />
                  <input className="reviewInput2" id="2" type="radio" name="quality" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, Quality: { id: characteristicsData.Quality.id, value: 2 } }))} />
                  <input className="reviewInput3" id="3" type="radio" name="quality" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, Quality: { id: characteristicsData.Quality.id, value: 3 } }))} />
                  <input className="reviewInput4" id="4" type="radio" name="quality" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, Quality: { id: characteristicsData.Quality.id, value: 4 } }))} />
                  <input className="reviewInput5" id="5" type="radio" name="quality" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, Quality: { id: characteristicsData.Comfort.id, value: 5 } }))} />
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
                  <input className="reviewInput1" id="1" type="radio" name="length" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, Length: { id: characteristicsData.Length.id, value: 1 } }))} />
                  <input className="reviewInput2" id="2" type="radio" name="length" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, Length: { id: characteristicsData.Length.id, value: 2 } }))} />
                  <input className="reviewInput3" id="3" type="radio" name="length" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, Length: { id: characteristicsData.Length.id, value: 3 } }))} />
                  <input className="reviewInput4" id="4" type="radio" name="length" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, Length: { id: characteristicsData.Length.id, value: 4 } }))} />
                  <input className="reviewInput5" id="5" type="radio" name="length" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, Length: { id: characteristicsData.Length.id, value: 5 } }))} />
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
                  <input className="reviewInput1" id="1" type="radio" name="fit" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, Fit: { id: characteristicsData.Fit.id, value: 1 } }))} />
                  <input className="reviewInput2" id="2" type="radio" name="fit" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, Fit: { id: characteristicsData.Fit.id, value: 2 } }))} />
                  <input className="reviewInput3" id="3" type="radio" name="fit" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, Fit: { id: characteristicsData.Fit.id, value: 3 } }))} />
                  <input className="reviewInput4" id="4" type="radio" name="fit" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, Fit: { id: characteristicsData.Fit.id, value: 4 } }))} />
                  <input className="reviewInput5" id="5" type="radio" name="fit" onChange={() => setNewReviewCharacteristics((prev) => ({ ...prev, Fit: { id: characteristicsData.Fit.id, value: 5 } }))} />
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
            <span>{photoArray.map((photo) => <ImageModal key={photo.id} photo={photo} />) }</span>
            {photoArray.length < 5 && (
              <input name="images" type="file" accept="img/*" multiple onChange={(event) => handleFile(event.target.files[0])} />
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
              placeholder="Example: jackson11@email.com"
              maxLength="60"
              onChange={(event) => setEmail(event.target.value)}
            />
            <p>For authentication reasons, you will not be emailed</p>
            <div style={{ backgroundColor: 'black', height: '4px' }} />
            <br />

            <button type="submit" onClick={() => handleSubmit()}>Submit!</button>
          </form>
        </div>
      </div>
    </ReactModal>
  );
}
