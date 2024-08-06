const {  doc, updateDoc,getFirestore,  } = require('firebase-admin/firestore');
const { admin,db,auth, collection, QuerySnapshot,initializeApp,getUIDByEmail } = require('../models/firebase');
const { merge } = require('../routes/loginroute');
const updateDocument = async (collectionName, documentId, updates) => {
    try {
      const docRef = db.collection(collectionName).doc(documentId);
      await docRef.set(updates,{ merge: true });
      console.log(`Document updated in ${collectionName} with ID: ${documentId}`);
    } catch (error) {
      console.error(`Error updating document in ${collectionName}:`, error);
      throw error;
    }
  };
const createDocument = async (collection, documentId, data) => {
    try {
      const docRef = db.collection(collection).doc(documentId);
      await docRef.set(data);
      console.log(`Document in ${collection} with ID ${documentId} created successfully`);
    } catch (error) {
      console.error(`Error creating document in ${collection} with ID ${documentId}:`, error);
      throw error;
    }
  };

module.exports={
    updateDocument,
    createDocument
}