import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase-config'; // Adjust path as needed

export default function SimpleVerificationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [step, setStep] = useState(1); // 1 = form, 2 = verify, 3 = success
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Generate a random 6-digit code
  const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Handle form submission (step 1)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const code = generateCode();
      
      // Send verification email
      const response = await fetch('/api/resend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          code: code
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send verification email');
      }
  
      setGeneratedCode(code);
      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle verification (step 2)
  const handleVerify = async (e) => {
    e.preventDefault();
    
    if (verificationCode !== generatedCode) {
      setError('Invalid verification code');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Save to Firestore
      await addDoc(collection(db, "testa"), {
        name: formData.name,
        email: formData.email,
        verified: true,
        createdAt: new Date()
      });
      
      setStep(3); // Success
    } catch (err) {
      setError('Failed to save data');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      {step === 1 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-bold">Enter Your Details</h2>
          
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            {isSubmitting ? 'Sending Code...' : 'Send Verification Code'}
          </button>
        </form>
      )}
      
      {step === 2 && (
        <form onSubmit={handleVerify} className="space-y-4">
          <h2 className="text-xl font-bold">Verify Your Email</h2>
          <p>We sent a 6-digit code to {formData.email}</p>
          
          <div>
            <label className="block mb-1">Verification Code</label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full p-2 border rounded text-black"
              placeholder="Enter 6-digit code"
              required
            />
          </div>
          
          {error && <p className="text-red-500">{error}</p>}
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            {isSubmitting ? 'Verifying...' : 'Verify & Submit'}
          </button>
          
          <button
            type="button"
            onClick={() => setStep(1)}
            className="text-blue-500 underline"
          >
            Back to form
          </button>
        </form>
      )}
      
      {step === 3 && (
        <div className="text-center space-y-4">
          <h2 className="text-xl font-bold">Success!</h2>
          <p>Your information has been verified and saved.</p>
          <pre className="bg-gray-100 p-2 rounded text-left">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}