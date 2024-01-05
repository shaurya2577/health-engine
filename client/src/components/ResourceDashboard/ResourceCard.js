import React, { useState } from "react";
import "./ResourceCard.css";


function ResourceCard(props) {
  const title = props.title;
  const description = props.description;
  const tag = props.tag.charAt(0).toUpperCase() + props.tag.slice(1);

  const [showPopup, activatePopup] = useState(false);

  function handleClick(props) {
    activatePopup(true);
  }

  function closeClick(props){
    activatePopup(false);
  }

  return (
    <div>
      {showPopup && (
        <div className="absolute top-0 left-0 w-screen h-screen bg-gray-900 bg-opacity-50 z-49">
        <div className="absolute top-[14vh] left-[10vw] z-50 w-[80vw] h-[80vh] bg-gray-400 justify-center items-center">
        <h5 className="ml-10 mt-7 text-white font-semibold top-0 left-0 pt-[12px]"> {tag} </h5>
        <div className="px-6 pb-6 pt-1 ml-10 mt-10 ">
          <h1 className="text-white mb-2 text-7xl font-bold tracking-tight text-gray-900 dark:text-white"> {title} </h1>
          <h3 className="ml-1 text-3xl font-semibold text-gray-900"> {description} </h3>
          <button className="close" onClick={closeClick}>
            <span className="absolute top-0 right-0 m-4 cursor-pointer text-3xl" aria-hidden="true">&times;</span>
          </button>
        </div>
        </div>
        </div>
      )}
    <div
      className="bg-card-orange rounded-xl shadow-lg shadow-orange-200 min-h-[190px] hover:cursor-pointer" onClick={handleClick}>
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
