const [ fileUrl, setFileUrl ] = useState('');
  const [ files, setFiles ] = useState(null);

  const handleImportFile = (event) => {
    setFiles(event.target.files[0]);
  }

  const handlePostImport = async () => {
    let file = files;
    let bucketName = 'files'
    let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`);
    // let fileRef = storageRef.child(file.name);
    await storageRef.put(file);
    setFileUrl(await storageRef.getDownloadURL());
  }





<div className="diag-btn">
              <div className="custom-file w-25">
                <input type="file" className="custom-file-input" id="customFile" onChange={handleImportFile}/>
                <label class="custom-file-label" for="customFile">
                  Choose file
                </label>
              </div>
              <button className="btn btn-success ml-3" onClick={handlePostImport}>Upload</button>
            </div>