import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database

////// this is the put request to add data to the indexedDB ///////// 
export const putDb = async (content) => {
  const IndexedDB = await openDB('jate', 1);
  const tx = IndexedDB.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('Data saved to the IndexedDB', result);
}; 

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const IndexedDB = await openDB('jate', 1);
  const tx = IndexedDB.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  result
    ? console.log('Data returned from the database')
    : console.log('Data not returned from the database.');
}; 

initdb();
