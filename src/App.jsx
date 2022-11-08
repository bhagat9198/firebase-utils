import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Form from './components/Form'
import Modal from './components/Modal'
import Table from './components/Table'


function App() {
  const [modalDetails, setModalDetails] = useState({
    status: false,
    name: '',
    email: '',
    lastUpdate: '',
    coll: ''
  })

  return (
    <>
      <ToastContainer />
      <h1 className="text-xl px-10 py-5 text-purple-600 font-bold uppercase ">
        Welcome to my Firebase demo page
      </h1>
      <Form />
      <Table setModalDetails={setModalDetails} />
      {modalDetails.status && <Modal setModalDetails={setModalDetails} modalDetails={modalDetails} />}
    </>
  )
}

export default App
