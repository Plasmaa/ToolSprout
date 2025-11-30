import React, { useState, useRef } from 'react';
import { Plus, Trash2, Download, Printer, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const InvoiceGenerator = () => {
    const [invoice, setInvoice] = useState({
        logo: null,
        fromName: '',
        fromEmail: '',
        fromAddress: '',
        toName: '',
        toEmail: '',
        toAddress: '',
        shipTo: '',
        number: '1',
        date: new Date().toISOString().split('T')[0],
        dueDate: '',
        paymentTerms: '',
        poNumber: '',
        items: [{ id: 1, description: '', quantity: 1, rate: 0 }],
        notes: '',
        terms: '',
        currency: 'BDT (Tk)',
        taxRate: 0,
        discountRate: 0,
        amountPaid: 0,
    });

    const previewRef = useRef();
    const fileInputRef = useRef();

    const handleItemChange = (index, field, value) => {
        const newItems = [...invoice.items];
        newItems[index][field] = value;
        setInvoice({ ...invoice, items: newItems });
    };

    const addItem = () => {
        setInvoice({
            ...invoice,
            items: [...invoice.items, { id: Date.now(), description: '', quantity: 1, rate: 0 }]
        });
    };

    const removeItem = (index) => {
        const newItems = invoice.items.filter((_, i) => i !== index);
        setInvoice({ ...invoice, items: newItems });
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setInvoice({ ...invoice, logo: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const calculateSubtotal = () => {
        return invoice.items.reduce((acc, item) => acc + (item.quantity * item.rate), 0);
    };

    const calculateDiscount = () => {
        return calculateSubtotal() * (invoice.discountRate / 100);
    };

    const calculateTax = () => {
        return (calculateSubtotal() - calculateDiscount()) * (invoice.taxRate / 100);
    };

    const calculateTotal = () => {
        return calculateSubtotal() - calculateDiscount() + calculateTax();
    };

    const calculateBalanceDue = () => {
        return calculateTotal() - invoice.amountPaid;
    };

    const downloadPDF = async () => {
        try {
            const element = previewRef.current;

            // Create a clone of the element to modify for PDF generation
            const clone = element.cloneNode(true);

            // Style the clone for PDF
            clone.style.width = '210mm';
            clone.style.minHeight = '297mm';
            clone.style.padding = '20mm';
            clone.style.backgroundColor = 'white';
            clone.style.position = 'absolute';
            clone.style.top = '-9999px';
            clone.style.left = '-9999px';

            // Replace inputs/textareas with div/span containing values
            const inputs = clone.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                const value = input.value || input.placeholder;
                const span = document.createElement('span');
                span.textContent = value;
                span.style.display = 'block';
                span.style.width = '100%';
                span.style.whiteSpace = 'pre-wrap'; // Preserve newlines for textareas

                // Copy relevant styles
                const computedStyle = window.getComputedStyle(input);
                span.style.textAlign = computedStyle.textAlign;
                span.style.fontSize = computedStyle.fontSize;
                span.style.fontWeight = computedStyle.fontWeight;
                span.style.color = computedStyle.color;

                input.parentNode.replaceChild(span, input);
            });

            // Remove UI elements like buttons
            const buttons = clone.querySelectorAll('button');
            buttons.forEach(btn => btn.remove());

            // Remove placeholders or empty states if needed
            if (!invoice.logo) {
                const logoPlaceholder = clone.querySelector('.border-dashed');
                if (logoPlaceholder) logoPlaceholder.style.border = 'none';
            } else {
                const logoContainer = clone.querySelector('.border-dashed');
                if (logoContainer) logoContainer.style.border = 'none';
            }

            document.body.appendChild(clone);

            const canvas = await html2canvas(clone, {
                scale: 2,
                logging: false,
                useCORS: true,
                backgroundColor: '#ffffff',
                windowWidth: 794, // A4 width in px at 96 DPI approx
            });

            document.body.removeChild(clone);

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

            const pdfBlob = pdf.output('blob');
            const url = URL.createObjectURL(pdfBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `invoice-${invoice.number}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Failed to generate PDF. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <Link to="/" className="flex items-center text-gray-500 hover:text-gray-700">
                        <ArrowLeft className="w-5 h-5 mr-2" /> Back to Tools
                    </Link>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Invoice Editor (WYSIWYG) */}
                    <div className="flex-grow">
                        <div ref={previewRef} className="bg-white rounded-lg shadow-lg p-8 sm:p-12 min-h-[1100px] relative">

                            {/* Header */}
                            <div className="flex flex-col sm:flex-row justify-between items-start mb-12 gap-8">
                                {/* Logo Section */}
                                <div
                                    className="w-64 h-32 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors group"
                                    onClick={() => fileInputRef.current.click()}
                                >
                                    {invoice.logo ? (
                                        <img src={invoice.logo} alt="Logo" className="w-full h-full object-contain p-2" />
                                    ) : (
                                        <>
                                            <Plus className="w-6 h-6 text-gray-400 mb-2 group-hover:text-gray-600" />
                                            <span className="text-gray-400 text-sm group-hover:text-gray-600 font-medium">+ Add Your Logo</span>
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleLogoUpload}
                                    />
                                </div>

                                {/* Invoice Title & Number */}
                                <div className="text-right">
                                    <h1 className="text-5xl font-normal text-gray-900 mb-4 tracking-wide">INVOICE</h1>
                                    <div className="flex items-center justify-end gap-2">
                                        <span className="text-gray-400 font-medium text-lg">#</span>
                                        <input
                                            type="text"
                                            value={invoice.number}
                                            onChange={(e) => setInvoice({ ...invoice, number: e.target.value })}
                                            className="w-32 text-right border border-gray-200 rounded p-2 text-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* From Section */}
                            <div className="mb-8">
                                <input
                                    type="text"
                                    value={invoice.fromName}
                                    onChange={(e) => setInvoice({ ...invoice, fromName: e.target.value })}
                                    className="w-full sm:w-1/2 border border-gray-200 rounded p-3 text-gray-700 mb-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                                    placeholder="Who is this invoice from? (required)"
                                />
                                {/* Add more fields for address/email if needed, hidden by default in UI but available in state */}
                            </div>

                            {/* Meta Data Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-12">
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-gray-500 text-sm mb-1">Bill To</label>
                                            <input
                                                type="text"
                                                value={invoice.toName}
                                                onChange={(e) => setInvoice({ ...invoice, toName: e.target.value })}
                                                className="w-full border border-gray-200 rounded p-3 text-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                                                placeholder="Who is this to?"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-500 text-sm mb-1">Ship To</label>
                                            <input
                                                type="text"
                                                value={invoice.shipTo}
                                                onChange={(e) => setInvoice({ ...invoice, shipTo: e.target.value })}
                                                className="w-full border border-gray-200 rounded p-3 text-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                                                placeholder="(optional)"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-end gap-4">
                                        <label className="text-gray-500 text-sm text-right w-32">Date</label>
                                        <input
                                            type="date"
                                            value={invoice.date}
                                            onChange={(e) => setInvoice({ ...invoice, date: e.target.value })}
                                            className="w-48 border border-gray-200 rounded p-2 text-gray-700 text-right focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                                        />
                                    </div>
                                    <div className="flex items-center justify-end gap-4">
                                        <label className="text-gray-500 text-sm text-right w-32">Payment Terms</label>
                                        <input
                                            type="text"
                                            value={invoice.paymentTerms}
                                            onChange={(e) => setInvoice({ ...invoice, paymentTerms: e.target.value })}
                                            className="w-48 border border-gray-200 rounded p-2 text-gray-700 text-right focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                                        />
                                    </div>
                                    <div className="flex items-center justify-end gap-4">
                                        <label className="text-gray-500 text-sm text-right w-32">Due Date</label>
                                        <input
                                            type="date"
                                            value={invoice.dueDate}
                                            onChange={(e) => setInvoice({ ...invoice, dueDate: e.target.value })}
                                            className="w-48 border border-gray-200 rounded p-2 text-gray-700 text-right focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                                        />
                                    </div>
                                    <div className="flex items-center justify-end gap-4">
                                        <label className="text-gray-500 text-sm text-right w-32">PO Number</label>
                                        <input
                                            type="text"
                                            value={invoice.poNumber}
                                            onChange={(e) => setInvoice({ ...invoice, poNumber: e.target.value })}
                                            className="w-48 border border-gray-200 rounded p-2 text-gray-700 text-right focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Items Table */}
                            <div className="mb-12">
                                <div className="bg-[#1a2332] text-white rounded-t-lg flex px-4 py-3 text-sm font-medium">
                                    <div className="w-[50%]">Item</div>
                                    <div className="w-[15%] text-right">Quantity</div>
                                    <div className="w-[15%] text-right">Rate</div>
                                    <div className="w-[20%] text-right">Amount</div>
                                </div>
                                <div className="border border-t-0 border-gray-200 rounded-b-lg divide-y divide-gray-200">
                                    {invoice.items.map((item, index) => (
                                        <div key={item.id} className="flex px-4 py-3 group hover:bg-gray-50 items-start">
                                            <div className="w-[50%] pr-4">
                                                <input
                                                    type="text"
                                                    value={item.description}
                                                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                                    className="w-full border border-gray-200 rounded p-2 text-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                                                    placeholder="Description of service or product..."
                                                />
                                            </div>
                                            <div className="w-[15%] px-2">
                                                <input
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value))}
                                                    className="w-full border border-gray-200 rounded p-2 text-gray-700 text-right focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                                                />
                                            </div>
                                            <div className="w-[15%] px-2 relative">
                                                <input
                                                    type="number"
                                                    value={item.rate}
                                                    onChange={(e) => handleItemChange(index, 'rate', parseFloat(e.target.value))}
                                                    className="w-full border border-gray-200 rounded p-2 text-gray-700 text-right focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                                                />
                                            </div>
                                            <div className="w-[20%] pl-4 text-right flex items-center justify-end gap-4">
                                                <span className="text-gray-700 font-medium">
                                                    {invoice.currency} {(item.quantity * item.rate).toFixed(2)}
                                                </span>
                                                <button
                                                    onClick={() => removeItem(index)}
                                                    className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={addItem}
                                    className="mt-4 flex items-center gap-2 text-teal-600 font-medium hover:text-teal-700 px-4 py-2 border border-teal-600 rounded-lg hover:bg-teal-50 transition-colors"
                                >
                                    <Plus className="w-4 h-4" /> Line Item
                                </button>
                            </div>

                            {/* Footer Section */}
                            <div className="flex flex-col md:flex-row justify-between gap-12">
                                <div className="w-full md:w-1/2 space-y-8">
                                    <div>
                                        <label className="block text-gray-500 text-sm mb-2">Notes</label>
                                        <textarea
                                            value={invoice.notes}
                                            onChange={(e) => setInvoice({ ...invoice, notes: e.target.value })}
                                            className="w-full border border-gray-200 rounded p-3 text-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                                            placeholder="Notes - any relevant information not already covered"
                                            rows="3"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-500 text-sm mb-2">Terms</label>
                                        <textarea
                                            value={invoice.terms}
                                            onChange={(e) => setInvoice({ ...invoice, terms: e.target.value })}
                                            className="w-full border border-gray-200 rounded p-3 text-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                                            placeholder="Terms and conditions - late fees, payment methods, delivery schedule"
                                            rows="3"
                                        />
                                    </div>
                                </div>

                                <div className="w-full md:w-1/3 space-y-4">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>{invoice.currency} {calculateSubtotal().toFixed(2)}</span>
                                    </div>

                                    <div className="flex items-center justify-between gap-4">
                                        <span className="text-gray-600">Discount</span>
                                        <div className="flex items-center gap-2 w-32">
                                            <input
                                                type="number"
                                                value={invoice.discountRate}
                                                onChange={(e) => setInvoice({ ...invoice, discountRate: parseFloat(e.target.value) })}
                                                className="w-full border border-gray-200 rounded p-1 text-right text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                                            />
                                            <span className="text-gray-500 text-sm">%</span>
                                        </div>
                                        <span className="text-gray-600 w-24 text-right">
                                            {invoice.discountRate > 0 ? `-${invoice.currency} ${calculateDiscount().toFixed(2)}` : ''}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between gap-4">
                                        <span className="text-gray-600">Tax</span>
                                        <div className="flex items-center gap-2 w-32">
                                            <input
                                                type="number"
                                                value={invoice.taxRate}
                                                onChange={(e) => setInvoice({ ...invoice, taxRate: parseFloat(e.target.value) })}
                                                className="w-full border border-gray-200 rounded p-1 text-right text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                                            />
                                            <span className="text-gray-500 text-sm">%</span>
                                        </div>
                                        <span className="text-gray-600 w-24 text-right">
                                            {invoice.taxRate > 0 ? `+${invoice.currency} ${calculateTax().toFixed(2)}` : ''}
                                        </span>
                                    </div>

                                    <div className="flex justify-end pt-2">
                                        <button className="text-teal-600 text-sm font-medium hover:text-teal-700 flex items-center gap-1">
                                            <Plus className="w-3 h-3" /> Shipping
                                        </button>
                                    </div>

                                    <div className="flex justify-between text-gray-900 font-medium pt-4 border-t border-gray-200">
                                        <span>Total</span>
                                        <span>{invoice.currency} {calculateTotal().toFixed(2)}</span>
                                    </div>

                                    <div className="flex items-center justify-between gap-4 pt-2">
                                        <span className="text-gray-600">Amount Paid</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-500 text-sm">Tk</span>
                                            <input
                                                type="number"
                                                value={invoice.amountPaid}
                                                onChange={(e) => setInvoice({ ...invoice, amountPaid: parseFloat(e.target.value) })}
                                                className="w-24 border border-gray-200 rounded p-1 text-right text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-between text-gray-700 font-medium pt-2 border-t border-gray-100">
                                        <span>Balance Due</span>
                                        <span>{invoice.currency} {calculateBalanceDue().toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Controls */}
                    <div className="w-full lg:w-80 space-y-6">
                        <button
                            onClick={downloadPDF}
                            className="w-full bg-teal-600 text-white font-medium py-3 px-4 rounded-lg shadow-sm hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
                        >
                            <Download className="w-5 h-5" /> Download Invoice
                        </button>

                        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                            <div className="mb-6">
                                <label className="block text-gray-400 text-sm mb-2">Currency</label>
                                <select
                                    value={invoice.currency}
                                    onChange={(e) => setInvoice({ ...invoice, currency: e.target.value })}
                                    className="w-full border border-gray-200 rounded-lg p-2.5 text-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none bg-white"
                                >
                                    <option value="BDT (Tk)">BDT (Tk)</option>
                                    <option value="$">USD ($)</option>
                                    <option value="€">EUR (€)</option>
                                    <option value="£">GBP (£)</option>
                                </select>
                            </div>

                            <button className="w-full text-teal-600 font-medium py-2 px-4 rounded-lg border border-transparent hover:bg-teal-50 transition-colors">
                                Save Default
                            </button>

                            <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                                <Link to="/history" className="text-gray-400 text-sm hover:text-gray-600">
                                    History
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceGenerator;
