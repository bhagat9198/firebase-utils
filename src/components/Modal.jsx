import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { deleteDocument, editDocument } from '../services/firebase';
import { COLL_NAME } from '../utils/constants';

export default function Modal({ setModalDetails, modalDetails }) {
  console.log('Modal :: modalDetails :: ', modalDetails);
  const [name, setName] = useState(modalDetails.name);
  const [email, setEmail] = useState(modalDetails.email);
  const [lastUpdated, setLastUpdated] = useState((new Date(+modalDetails.lastUpdated.seconds * 1000)).toString());
  const [id, setId ] = useState(modalDetails.id);

  const submitHandler = async(e) => {
    e.preventDefault();
    const res = await editDocument({coll: COLL_NAME, id, dataObj: {name, email}})
    if (res.status) {
      toast.success(res.messsage);
      setModalDetails({
        status: false,
        name: '',
        email: '',
        id: '',
        lastUpdated: ''
      })
    } else {
      toast.error(res.messsage);
    }
  }
 
  const cancelHandler = async(e) => {
    e.preventDefault(); 
      setModalDetails({
        status: false,
        name: '',
        email: '',
        id: '',
        lastUpdated: ''
      })
  }

  return (
    <div className='absolute top-0 left-0 w-screen h-screen bg-slate-700  flex justify-center items-center' >
      <div className='w-96 opacity-100 bg-slate-200 flex justify-evenly items-center flex-col p-10' >
        <h1 className='text-xl text-purple-600 font-bold uppercase'>
          Update the details
        </h1>
        <form onSubmit={submitHandler}>
          <div className='my-7 ' >
            <label htmlFor='name' className='text-purple-600 text-2xl '>_id</label>
            <input readOnly className=' w-full inline-block p-3 rounded-lg ' id='name' placeholder='Name' value={id} />
          </div>
          <div className='my-7 ' >
            <label htmlFor='name' className='text-purple-600 text-2xl '>_id</label>
            <input readOnly className=' w-full inline-block p-3 rounded-lg ' id='name' placeholder='Name' value={lastUpdated} />
          </div>
          <div className='my-7 ' >
            <label htmlFor='name' className='text-purple-600 text-2xl '>Name</label>
            <input className='w-full inline-block p-3 rounded-lg ' id='name' placeholder='Name' value={name} onChange={e => setName(e.target.value)}  />
          </div>
          <div className='my-7 ' >
            <label htmlFor='email' className='text-purple-600 text-2xl '>Email</label>
            <input className='w-full inline-block p-3 rounded-lg ' id='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}  />
          </div>
          <div className='flex justify-around' >
            <button className='bg-purple-600 mx-2  text-white px-10 py-5 text-2xl' >Update</button>
            <button className='bg-purple-600 mx-2  text-white px-10 py-5 text-2xl' onClick={cancelHandler } >Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}
