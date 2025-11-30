import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, FileText } from 'lucide-react';
import { tools } from '../data/tools';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isToolsOpen, setIsToolsOpen] = useState(false);
    const location = useLocation();
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Navbar */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        {/* Logo and Desktop Nav */}
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center gap-2">
                                <div className="bg-blue-600 p-2 rounded-lg">
                                    <FileText className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-xl font-bold text-gray-900">ToolSprout</span>
                            </Link>

                            <div className="hidden md:flex items-center ml-10 space-x-8">
                                <div
                                    className="relative group"
                                    onMouseEnter={() => setIsToolsOpen(true)}
                                    onMouseLeave={() => setIsToolsOpen(false)}
                                >
                                    <button
                                        className="flex items-center gap-1 text-gray-600 hover:text-gray-900 font-medium py-2"
                                        onClick={() => setIsToolsOpen(!isToolsOpen)}
                                    >
                                        Tools <ChevronDown className="w-4 h-4" />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {isToolsOpen && (
                                        <div
                                            className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 mt-1 transform transition-all duration-200 origin-top-left"
                                        >
                                            <div className="p-2 grid gap-1">
                                                {tools.map((tool) => (
                                                    <Link
                                                        key={tool.id}
                                                        to={tool.link}
                                                        onClick={() => setIsToolsOpen(false)}
                                                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                                                    >
                                                        <div className={`p-2 rounded-lg bg-${tool.color}-100 text-${tool.color}-600`}>
                                                            <tool.icon className="w-4 h-4" />
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">{tool.title}</div>
                                                            <div className="text-xs text-gray-500">{tool.description}</div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <Link to="/features" className="text-gray-600 hover:text-gray-900 font-medium">Features</Link>
                                <Link to="/reviews" className="text-gray-600 hover:text-gray-900 font-medium">Reviews</Link>
                                <Link to="/about" className="text-gray-600 hover:text-gray-900 font-medium">About</Link>
                            </div>
                        </div>

                        {/* Auth Buttons */}
                        <div className="hidden md:flex items-center gap-4">
                            {user ? (
                                <div className="flex items-center gap-4">
                                    <span className="text-gray-700 font-medium">Hi, {user.username}</span>
                                    <button
                                        onClick={logout}
                                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium">
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-gray-600 hover:text-gray-900 p-2"
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-grow">
                {children}
            </main>

            <footer className="bg-gray-900 text-gray-400 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="bg-blue-600 p-1.5 rounded-lg">
                                    <FileText className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-lg font-bold text-white">ToolSprout</span>
                            </div>
                            <p className="text-sm">
                                Create professional documents in seconds. Free, secure, and easy to use.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4">Tools</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link to="/invoice" className="hover:text-white">Invoice Generator</Link></li>
                                <li><Link to="/certificate" className="hover:text-white">Certificate Generator</Link></li>
                                <li><Link to="/contract" className="hover:text-white">Contract Maker</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4">Company</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                                <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4">Connect</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white">Twitter</a></li>
                                <li><a href="#" className="hover:text-white">LinkedIn</a></li>
                                <li><a href="#" className="hover:text-white">Facebook</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
                        © {new Date().getFullYear()} ToolSprout. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
