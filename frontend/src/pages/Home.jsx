import React from 'react';
import Hero from '../components/Hero';
import ToolCard from '../components/ToolCard';
import { tools } from '../data/tools';

const Home = () => {
    return (
        <div>
            <Hero />

            <section id="tools-section" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Complete Document Toolkit</h2>
                        <p className="text-xl text-gray-600">Everything you need to create professional documents</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {tools.map((tool, index) => (
                            <ToolCard key={index} {...tool} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">What Users Say</span>
                        <h2 className="text-3xl font-bold text-gray-900 mt-4">Real Results from Real Users</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Sarah Mitchell",
                                role: "Small Business Owner",
                                text: "The invoice generator saved me hours every week. Clean, professional, and completely free!",
                                initial: "S",
                                color: "bg-pink-100 text-pink-600"
                            },
                            {
                                name: "James Chen",
                                role: "HR Manager",
                                text: "Creating offer letters and salary slips has never been easier. This is a game-changer for our team.",
                                initial: "J",
                                color: "bg-blue-100 text-blue-600"
                            },
                            {
                                name: "Emily Rodriguez",
                                role: "Freelance Designer",
                                text: "I use this daily for contracts and invoices. The templates are professional and easy to customize.",
                                initial: "E",
                                color: "bg-purple-100 text-purple-600"
                            }
                        ].map((review, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`w-12 h-12 rounded-full ${review.color} flex items-center justify-center font-bold text-xl`}>
                                        {review.initial}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{review.name}</h4>
                                        <p className="text-sm text-gray-500">{review.role}</p>
                                    </div>
                                </div>
                                <div className="flex text-yellow-400 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-600 italic">"{review.text}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
