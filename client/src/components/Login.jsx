import React, { useState, useContext, useEffect } from 'react';
import ReactModal from 'react-modal';
import { AppContext } from '../Context.js';

export default function Login() {
  const { setProductId } = useContext(AppContext);
  const [userData, setUserData] = useState({ userName: '', password: '' });
  const [loggedIn, setLoggedIn] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(true);
  // var clickTracker = [];
  const [clickTracker, setClickTracker] = useState([]);

  const logIn = (event) => {
    event.preventDefault();
    if (userData.userName.toLowerCase() === 'admin' && userData.password.toLowerCase() === 'admin') {
      console.log('Welcome Frodo Swaggins');
      setLoggedIn(true);
    }
  };

  function closeModal() {
    setModalIsOpen(false);
  }

  const findParentOfElement = (event) => {
    let cName = event.className;
    let pNode = event.parentNode;
    const classes = ['mainDiv', 'relatedMain', 'questionsMain', 'ratingsAndReviews-container'];
    while (!classes.includes(cName)) {
      if (pNode.parentNode === undefined || pNode.parentNode === null) {
        return 'body';
      }
      cName = pNode.className;
      pNode = pNode.parentNode;
    }

    return cName;
  };

  const handleOnChange = (event) => {
    event.persist();
    setUserData((prevUserData) => ({ ...prevUserData, [event.target.name]: event.target.value }));
  };

  const secretClickMenu = () => {
    if (loggedIn) {
      console.log('should run');
      console.log(clickTracker);
      setProductId(44397);
      return (
        <ReactModal isOpen={modalIsOpen} contentLabel="login Modal">
          <div className="modal-container">
            <h2><strong>Welcome to the shire, Love Chase.</strong></h2>
            <span style={{ fontSize: '10px' }}>(I watched all the movies)</span>
            <img src="https://i.ibb.co/F042VLF/STRAIGHT-OUTTA-THE-SHIRE-3.jpg" alt="swaggins" style={{ display: 'block' }} />
            <span>
              {clickTracker.map((entry) => (
                <span style={{ display: 'block' }}>{JSON.stringify(entry).replaceAll('"', ' ')}</span>
              ))}
            </span>
            <button type="button" className="closeButton" onClick={() => closeModal(false)}>close</button>
          </div>
        </ReactModal>
      );
    }
    return null;
  };
  const listenerFunction = (event) => {
    // console.log(event);
    setClickTracker((prevClicks) => ([...prevClicks, { date: new Date(), element: `${event.target.tagName}: ${event.target.className}`, module: findParentOfElement(event.target) }]));
  };
  // document.getElementById('app').addEventListener('click', (event) => (clickTracker.push({ date: new Date(), element: event.target, module: findParentOfElement(event.target) })));
  useEffect(() => {
    window.addEventListener('click', listenerFunction);
    return () => (window.removeEventListener('click', listenerFunction));
  }, [findParentOfElement]);
  return (
    <>
      {secretClickMenu()}
      <div className="Login">
        <form>
          <input style={{ margin: '5px' }} value={userData.userName} name="userName" onChange={handleOnChange} type="text" placeholder="Username..." />
          <input style={{ margin: '5px' }} value={userData.password} name="password" onChange={handleOnChange} type="password" placeholder="Password..." />
          <button type="submit" onClick={logIn}>Submit</button>
        </form>
      </div>
    </>
  );
}
