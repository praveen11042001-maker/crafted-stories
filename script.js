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

  // --- CART & BUY NOW LOGIC ---
  const addToCart = (product, redirect = false) => {
    const exist = cart.find(x => x.id === product.id);
    let newCart;
    if (exist) {
      if (exist.qty >= 10) {
        if(!redirect) alert("Limit Reached: Max 10 per design.");
        newCart = cart;
      } else {
        newCart = cart.map(x => x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x);
      }
    } else {
      newCart = [...cart, { ...product, qty: 1 }];
    }
    
    setCart(newCart);
    if (redirect) {
        setView('cart');
    } else {
        alert("Added to bag!");
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

  const checkout = () => {
    if (address.length < 10) return alert("Please enter your delivery address.");
    const items = cart.map(i => `${i.name} (x${i.qty})`).join(", ");
    const msg = `*NEW ORDER*%0A%0A*Items:* ${items}%0A*Total:* ₹${subtotal}%0A*Address:* ${address}`;
    window.open(`https://wa.me/${CONTACTS.phone}?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-rose-100 px-6 py-4 flex justify-between items-center shadow-sm">
        <h1 className="serif text-2xl font-bold cursor-pointer" onClick={() => setView('home')}>Crafted Stories</h1>
        <div className="flex items-center gap-6">
            <a href={`https://instagram.com/${CONTACTS.insta}`} target="_blank" className="text-[#C5A059]"><i data-lucide="instagram"></i></a>
            <div className="relative cursor-pointer" onClick={() => setView('cart')}>
              <i data-lucide="shopping-bag"></i>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-10">
              {products.map(p => (
                <div key={p.id} className="luxury-card rounded-[2.5rem] overflow-hidden bg-white/50 p-3 shadow-xl">
                  <img src={p.img} className="h-64 w-full object-cover rounded-[2rem] cursor-pointer" onClick={() => {setSelectedProduct(p); setView('detail');}} />
                  <div className="p-4 text-center">
                    <h3 className="serif text-lg mb-2">{p.name}</h3>
                    <p className="text-[#C5A059] font-bold mb-4">₹{p.price}</p>
                    <div className="flex flex-col gap-2">
                        <button onClick={() => addToCart(p)} className="w-full border border-black py-2 rounded-full text-[9px] font-bold uppercase tracking-widest">Add to Bag</button>
                        <button onClick={() => addToCart(p, true)} className="w-full bg-black text-white py-2 rounded-full text-[9px] font-bold uppercase tracking-widest">Buy Now</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'detail' && selectedProduct && (
          <div className="max-w-5xl mx-auto p-6 page-slide-up py-12">
            <button onClick={() => setView('home')} className="mb-6 text-[10px] font-bold text-gray-400">← Back</button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white/80 p-8 rounded-[3rem]">
              <img src={selectedProduct.img} className="w-full h-96 object-cover rounded-[2rem]" />
              <div>
                <h2 className="serif text-4xl mb-4 italic">{selectedProduct.name}</h2>
                <p className="text-2xl text-[#C5A059] mb-6 font-bold">₹{selectedProduct.price}</p>
                <div className="flex flex-col gap-3">
                    <button onClick={() => addToCart(selectedProduct)} className="w-full border border-black py-4 rounded-full font-bold uppercase text-[10px] tracking-widest">Add to Bag</button>
                    <button onClick={() => addToCart(selectedProduct, true)} className="w-full bg-black text-white py-4 rounded-full font-bold uppercase text-[10px] tracking-widest">Buy Now</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {view === 'cart' && (
          <div className="max-w-xl mx-auto p-6 page-slide-up py-12">
            <h2 className="serif text-4xl mb-10 text-center italic">Checkout</h2>
            {cart.length === 0 ? <p className="text-center py-20">Your bag is empty.</p> : (
                <div className="space-y-6">
                    {cart.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-white p-6 rounded-[2rem] shadow-sm">
                            <span className="font-semibold">{item.name}</span>
                            <div className="flex items-center gap-4 bg-gray-100 px-4 py-1 rounded-full">
                                <button onClick={() => removeFromCart(item)}>-</button>
                                <span>{item.qty}</span>
                                <button onClick={() => addToCart(item)}>+</button>
                            </div>
                        </div>
                    ))}
                    
                    <div className="p-8 bg-white rounded-[2.5rem] shadow-xl">
                        <h4 className="serif text-xl mb-4">Shipping Address</h4>
                        <textarea className="w-full bg-gray-50 border p-4 rounded-2xl text-sm mb-6 outline-none focus:border-[#C5A059]" placeholder="Enter full address..." rows="4" onChange={e => setAddress(e.target.value)} />
                        <div className="flex justify-between text-2xl font-bold mb-8 italic">
                            <span>Total</span>
                            <span>₹{subtotal}</span>
                        </div>
                        <button onClick={checkout} className="w-full bg-[#25D366] text-white py-5 rounded-full font-bold flex items-center justify-center gap-2">
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
