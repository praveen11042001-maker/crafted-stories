const CONTACTS = {
    phone: "918106676763",
    insta: "craftedstories._",
    email: "praveen11042001@gmail.com",
    upi: "8106676763-2@ybl"
};

const products = [
  { id: 1, name: "Pearl Bridal Earrings", price: 1, category: "Jewelry", desc: "Hand-wired ivory pearls crafted over 4 hours. A timeless piece for your most special day.", img: "https://images.unsplash.com/photo-1528797664208-e5a8c0b98881" },
  { id: 2, name: "Ocean Resin Coasters", price: 1, category: "Resin Art", desc: "Triple-layered resin with real sea-sand. Brings the tranquility of the ocean to your coffee table.", img: "https://images.unsplash.com/photo-1713097458865-34f9821d60f3" },
  { id: 3, name: "Floral Necklace Set", price: 1, category: "Jewelry", desc: "Real preserved flowers frozen in crystal resin. Nature's beauty, captured forever by hand.", img: "https://images.unsplash.com/photo-1722510825242-0d8f2064c2e2" },
  { id: 4, name: "Resin Jewelry Tray", price: 1, category: "Resin Art", desc: "Liquid gold flakes suspended in custom pigments. The perfect luxury home for your trinkets.", img: "https://images.pexels.com/photos/7256631/pexels-photo-7256631.jpeg" }
];

function App() {
  const [view, setView] = React.useState('home');
  const [cart, setCart] = React.useState([]);
  const [address, setAddress] = React.useState("");
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [couponInput, setCouponInput] = React.useState("");
  const [isDiscounted, setIsDiscounted] = React.useState(false);

  const subtotal = cart.reduce((s, i) => s + i.price, 0);
  const discountAmount = isDiscounted ? (subtotal * 0.10) : 0;
  const finalTotal = subtotal - discountAmount;

  const applyCoupon = () => {
    if (couponInput.toUpperCase() === "FIRST10") {
        setIsDiscounted(true);
        alert("10% Discount Applied ✨");
    } else {
        alert("Invalid Coupon");
    }
  };

  const checkout = () => {
    if (address.length < 10) return alert("Please enter full address.");
    const items = cart.map(i => i.name).join(", ");
    const msg = `*NEW ORDER*%0A%0A*Items:* ${items}%0A*Total:* ₹${finalTotal}%0A*Address:* ${address}`;
    window.open(`https://wa.me/${CONTACTS.phone}?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-rose-100 px-6 py-4 flex justify-between items-center">
        <h1 className="serif text-2xl font-bold cursor-pointer" onClick={() => setView('home')}>Crafted Stories</h1>
        <div className="relative cursor-pointer" onClick={() => setView('cart')}>
          <i data-lucide="shopping-bag"></i>
          {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">{cart.length}</span>}
        </div>
      </nav>

      <main className="flex-grow">
        {view === 'home' && (
          <div className="max-w-6xl mx-auto p-6 page-anim">
            <header className="text-center py-12">
                <div className="inline-block bg-gold/10 text-[#C5A059] px-4 py-1 rounded-full text-[10px] font-bold tracking-widest mb-4">
                   CODE: FIRST10
                </div>
                <h2 className="serif text-6xl italic mb-4">Artisanal Resin</h2>
            </header>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map(p => (
                <div key={p.id} className="glass-card rounded-[2.5rem] overflow-hidden flex flex-col group p-2">
                  <img src={p.img} className="h-64 w-full object-cover rounded-[2rem] cursor-pointer" onClick={() => {setSelectedProduct(p); setView('detail');}} />
                  <div className="p-6 text-center">
                    <h3 className="serif text-lg">{p.name}</h3>
                    <p className="text-[#C5A059] font-bold mb-4">₹{p.price}</p>
                    <button onClick={() => setCart([...cart, p])} className="w-full bg-black text-white py-3 rounded-xl text-[9px] font-bold uppercase tracking-widest">Add to Bag</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'detail' && selectedProduct && (
            <div className="max-w-5xl mx-auto p-6 page-anim py-12">
                <button onClick={() => setView('home')} className="mb-4 text-xs font-bold text-gray-400">← Back</button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white/95 p-10 rounded-[3.5rem] shadow-2xl">
                    <img src={selectedProduct.img} className="w-full h-[500px] object-cover rounded-[2.5rem]" />
                    <div className="flex flex-col justify-center">
                        <h2 className="serif text-5xl mb-6">{selectedProduct.name}</h2>
                        <p className="text-[#C5A059] font-bold text-2xl mb-8">₹{selectedProduct.price}</p>
                        <p className="text-gray-500 italic mb-10 border-l-2 border-gold pl-4">"{selectedProduct.desc}"</p>
                        <button onClick={() => {setCart([...cart, selectedProduct]); setView('cart');}} className="bg-black text-white py-5 rounded-full font-bold uppercase text-[10px] tracking-widest">Buy Now</button>
                    </div>
                </div>
            </div>
        )}

        {view === 'cart' && (
          <div className="max-w-xl mx-auto p-6 page-anim py-12">
            <h2 className="serif text-4xl mb-12 text-center italic">Shopping Bag</h2>
            {cart.length > 0 && (
                <div className="coupon-box p-6 rounded-3xl mb-8 flex gap-4 items-center">
                    <input className="flex-grow bg-transparent border-b border-gray-300 py-2 outline-none text-sm uppercase" placeholder="FIRST10" onChange={(e) => setCouponInput(e.target.value)} />
                    <button onClick={applyCoupon} className="bg-[#C5A059] text-white px-6 py-2 rounded-xl text-[10px] font-bold">APPLY</button>
                </div>
            )}
            {cart.length === 0 ? <p className="text-center text-gray-400 py-20">Empty.</p> : (
                <div className="space-y-4">
                    {cart.map((item, idx) => (
                        <div key={idx} className="flex justify-between bg-white/90 p-6 rounded-2xl shadow-sm">
                            <span className="font-semibold text-sm">{item.name}</span>
                            <span className="font-bold">₹{item.price}</span>
                        </div>
                    ))}
                    <div className="p-8 bg-white/95 rounded-[2.5rem] mt-10 shadow-sm">
                        <div className="flex justify-between text-2xl font-bold serif italic mb-8">
                            <span>Total</span>
                            <span>₹{finalTotal.toFixed(2)}</span>
                        </div>
                        <textarea className="w-full bg-gray-50 border-none p-5 rounded-2xl text-sm mb-6 outline-none" placeholder="Delivery Address..." rows="3" onChange={e => setAddress(e.target.value)} />
                        <button onClick={checkout} className="w-full bg-[#25D366] text-white py-6 rounded-full font-bold shadow-xl flex items-center justify-center gap-3 hover:scale-105 transition-transform">
                            <i data-lucide="whatsapp"></i> Confirm via WhatsApp
                        </button>
                    </div>
                </div>
            )}
          </div>
        )}
      </main>

      <footer className="bg-black text-white py-12 px-10">
          <div className="max-w-6xl mx-auto text-center opacity-50 text-[10px] tracking-widest">
              <p>CRAFTED STORIES • HANDMADE WITH LOVE</p>
          </div>
      </footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
setTimeout(() => lucide.createIcons(), 500);
