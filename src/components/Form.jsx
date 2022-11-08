import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { addDocument } from '../services/firebase';
import { COLL_NAME } from '../utils/constants';

export default function Form() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const submitHandler = async(e) => {
    e.preventDefault();
    const res = await addDocument({ coll: COLL_NAME, dataObj: {name, email} })
    if(res.status) {
      toast.success(res.messsage);
    } else {
      toast.error(res.messsage);
    }
  }

  return (
    <section className='p-10 bg-gray-200 flex justify-evenly items-center' >
      <h1 className='text-5xl w-96 text-purple-600 font-bold uppercase'>Just a simple form</h1>
      <form className='w-full lg:px-80' onSubmit={submitHandler}>
        <div className='my-7 ' >
          <label htmlFor='name' className='text-purple-600 text-2xl '>Name</label>
          <input className='w-full inline-block p-3 rounded-lg ' id='name' placeholder='Name' value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className='my-7 ' >
          <label htmlFor='email' className='text-purple-600 text-2xl '>Email</label>
          <input className='w-full inline-block p-3 rounded-lg ' id='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <button className='bg-purple-600 w-full text-white px-10 py-5 text-2xl' >Submit</button>
        </div>
      </form>
    </section>
  )
}
