import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp, query, where, getDocs, orderBy } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

export const SPY_KEY = 'ahmet_gizli_123';

export async function logSpyTerm(term: string) {
  if (!term || term.trim() === '') return;
  try {
    await addDoc(collection(db, 'spyLogs'), {
      term: term.trim(),
      timestamp: serverTimestamp(),
      spyKey: SPY_KEY
    });
  } catch (err) {
    console.error('Log error', err);
  }
}

export async function getSpyLogs() {
  try {
    const q = query(
      collection(db, 'spyLogs'),
      where('spyKey', '==', SPY_KEY)
    );
    const sn = await getDocs(q);
    const logs = sn.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        term: data.term,
        date: data.timestamp ? data.timestamp.toDate() : new Date()
      };
    });
    return logs.sort((a, b) => b.date.getTime() - a.date.getTime());
  } catch (err) {
    console.error('Fetch error', err);
    return [];
  }
}
