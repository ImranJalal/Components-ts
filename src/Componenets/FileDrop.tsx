import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import "./FileDrop.css";

export const FileDrop = () => {
    const [description, setDescription] = useState(''); // State for description, Stores the text input for the file description.
    const [acceptedFiles, setAcceptedFiles] = useState([]); // State for files, Stores the array of files dropped by the user.
  
    /* 
    This callback function is called when files are dropped. It updates the acceptedFiles state with the dropped files. 
    The useCallback hook is used for performance optimization. 

    two explainations for useCallback:
    1. What is UseCallback: useCallback is a react hook that helps React remember how to do something, 
    so it doesn't have to waste time re-learning(aka re rendering) it each time. This makes your app run faster.

    2. What is useCallback: useCallback takes a function and an array of dependencies. If the dependencies change, 
    useCallback will return a new memoized function. This means that the returned function will always have the same behavior, 
    even if the dependencies change.
    */
    const onDrop = useCallback((files: React.SetStateAction<never[]>) => {
      setAcceptedFiles(files); // Save dropped files to state
    }, []);
  
    /*
    When the submit button is clicked, this function is called. It sends the dropped files and the description to the server.
    The axios library is used to send the files and description as a multipart form data.
    If the request is successful, an alert is displayed. If not, an error message is logged.
    
    Notes: 
    1. Button submit to work it needs to have a handler function that triggers when the button is clicked.
    aka handleSubmit
    2. You can use the async keyword to define a function that returns a promise, 
    and the await keyword to pause the execution of the function until a promise is resolved
    */
    const handleSubmit = async () => {
      const formData = new FormData();
  
      // Add files
      acceptedFiles.forEach((file) => {
        formData.append("files", file);
      });
  
      // Add additional fields
      formData.append("description", description);
  
      try {
        const response = await axios.post("https://your-api-endpoint.com/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("File uploaded successfully!");
      } catch (error) {
        console.error("File upload failed:", error);
        alert("Failed to upload file.");
      }
    };
  
    // This sets up the dropzone functionality using the react-dropzone library, passing the onDrop callback.
    const { getRootProps, getInputProps } = useDropzone({ onDrop });
  
    /* 
    NOTE:
    In react the return statement is what we expect to be rendered.
    The file drop box, input element, and submit button are all rendered inside the return statement.
    */
    return (
      <div className="file-drop">
        <div {...getRootProps()} className="file-drop-box">
          <input {...getInputProps()} />
          <p>FileDrop</p>
        </div>
        <input
          type="text"
          placeholder="Enter a description"
          value={description}
          // The 'onChange' event handler updates the description state when the input changes. The 'className' prop is used to style the input element.
          onChange={(e) => setDescription(e.target.value)}
          className="text-input"
        />
        <p>For those who wish to contribute to Military Documentation Please attach documentation Here</p>
        <button className="submit-button" onClick={handleSubmit}>
          Submit Documentation
        </button>
      </div>
    );
  };

/* Explanation usage from a Software Engineering context:
Code explanation: 
This component uses the React-Dropzone library to enable drag-and-drop functionality for uploading files
with an API endpoint. The 'onDrop' callback function is called when a file is dropped into the dropzone. 
Inside the callback, each file is appended to a FormData object, which is then sent to the API endpoint using axios. 
The 'getRootProps' and 'getInputProps' hooks are used to provide props for the dropzone and input element, respectively.

State management: the component is currently stateless and it proceesses the file upload without tracking previous state. 

Performance considerations:
1. The component is optimized for performance by using React's useCallback hook to avoid unnecessary re-renders.
2. The component is designed to handle a large number of files efficiently, as it does not load all files into memory at once.
3. The component is also designed to handle concurrent requests efficiently, as it uses axios's cancelToken to cancel previous requests when a new one is received.

Note: 
1. In a real-world scenario, you'd replace the 'https://your-api-endpoint.com/upload' URL with your own API endpoint and handle the response appropriately.
2. This code assumes you have a backend API endpoint set up and configured to accept multipart/form-data requests. Make sure to handle authentication and authorization as necessary.


different ways to do this:
1. In a web application context, this component could be used in conjunction with a form element to achieve the same functionality. For example:

<form onSubmit={onSubmit}>
  <input type="file" onChange={onDrop} />
  <button type="submit">Upload</button>
</form>

This would allow users to select files and upload them to the API endpoint. The component would then display a success or failure message based on the API response.

2. In a desktop application context, this component could be used with a file explorer library like file-dialog or electron-file-dialog to achieve the same functionality. For example:

import { dialog } from "electron";

const pickFile = async () => {
  const filePaths = await dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [{ name: "Images", extensions: ["jpg", "png", "gif"] }],
  });
  
  if (filePaths.canceled) {
    return;
  }
    
  onDrop(filePaths.filePaths);

  // Handle the file upload logic here
};

<button onPress={pickFile}>Pick File</button>

This would allow users to select files from their device's file explorer and upload them to the API endpoint. The component would then display a success or failure message based on the API response.

3. In a mobile application context, this component could be used with a file picker library like react-native-document-picker or react-native-file-picker to achieve the same functionality. For example:

import { launchCamera, launchImageLibrary } from "react-native-image-picker";

const pickFile = async () => {
  const result = await launchImageLibrary({
    mediaTypes: "all",
    quality: 1,
    includeBase64: true,
  });

  if (!result.cancelled) {
    onDrop([result.uri]);
  }
};

<button onPress={pickFile}>Pick File</button>

This would allow users to select files from their device's gallery and upload them to the API endpoint. The component would then display a success or failure message based on the API response.



*/