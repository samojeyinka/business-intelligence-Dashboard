import { useEffect, useState } from 'react';
import { db } from '@/firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import { Button } from '@/components/ui/button';

const FirebaseTest = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any[] | null>(null);

  const testFirebaseConnection = async () => {
    try {
      setStatus('loading');
      setError(null);
      
      // Create a test collection if it doesn't exist
      const testCollection = collection(db, 'test');
      
      // Try to get documents from the collection
      const snapshot = await getDocs(testCollection);
      
      // If we get here, the connection is successful
      const documents = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()``
      }));
      
      setData(documents);
      setStatus('success');
      console.log('Firebase connection successful', documents);
    } catch (err: any) {
      console.error('Firebase connection error:', err);
      setStatus('error');
      setError(err.message || 'Unknown error');
    }
  };

  return (
    <div className="p-4 border border-slate-700 rounded-lg bg-slate-900 max-w-md mx-auto my-8">
      <h2 className="text-xl font-bold mb-4">Firebase Connection Test</h2>
      
      <div className="mb-4">
        <Button 
          onClick={testFirebaseConnection}
          disabled={status === 'loading'}
          className="w-full"
        >
          {status === 'loading' ? 'Testing Connection...' : 'Test Firebase Connection'}
        </Button>
      </div>
      
      {status === 'success' && (
        <div className="p-3 bg-green-900/30 border border-green-700 rounded text-green-400">
          <p className="font-medium">Connection Successful!</p>
          <p className="text-sm mt-1">Firebase Firestore is properly connected.</p>
          {data && data.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-medium">Retrieved {data.length} documents:</p>
              <pre className="text-xs mt-1 bg-slate-800 p-2 rounded overflow-x-auto">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
      
      {status === 'error' && (
        <div className="p-3 bg-red-900/30 border border-red-700 rounded text-red-400">
          <p className="font-medium">Connection Failed</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      )}
      
      <div className="mt-4 text-xs text-slate-400">
        <p>This component tests the connection to Firebase Firestore.</p>
        <p className="mt-1">If you see an error related to Content Security Policy, make sure your CSP headers allow connections to Firebase domains.</p>
      </div>
    </div>
  );
};

export default FirebaseTest;