// Firebase configuration and initialization for KSHETRA
import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  RecaptchaVerifier, 
  signInWithPhoneNumber, 
  signOut as firebaseSignOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  serverTimestamp 
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
};

// Check if valid Firebase configuration is provided
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && 
  firebaseConfig.projectId &&
  !firebaseConfig.apiKey.includes('your_api_key')
);

let app = null;
let auth = null;
let db = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (err) {
    console.error('Failed to initialize Firebase:', err);
  }
} else {
  console.info(
    'KSHETRA: Firebase environment variables not detected or using placeholder values. Running in fallback/demo mode.'
  );
}

export { app, auth, db };

/**
 * Sets up reCAPTCHA verifier on a designated container element
 * @param {string} containerId - DOM ID of the element (e.g. 'recaptcha-container')
 * @param {Function} onVerify - Optional callback on success
 */
export const setupRecaptcha = (containerId = 'recaptcha-container', onVerify) => {
  if (!auth) {
    throw new Error('Firebase Auth is not initialized. Please verify your .env settings.');
  }

  // Clear previous verifier instance if any on window
  if (window.recaptchaVerifier) {
    try {
      window.recaptchaVerifier.clear();
    } catch (e) {
      // ignore
    }
    window.recaptchaVerifier = null;
  }

  window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: () => {
      if (onVerify) onVerify();
    },
    'expired-callback': () => {
      console.warn('reCAPTCHA expired. Please retry.');
    }
  });

  return window.recaptchaVerifier;
};

/**
 * Sends Phone OTP via Firebase Auth
 * @param {string} phoneNumber - Full phone number with country code (e.g. '+919876543210')
 * @param {RecaptchaVerifier} appVerifier
 */
export const sendPhoneOtp = async (phoneNumber, appVerifier) => {
  if (!auth) {
    throw new Error('Firebase Auth is not configured. Check .env configuration.');
  }
  return await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
};

/**
 * Fetch a user profile document from Firestore
 * @param {string} uid - Firebase user UID
 */
export const getUserProfile = async (uid) => {
  if (!db || !uid) return null;
  try {
    const userDocRef = doc(db, 'users', uid);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      return snap.data();
    }
    return null;
  } catch (error) {
    console.error('Error fetching user profile from Firestore:', error);
    return null;
  }
};

/**
 * Save or update a user profile document in Firestore
 * @param {string} uid - Firebase user UID
 * @param {Object} profileData
 */
export const saveUserProfile = async (uid, profileData) => {
  if (!db || !uid) return false;
  try {
    const userDocRef = doc(db, 'users', uid);
    await setDoc(
      userDocRef, 
      { 
        ...profileData, 
        uid,
        updatedAt: serverTimestamp() 
      }, 
      { merge: true }
    );
    return true;
  } catch (error) {
    console.error('Error saving user profile to Firestore:', error);
    return false;
  }
};

/**
 * Create a new booking document in Firestore
 * @param {Object} bookingData
 */
export const createBookingInFirestore = async (bookingData) => {
  if (!db) return null;
  try {
    const bookingsCol = collection(db, 'bookings');
    const docRef = await addDoc(bookingsCol, {
      ...bookingData,
      createdAt: serverTimestamp(),
      syncedAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating booking in Firestore:', error);
    return null;
  }
};

/**
 * Subscribe to real-time bookings for a user
 * @param {string} userId
 * @param {Function} onUpdate - callback receiving array of bookings
 */
export const subscribeUserBookings = (userId, onUpdate) => {
  if (!db || !userId) return () => {};
  try {
    const q = query(
      collection(db, 'bookings'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    return onSnapshot(q, (snapshot) => {
      const bookings = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data()
      }));
      onUpdate(bookings);
    }, (error) => {
      console.warn('Firestore bookings query fallback:', error);
    });
  } catch (error) {
    console.error('Failed to subscribe to user bookings:', error);
    return () => {};
  }
};

/**
 * Sign out user from Firebase Auth
 */
export const logOutFromFirebase = async () => {
  if (auth) {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Error signing out from Firebase:', error);
    }
  }
};
