const PHONE = "918106676763";
const INSTA_ID = "craftedstories._";
const EMAIL = "praveen11042001@gmail.com";

const products = [
  { id: 1, name: "Pearl Bridal Earrings", price: 599, category: "Jewelry", img: "https://images.unsplash.com/photo-1528797664208-e5a8c0b98881" },
  { id: 2, name: "Ocean Resin Coasters", price: 599, category: "Resin", img: "https://images.unsplash.com/photo-1713097458865-34f9821d60f3" },
  { id: 3, name: "Floral Necklace Set", price: 1299, category: "Jewelry", img: "https://images.unsplash.com/photo-1722510825242-0d8f2064c2e2" },
  { id: 4, name: "Resin Jewelry Tray", price: 799, category: "Resin", img: "https://images.pexels.com/photos/7256631/pexels-photo-7256631.jpeg" }
];

function App() {
  const [address, setAddress] = React.useState("");
  const [filter, setFilter] = React.useState("All");

  const handleOrder = (pName, pPrice, isInstant) => {
    if (!address.trim()) {
      alert("Kindly provide your shipping address first so we can assist you better.");
      return;
    }
    const message = isInstant 
      ? `Hi Crafted Stories! 🌟%0A%0A*NEW ORDER*%0AI wish to purchase *${pName}* (₹${pPrice}) right now.%0A%0A*Shipping Details:* ${address}%0A%0APlease share your payment QR code.`
      : `Hi Crafted Stories! 🌸%0A%0AIs *${pName}* (₹${pPrice}) available for shipping?%0A%0AMy Address: ${address}`;

    window.open(`https://wa.me/${PHONE}?text=${message}`, '_blank');
  };

  const filteredItems = filter === "All" ? products : products.filter(p => p.category === filter);

  return (
    <div className="min-h-screen">
      <nav className="glass-nav flex justify-between items-center px-8 py-4 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <i data-lucide="sparkles" className="text-[#C5A059]"></i>
          <h1 className="serif text-2xl font-bold tracking-tight">Crafted Stories</h1>
        </div>
        <div className="flex gap-6 items-center">
            <a href={`https://instagram.com/${INSTA_ID}`} target="_blank"><i data-lucide="instagram" className="w-5 h-5"></i></a>
            <a href={`tel:+91${PHONE}`} className="bg-[#C5A059] text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">Call Us</a>
        </div>
      </nav>

      <section className="text-center py-20 px-6 bg-white">
        <span className="text-[#C5A059] uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Handmade Excellence</span>
        <h2 className="serif text-5xl md:text-7xl mb-6 italic">Where hearts connect</h2>
        <p className="max-w-xl mx-auto text-gray-400 font-light leading-relaxed">By Jyothi & Preethi Reddy. Dedicated to transforming resilience into wearable art.</p>
        
        <div className="mt-12 max-w-lg mx-auto">
            <div className="bg-[#FFF5F6] p-6 rounded-2xl border border-[#C5A059]/20 shadow-sm">
                <p className="serif text-left mb-2 italic">1. Your Shipping Details</p>
                <textarea 
                    className="w-full p-4 rounded-xl border-none focus:ring-1 focus:ring-[#C5A059] outline-none text-sm"
                    placeholder="Enter Full Address..."
                    rows="2"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
        </div>
      </section>

      <section className="px-8 py-10">
        <div className="flex justify-center gap-4 mb-10">
            {["All", "Jewelry", "Resin"].map(cat => (
                <button 
                    key={cat} 
                    onClick={() => setFilter(cat)}
                    className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${filter === cat ? 'bg-[#2D2D2D] text-white' : 'bg-white text-gray-400 border border-gray-100'}`}
                >
                    {cat}
                </button>
            ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {filteredItems.map(p => (
            <div key={p.id} className="product-card rounded-3xl overflow-hidden flex flex-col">
              <div className="relative overflow-hidden group">
                <img src={p.img} alt={p.name} className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter">{p.category}</div>
              </div>
              <div className="p-6">
                <h3 className="serif text-xl mb-1">{p.name}</h3>
                <p className="text-[#C5A059] font-bold text-lg mb-6">₹{p.price}</p>
                <div className="space-y-3">
                    <button onClick={() => handleOrder(p.name, p.price, true)} className="btn-luxury w-full py-4 rounded-xl font-bold text-xs uppercase tracking-widest">Order & Pay Now</button>
                    <button onClick={() => handleOrder(p.name, p.price, false)} className="w-full py-2 text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-transparent hover:border-gray-200">Enquire Availability</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-[#2D2D2D] text-white py-20 px-10 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center md:text-left">
            <div>
                <h4 className="serif text-3xl mb-6">Crafted Stories</h4>
                <p className="text-gray-500 font-light text-sm">Every piece tells a story of survival, independence, and the bond between two sisters.</p>
            </div>
            <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-[#C5A059]">Quick Contact</h4>
                <div className="space-y-4 text-sm font-light">
                    <a href={`tel:+91${PHONE}`} className="block hover:text-[#C5A059] transition-colors">Call: +91 {PHONE}</a>
                    <a href={`mailto:${EMAIL}`} className="block hover:text-[#C5A059] transition-colors">Email Us</a>
                    <a href={`https://instagram.com/${INSTA_ID}`} className="block hover:text-[#C5A059] transition-colors">Instagram</a>
                </div>
            </div>
            <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-[#C5A059]">Location</h4>
                <p className="text-sm font-light text-gray-500 italic">Operating from the heart of Andhra Pradesh, shipping throughout India.</p>
            </div>
        </div>
      </footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
setTimeout(() => lucide.createIcons(), 500);
