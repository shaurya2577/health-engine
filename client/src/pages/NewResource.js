import React, { useState } from "react";
import { server_url } from "../constants";

function NewResource() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tag, setTag] = useState('partnership');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const body = {'description': description, 'title': title, 'tag': tag};

        const response = await fetch("http://localhost:3002/newresource", {
            method: "POST", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        });

        console.log(JSON.stringify(body));

        if (response.ok) {
            const data = await response.json();
            console.log("New resource added:", data);
        } else {
            console.error("Failed to add new resource");
        }
    };

    return (
      <div>
      <div className="text-2xl ml-10 mt-10 flex flex-col h-screen">
        Create a new resource.
        <br></br><br></br>
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label> <input className="form-control" label="title" type="text" value={title} onChange={(event) => setTitle(event.target.value)}></input><br></br>
            <label htmlFor="descr">Description:</label><input className="form-control" label="descr" type="text" value={description} onChange={(event) => setDescription(event.target.value)}></input><br></br>
            <label htmlFor="resource_class" value={tag}>Type:</label>
            <select id="resource_class" className="form-control" value={tag} onChange={(event) => setTag(event.target.value)}>
                <option value="partnership">Partnership</option>
                <option value="dataset">Dataset</option>
                <option value="guide">Guide</option>
            </select><br></br><br></br>
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Submit</button>
        </form>
      </div>
      </div>
  
    );
  }
  
  export default NewResource;