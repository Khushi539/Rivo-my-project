import React, { useState, useEffect } from 'react';
import { Ticket, Copy, CheckCircle2, Calendar, AlertCircle } from 'lucide-react';
import { GetOffers } from '../API/productapi';

const OffersPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

 useEffect(() => {
  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const response = await GetOffers(); 
      
      const data = Array.isArray(response) ? response : response.data || [];
      
      setCoupons(data.filter(c => !c.isDeleted));
    } catch (error) {
      console.error("Failed to fetch offers:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchCoupons();
}, []);

  const copyToClipboard = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl  mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl text-[#0D542B] font-medium tracking-tight mb-2">Rivo <span className="text-[#7BF1A8]">Privilege</span></h1>
          <p className="text-neutral-700">Your active rewards and seasonal shopping vouchers.</p>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map(i => <div key={i} className="h-48 bg-neutral-900 rounded-3xl" />)}
          </div>
        ) : (
          <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {coupons.map((coupon) => (
              <div 
                key={coupon._id}
                className="relative group bg-[#DFF5E6] border border-neutral-800 rounded-3xl p-6 transition-all hover:border-indigo-500/50 hover:shadow-[0_0_30px_-10px_rgba(99,102,241,0.2)]"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-green-300 rounded-2xl text-[#0D542B]">
                    <Ticket size={28} />
                  </div>
                  <div className="text-right">
                    <span className="text-3xl  text-[#0D542B]">{coupon.discount}%</span>
                    <p className="text-xs text-neutral-500 uppercase font-bold tracking-widest">Discount</p>
                  </div>
                </div>

                {/* Info */}
                <h3 className="text-xl font-bold mb-1 truncate text-[#0D542B]">{coupon.schemeName}</h3>
                <div className="flex items-center gap-2 text-neutral-400 text-sm mb-6">
                  <Calendar size={14} />
                  <span>Ends {new Date(coupon.validTill).toLocaleDateString()}</span>
                </div>

                {/* Code Box */}
                <div className="relative flex items-center bg-[#0D542B] rounded-2xl p-1 border border-neutral-800 group-hover:border-neutral-700 transition-colors">
                  <code className="flex-1 px-4 font-mono font-bold text-white">
                    {coupon.couponCode}
                  </code>
                  <button 
                    onClick={() => copyToClipboard(coupon.couponCode, coupon._id)}
                    className={`px-4 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${copiedId === coupon._id ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-neutral-200'}`}
                  >
                    {copiedId === coupon._id ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                    {copiedId === coupon._id ? 'Copied' : 'Copy'}
                  </button>
                </div>

                {/* Decorative cutouts for "Ticket" look */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#0a0a0a] rounded-full border-r border-neutral-800" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#0a0a0a] rounded-full border-l border-neutral-800" />
              </div>
            ))}
          </div>
        )}

        {coupons.length === 0 && !loading && (
          <div className="text-center py-20 bg-neutral-900/50 rounded-3xl border border-dashed border-neutral-800">
            <AlertCircle className="mx-auto mb-4 text-neutral-600" size={48} />
            <p className="text-neutral-500">No active offers found. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OffersPage;