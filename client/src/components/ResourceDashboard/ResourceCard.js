import React, { useState } from "react";
import "./ResourceCard.css";

function ResourceCard(props) {
  const title = props.title;
  const description = props.description;
  const tag = props.tag.charAt(0).toUpperCase() + props.tag.slice(1);
  const link = props.link;

  const [showPopup, activatePopup] = useState(false);

  function handleClick(props) {
    activatePopup(true);
  }

  function closeClick(props) {
    activatePopup(false);
  }

  return (
    <div>
      {showPopup && (
        <div
          className="absolute top-0 left-0 w-screen h-screen bg-gray-900 bg-opacity-50 z-49"
          onClick={closeClick} // This will trigger when the overlay is clicked
        >
          <div
            className="absolute top-[20vh] left-[20vw] z-50 w-[60vw] h-[60vh] bg-site-bg justify-center items-center rounded-sm shadow-"
            onClick={(e) => e.stopPropagation()} // This prevents click from bubbling up to the overlay
          >
            <div className="mx-24 mb-16 mt-24">
              <div className="flex align-middle content-center justify-items-center">
                <div className="font-bold text-2xl">{title}</div>
                <div className="font-semibold text-white bg-card-orange w-28 text-center rounded-full pt-[6px] ml-6 text-sm">
                  {tag}
                </div>
              </div>
              <h3 className="mt-4">{description}</h3>
              <h3 className="mt-4 underline italic absolute bottom-28 hover:cursor-pointer">
                <a href={link} target="_blank" rel="noopener noreferrer">
                  <div>Resource Link</div>
                </a>
              </h3>
              <button className="close" onClick={closeClick}>
                <span
                  className="absolute top-0 right-0 m-4 cursor-pointer text-3xl"
                  aria-hidden="true"
                >
                  &times;
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className="card bg-card-orange rounded-xl shadow-lg shadow-orange-200 min-h-[190px] hover:cursor-pointer"
        onClick={handleClick}
      >
        <div className="text-white font-semibold text-right px-4 pt-[12px]">
          {tag}
        </div>
        <div className="px-6 pb-6 pt-1">
          <div>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h5>
          </div>
          <p className="mb-3 font-normal text-white description-clamp text-sm">
            {description}
          </p>
          <button className="inline-flex items-center py-2 text-sm font-medium text-center text-white ">
            Learn More {">"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResourceCard;
