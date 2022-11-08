import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { doc, setDoc, Timestamp, collection, getFirestore, onSnapshot, deleteDoc, addDoc, updateDoc } from "firebase/firestore";
import { useAppStore } from './store';

const firebaseConfig = {
  apiKey: "AIzaSyAuDGVD4OH3GlxpkoEEwOGcq3cf1blndxg",
  authDomain: "fire-tut-app.firebaseapp.com",
  projectId: "fire-tut-app",
  storageBucket: "fire-tut-app.appspot.com",
  messagingSenderId: "677528872714",
  appId: "1:677528872714:web:2b7cb082753c68e6a0fcf3",
  measurementId: "G-E20ZPY05HY"
};
// const analytics = getAnalytics(app);
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const storeUpdater = useAppStore(state => state.setAllRecords);

export const getDocuments = async({coll}) => {
  try {
    const allDataRef = collection(db, coll);
    const allData = [];
    const allDataSnapshot = await getDocs(allDataRef);
    await allDataSnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      allData.push({ id: doc.id, ...doc.data() })
    });
    return {
      status: true,
      data: allData,
      message: `All Records Fetched`
    }
  } catch (error) {
    console.log(error);
    return {
      status: false, message: `Error:${error.message}: `
    }
  }


}

export const getDocumentById = async({coll, id}) => {
  try {
    const docRef = doc(db, coll, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("getDocumentById :: Document data:", docSnap.data());
      return {data: docSnap.data(), status: true}
    } else {
      // doc.data() will be undefined in this case
      console.log("getDocumentById :: No such document!");
      return {
        status: false, message: `Error:${error.message}: `
      }
    }
  } catch (error) {
    console.log(error);
    return {
      status: false, message: `Error:${error.message}: `
    }
  }


}

export const addDocument = async({coll, dataObj}) => {
  try {
    const docRef = await addDoc(collection(db, coll), { ...dataObj, lastUpdated: Timestamp.fromDate(new Date()), });
    console.log('addDocument :: docRef :: ', docRef);
    return {
      status: true, message:'Document created'
    }
  } catch(error) {
    console.log(error);
    return {
      status: false, message: `Error:${error.message}: `
    }
  }

}

export const setDocument = async({coll, id, dataObj}) => {
  try {
    const docRef = await setDoc(doc(db, coll, id), dataObj);
    console.log('setDocument :: docRef :: ', docRef);
  } catch (error) {
    console.log(error);
    return {
      status: false, message: `Error:${error.message}: `
    }
  }
}

export const editDocument = async({coll, id, dataObj}) => {
  try {
    const docRef = doc(db, coll, id);
    const editedDocRef = await updateDoc(docRef, { ...dataObj, lastUpdated: Timestamp.fromDate(new Date()) });
    console.log('editDocument :: editedDocRef :: ', editedDocRef);
    return {status: true, message: 'Updated Successfully.'}
  } catch (error) {
    console.log(error);
    return {
      status: false, message: `Error:${error.message}: `
    }
  }
}

export const deleteDocument = async({id, coll}) => {
  try {
    const deletedDocRef =  await deleteDoc(doc(db, coll, id));
    console.log('addDocument :: deletedDocRef :: ', deletedDocRef);
    return {
      status: true, message: `Deleted successfully`
    }
  } catch (error) {
    console.log(error);
    return {
      status: false, message: `Error:${error.message}: `
    }
  }
}

export const onCollectionSnapshot = async({coll}) => {
  try {
    const q = collection(db, coll);
    let allRecords = [];
    return onSnapshot(q, (querySnapshot) => {
      allRecords.length = 0;
      querySnapshot.forEach((doc) => {
        // allRecords.push(doc.data().name);
        // console.log('onSnapshot :: doc :: ', doc.id, doc.data());
        allRecords.push({ id: doc.id, ...doc.data() }); 
      });
     
      return {
        status: true,
        message: `Records Updated`,
        data: allRecords
      }
    });

  } catch (error) {
    console.log(error);
    return {
      status: false, message: `Error:${error.message}: `
    }
  }
}