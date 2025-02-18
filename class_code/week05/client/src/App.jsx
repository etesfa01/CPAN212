//Front-end
import { useState, useEffect } from "react";

const App = () => {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);

  const fetchData = async() => {
  try {
    const response = await fetch(`http://localhost:8000/data`)
    const data = await response.json()
    setMessage(JSON.stringify(data));

  } catch (error) {
    console.log(error)
  };
};

const logInForm = async(e) => {
  e.preventDefault();
  const submission = {email, password};

  try {
    const response = await fetch(`http://localhost:8000/data`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(submission) //[Object object] error without the stringify
    });
    const data = await response.json();
    setMessage(JSON.stringify(data))
    
  } catch (error) {
    console.log(error)
  }
}

//Webform for file upload
const fileUpload = async(e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`http://localhost:8000/upload`, {
      method: "POST",
      body: "MY DATA HERE"
    })
    const data = await response.json();
    setMessage(JSON.stringify(data))
  } catch (error) {
    console.log(error);
  }
}
return (
  <div>
    <p>{message}</p>

    <button onClick={fetchData}>Click me for Data</button>
    <form onSubmit={logInForm}>
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Login</button>
    </form>

    <form onSubmit={fileUpload}>
      <input
        type="file"
        value={file}
        multiple //to add more files
        onChange={(e) => {setFile(e.target.value)}}

      />
      <button type="submit">Submit</button>
    </form>

  </div>)
};

export default App;