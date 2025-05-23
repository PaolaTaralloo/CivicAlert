import { useEffect, useState } from 'react';
import axios from 'axios';


const TestPage = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/api/test')
      .then(res => {
        setMessage(res.data.message);
      })
      .catch(err => {
        console.error(err);
        setMessage('Errore nella connessione');
      });
  }, []);

  return (
    <div>
      <h2>Test API</h2>
      <p>{message}</p>
    </div>
  );
};

export default TestPage;