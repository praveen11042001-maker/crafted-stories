const CONTACTS = {
    phone: "918106676763",
    insta: "craftedstories._",
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
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  
  // Flipkart-style Address State
  const [addr, setAddr] = React.useState({ name: "", phone: "", pin: "", house: "", city: "" });
  const [checkoutStep, setCheckoutStep] = React.useState(1); // 1: Cart, 2: Address, 3: Payment

  const subtotal = cart.reduce((s, i) => s + i.price, 0);

  const checkoutWhatsApp = () => {
    const fullAddress = `${addr.name}, ${addr.house}, ${addr.city} - ${addr.pin}. Ph: ${addr.phone}`;
    const items = cart.map(i => i.name).join(", ");
    const msg = `*NEW ORDER*%0A%0A*Items:* ${items}%0A*Total:* ₹${subtotal}%0A*Address:* ${fullAddress}`;
    window.open(`https://wa.me/${CONTACTS.phone}?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-50 bg-[#2874f0] text-white px-6 py-3 flex justify-between items-center">
        <h1 className="serif text-xl font-bold cursor-pointer italic" onClick={() => setView('home')}>Crafted Stories</h1>
        <div className="relative cursor-pointer" onClick={() => {setView('cart'); setCheckoutStep(1);}}>
          <i data-lucide="shopping-cart"></i>
          {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-[#ff9f00] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">{cart.length}</span>}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-4">
        {view === 'home' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map(p => (
              <div key={p.id} className="checkout-card overflow-hidden flex flex-col p-2">
                <img src={p.img} className="h-40 w-full object-cover cursor-pointer" onClick={() => {setSelectedProduct(p); setView('detail');}} />
                <div className="p-2 text-left">
                  <h3 className="text-sm truncate font-medium">{p.name}</h3>
                  <p className="text-black font-bold">₹{p.price} <span className="text-gray-400 line-through text-[10px]">₹999</span></p>
                  <button onClick={() => {setCart([...cart, p]); alert("Added!");}} className="w-full bg-[#ff9f00] text-white py-2 mt-2 rounded-sm text-[10px] font-bold uppercase">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {view === 'detail' && selectedProduct && (
          <div className="checkout-card p-6 flex flex-col md:flex-row gap-8">
            <img src={selectedProduct.img} className="w-full md:w-1/2 h-80 object-cover" />
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{selectedProduct.name}</h2>
              <p className="text-green-600 font-bold text-xl mb-4">Special Price: ₹{selectedProduct.price}</p>
              <button onClick={() => {setCart([...cart, selectedProduct]); setView('cart'); setCheckoutStep(1);}} className="w-full bg-[#fb641b] text-white py-4 rounded-sm font-bold uppercase">Buy Now</button>
            </div>
          </div>
        )}

        {view === 'cart' && (
          <div className="space-y-4">
            {/* STEP 1: SUMMARY */}
            <div className="checkout-card">
               <div className={`step-header ${checkoutStep > 1 ? 'opacity-50' : ''}`}>1. Order Summary ({cart.length} Items)</div>
               {checkoutStep === 1 && (
                 <div className="p-4">
                   {cart.map((item, i) => <div key={i} className="flex justify-between border-b py-2 text-sm"><span>{item.name}</span><b>₹{item.price}</b></div>)}
                   <button onClick={() => setCheckoutStep(2)} className="w-full bg-[#fb641b] text-white py-3 mt-4 font-bold uppercase rounded-sm shadow-md">Continue</button>
                 </div>
               )}
            </div>

            {/* STEP 2: ADDRESS (Flipkart Style) */}
            <div className="checkout-card">
                <div className={`step-header ${checkoutStep !== 2 ? 'opacity-50' : ''}`}>2. Delivery Address</div>
                {checkoutStep === 2 && (
                  <div className="p-6">
                    <input className="form-input" placeholder="Full Name" onChange={e => setAddr({...addr, name: e.target.value})} />
                    <input className="form-input" placeholder="10-digit mobile number" onChange={e => setAddr({...addr, phone: e.target.value})} />
                    <div className="flex gap-2">
                        <input className="form-input" placeholder="Pincode" onChange={e => setAddr({...addr, pin: e.target.value})} />
                        <input className="form-input" placeholder="City" onChange={e => setAddr({...addr, city: e.target.value})} />
                    </div>
                    <textarea className="form-input" placeholder="House No, Building Name, Road, Area" rows="3" onChange={e => setAddr({...addr, house: e.target.value})} />
                    <button onClick={() => setCheckoutStep(3)} className="w-full bg-[#fb641b] text-white py-3 font-bold uppercase rounded-sm shadow-md">Deliver Here</button>
                  </div>
                )}
            </div>

            {/* STEP 3: PAYMENT */}
            <div className="checkout-card">
                <div className={`step-header ${checkoutStep !== 3 ? 'opacity-50' : ''}`}>3. Payment Option</div>
                {checkoutStep === 3 && (
                  <div className="p-6 text-center">
                    <p className="text-gray-600 mb-4">Total Amount to Pay: <b>₹{subtotal}</b></p>
                    <div className="bg-blue-50 p-4 border border-blue-200 rounded-sm mb-6">
                        <p className="text-xs text-blue-700">Safe Payment: You will be redirected to WhatsApp to receive our official UPI QR code.</p>
                    </div>
                    <button onClick={checkoutWhatsApp} className="w-full bg-[#fb641b] text-white py-4 font-bold uppercase rounded-sm shadow-lg flex items-center justify-center gap-2">
                        <i data-lucide="message-circle"></i> Confirm Order
                    </button>
                  </div>
                )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
setTimeout(() => lucide.createIcons(), 500);
