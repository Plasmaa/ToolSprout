import React from 'react';
import { Link } from 'react-router-dom';
import { Construction, ArrowLeft } from 'lucide-react';

const ComingSoon = ({ title }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
            <div className="text-center max-w-lg">
                <div className="bg-blue-100 p-6 rounded-full inline-flex mb-8">
                    <Construction className="w-16 h-16 text-blue-600" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Coming Soon</h1>
                <p className="text-xl text-gray-600 mb-8">
                    The <span className="font-bold text-gray-900">{title}</span> is currently under development.
                    We're working hard to bring you this tool very soon!
                </p>
                <Link
                    to="/"
                    className="inline-flex items-center text-blue-600 font-bold hover:text-blue-700 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default ComingSoon;
