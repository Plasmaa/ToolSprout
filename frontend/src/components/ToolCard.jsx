import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ToolCard = ({ icon: Icon, title, description, link, color = "bg-blue-500" }) => {
    return (
        <Link to={link} className="block group">
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 h-full flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-white`}>
                        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
                    </div>
                    <span className="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-0.5 rounded-full">Free</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{title}</h3>
                <p className="text-gray-500 text-sm mb-4 flex-grow">{description}</p>
                <div className="flex items-center text-blue-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    Start Creating <ArrowRight className="w-4 h-4 ml-1" />
                </div>
            </div>
        </Link>
    );
};

export default ToolCard;
