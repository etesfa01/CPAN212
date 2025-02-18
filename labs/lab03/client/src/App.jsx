import { useState } from "react";
import "./App.css"

const App = () => {
  // what do we need to track
  const [singleFile, setSingleFile] = useState(null);
  // const [multipleFiles, setMultipleFiles] = useState([]);
  const [displayImage, setDisplayImage] = useState(null);
  const [displayImages, setDisplayImages] = useState([]);
  const [displayDogImages, setDisplayDogImages] = useState("");
  const [message, setMessage] = useState("");

  // Handlers
  const handleSingleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSingleFile(e.target.files[0]);
    }
  };

  // fetch functions -> fetch a random single image
  const fetchSingleFile = async () => {
    try {
      const response = await fetch(`http://localhost:8000/fetch/single`);

      const blob = await response.blob(); // we made a blob - Binary Large Object
      // but thats not an image, so we need to make an image element

      // using createObjectURL
      const imageUrl = URL.createObjectURL(blob);
      setDisplayImage(imageUrl);
    } catch (error) {
      console.error("Error fetching single file:", error);
    }
  };

  // fetch functions -> save single
  const handleSubmitSingleFile = async (e) => {
    e.preventDefault();
    if (!singleFile) {
      setMessage("Please select a file before uploading.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", singleFile);
      
      const response = await fetch(`http://localhost:8000/save/single`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Image upload failed");
      }
      setMessage("File uploaded successfully!");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // fetch functions -> fetch multiple [TODO]
  const fetchMultipleFiles = async() => {
    try {
      const response = await fetch(`http://localhost:8000/fetch/multiple`);
      const data = await response.json();
      console.log(data);
      //fetch - /fetch/file/filename variable
      const filePromises = data.map(async(filename)=>{
        const fileResponse = await fetch(`http://localhost:8000/fetch/file/${filename}`);

        const fileBlob = await fileResponse.blob();
        console.log(fileBlob);
        const imageUrl = URL.createObjectURL(fileBlob);
        return imageUrl;
    });

    const imageUrls = await Promise.all(filePromises);
    setDisplayImages(imageUrls)

    }catch (error) {
      console.log(error)
    }
  };

  // fetch functions -> fetch dog image [TODO]
  const fetchDogImage = async() => {
    try {
      const response = await fetch(`https://dog.ceo/api/breeds/image/random`)
      const data = await response.json();
      console.log(data);
      setDisplayDogImages(data.message);

    }catch (error){
      console.log(error)
    }
  }

  // fetch functions -> save dog image [TODO]
  const saveDogImage = async () => {
    try {
      const fileResponse = await fetch(displayDogImages);
      const blob = await fileResponse.blob();

      //convert blob to File before appending
      const file = new File([blob], "dog-image.jpg", {type:"image/jpeg"});
      
      const formData = new FormData();
      formData.append("file", file);
      // formData.append("file", blob, "dog-image.jpg");

      const response = await fetch(`http://localhost:8000/save/single`, {
        method: "POST",
        body: formData
    });

    const data = await response.json();
    console.log(data);

    } catch (error) {
      console.log(error);
    }
    
  };

  return (
    <div>
      <p>{message}</p>
      <h2>Fetch Single Random Image</h2>
      <button onClick={fetchSingleFile}>Fetch Single File</button>
      {displayImage && (
        <div>
          <h3>Single File</h3>
          <img
            src={displayImage}
            alt="Display Image"
            style={{ width: "200px", marginTop: "10px" }}
          />
        </div>
      )}
      <form onSubmit={handleSubmitSingleFile}>
        <h2>Upload Single File</h2>
        <label htmlFor="file-upload">Select File</label> <br/>
        <input id="file-upload" type="file" onChange={handleSingleFileChange} />
        <button type="submit">Upload Single File</button>
      </form>
      <h2>Fetch Multiple Files</h2>
      <button onClick={fetchMultipleFiles}>Fetch Multiple Files</button>
      {displayImages.length > 0 ? (
        displayImages.map((imageUrl, index) => (
          <div key={index}>
            <img 
            src={imageUrl}
            style={{width: "200px"}}
            />
            </div>
        ))
      ):(<p>No images to display</p>)}
      
      <h2>Fetch and Save Random Dog Images</h2>
      <button onClick={fetchDogImage}>Fetch Dog Image</button>
      {displayDogImages && (
        <div>
          <img
          src={displayDogImages}
          style={ {width: "200px"} }
          />
          <button onClick={saveDogImage}>Save Dog Image</button>
          </div>
      )}

    </div>
  );
};

export default App;
