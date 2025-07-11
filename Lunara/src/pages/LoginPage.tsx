import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [role, setRole] = useState<'client' | 'provider'>('client');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { clientLogin, providerLogin, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      if (role === 'client') {
        await clientLogin({ email, password });
        navigate('/dashboard');
      } else {
        await providerLogin({ email, password });
        navigate('/provider/dashboard');
      }
    } catch (err) {
      // handled by context
    }
  };

  const emailPlaceholder = role === 'client' ? 'client@example.com' : 'provider@example.com';
  const passwordPlaceholder = role === 'client' ? 'clientPassword123' : 'providerPassword123';

  return (
    <div className="flex flex-col items-center justify-start min-h-[calc(100vh-170px)] bg-cream px-4 pt-[190px] pb-12">
      {/* Script-style welcome heading */}
      <div className="text-center mb-10">
        <h2 className="font-script text-9xl text-[#4E1B00] drop-shadow-sm">Welcome</h2>
      </div>

      {/* Login card */}
      <div className="w-full max-w-lg bg-[#F5EFE5] border border-[#E8DED1] shadow-[0_4px_20px_rgba(0,0,0,0.06)] rounded-[3rem] p-14 space-y-8">
        {/* Role toggle */}
        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={() => setRole('client')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${role === 'client' ? 'bg-brown text-white' : 'bg-transparent text-brown hover:bg-brown/10'}`}
          >
            Client
          </button>
          <button
            type="button"
            onClick={() => setRole('provider')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${role === 'provider' ? 'bg-brown text-white' : 'bg-transparent text-brown hover:bg-brown/10'}`}
          >
            Provider
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-brown mb-1">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder={emailPlaceholder}
              className="mt-1 block w-full px-3 py-2 border border-brown/20 rounded-md shadow-sm placeholder-brown/30 focus:outline-none focus:ring-2 focus:ring-brown-light"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-brown mb-1">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder={passwordPlaceholder}
              className="mt-1 block w-full px-3 py-2 border border-brown/20 rounded-md shadow-sm placeholder-brown/30 focus:outline-none focus:ring-2 focus:ring-brown-light"
            />
          </div>

          {error && <div className="text-red-500 text-sm text-center">{error}</div>}

          <button
            type="submit"
            className="mx-auto w-40 flex justify-center py-2 px-4 border border-[#CAC3BC] rounded-md text-sm font-medium text-[#4E1B00] bg-[#DED7CD] hover:bg-[#DED7CD]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CAC3BC]"
          >
            Enter
          </button>
        </form>

        <div className="text-center">
          <Link to="/forgot-password" className="text-sm font-medium text-brown underline">Forgot your password?</Link>
        </div>
      </div>

      {/* Call-to-action */}
      <div className="text-center mt-12">
        <p className="text-sm text-brown mb-2">Not a client yet?</p>
        <p className="text-sm text-brown/80">Learn more about Lunara's offerings</p>
        <Link to="/services" className="inline-block mt-4 px-6 py-2 rounded-full border border-[#CAC3BC] bg-[#DED7CD] text-[#4E1B00] hover:bg-[#DED7CD]/90 shadow-soft">Services</Link>
      </div>
    </div>
  );
};
export default LoginPage; 