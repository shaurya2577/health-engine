import React, { useRef, useState } from "react";
import "./ResourceCard.css";

function ResourceCard(props) {
  const { title, description, tag, link } = props;

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
            <p className="section-content">Get access to the resource <a className='popup-url' href={link}>here.</a></p>
          </div>
        
          </div>
        </div>
      )}
      
      <div className="resource-card" onClick={handleClick}>
        <div className="tag">{tag}</div>
        <div className="content">
          <h5 className="title">{title}</h5>
          <p className="description">{description}</p>
          <button className="button learn-more-btn">Learn More &gt;</button>
        </div>
      </div>
    </div>
  );
}

export default ResourceCard;