import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { RiDeleteBin7Line, RiEdit2Line } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { db, deleteDocument, onCollectionSnapshot } from '../services/firebase';
import { useAppStore } from '../services/store';
import { COLL_NAME } from '../utils/constants';


export default function Table({ setModalDetails }) {
  const allRecords = useAppStore(state => state.allRecords);
  const setAllRecords = useAppStore(state => state.setAllRecords);
  // let allRecords = [];
  // const [allRecords, setAllRecords] = useState([]);


  useEffect(() => {
    // const res = onCollectionSnapshot({coll: COLL_NAME});
    // console.log('Table :: res :: ', res);
    // // if(res.status) {
    // //   const d = Promise.resolve(res)
    // //   setAllRecords(d.data)
    // //   toast.success(res.message)
    // // } else {
    // //   toast.error(res.message)
    // // }
    // // res.then(data => {
    // //   console.log('Table :: data :: ', data);
    // // })
    // // 
    // // setAllRecords(autoUpdateDocs())
    // // return () => res;

    const unsubscribe = onSnapshot(collection(db, COLL_NAME), (snapshots) => {
      const data = [];
      snapshots.forEach((doc) => {
        data.push({id: doc.id, ...doc.data()})
      });
      setAllRecords(data)
    });

    return () => unsubscribe();
  }, [])

  const editDocHandler = ({ id, name, email, lastUpdated, coll  }) => {
    setModalDetails({
      status: true,
      id, name, email, lastUpdated, coll
    })
  }

  const deleteDocHandler = async ({ id, coll }) => {
    const res = await deleteDocument({id, coll});
    if (res.status) {
      toast.success(res.message);
    } else {
      toast.success(res.message);
    }
  }
  console.log('Table :: allRecords :: ', allRecords);
  console.log(allRecords[0].lastUpdated.seconds * 1000);
  console.log(new Date(allRecords[0].lastUpdated.seconds * 1000));
  return (
    <section className='bg-slate-300 flex items-center justify-evenly flex-row-reverse py-10' >
      <h1 className='text-5xl w-96 text-purple-600 font-bold uppercase'>Thanks all to fill the form.</h1>
      <div>
        <table className='table-fixed border border-purple-600 border-collapse'>
          <thead className='bg-purple-600 text-white  text-2xl'>
            <tr className=''>
              <th className='px-10 py-5'>Name</th>
              <th className='px-10 py-5'>Email</th>
              <th className='px-10 py-5'>Last Updated</th>
              <th className='px-10 py-5'>Action</th>
            </tr>
          </thead>
          <tbody>
            {allRecords.length > 0 ? allRecords.map(record => {
              return (<tr >
                <td className='p-3 border-b-2 border-purple-600 w-full'><div className='w-full flex items-center'>{record.name}</div> </td>
                <td className='p-3 border-b-2 border-purple-600 w-full'><div className='w-full flex items-center'>{record.email}</div> </td>
                <td className='p-3 border-b-2 border-purple-600 w-full'><div className='w-full flex items-center'>{(new Date(+record.lastUpdated.seconds * 1000)).toString()}</div> </td>
                <td className='p-3 border-b-2 border-purple-600 w-full'><div className='w-full flex items-center'>
                  <RiDeleteBin7Line className='cursor-pointer text-2xl text-red-600 ' onClick={() => {deleteDocHandler({id: record.id, coll: COLL_NAME})}} />
                  <RiEdit2Line className='cursor-pointer text-2xl text-green-600 ' onClick={() => { editDocHandler({ id: record.id, name: record.name, email: record.email, lastUpdated: record.lastUpdated, coll: COLL_NAME }) }} />
                </div></td>
              </tr>)
            }) : 'No Records Found. '}

          </tbody>
        </table>
      </div>
    </section>
  )
}
