import React, { useState, useRef } from 'react';
import { Download, Printer, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const CertificateGenerator = () => {
    const [data, setData] = useState({
        recipient: 'John Doe',
        title: 'Certificate of Achievement',
        description: 'For successfully completing the Advanced React Course with distinction.',
        date: new Date().toISOString().split('T')[0],
        signature: 'Jane Smith',
        issuer: 'Tech Academy'
    });

    const [selectedTemplate, setSelectedTemplate] = useState('modern');

    const templates = [
        { id: 'modern', name: 'Modern Purple', color: 'purple', borderColor: 'border-purple-900', textColor: 'text-purple-900', sealColor: 'bg-purple-900' },
        { id: 'classic', name: 'Classic Gold', color: 'amber', borderColor: 'border-amber-600', textColor: 'text-amber-700', sealColor: 'bg-amber-600' },
        { id: 'elegant', name: 'Elegant Pink', color: 'pink', borderColor: 'border-pink-700', textColor: 'text-pink-800', sealColor: 'bg-pink-700' },
        { id: 'ornate', name: 'Ornate Blue', color: 'blue', borderColor: 'border-blue-900', textColor: 'text-blue-900', sealColor: 'bg-blue-900' },
    ];

    const previewRef = useRef();

    const downloadPDF = async () => {
        try {
            const element = previewRef.current;
            const canvas = await html2canvas(element, {
                scale: 2,
                logging: false,
                useCORS: true,
                backgroundColor: '#ffffff'
            });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: 'a4'
            });

            const imgWidth = 297;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

            const pdfBlob = pdf.output('blob');
            const url = URL.createObjectURL(pdfBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'certificate.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Failed to generate PDF. Please try again.");
        }
    };

    const getTemplateStyles = (templateId) => {
        const template = templates.find(t => t.id === templateId);
        return template || templates[0];
    };

    const currentStyle = getTemplateStyles(selectedTemplate);

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 flex items-center justify-between">
                    <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="w-5 h-5 mr-2" /> Back to Tools
                    </Link>
                    <div className="flex gap-4">
                        <button onClick={() => window.print()} className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 border border-gray-200">
                            <Printer className="w-4 h-4" /> Print
                        </button>
                        <button onClick={downloadPDF} className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-purple-700">
                            <Download className="w-4 h-4" /> Download PDF
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Editor Form */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Choose Template</h2>
                            <div className="grid grid-cols-2 gap-3">
                                {templates.map((template) => (
                                    <button
                                        key={template.id}
                                        onClick={() => setSelectedTemplate(template.id)}
                                        className={`p-2 rounded-lg border-2 transition-all ${selectedTemplate === template.id
                                            ? `border-${template.color}-600 bg-${template.color}-50`
                                            : `border-gray-200 hover:border-${template.color}-300`
                                            }`}
                                    >
                                        <div className={`aspect-video bg-white rounded mb-2 overflow-hidden border-4 ${template.borderColor} flex items-center justify-center`}>
                                            <div className={`w-3 h-3 rounded-full ${template.sealColor}`}></div>
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">{template.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Certificate</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
                                    <input type="text" value={data.issuer} onChange={(e) => setData({ ...data, issuer: e.target.value })} className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Certificate Title</label>
                                    <input type="text" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Name</label>
                                    <input type="text" value={data.recipient} onChange={(e) => setData({ ...data, recipient: e.target.value })} className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500" rows="3" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                    <input type="date" value={data.date} onChange={(e) => setData({ ...data, date: e.target.value })} className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Signature Name</label>
                                    <input type="text" value={data.signature} onChange={(e) => setData({ ...data, signature: e.target.value })} className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="lg:col-span-2 bg-gray-500 p-8 rounded-xl overflow-auto flex justify-center items-center">
                        <div ref={previewRef} className="relative w-[297mm] h-[210mm] bg-white shadow-2xl overflow-hidden print:shadow-none">
                            <div className={`w-full h-full p-12 flex flex-col items-center justify-center text-center border-[20px] border-double ${currentStyle.borderColor} relative`}>
                                <div className={`absolute top-12 left-12 right-12 bottom-12 border-2 ${currentStyle.borderColor} opacity-30 pointer-events-none`}></div>

                                <div className="relative z-10 max-w-4xl w-full">
                                    <h2 className={`text-xl font-bold ${currentStyle.textColor} uppercase tracking-[0.2em] mb-4 font-sans`}>{data.issuer}</h2>

                                    <h1 className="text-6xl font-bold text-gray-900 mb-8 font-serif italic" style={{ fontFamily: '"Playfair Display", serif' }}>
                                        {data.title}
                                    </h1>

                                    <p className="text-xl text-gray-600 mb-4 font-serif italic">This certificate is proudly presented to</p>

                                    <div className={`text-5xl font-bold ${currentStyle.textColor} mb-8 border-b-2 border-gray-200 pb-4 inline-block min-w-[400px]`} style={{ fontFamily: '"Playfair Display", serif' }}>
                                        {data.recipient}
                                    </div>

                                    <p className="text-xl text-gray-600 mb-16 max-w-2xl mx-auto leading-relaxed">
                                        {data.description}
                                    </p>

                                    <div className="flex justify-between items-end w-full px-12">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-gray-900 mb-2 border-t-2 border-gray-900 pt-4 w-64" style={{ fontFamily: '"Playfair Display", serif' }}>
                                                {data.date}
                                            </div>
                                            <p className="text-sm text-gray-500 uppercase tracking-wider">Date</p>
                                        </div>



                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-gray-900 mb-2 border-t-2 border-gray-900 pt-4 w-64" style={{ fontFamily: '"Playfair Display", serif italic' }}>
                                                {data.signature}
                                            </div>
                                            <p className="text-sm text-gray-500 uppercase tracking-wider">Signature</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CertificateGenerator;
