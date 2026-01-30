const PHONE_OWNER = "918106676763";
const UPI_ID = "8106676763-2@ybl";

const products = [
  { id: 1, name: "Pearl Bridal Earrings", price: 599, category: "Jewelry", desc: "Hand-wired ivory pearls crafted over 4 hours for perfection. A timeless piece for your most special day.", img: "https://images.unsplash.com/photo-1528797664208-e5a8c0b98881" },
  { id: 2, name: "Ocean Resin Coasters", price: 599, category: "Resin", desc: "Three layers of high-grade resin and real sand for a realistic 3D wave effect that brings the ocean to your home.", img: "https://images.unsplash.com/photo-1713097458865-34f9821d60f3" },
  { id: 3, name: "Floral Necklace Set", price: 1299, category: "Jewelry", desc: "Real preserved flowers encased in crystal-clear resin. Dedicated to preserving nature's beauty forever.", img: "https://images.unsplash.com/photo-1722510825242-0d8f2064c2e2" },
  { id: 4, name: "Resin Jewelry Tray", price: 799, category: "Resin", desc: "Gold leaf flakes suspended in deep pigments to create a luxurious marbled look for your dressing table.", img: "https://images.pexels.com/photos/7256631/pexels-photo-7256631.jpeg" }
];

function App() {
  const [view, setView] = React.useState('home'); // home, detail, cart
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [cart, setCart] = React.useState([]);
  const [address, setAddress] = React.useState("");

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert("Added to cart!");
  };

  const sendOrderToWhatsApp = () => {
    if (address.length < 10) return alert("Please enter your full address!");
    const items = cart.map(i => `${i.name} (₹${i.price})`).join(", ");
    const total = cart.reduce((sum, i) => sum + i.price, 0);
    const text = `*NEW ORDER*%0A%0A*Items:* ${items}%0A*Total:* ₹${total}%0A*Address:* ${address}%0A%0APlease send QR code for payment!`;
    window.open(`https://wa.me/${PHONE_OWNER}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen pb-20">
      <nav className="flex justify-between items-center p-6 sticky top-0 bg-white/70 backdrop-blur-md z-50 border-b border-rose-100">
        <h2 className="serif text-2xl font-bold cursor-pointer" onClick={() => setView('home')}>Crafted Stories</h2>
        <div className="relative cursor-pointer group" onClick={() => setView('cart')}>
          <i data-lucide="shopping-bag" className="group-hover:text-rose-500 transition-colors"></i>
          {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center">{cart.length}</span>}
        </div>
      </nav>

      {view === 'home' && (
        <div className="max-w-6xl mx-auto p-6 page-enter">
          <div className="text-center py-16">
            <h1 className="serif text-5xl md:text-7xl mb-4 italic">Handmade with Heart</h1>
            <p className="text-gray-400 uppercase tracking-widest text-xs">By Jyothi & Preethi Reddy</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map(p => (
              <div key={p.id} className="glass-card rounded-[2rem] overflow-hidden flex flex-col">
                <img src={p.img} className="h-72 w-full object-cover cursor-pointer" onClick={() => {setSelectedProduct(p); setView('detail');}} />
                <div className="p-6 text-center">
                  <h3 className="serif text-lg mb-1">{p.name}</h3>
                  <p className="text-rose-500 font-bold mb-6">₹{p.price}</p>
                  <div className="flex gap-2">
                    <button onClick={() => addToCart(p)} className="flex-1 border border-black py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">Add</button>
                    <button onClick={() => {setCart([p]); setView('cart');}} className="flex-1 bg-black text-white py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest">Buy Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'detail' && selectedProduct && (
        <div className="max-w-4xl mx-auto p-6 page-enter">
          <button onClick={() => setView('home')} className="mb-6 text-xs font-bold text-gray-400 uppercase tracking-widest">← Back to Shop</button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-10 rounded-[3rem] shadow-xl">
            <img src={selectedProduct.img} className="w-full h-[500px] object-cover rounded-[2rem] shadow-lg" />
            <div className="flex flex-col justify-center">
              <h2 className="serif text-5xl mb-4 leading-tight">{selectedProduct.name}</h2>
              <p className="text-3xl text-[#C5A059] mb-8 italic">₹{selectedProduct.price}</p>
              <div className="bg-rose-50 p-6 rounded-2xl italic text-gray-600 border-l-4 border-rose-300 mb-8">
                {selectedProduct.desc}
              </div>
              <button onClick={() => {setCart([...cart, selectedProduct]); setView('cart');}} className="btn-luxury text-white py-5 rounded-full font-bold uppercase text-[10px] tracking-widest hover:scale-105 transition-transform">Get it Now</button>
            </div>
          </div>
        </div>
      )}

      {view === 'cart' && (
        <div className="max-w-xl mx-auto p-6 page-enter">
          <h2 className="serif text-4xl mb-10 text-center italic">Your Shopping Bag</h2>
          {cart.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-[2rem]">
              <p className="text-gray-300 mb-4">Bag is empty</p>
              <button onClick={() => setView('home')} className="text-rose-500 font-bold">Start Shopping</button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item, idx) => (
                <div key={idx} className="flex justify-between bg-white p-6 rounded-2xl shadow-sm">
                  <span className="font-semibold">{item.name}</span>
                  <span className="text-rose-500 font-bold text-xl">₹{item.price}</span>
                </div>
              ))}
              <div className="mt-12 bg-white p-8 rounded-[2rem] border border-rose-100 shadow-sm">
                <p className="serif text-xl mb-4 italic font-bold">Shipping Address</p>
                <textarea className="w-full bg-gray-50 border-none p-5 rounded-2xl text-sm outline-none focus:ring-1 focus:ring-rose-200" placeholder="Full Name, Pincode, Address..." rows="4" onChange={e => setAddress(e.target.value)} />
              </div>
              {address.length > 5 && (
                <div className="mt-10">
                  <div className="flex justify-between text-2xl font-bold mb-8 px-2 italic">
                    <span>Total</span>
                    <span>₹{cart.reduce((s, i) => s + i.price, 0)}</span>
                  </div>
                  <button onClick={sendOrderToWhatsApp} className="w-full bg-[#25D366] text-white py-6 rounded-full font-bold shadow-xl flex items-center justify-center gap-3 hover:scale-105 transition-transform">
                    <i data-lucide="message-circle"></i> Confirm & Pay on WhatsApp
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
setTimeout(() => lucide.createIcons(), 500);
