const CONTACTS = {
    phone: "918106676763",
    insta: "craftedstories._",
    email: "praveen11042001@gmail.com"
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
  const [filter, setFilter] = React.useState('All');
  const [reviews] = React.useState([{name: "Sneha", text: "Stunning quality!", stars: 5}]);

  // --- STABLE CART LOGIC ---
  const addToCart = (product, redirect = false) => {
    setCart(prevCart => {
      const exist = prevCart.find(x => x.id === product.id);
      if (exist) {
        if (exist.qty >= 10) { alert("Max limit 10 reached"); return prevCart; }
        return prevCart.map(x => x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x);
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
    if (redirect) setView('cart');
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const exist = prevCart.find(x => x.id === productId);
      if (!exist) return prevCart;
      if (exist.qty === 1) {
        return prevCart.filter(x => x.id !== productId);
      } else {
        return prevCart.map(x => x.id === productId ? { ...exist, qty: exist.qty - 1 } : x);
      }
    });
  };

  const subtotal = cart.reduce((s, i) => s + (i.price * i.qty), 0);
  const filteredProducts = filter === 'All' ? products : products.filter(p => p.category === filter);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="resin-bg-overlay"></div>
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-72 bg-white/95 border-r border-rose-100 p-8 flex flex-col z-50">
        <h1 className="serif text-3xl font-bold mb-10 cursor-pointer" onClick={() => setView('home')}>Crafted Stories</h1>
        <nav className="space-y-4 flex-grow">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Collections</p>
            {['All', 'Jewelry', 'Resin Art'].map(cat => (
                <button key={cat} onClick={() => {setFilter(cat); setView('home');}} className={`block w-full text-left text-sm ${filter === cat ? 'text-[#C5A059] font-bold' : 'text-gray-500'}`}>{cat}</button>
            ))}
        </nav>
        <div className="pt-8 border-t space-y-2 text-xs text-gray-500">
            <p className="font-bold text-black uppercase text-[9px]">Contact</p>
            <p>Ph: +{CONTACTS.phone}</p>
            <p>{CONTACTS.email}</p>
            <a href={`https://instagram.com/${CONTACTS.insta}`} className="text-[#C5A059] font-bold block">@ {CONTACTS.insta}</a>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-grow h-screen overflow-y-auto p-6 md:p-12 relative">
        <div className="flex justify-between items-center mb-10">
            <h2 className="serif text-4xl italic">{view === 'cart' ? 'My Bag' : filter}</h2>
            <div className="relative cursor-pointer bg-white p-3 rounded-full shadow-md" onClick={() => setView('cart')}>
                <i data-lucide="shopping-bag"></i>
                {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">{cart.reduce((a,c)=>a+c.qty,0)}</span>}
            </div>
        </div>

        {view === 'home' && (
          <div className="page-slide-up grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(p => (
              <div key={p.id} className="luxury-card rounded-[2rem] bg-white/70 p-4 shadow-lg">
                <img src={p.img} className="h-64 w-full object-cover rounded-[1.5rem] cursor-pointer" onClick={() => {setSelectedProduct(p); setView('detail');}} />
                <div className="p-4 text-center">
                  <h3 className="serif text-lg">{p.name}</h3>
                  <p className="text-[#C5A059] font-bold mb-4">₹{p.price}</p>
                  <div className="flex gap-2">
                    <button onClick={() => addToCart(p)} className="flex-1 border border-black text-[9px] py-2 rounded-full font-bold uppercase">Add</button>
                    <button onClick={() => addToCart(p, true)} className="flex-1 bg-black text-white text-[9px] py-2 rounded-full font-bold uppercase">Buy Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {view === 'detail' && selectedProduct && (
          <div className="page-slide-up max-w-4xl mx-auto bg-white/90 p-8 rounded-[3rem] shadow-2xl flex flex-col md:flex-row gap-10">
            <img src={selectedProduct.img} className="w-full md:w-1/2 h-96 object-cover rounded-[2rem]" />
            <div className="flex-1 space-y-6">
                <button onClick={() => setView('home')} className="text-[10px] font-bold text-gray-400">← BACK</button>
                <h2 className="serif text-5xl">{selectedProduct.name}</h2>
                <p className="text-2xl text-[#C5A059]">₹{selectedProduct.price}</p>
                <div className="flex flex-col gap-3">
                    <button onClick={() => addToCart(selectedProduct)} className="w-full border border-black py-4 rounded-full font-bold text-[10px]">ADD TO BAG</button>
                    <button onClick={() => addToCart(selectedProduct, true)} className="w-full bg-black text-white py-4 rounded-full font-bold text-[10px]">BUY NOW</button>
                </div>
            </div>
          </div>
        )}

        {view === 'cart' && (
          <div className="max-w-xl mx-auto page-slide-up space-y-6">
            {cart.length === 0 ? <p className="text-center py-20 italic">Bag is empty</p> : (
              <>
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm">
                    <span className="font-bold">{item.name}</span>
                    <div className="flex items-center gap-4 bg-gray-50 px-4 py-1 rounded-full border">
                        <button onClick={() => removeFromCart(item.id)} className="text-xl font-bold">-</button>
                        <span className="font-bold">{item.qty}</span>
                        <button onClick={() => addToCart(item)} className="text-xl font-bold">+</button>
                    </div>
                  </div>
                ))}
                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl">
                    <textarea className="w-full border p-4 rounded-xl mb-4 text-sm" placeholder="Full Address..." rows="3" onChange={e => setAddress(e.target.value)} />
                    <div className="flex justify-between text-2xl font-bold serif italic mb-6"><span>Total</span><span>₹{subtotal}</span></div>
                    <button onClick={() => window.open(`https://wa.me/${CONTACTS.phone}?text=Order: ${cart.map(i=>`${i.name} x${i.qty}`).join(',')}%0ATotal: ₹${subtotal}%0AAddress: ${address}`)} className="w-full bg-[#25D366] text-white py-4 rounded-full font-bold">WhatsApp Order</button>
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
setTimeout(() => lucide.createIcons(), 500);
