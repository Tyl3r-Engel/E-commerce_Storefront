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
      setLoggedIn(true);
    }
  };

  function closeModal() {
    setModalIsOpen(false);
  }

  const findParentOfElement = (event) => {
    let cName = event?.className;
    let pNode = event?.parentNode;
    const classes = ['mainDiv', 'relatedMain', 'questionsMain', 'ratingsAndReviews-container'];
    if (cName === null || pNode === null) {
      return 'body';
    }
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
      setProductId(44397);
      return (
        <ReactModal isOpen={modalIsOpen} contentLabel="login Modal">
          <div className="modal-container" style={{ margin: 'auto' }}>
            <h2 style={{ textAlign: 'center' }}><strong>Welcome to the shire, Love Chase.</strong></h2>
            <p style={{
              textAlign: 'center', margin: 'auto', fontSize: '10px', display: 'block',
            }}
            >
              (I watched all the movies)
            </p>
            <img src="https://i.ibb.co/q9Z9R6F/Screen-Shot-2022-02-23-at-12-43-03-PM.png" alt="swagginscrew" height="600px" width="auto" style={{ margin: 'auto', display: 'block' }} />
            <span>
              {clickTracker.map((entry) => (
                <span style={{ textAlign: 'center', display: 'block' }}>{JSON.stringify(entry).replaceAll('"', ' ')}</span>
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
    setClickTracker((prevClicks) => ([...prevClicks, { date: new Date(), element: `${event.target.tagName}: ${event.target.className}`, module: findParentOfElement(event.target) }]));
  };
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
