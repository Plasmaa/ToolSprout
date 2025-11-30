import React from 'react';
import { FileText, Users, Globe, Shield } from 'lucide-react';

const About = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="bg-blue-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Empowering You to Create <br />
                        <span className="text-blue-600">Professional Documents</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        ToolSprout is your one-stop solution for generating essential documents quickly, easily, and for free. No complex software, no hidden fees.
                    </p>
                </div>
            </div>

            {/* Mission Section */}
            <div className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                We believe that creating professional documents shouldn't be a hassle. Whether you're a freelancer, a small business owner, or a student, you deserve tools that work for you, not against you.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Our mission is to democratize access to high-quality document generation tools. We strive to provide a seamless, intuitive experience that saves you time and helps you look professional.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-green-100 p-6 rounded-2xl text-center">
                                <FileText className="w-10 h-10 text-green-600 mx-auto mb-4" />
                                <h3 className="font-bold text-gray-900">Simple</h3>
                                <p className="text-sm text-gray-600">Easy to use templates</p>
                            </div>
                            <div className="bg-purple-100 p-6 rounded-2xl text-center mt-8">
                                <Users className="w-10 h-10 text-purple-600 mx-auto mb-4" />
                                <h3 className="font-bold text-gray-900">Accessible</h3>
                                <p className="text-sm text-gray-600">For everyone, everywhere</p>
                            </div>
                            <div className="bg-orange-100 p-6 rounded-2xl text-center -mt-8">
                                <Globe className="w-10 h-10 text-orange-600 mx-auto mb-4" />
                                <h3 className="font-bold text-gray-900">Global</h3>
                                <p className="text-sm text-gray-600">Multi-currency support</p>
                            </div>
                            <div className="bg-blue-100 p-6 rounded-2xl text-center">
                                <Shield className="w-10 h-10 text-blue-600 mx-auto mb-4" />
                                <h3 className="font-bold text-gray-900">Secure</h3>
                                <p className="text-sm text-gray-600">Client-side generation</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-gray-900 py-20 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-5xl font-bold text-blue-500 mb-2">50k+</div>
                            <div className="text-gray-400">Documents Generated</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold text-green-500 mb-2">10k+</div>
                            <div className="text-gray-400">Happy Users</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold text-purple-500 mb-2">100%</div>
                            <div className="text-gray-400">Free to Use</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
