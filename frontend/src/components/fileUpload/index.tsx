// @ts-nocheck
import { useState } from 'react';
import CardInterface from '../../interfaces/cardInterface';
import CardsList from '../cardsList';
import './style.css';

function FileUploadComponent() {
  const [csvData, setCsvData] = useState<CardInterface[]>([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target) {
          const content = event.target.result;

          const lines = content?.split('\n');

          const headers = lines[0].split(',');

          const data = [];

          for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            const obj = {};
            for (let j = 0; j < headers.length; j++) {
              obj[headers[j]] = values[j];
            }
            data.push(obj);
          }

          fetch('http://localhost:3000/files', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
            .then((response) => {
              if (response.ok) {
                return response.json();
              }
              throw new Error('Network error');
            })
            .then((insertedData) => {
              console.log('inserted data:', insertedData);
            })
            .catch((error) => {
              console.error('Error:', error);
            });

          setCsvData(data);
        }
      };
      reader.readAsText(selectedFile);
    } else {
      console.log('No file selected.');
    }
  };

  const handleSearch = (data: string) => {
    fetch(`http://localhost:3000/users?q=${data}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network error');
        }
        return response.json();
      })
      .then((responseData) => {
        setCsvData(responseData);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div className='FileUploadContainer'>
      <div className='fileContainer'>
        <div className='InputContainer'>
          <input type="file" accept=".csv" onChange={handleFileSelect} />
        </div>
        <div className='InputContainer'>
          <button onClick={handleUpload}>Upload</button>
        </div>
        <div className='InputContainer'>
          <input placeholder='search' onChange={(e) => handleSearch(e.target.value)} />
        </div>
      </div>
      <div>
        {csvData.length > 0 && (
          <div>
            <CardsList csvData={csvData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default FileUploadComponent;
