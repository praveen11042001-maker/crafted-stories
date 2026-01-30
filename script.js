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
  
  // Reviews & Q&A States
  const [reviews, setReviews] = React.useState([{name: "Ananya", text: "Absolutely stunning work! The pearls are high quality.", stars: 5}]);
  const [reviewInput, setReviewInput] = React.useState({name: "", text: ""});

  const addToCart = (product, redirect = false) => {
    const exist = cart.find(x => x.id === product.id);
    if (exist && exist.qty >= 10) return alert("Limit 10 per piece.");
    setCart(exist ? cart.map(x => x.id === product.id ? {...exist, qty: exist.qty + 1} : x) : [...cart, {...product, qty: 1}]);
    if (redirect) setView('cart');
  };

  const filteredProducts = filter === 'All' ? products : products.filter(p => p.category === filter);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* --- SIDEBAR NAVIGATION --- */}
      <aside className="w-full md:w-64 bg-white/90 backdrop-blur-md border-r border-rose-100 p-6 flex flex-col z-50">
        <h1 className="serif text-2xl font-bold mb-10 cursor-pointer" onClick={() => setView('home')}>Crafted Stories</h1>
        
        <nav className="space-y-4 flex-grow">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Collections</p>
            {['All', 'Jewelry', 'Resin Art'].map(cat => (
                <button key={cat} onClick={() => {setFilter(cat); setView('home');}} className={`block text-sm ${filter === cat ? 'text-[#C5A059] font-bold' : 'text-gray-500'} hover:text-[#C5A059]`}>{cat}</button>
            ))}
        </nav>

        <div className="mt-10 pt-6 border-t border-rose-50 space-y-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Contact Us</p>
            <a href={`https://wa.me/${CONTACTS.phone}`} className="flex items-center gap-2 text-xs text-gray-600"><i data-lucide="phone" className="w-3"></i> Support</a>
            <a href={`https://instagram.com/${CONTACTS.insta}`} className="flex items-center gap-2 text-xs text-gray-600"><i data-lucide="instagram" className="w-3"></i> Instagram</a>
            <p className="text-[9px] text-gray-400 truncate">{CONTACTS.email}</p>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-grow relative h-screen overflow-y-auto p-6 md:p-12">
        {view === 'home' && (
          <div className="page-slide-up">
            <div className="flex justify-between items-center mb-10">
                <h2 className="serif text-4xl italic">{filter} Designs</h2>
                <div className="relative cursor-pointer" onClick={() => setView('cart')}>
                    <i data-lucide="shopping-bag"></i>
                    {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-black text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center">{cart.reduce((a,c) => a+c.qty, 0)}</span>}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(p => (
                <div key={p.id} className="luxury-card rounded-[2rem] bg-white/60 p-3 shadow-lg group">
                  <img src={p.img} className="h-72 w-full object-cover rounded-[1.5rem] cursor-pointer" onClick={() => {setSelectedProduct(p); setView('detail');}} />
                  <div className="p-4">
                    <h3 className="serif text-lg">{p.name}</h3>
                    <p className="text-[#C5A059] font-bold mb-4">₹{p.price}</p>
                    <div className="flex gap-2">
                        <button onClick={() => addToCart(p)} className="flex-1 border border-black text-[9px] py-2 rounded-full uppercase font-bold">Add to Bag</button>
                        <button onClick={() => addToCart(p, true)} className="flex-1 bg-black text-white text-[9px] py-2 rounded-full uppercase font-bold">Buy Now</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* --- REVIEWS & FAQ SECTION --- */}
            <section className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-rose-100 pt-16">
                <div>
                    <h3 className="serif text-3xl mb-6 italic">Customer Reviews</h3>
                    <div className="space-y-4 mb-8">
                        {reviews.map((r, i) => (
                            <div key={i} className="bg-white/40 p-4 rounded-2xl">
                                <p className="font-bold text-xs">{r.name} ⭐⭐⭐⭐⭐</p>
                                <p className="text-sm text-gray-600 italic">"{r.text}"</p>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-2">
                        <input className="w-full p-3 rounded-xl bg-white/80 text-xs outline-none" placeholder="Your Name" onChange={e => setReviewInput({...reviewInput, name: e.target.value})} />
                        <textarea className="w-full p-3 rounded-xl bg-white/80 text-xs outline-none" placeholder="Share your experience..." onChange={e => setReviewInput({...reviewInput, text: e.target.value})} />
                        <button onClick={() => {setReviews([...reviews, reviewInput]); alert("Review Posted!");}} className="bg-black text-white px-6 py-2 rounded-full text-[10px] font-bold">Post Review</button>
                    </div>
                </div>
                <div>
                    <h3 className="serif text-3xl mb-6 italic">Handcraft Q&A</h3>
                    <div className="space-y-4 text-sm">
                        <details className="cursor-pointer bg-white/40 p-4 rounded-xl">
                            <summary className="font-bold">How long does shipping take?</summary>
                            <p className="mt-2 text-gray-500">Since everything is handmade, we ship within 3-5 days across India.</p>
                        </details>
                        <details className="cursor-pointer bg-white/40 p-4 rounded-xl">
                            <summary className="font-bold">Is the resin heat resistant?</summary>
                            <p className="mt-2 text-gray-500">Yes! Our coasters handle hot coffee cups perfectly up to 90°C.</p>
                        </details>
                    </div>
                </div>
            </section>
          </div>
        )}

        {view === 'cart' && (
            <div className="max-w-xl mx-auto page-slide-up">
                <h2 className="serif text-4xl mb-10 italic">Complete Purchase</h2>
                {cart.length === 0 ? <p>Your bag is empty.</p> : (
                    <div className="space-y-4">
                        {cart.map((item, i) => (
                            <div key={i} className="flex justify-between bg-white/80 p-5 rounded-2xl shadow-sm">
                                <span className="font-bold">{item.name} (x{item.qty})</span>
                                <span>₹{item.price * item.qty}</span>
                            </div>
                        ))}
                        <div className="bg-white p-8 rounded-[2rem] shadow-xl mt-10">
                            <p className="serif text-lg mb-4">Shipping Details</p>
                            <textarea className="w-full border p-4 rounded-xl mb-6 text-sm outline-none" placeholder="Full Name, Pincode, Address..." onChange={e => setAddress(e.target.value)} />
                            <div className="flex justify-between text-2xl font-bold mb-8 italic"><span>Total</span><span>₹{cart.reduce((s,i)=>s+(i.price*i.qty),0)}</span></div>
                            <button onClick={() => { if(address.length < 10) return alert("Enter full address"); window.open(`https://wa.me/${CONTACTS.phone}?text=Order: ${cart.map(i=>i.name).join(",")}%0ATotal: ${cart.reduce((s,i)=>s+(i.price*i.qty),0)}%0AAddr: ${address}`); }} className="w-full bg-[#25D366] text-white py-4 rounded-full font-bold flex items-center justify-center gap-2 shadow-lg">Confirm on WhatsApp</button>
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
