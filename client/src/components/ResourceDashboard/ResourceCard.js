import React, { useRef, useState } from "react";
import "./ResourceCard.css";

function ResourceCard(props) {
  const { title, description, tag, resourceLink } = props;

  const [showPopup, setShowPopup] = useState(false);
  const overlayState = useRef(null);
  const handleClick = () => {
    setShowPopup(true);
  };

  const closeClick = () => {
    setShowPopup(false);
  };


  const handleOverlayClick = (event) => {
    if (overlayState.current === event.target) {
      setShowPopup(false);
    }
  };


  return (
    <div>
      {showPopup && (
        <div className="overlay" ref={overlayState} onClick={handleOverlayClick}>
          <div className="popup">
          <button className="close" onClick={closeClick}>
            &times;
          </button>
          <p className="popup-tag">{tag}</p>
          <h1 className="popup-title">{title}</h1>
          <div className="section">
            <h2 className="section-title">Overview</h2>
            <p className="section-content">{description}</p>
          </div>
          
          <div className="section">
            <h2 className="section-title">Using the Resource</h2>
            <p className="section-content">Get access to the resource <a class='popup-url' href="https://drive.google.com/file/d/1lZjx7vD7VnprwYIIh9SflATuT6nJkcF8/view?usp=sharing">here.</a></p>
          </div>
        
          </div>
        </div>
      )}

    {/* {showPopup && (
      <div className="absolute top-0 left-0 w-screen h-screen bg-gray-900 bg-opacity-50 z-49">
      <div className="absolute top-[14vh] left-[10vw] z-50 w-[80vw] h-[80vh] bg-white justify-center items-center">
      <h5 className="popup-tag"> {tag} </h5>
      <div className="px-6 pb-6 pt-1 ml-10 mt-10 ">
        <h1 className="text-black mb-2 text-7xl font-extrabold tracking-tight text-gray-900 dark:text-black upperclass"> {title} </h1>
        <h3 className="ml-1 text-3xl font-semibold text-gray-900"> {description} </h3>
        <button className="close" onClick={closeClick}>
          <span className="absolute top-0 right-0 m-4 cursor-pointer text-3xl" aria-hidden="true">&times;</span>
        </button>
      </div>
      </div>
      </div>
    )} */}
      
      <div className="resource-card" onClick={handleClick}>
        <div className="tag">{tag}</div>
        <div className="content">
          <h5 className="title">{title}</h5>
          <p className="description">{description}</p>
          <a href="https://drive.google.com/file/d/1lZjx7vD7VnprwYIIh9SflATuT6nJkcF8/view?usp=sharing" className="button learn-more-btn">Learn More &gt;</a>
        </div>
      </div>
    </div>
  );
}

export default ResourceCard;
