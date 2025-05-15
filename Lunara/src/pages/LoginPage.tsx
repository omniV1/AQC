import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] bg-cream p-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-brown">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-brown">
            Please choose how you'd like to login
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <Link
            to="/client/login"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-brown py-3 px-4 text-sm font-medium text-white hover:bg-brown-dark focus:outline-none focus:ring-2 focus:ring-brown focus:ring-offset-2"
          >
            Login as Client
          </Link>

          <Link
            to="/provider/login"
            className="group relative flex w-full justify-center rounded-md border border-brown bg-transparent py-3 px-4 text-sm font-medium text-brown hover:bg-brown hover:text-white focus:outline-none focus:ring-2 focus:ring-brown focus:ring-offset-2"
          >
            Login as Provider
          </Link>

          <div className="text-center mt-4">
            <span className="text-sm text-brown">Don't have an account? </span>
            <Link to="/client/register" className="text-sm font-medium text-brown-dark hover:text-brown">
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 