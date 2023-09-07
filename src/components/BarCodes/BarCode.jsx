import Barcode from 'react-barcode';

import './BarCodes.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import client from '../../Client/client';

function BarCode() {
  const [name, setName] = useState('');
  const [dept, setDept] = useState('');
  const [ram, setRam] = useState('');
  const [pro, setPro] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // let barCode = '';

  const handleBarData = (e) => {
    e.preventDefault();
    setIsLoading(true);
    client.post('/', {
      cno: name,
      ram: ram,
      pro: pro,
      dept: dept
    }).then((result) => {
      setName('');
      setDept('');
      setRam('');
      setPro('');
      setIsLoading(false);
      navigate('/all-bar-codes');
    }).catch((err) => {
      // console.log(err);
      setName('');
      setDept('');
      setRam('');
      setPro('');
      setError(err.message);
      setIsLoading(false);
    });
  };

  return (
    <div className="App">
      {error.length > 0 && <span style={{ color: 'red' }}>{error}</span>}
      <form>
        <label>Computer Number:</label>
        <input type='text' name='cno' required defaultValue={name} onChange={(e) => {
          setName(e.target.value);
        }} />
        <label>Department:</label>
        <input type='text' name='dept' required defaultValue={dept} onChange={(e) => {
          setDept(e.target.value);
        }} />
        <label>RAM:</label>
        <input type='text' name='ram' required defaultValue={ram} onChange={(e) => {
          setRam(e.target.value);
        }} />
        <label>Processor:</label>
        <input type='text' name='pro' required defaultValue={pro} onChange={(e) => {
          setPro(e.target.value);
        }} />
        <button onClick={handleBarData}>{isLoading ? 'Loading' : 'Add Data'}</button>
      </form>
    </div>
  );
}

export default BarCode;
