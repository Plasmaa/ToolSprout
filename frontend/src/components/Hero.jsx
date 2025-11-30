import React from 'react';
import { FileText, Award, FileSignature, Calendar } from 'lucide-react';

const Hero = () => {
    return (
        <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white pt-16 pb-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
                            Generate <br />
                            <span className="text-blue-600">Professional Documents</span> <br />
                            in Seconds
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-lg">
                            Create invoices, certificates, contracts, and more with our free, easy-to-use document generators. No sign-up required.
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => document.getElementById('tools-section')?.scrollIntoView({ behavior: 'smooth' })}
                                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                            >
                                Start Creating Free
                            </button>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="grid grid-cols-2 gap-4 transform rotate-3">
                            <div className="bg-green-100 p-8 rounded-3xl shadow-lg flex items-center justify-center aspect-square transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                                <FileText className="w-16 h-16 text-green-600" />
                            </div>
                            <div className="bg-purple-100 p-8 rounded-3xl shadow-lg flex items-center justify-center aspect-square mt-8 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                                <Award className="w-16 h-16 text-purple-600" />
                            </div>
                            <div className="bg-orange-100 p-8 rounded-3xl shadow-lg flex items-center justify-center aspect-square -mt-8 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                                <FileSignature className="w-16 h-16 text-orange-600" />
                            </div>
                            <div className="bg-blue-100 p-8 rounded-3xl shadow-lg flex items-center justify-center aspect-square transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                                <Calendar className="w-16 h-16 text-blue-600" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
