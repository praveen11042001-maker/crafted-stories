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
  const [filter, setFilter] = React.useState('All');
  const [reviews, setReviews] = React.useState([{name: "Sneha", text: "The ocean coasters look so real!", stars: 5}]);

  const addToCart = (product, redirect = false) => {
    const exist = cart.find(x => x.id === product.id);
    if (exist && exist.qty >= 10) return alert("Limit 10 per design.");
    setCart(exist ? cart.map(x => x.id === product.id ? {...exist, qty: exist.qty + 1} : x) : [...cart, {...product, qty: 1}]);
    if (redirect) setView('cart');
  };

  const filteredProducts = filter === 'All' ? products : products.filter(p => p.category === filter);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="resin-bg-overlay"></div>
      
      {/* --- SIDEBAR --- */}
      <aside className="w-full md:w-72 bg-white/95 backdrop-blur-md border-r border-rose-100 p-8 flex flex-col z-50">
        <h1 className="serif text-3xl font-bold mb-10 cursor-pointer tracking-tighter" onClick={() => setView('home')}>Crafted Stories</h1>
        
        <nav className="space-y-6 flex-grow">
            <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-4">Collections</p>
                {['All', 'Jewelry', 'Resin Art'].map(cat => (
                    <button key={cat} onClick={() => {setFilter(cat); setView('home');}} className={`block w-full text-left py-2 text-sm transition-all ${filter === cat ? 'text-[#C5A059] font-bold translate-x-2' : 'text-gray-500 hover:text-black'}`}>{cat}</button>
                ))}
            </div>
        </nav>

        <div className="pt-8 border-t border-rose-100 space-y-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Contact Us</p>
            <div className="text-xs text-gray-600 space-y-2">
                <p className="flex items-center gap-2"><i data-lucide="phone" className="w-3"></i> +{CONTACTS.phone}</p>
                <p className="flex items-center gap-2"><i data-lucide="mail" className="w-3"></i> {CONTACTS.email}</p>
                <a href={`https://instagram.com/${CONTACTS.insta}`} className="flex items-center gap-2 text-[#C5A059] font-bold"><i data-lucide="instagram" className="w-3"></i> @{CONTACTS.insta}</a>
            </div>
        </div>
      </aside>

      {/* --- MAIN AREA --- */}
      <main className="flex-grow h-screen overflow-y-auto p-6 md:p-12">
        {/* Navigation Bar */}
        <div className="flex justify-between items-center mb-12">
            <h2 className="serif text-4xl italic text-gray-800">{view === 'cart' ? 'Checkout' : filter}</h2>
            <div className="relative cursor-pointer p-3 bg-white rounded-full shadow-md" onClick={() => setView('cart')}>
                <i data-lucide="shopping-bag" className="w-5 h-5"></i>
                {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-[#C5A059] text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold">{cart.reduce((a,c)=>a+c.qty,0)}</span>}
            </div>
        </div>

        {/* HOME VIEW */}
        {view === 'home' && (
          <div className="page-slide-up">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredProducts.map(p => (
                <div key={p.id} className="luxury-card rounded-[2.5rem] bg-white/70 p-4 shadow-xl group border border-white">
                  <img src={p.img} className="h-80 w-full object-cover rounded-[2rem] cursor-pointer" onClick={() => {setSelectedProduct(p); setView('detail');}} />
                  <div className="p-6 text-center">
                    <h3 className="serif text-xl mb-2">{p.name}</h3>
                    <p className="text-[#C5A059] font-bold mb-6 italic">₹{p.price}</p>
                    <div className="flex gap-3">
                        <button onClick={() => addToCart(p)} className="flex-1 border border-black text-[10px] py-3 rounded-full uppercase font-bold hover:bg-black hover:text-white transition-all">Add to Bag</button>
                        <button onClick={() => addToCart(p, true)} className="flex-1 bg-black text-white text-[10px] py-3 rounded-full uppercase font-bold shadow-lg">Buy Now</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Q&A and Reviews Section */}
            <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-16 pb-20">
                <div>
                    <h3 className="serif text-3xl mb-8 border-b pb-4">Customer Love</h3>
                    <div className="space-y-4">
                        {reviews.map((r, i) => (
                            <div key={i} className="bg-white/50 p-6 rounded-[2rem] border border-white">
                                <p className="font-bold text-xs mb-1 text-[#C5A059]">{r.name} ⭐⭐⭐⭐⭐</p>
                                <p className="text-sm text-gray-600 italic">"{r.text}"</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="serif text-3xl mb-8 border-b pb-4">FAQs</h3>
                    <div className="space-y-4">
                        <details className="group bg-white/50 p-4 rounded-2xl border border-white cursor-pointer">
                            <summary className="font-bold text-sm">Is it handmade?</summary>
                            <p className="mt-3 text-sm text-gray-500">Yes, every single piece is poured and polished by hand.</p>
                        </details>
                    </div>
                </div>
            </div>
          </div>
        )}

        {/* DETAIL VIEW - FIXED BLANK PAGE ISSUE */}
        {view === 'detail' && selectedProduct && (
          <div className="page-slide-up max-w-4xl mx-auto">
            <button onClick={() => setView('home')} className="mb-8 text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-black">← Back to Gallery</button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white/90 p-10 rounded-[3.5rem] shadow-2xl items-center">
              <img src={selectedProduct.img} className="w-full h-[500px] object-cover rounded-[2.5rem]" />
              <div className="space-y-6">
                <span className="text-[#C5A059] text-[10px] font-bold uppercase tracking-[0.3em]">{selectedProduct.category}</span>
                <h2 className="serif text-5xl italic">{selectedProduct.name}</h2>
                <p className="text-3xl font-light">₹{selectedProduct.price}</p>
                <p className="text-gray-500 italic leading-relaxed">"Individually crafted resin art designed to bring luxury to your everyday life."</p>
                <div className="flex flex-col gap-4 pt-4">
                    <button onClick={() => addToCart(selectedProduct)} className="w-full border border-black py-4 rounded-full font-bold uppercase text-[10px] tracking-widest hover:bg-black hover:text-white">Add to Bag</button>
                    <button onClick={() => addToCart(selectedProduct, true)} className="w-full bg-black text-white py-4 rounded-full font-bold uppercase text-[10px] tracking-widest shadow-xl">Buy Now</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CART VIEW */}
        {view === 'cart' && (
          <div className="max-w-xl mx-auto page-slide-up pb-20">
            {cart.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-gray-400 mb-6 italic">Your bag is empty.</p>
                    <button onClick={() => setView('home')} className="text-[#C5A059] font-bold underline">Go Shopping</button>
                </div>
            ) : (
                <div className="space-y-6">
                    {cart.map((item, i) => (
                        <div key={i} className="flex justify-between items-center bg-white p-6 rounded-[2rem] shadow-sm border border-rose-50">
                            <div>
                                <p className="font-bold">{item.name}</p>
                                <p className="text-[#C5A059] text-sm">₹{item.price}</p>
                            </div>
                            <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-full border">
                                <button onClick={() => removeFromCart(item)} className="font-bold text-lg">-</button>
                                <span className="font-bold text-sm">{item.qty}</span>
                                <button onClick={() => addToCart(item)} className="font-bold text-lg">+</button>
                            </div>
                        </div>
                    ))}
                    <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-rose-50 mt-10">
                        <h4 className="serif text-2xl mb-6 italic">Shipping Address</h4>
                        <textarea className="w-full bg-gray-50/50 border border-gray-100 p-6 rounded-[2rem] text-sm mb-8 outline-none focus:ring-2 focus:ring-[#C5A059]/10" placeholder="Full Name, Pincode, Complete Address..." rows="4" onChange={e => setAddress(e.target.value)} />
                        <div className="flex justify-between text-3xl font-bold serif mb-10 border-t pt-6 italic">
                            <span>Total</span>
                            <span>₹{cart.reduce((s,i)=>s+(i.price*i.qty),0)}</span>
                        </div>
                        <button onClick={() => { if(address.length < 10) return alert("Please enter full address"); window.open(`https://wa.me/${CONTACTS.phone}?text=Order Details:%0A${cart.map(i=>`${i.name} x${i.qty}`).join('%0A')}%0ATotal: ₹${cart.reduce((s,i)=>s+(i.price*i.qty),0)}%0AAddr: ${address}`); }} className="w-full bg-[#25D366] text-white py-6 rounded-full font-bold shadow-xl flex items-center justify-center gap-3">
                            <i data-lucide="message-circle"></i> Place Order on WhatsApp
                        </button>
                    </div>
                </div>
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
