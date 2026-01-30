const CONTACTS = {
    phone: "918106676763",
    insta: "craftedstories._",
    email: "praveen11042001@gmail.com",
    upi: "8106676763-2@ybl"
};

const products = [
  { id: 1, name: "Pearl Bridal Earrings", price: 5, category: "Jewelry", desc: "Hand-wired ivory pearls crafted over 4 hours. A timeless piece for your most special day.", img: "https://images.unsplash.com/photo-1528797664208-e5a8c0b98881" },
  { id: 2, name: "Ocean Resin Coasters", price: 5, category: "Resin Art", desc: "Triple-layered resin with real sea-sand. Brings the tranquility of the ocean to your coffee table.", img: "https://images.unsplash.com/photo-1713097458865-34f9821d60f3" },
  { id: 3, name: "Floral Necklace Set", price: 12, category: "Jewelry", desc: "Real preserved flowers frozen in crystal resin. Nature's beauty, captured forever by hand.", img: "https://images.unsplash.com/photo-1722510825242-0d8f2064c2e2" },
  { id: 4, name: "Resin Jewelry Tray", price: 7, category: "Resin Art", desc: "Liquid gold flakes suspended in custom pigments. The perfect luxury home for your trinkets.", img: "https://images.pexels.com/photos/7256631/pexels-photo-7256631.jpeg" }
];

