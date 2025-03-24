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
      //1. fetches a list of image filenames from the server
      const response = await fetch(`http://localhost:8000/fetch/multiple`);
      const data = await response.json();
      console.log(data);
      //fetch - /fetch/file/filename variable
      //2. loops through each filename and fetches the corresponding file
      const filePromises = data.map(async(filename)=>{
        const fileResponse = await fetch(`http://localhost:8000/fetch/file/${filename}`);

      //3. converts each file into a blob and generates a temp URL
        const fileBlob = await fileResponse.blob();
        console.log(fileBlob);
        const imageUrl = URL.createObjectURL(fileBlob);
        return imageUrl;
    });

    //4. Waits for all images to be fetched
    const imageUrls = await Promise.all(filePromises);

    //5. updates the state to display the images
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
      //displayDogImages hold a URL of a random dog image fetched earlier
      //1. fetch the image from the displayogImages URL
      const fileResponse = await fetch(displayDogImages);
      //2. Convert the fetched image into a blob
      const blob = await fileResponse.blob();

      //convert blob to File before appending
      //3. create a file object from the blob
      const file = new File([blob], "dog-image.jpg", {type:"image/jpeg"});
      
      //4. attach the file to a FormData object
      const formData = new FormData();
      formData.append("file", file);
      // formData.append("file", blob, "dog-image.jpg");

      //5. SEND a post request to save the image on the backend
      const response = await fetch(`http://localhost:8000/save/single`, {
        method: "POST",
        body: formData
    });

    //6. log the server response or catch any errors
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
