import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Barcode from 'react-barcode';
import { useNavigate } from 'react-router-dom';

import client from '../../Client/client';

const AllBarCodes = () => {
    const [data, setData] = useState([]);
    const [msg, setMsg] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        client.get('/').then((response) => {
            console.log(response);
            return response.data.result;
        }).then((result) => {
            setData(result);
        })
    }, []);

    const downloadBarCode = (id) => {
        // console.log(id);
        const aTag = document.createElement('a');

        const svg = document.querySelector(`#svg-${id}`).getElementsByTagName('svg')[0];
        // console.log(svg);
        const svgData = new XMLSerializer().serializeToString(svg);
        const dataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgData)}`;
        // console.log(dataUri);

        aTag.href = dataUri;
        aTag.download = `${id}.svg`;

        aTag.click();
    }

    const deleteData = (id) => {
        client.delete(`/${id}`).then((response) => {
            return response.data.result;
        }).then((result) => {
            setMsg(result);
            navigate('/all-bar-codes');
        }).catch((err) => {
            setError(err.message);
        })
    }

    let barcodeData;
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Computer Number</th>
                        <th scope="col">Department</th>
                        <th scope="col">RAM</th>
                        <th scope="col">Processor</th>
                        <th scope="col">BarCode</th>
                        <th scope="col">Download BarCode</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((obj, idx) => {
                            barcodeData = `CNo:${obj.cno} Dept:${obj.dept}`
                            return <tr key={idx}>
                                <th scope="row">{obj.id}</th>
                                <td>{obj.cno}</td>
                                <td>{obj.dept}</td>
                                <td>{obj.ram}</td>
                                <td>{obj.pro}</td>
                                <td style={{
                                    overflowX: 'scroll',
                                    maxWidth: '20%',
                                }} id={`svg-${obj.id}`}><Barcode value={barcodeData} displayValue={false} format='CODE128' height={30} /></td>
                                <td><button onClick={downloadBarCode.bind(this, obj.id)}>Download</button></td>
                                <td><button onClick={deleteData.bind(this, obj.id)}>Delete</button></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AllBarCodes