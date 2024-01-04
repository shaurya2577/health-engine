import React from "react";
import "./ResourceCard.css";

function ResourceCard(props) {
  const title = props.title;
  const description = props.description;
  const tag = props.tag.charAt(0).toUpperCase() + props.tag.slice(1);

  function handleClick() {
    console.log(
      "this action should open up a model that displays the full text and also has a link to the resource"
    );
  }

  return (
    <div
      className="bg-card-orange rounded-xl shadow-lg shadow-orange-200 min-h-[190px] hover:cursor-pointer"
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
  );
}

export default ResourceCard;
