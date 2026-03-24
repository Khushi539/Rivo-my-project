import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderHistory } from "../API/productapi";
import { ArrowLeft, Printer, Download, Loader2 } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Invoice = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const invoiceRef = useRef();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await getOrderHistory();
        const foundOrder = res?.orders?.find(
          (o) => o.id === orderId || o._id === orderId
        );
        setOrder(foundOrder);
      } catch (error) {
        console.error("Error fetching invoice:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  // SIMPLE PDF DOWNLOAD FUNCTION
  const handleDownloadPDF = async () => {
  if (!invoiceRef.current || !order) return;
  setIsGenerating(true);

  try {
    const canvas = await html2canvas(invoiceRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",

      // 🔑 THIS IS THE FIX
      onclone: (clonedDoc) => {
        const invoice = clonedDoc.getElementById("invoice-render-area");
        if (!invoice) return;

        const all = invoice.querySelectorAll("*");
        all.forEach((el) => {
          const style = clonedDoc.defaultView.getComputedStyle(el);

          // FORCE SAFE COLORS (remove oklch completely)
          if (style.color.includes("oklch")) {
            el.style.color = "#111827";
          }
          if (style.backgroundColor.includes("oklch")) {
            el.style.backgroundColor = "#ffffff";
          }
          if (style.borderColor.includes("oklch")) {
            el.style.borderColor = "#e5e7eb";
          }
        });
      },
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Invoice_${order._id?.slice(-6).toUpperCase()}.pdf`);
  } catch (err) {
    console.error("PDF Error:", err);
    alert("PDF failed. Please try Print for now.");
  } finally {
    setIsGenerating(false);
  }
};
  if (loading)
    return <div className="p-10 text-center">Loading Invoice...</div>;
  if (!order)
    return <div className="p-10 text-center">Order not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10">
      {/* Top Action Bar */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center print:hidden">
        <button
          onClick={() => navigate(-1)}
          className="flex cursor-pointer items-center text-gray-600 font-medium hover:text-black transition"
        >
          <ArrowLeft size={20} className="mr-2" /> Back
        </button>

        <div className="flex gap-3">
          <button
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            style={{ backgroundColor: "#0D542B", color: "#ffffff" }}
            className="px-6 cursor-pointer py-2 rounded-lg flex items-center shadow-md disabled:opacity-50"
          >
            {isGenerating ? (
              <Loader2 className="animate-spin mr-2" size={18} />
            ) : (
              <Download size={18} className="mr-2" />
            )}
            Download PDF
          </button>

         
        </div>
      </div>

      {/* Invoice Render Area */}
 
       <div
  ref={invoiceRef}
  id="invoice-render-area"
  style={{
    backgroundColor: "#ffffff",
    color: "#111827",
    width: "794px",
    margin: "0 auto",
    padding: "4rem",
  }}
>
        {/* Header */}
        <div
          style={{ borderBottom: "2px solid #f3f4f6" }}
          className="flex justify-between pb-10"
        >
          <div>
            <h1 className="md:text-[50px] text-[35px] text-green-900 font-rufina cursor-pointer">
              INVOICE
            </h1>
            <p className="mt-4 text-sm font-medium text-gray-500 uppercase">
              ID: {order.invoiceNumber || order._id?.slice(-8).toUpperCase()}
            </p>
            <p className="text-sm text-gray-400">
              Date: {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="text-right">
            <h2 className="md:text-[50px] text-[35px] text-green-900 font-rufina cursor-pointer">
              RIVO
            </h2>
            <p className="text-xs uppercase tracking-widest text-gray-400">
              Fashion Store
            </p>
          </div>
        </div>

        {/* Customer & Status */}
        <div className="grid grid-cols-2 gap-10 py-12">
          <div>
            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-[2px] mb-2">
              Billed To
            </p>
            <p className="font-medium text-xl">{order.user?.name}</p>
            <p className="text-gray-600 text-sm">{order.user?.email}</p>
            <p className="text-gray-500 text-sm mt-3 leading-relaxed">
              {order.address}
            </p>
          </div>

          <div className="text-right">
            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-[2px] mb-2">
              Status
            </p>
            <span
              style={{ backgroundColor: "#f0fdf4", color: "#166534" }}
              className="px-4 py-1 rounded-full text-xs font-medium uppercase border border-green-100"
            >
              {order.status}
            </span>
          </div>
        </div>

        {/* Products Table */}
        <table className="w-full">
          <thead>
            <tr
              style={{ borderBottom: "1px solid #e5e7eb" }}
              className="text-[11px] font-medium text-gray-400 uppercase tracking-widest"
            >
              <th className="py-4 text-left">Description</th>
              <th className="py-4 text-center">Qty</th>
              <th className="py-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {order.products.map((item) => (
              <tr key={item._id}>
                <td className="py-6 font-medium text-gray-800">{item.name}</td>
                <td className="py-6 text-center font-medium text-gray-600">{item.qty}</td>
                <td className="py-6 text-right font-medium text-gray-900">
                  ₹{item.user_price.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="mt-12 flex justify-end">
          <div
            style={{ borderTop: "2px solid #1f2937" }}
            className="w-64 pt-6 space-y-4"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Subtotal
              </span>
              <span className="font-medium">₹{order.total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xl font-black text-gray-900">TOTAL</span>
              <span
                style={{ color: "#224f34" }}
                className="text-2xl font-black"
              >
                ₹{order.total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{ borderTop: "1px dashed #e5e7eb" }}
          className="mt-20 pt-8 text-center"
        >
          <p className="text-gray-400 text-xs italic tracking-wide">
            Thank you for shopping with Rivo. Have a great day!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Invoice;