import React, { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
    const [title, setTitle] = useState([]);
    const [data, setData] = useState([])
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3000/get')
        .then(res => setData(res.data))
        .catch(err => console.log(err))
    }, [])

    const fetch = async () => {
            await axios.post('http://localhost:3000/products', {title: title})
            .then(res => location.reload())
            .catch(err => console.log(err))
    }

    const handaleDelete = (id) => {
        axios.delete('http://localhost:3000/delete/'+id)
        .then(res => location.reload())
        .catch(err => console.log(err))
    }

    return (
        <div className='appAria'>
            <h1> Todo list </h1>
            <div className='inputAria'>
                <input type="text" onChange={(e) => setTitle(e.target.value)}/>
                <button onClick={fetch} className='btn' >Add</button>
                <p className='err'> {message} </p>
            </div>
            <div className='outputAria'>
                {
                    data.length === 0
                    ?
                    <dir> <h2>no resoult</h2> </dir>
                    :
                    data.map(singale => (
                        <div className='singaleOut'> 
                            <h2> {singale.title} </h2>
                            <button onClick={() => handaleDelete(singale._id)}> delete </button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default App
