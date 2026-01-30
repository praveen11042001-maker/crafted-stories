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
  const [cart, setCart] = React.useState([]); // Cart now stores {id, name, price, qty}
  const [address, setAddress] = React.useState("");
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [couponInput, setCouponInput] = React.useState("");
  const [isDiscounted, setIsDiscounted] = React.useState(false);

  // --- CART LOGIC ---
  const addToCart = (product) => {
    const exist = cart.find(x => x.id === product.id);
    if (exist) {
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
  const discountAmount = isDiscounted ? (subtotal * 0.10) : 0;
  const finalTotal = subtotal - discountAmount;

  const checkout = () => {
    if (address.length < 10) return alert("Please enter full address.");
    const items = cart.map(i => `${i.name} (x${i.qty})`).join(", ");
    const msg = `*NEW ORDER*%0A%0A*Items:* ${items}%0A*Subtotal:* ₹${subtotal}%0A*Discount:* -₹${discountAmount.toFixed(2)}%0A*Final Total:* ₹${finalTotal.toFixed(2)}%0A*Address:* ${address}`;
    window.open(`https://wa.me/${CONTACTS.phone}?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-rose-100 px-6 py-4 flex justify-between items-center shadow-sm">
        <h1 className="serif text-2xl font-bold cursor-pointer" onClick={() => setView('home')}>Crafted Stories</h1>
        <div className="relative cursor-pointer" onClick={() => setView('cart')}>
          <i data-lucide="shopping-bag"></i>
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold animate-pulse">
                {cart.reduce((a, c) => a + c.qty, 0)}
            </span>
          )}
        </div>
      </nav>

      <main className="flex-grow">
        {view === 'home' && (
          <div className="max-w-6xl mx-auto p-6 page-anim">
            <header className="text-center py-12">
                <div className="inline-block bg-gold/10 text-[#C5A059] px-4 py-1 rounded-full text-[10px] font-bold tracking-widest mb-4 border border-[#C5A059]/20">
                   USE CODE: FIRST10
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
                    <button onClick={() => addToCart(p)} className="w-full bg-black text-white py-3 rounded-xl text-[9px] font-bold uppercase tracking-widest hover:scale-105 transition-transform">Add to Bag</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'cart' && (
          <div className="max-w-xl mx-auto p-6 page-anim py-12">
            <h2 className="serif text-4xl mb-12 text-center italic">Shopping Bag</h2>
            {cart.length === 0 ? <p className="text-center text-gray-400 py-20">Your bag is empty.</p> : (
                <div className="space-y-4">
                    {cart.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-white/90 p-6 rounded-3xl shadow-sm border border-white">
                            <div>
                                <p className="font-semibold text-sm">{item.name}</p>
                                <p className="text-[#C5A059] font-bold text-xs">₹{item.price}</p>
                            </div>
                            <div className="flex items-center gap-4 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                                <button onClick={() => removeFromCart(item)} className="text-lg font-bold text-gray-400 hover:text-rose-500">-</button>
                                <span className="text-sm font-bold w-4 text-center">{item.qty}</span>
                                <button onClick={() => addToCart(item)} className="text-lg font-bold text-gray-400 hover:text-green-500">+</button>
                            </div>
                        </div>
                    ))}
                    
                    <div className="p-8 bg-white/95 rounded-[2.5rem] mt-10 shadow-sm border border-rose-50">
                        <div className="flex justify-between text-2xl font-bold serif italic mb-8 border-b pb-6">
                            <span>Total</span>
                            <span>₹{finalTotal.toFixed(2)}</span>
                        </div>
                        <textarea className="w-full bg-gray-50/50 border-none p-5 rounded-2xl text-sm mb-6 outline-none focus:ring-1 focus:ring-[#C5A059]" placeholder="Delivery Address..." rows="3" onChange={e => setAddress(e.target.value)} />
                        <button onClick={checkout} className="w-full bg-[#25D366] text-white py-6 rounded-full font-bold shadow-xl flex items-center justify-center gap-3 hover:scale-105 transition-transform">
                            <i data-lucide="whatsapp"></i> Confirm & Pay on WhatsApp
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
