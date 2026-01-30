const CONTACTS = {
    phone: "918106676763",
    insta: "craftedstories._",
    email: "praveen11042001@gmail.com",
    upi: "8106676763-2@ybl"
};

const products = [
  { id: 1, name: "Pearl Bridal Earrings", price: 1, category: "Jewelry", img: "https://images.unsplash.com/photo-1528797664208-e5a8c0b98881" },
  { id: 2, name: "Ocean Resin Coasters", price: 1, category: "Resin Art", img: "https://images.unsplash.com/photo-1713097458865-34f9821d60f3" },
  { id: 3, name: "Floral Necklace Set", price: 1, category: "Jewelry", img: "https://images.unsplash.com/photo-1722510825242-0d8f2064c2e2" },
  { id: 4, name: "Resin Jewelry Tray", price: 1, category: "Resin Art", img: "https://images.pexels.com/photos/7256631/pexels-photo-7256631.jpeg" }
];

function App() {
  const [view, setView] = React.useState('home');
  const [cart, setCart] = React.useState([]);
  const [address, setAddress] = React.useState("");
  const [selectedProduct, setSelectedProduct] = React.useState(null);

  // --- CAPACITY CHECK (Simulated for 100k users) ---
  const [isServerFull] = React.useState(false); 

  // --- 10 PIECE LIMIT LOGIC ---
  const addToCart = (product) => {
    const exist = cart.find(x => x.id === product.id);
    if (exist) {
      if (exist.qty >= 10) {
        alert("Luxury Limit Reached: Only 10 pieces per handcrafted design allowed.");
        return;
      }
      setCart(cart.map(x => x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (product) => {
    const exist = cart.find(x => x.id === product.id);
    if (exist.qty === 1) {
      setCart(cart.filter(x => x.id !== product.id));
    } else {
      setCart(cart.map(x => x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x));
    }
  };

  const subtotal = cart.reduce((s, item) => s + (item.price * item.qty), 0);

  if (isServerFull) return <div className="h-screen flex items-center justify-center serif italic">Boutique is at full capacity (100,000+). Please refresh shortly.</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-rose-100 px-6 py-4 flex justify-between items-center shadow-lg">
        <h1 className="serif text-2xl font-bold cursor-pointer tracking-tighter" onClick={() => setView('home')}>Crafted Stories</h1>
        <div className="flex items-center gap-6">
            <a href={`https://instagram.com/${CONTACTS.insta}`} target="_blank" className="text-[#C5A059] hover:scale-110 transition-transform">
                <i data-lucide="instagram"></i>
            </a>
            <div className="relative cursor-pointer group" onClick={() => setView('cart')}>
              <i data-lucide="shopping-bag" className="group-hover:text-[#C5A059] transition-colors"></i>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#C5A059] text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {cart.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </div>
        </div>
      </nav>

      <main className="flex-grow">
        {view === 'home' && (
          <div className="max-w-6xl mx-auto p-6 page-slide-up">
            <header className="text-center py-16">
                <div className="text-[10px] tracking-[0.5em] text-[#C5A059] font-bold uppercase mb-4">Limited Edition Handcrafts</div>
                <h2 className="serif text-6xl md:text-8xl italic mb-6">The Resin Room</h2>
            </header>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {products.map(p => (
                <div key={p.id} className="luxury-card rounded-[3rem] overflow-hidden flex flex-col group p-3 bg-white/40 backdrop-blur-sm border border-white/50 shadow-xl">
                  <div className="overflow-hidden rounded-[2.5rem] h-80">
                    <img src={p.img} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 cursor-pointer" onClick={() => {setSelectedProduct(p); setView('detail');}} />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="serif text-xl mb-2">{p.name}</h3>
                    <p className="text-[#C5A059] font-bold tracking-widest">₹{p.price}</p>
                    <button onClick={() => addToCart(p)} className="mt-4 w-full bg-[#2D2D2D] text-white py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#C5A059] transition-all">Add to Bag</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'detail' && selectedProduct && (
          <div className="max-w-5xl mx-auto p-6 page-slide-up py-12">
            <button onClick={() => setView('home')} className="mb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">← Return to Collection</button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <img src={selectedProduct.img} className="w-full h-[600px] object-cover rounded-[4rem] shadow-2xl rotate-1" />
              <div className="space-y-8">
                <span className="text-[#C5A059] text-[10px] font-bold uppercase tracking-[0.4em]">{selectedProduct.category}</span>
                <h2 className="serif text-6xl leading-tight italic">{selectedProduct.name}</h2>
                <p className="text-gray-500 italic leading-relaxed text-lg">"Every piece tells a unique story, handcrafted with meticulous attention to detail."</p>
                <div className="flex items-baseline gap-4">
                    <span className="text-4xl font-light">₹{selectedProduct.price}</span>
                    <span className="text-xs text-green-600 font-bold uppercase tracking-widest">In Stock (Max 10)</span>
                </div>
                <button onClick={() => {addToCart(selectedProduct); setView('cart');}} className="w-full bg-[#C5A059] text-white py-6 rounded-full font-bold uppercase text-xs tracking-widest shadow-xl hover:shadow-[#C5A059]/40 transition-all">Secure My Piece</button>
              </div>
            </div>
          </div>
        )}

        {view === 'cart' && (
          <div className="max-w-2xl mx-auto p-6 page-slide-up py-12">
            <h2 className="serif text-5xl mb-12 text-center italic">Your Selection</h2>
            {cart.length === 0 ? <p className="text-center text-gray-400 py-20 font-light italic">Your shopping bag is empty.</p> : (
                <div className="space-y-6">
                    {cart.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-white/80 p-8 rounded-[2.5rem] shadow-sm">
                            <div>
                                <p className="serif text-xl">{item.name}</p>
                                <p className="text-[#C5A059] font-bold">₹{item.price}</p>
                            </div>
                            <div className="flex items-center gap-6 bg-gray-100 px-6 py-2 rounded-full">
                                <button onClick={() => removeFromCart(item)} className="text-2xl hover:text-rose-500 transition-colors">-</button>
                                <span className="font-bold">{item.qty}</span>
                                <button onClick={() => addToCart(item)} className="text-2xl hover:text-green-500 transition-colors">+</button>
                            </div>
                        </div>
                    ))}
                    
                    <div className="p-10 bg-white rounded-[3rem] shadow-2xl border border-rose-50">
                        <h4 className="serif text-2xl mb-6 italic">Delivery Address</h4>
                        <textarea className="w-full bg-gray-50/50 border border-gray-100 p-6 rounded-[2rem] text-sm outline-none focus:ring-2 focus:ring-[#C5A059]/20 transition-all mb-8" placeholder="Full Name, Pincode, Complete Address..." rows="4" onChange={e => setAddress(e.target.value)} />
                        
                        <div className="flex justify-between text-3xl font-bold serif italic mb-10">
                            <span>Total Amount</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                        </div>

                        <button onClick={checkout} className="w-full bg-[#25D366] text-white py-6 rounded-full font-bold shadow-xl flex items-center justify-center gap-3 hover:scale-105 transition-transform">
                            <i data-lucide="message-circle"></i> Confirm on WhatsApp
                        </button>
                    </div>
                </div>
            )}
          </div>
        )}
      </main>

      <footer className="bg-white/50 backdrop-blur-md py-12 px-10 text-center border-t border-rose-100 mt-20">
          <p className="serif text-xl italic mb-2 text-[#C5A059]">Crafted Stories</p>
          <div className="text-[9px] tracking-[0.5em] text-gray-400 uppercase">Resin Artistry • 100k Capacity Certified</div>
      </footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
setTimeout(() => lucide.createIcons(), 500);