function App() {
  const [view, setView] = React.useState('home');
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [cart, setCart] = React.useState([]);
  const [address, setAddress] = React.useState("");

  const addToCart = (p) => { setCart([...cart, p]); alert("Added to your collection!"); };

  const checkout = () => {
    if (address.length < 10) return alert("Please provide your full shipping address.");
    const items = cart.map(i => `${i.name}`).join(", ");
    const total = cart.reduce((s, i) => s + i.price, 0);
    const msg = `*NEW ORDER*%0A%0A*Items:* ${items}%0A*Total:* ₹${total}%0A*Address:* ${address}%0A%0APlease share payment QR!`;
    window.open(`https://wa.me/${CONTACTS.phone}?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-rose-100 px-6 py-4 flex justify-between items-center">
        <h1 className="serif text-2xl font-bold cursor-pointer tracking-tight" onClick={() => setView('home')}>Crafted Stories</h1>
        <div className="flex items-center gap-6">
            <a href={`https://instagram.com/${CONTACTS.insta}`} target="_blank" className="hover:text-[#C5A059] transition-colors"><i data-lucide="instagram" className="w-5 h-5"></i></a>
            <div className="relative cursor-pointer group" onClick={() => setView('cart')}>
                <i data-lucide="shopping-bag" className="w-6 h-6 group-hover:text-rose-500"></i>
                {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold animate-bounce">{cart.length}</span>}
            </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {view === 'home' && (
          <div className="max-w-6xl mx-auto p-6 page-anim">
            <header className="text-center py-16">
                <span className="text-[#C5A059] uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">Authentic Sister-Made Art</span>
                <h2 className="serif text-5xl md:text-7xl italic mb-6">Designed to Connect</h2>
                <p className="max-w-xl mx-auto text-gray-400 font-light leading-relaxed">By Jyothi & Preethi Reddy. Transforming resilience into wearable luxury.</p>
            </header>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map(p => (
                <div key={p.id} className="glass-card rounded-[2.5rem] overflow-hidden flex flex-col group">
                  <div className="relative overflow-hidden">
                    <img src={p.img} className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-110 cursor-pointer" onClick={() => {setSelectedProduct(p); setView('detail');}} />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="serif text-lg mb-1">{p.name}</h3>
                    <p className="text-[#C5A059] font-bold mb-5">₹{p.price}</p>
                    <div className="flex gap-2">
                        <button onClick={() => addToCart(p)} className="flex-1 border border-gray-200 py-3 rounded-2xl text-[9px] font-bold uppercase tracking-widest hover:bg-white transition-all">Add</button>
                        <button onClick={() => {setCart([p]); setView('cart');}} className="flex-1 bg-black text-white py-3 rounded-2xl text-[9px] font-bold uppercase tracking-widest">Buy</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'detail' && selectedProduct && (
          <div className="max-w-5xl mx-auto p-6 page-anim py-12">
            <button onClick={() => setView('home')} className="mb-8 text-[10px] font-bold uppercase tracking-widest text-gray-400">← Back to Shop</button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white/90 p-10 rounded-[3.5rem] shadow-2xl backdrop-blur-md">
              <img src={selectedProduct.img} className="w-full h-[550px] object-cover rounded-[2.5rem] shadow-lg" />
              <div className="flex flex-col justify-center">
                <span className="text-rose-400 uppercase tracking-widest text-[10px] font-bold mb-4">{selectedProduct.category}</span>
                <h2 className="serif text-5xl mb-6 leading-tight">{selectedProduct.name}</h2>
                <p className="text-3xl text-[#C5A059] mb-8 font-light italic">₹{selectedProduct.price}</p>
                <p className="bg-rose-50/50 p-6 rounded-3xl text-gray-600 leading-relaxed italic mb-10 border-l-4 border-[#C5A059]">"{selectedProduct.desc}"</p>
                <button onClick={() => {setCart([...cart, selectedProduct]); setView('cart');}} className="btn-luxury py-5 rounded-full font-bold uppercase text-[10px] tracking-widest">Add to My Story</button>
              </div>
            </div>
          </div>
        )}

        {view === 'cart' && (
          <div className="max-w-xl mx-auto p-6 page-anim py-12">
            <h2 className="serif text-4xl mb-12 text-center italic tracking-tight">Your Selection</h2>
            {cart.length === 0 ? (
                <div className="text-center py-20 bg-white/50 rounded-[3rem]">
                    <p className="text-gray-400 text-xs uppercase tracking-widest mb-6">Your bag is empty</p>
                    <button onClick={() => setView('home')} className="text-rose-500 font-bold underline">Go Shopping</button>
                </div>
            ) : (
                <div className="space-y-4">
                    {cart.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-white/80 p-6 rounded-2xl shadow-sm border border-white/50">
                            <span className="font-semibold text-sm">{item.name}</span>
                            <span className="text-rose-500 font-bold">₹{item.price}</span>
                        </div>
                    ))}
                    <div className="mt-12 bg-white/90 p-8 rounded-[2.5rem] shadow-inner border border-rose-100">
                        <p className="serif text-xl mb-4 italic font-bold">Shipping Address</p>
                        <textarea className="w-full bg-gray-50/50 border-none p-5 rounded-2xl text-sm outline-none focus:ring-1 focus:ring-[#C5A059]" placeholder="Enter full address, city & pincode..." rows="4" onChange={e => setAddress(e.target.value)} />
                    </div>
                    {address.length > 5 && (
                        <div className="mt-10 animate-fade-in">
                            <div className="flex justify-between text-2xl font-bold mb-10 italic px-4">
                                <span>Grand Total</span>
                                <span>₹{cart.reduce((s, i) => s + i.price, 0)}</span>
                            </div>
                            <button onClick={checkout} className="w-full bg-[#25D366] text-white py-6 rounded-full font-bold shadow-2xl flex items-center justify-center gap-3 hover:scale-105 transition-transform">
                                <i data-lucide="whatsapp"></i> Confirm via WhatsApp
                            </button>
                        </div>
                    )}
                </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-20 px-10 mt-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center md:text-left">
            <div>
                <h4 className="serif text-3xl mb-6">Crafted Stories</h4>
                <p className="text-gray-500 font-light text-sm leading-relaxed">Handmade with effort and love in Andhra Pradesh. Shipping quality resin art across India.</p>
            </div>
            <div className="space-y-4">
                <h5 className="text-[#C5A059] uppercase tracking-widest text-[10px] font-bold mb-6">Get in Touch</h5>
                <a href={`tel:+${CONTACTS.phone}`} className="block text-sm text-gray-400 hover:text-white">Call: +{CONTACTS.phone}</a>
                <a href={`mailto:${CONTACTS.email}`} className="block text-sm text-gray-400 hover:text-white">Email: {CONTACTS.email}</a>
                <a href={`https://instagram.com/${CONTACTS.insta}`} className="block text-sm text-gray-400 hover:text-white">Insta: @{CONTACTS.insta}</a>
            </div>
            <div>
                <h5 className="text-[#C5A059] uppercase tracking-widest text-[10px] font-bold mb-6">Payment Info</h5>
                <p className="text-sm text-gray-400 mb-2">Secure UPI ID:</p>
                <code className="bg-white/10 px-3 py-1 rounded text-xs text-[#C5A059]">{CONTACTS.upi}</code>
            </div>
        </div>
      </footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
setTimeout(() => lucide.createIcons(), 500);
