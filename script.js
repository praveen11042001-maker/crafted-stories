const PHONE_OWNER = "918106676763";
const UPI_ID = "8106676763-2@ybl";
const INSTA_ID = "craftedstories._";

// Your verified Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDvUAAI7_Wzzo7s1mZNduP8BxqI4DT1lPs", 
  authDomain: "crafted-stories-996ef.firebaseapp.com",
  projectId: "crafted-stories-996ef",
};

if (!firebase.apps.length) { 
    firebase.initializeApp(firebaseConfig); 
}

const products = [
  { 
    id: 1, 
    name: "Pearl Bridal Earrings", 
    price: 599, 
    category: "Jewelry", 
    desc: "Hand-wired with individual ivory pearls. We spend hours ensuring every twist of the wire is secure and elegant, creating a timeless piece for your most special moments.", 
    img: "https://images.unsplash.com/photo-1528797664208-e5a8c0b98881" 
  },
  { 
    id: 2, 
    name: "Ocean Resin Coasters", 
    price: 599, 
    category: "Resin", 
    desc: "A piece of the sea for your home. We use three layers of high-grade resin and real sand to create a 3D wave effect that looks like moving water.", 
    img: "https://images.unsplash.com/photo-1713097458865-34f9821d60f3" 
  },
  { 
    id: 3, 
    name: "Floral Necklace Set", 
    price: 1299, 
    category: "Jewelry", 
    desc: "Real dried flowers preserved in crystal-clear resin. This set represents the beauty of nature kept forever, handcrafted with extreme patience to avoid air bubbles.", 
    img: "https://images.unsplash.com/photo-1722510825242-0d8f2064c2e2" 
  },
  { 
    id: 4, 
    name: "Resin Jewelry Tray", 
    price: 799, 
    category: "Resin", 
    desc: "Functional art. Gold leaf flakes are suspended in deep pigments to create a luxurious marbled look that organizes your jewelry with style.", 
    img: "https://images.pexels.com/photos/7256631/pexels-photo-7256631.jpeg" 
  }
];

function App() {
  const [view, setView] = React.useState('home');
  const [user, setUser] = React.useState(null);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [cart, setCart] = React.useState([]);
  const [address, setAddress] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [showOtpField, setShowOtpField] = React.useState(false);

  const handleSendOtp = () => {
    if (phoneNumber.length < 10) return alert("Please enter a valid 10-digit number.");
    
    // Check if container exists before initializing
    const container = document.getElementById('recaptcha-container');
    if(!container) return;

    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', { 'size': 'invisible' });
    
    firebase.auth().signInWithPhoneNumber("+91" + phoneNumber, window.recaptchaVerifier)
      .then(res => { 
        window.confirmationResult = res; 
        setShowOtpField(true); 
      })
      .catch(err => alert("Error: " + err.message));
  };

  const handleVerifyOtp = () => {
    window.confirmationResult.confirm(otp)
      .then(res => setUser(res.user))
      .catch(() => alert("Invalid OTP. Please try again."));
  };

  const sendOrderToWhatsApp = () => {
    if (address.length < 10) return alert("Please provide a complete shipping address.");
    const itemsList = cart.map(i => `${i.name} (₹${i.price})`).join(", ");
    const total = cart.reduce((sum, i) => sum + i.price, 0);
    const text = `*NEW ORDER FROM WEBSITE*%0A%0A*Items:* ${itemsList}%0A*Total:* ₹${total}%0A*Address:* ${address}%0A%0APlease share QR code for payment!`;
    window.open(`https://wa.me/${PHONE_OWNER}?text=${text}`, '_blank');
  };

  // --- LOGIN SCREEN ---
  if (!user) return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-[#FFF5F6]">
      <div className="bg-white p-10 rounded-[3rem] shadow-xl w-full max-w-md text-center">
        <h1 className="serif text-4xl mb-2 text-[#2D2D2D]">Crafted Stories</h1>
        <p className="text-gray-400 text-[10px] uppercase tracking-[0.3em] mb-8 font-semibold">Artistry by Sisters</p>
        
        <div id="recaptcha-container"></div>
        
        <div className="space-y-4">
          <div className="flex items-center border-b border-gray-200 py-2">
            <span className="text-gray-400 mr-2">+91</span>
            <input 
              className="w-full outline-none text-lg tracking-widest" 
              placeholder="Mobile Number" 
              onChange={e => setPhoneNumber(e.target.value)} 
            />
          </div>
          
          {showOtpField && (
            <input 
              className="w-full border-b border-gray-200 py-3 text-center text-xl tracking-[0.5em] outline-none animate-pulse" 
              placeholder="000000" 
              onChange={e => setOtp(e.target.value)} 
            />
          )}
        </div>

        <button 
          onClick={showOtpField ? handleVerifyOtp : handleSendOtp} 
          className="w-full bg-[#2D2D2D] text-white py-4 rounded-full mt-8 font-bold uppercase text-xs tracking-widest hover:bg-black transition-all"
        >
          {showOtpField ? "Verify OTP" : "Get Secret Code"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FFF5F6] text-[#2D2D2D]">
      {/* HEADER */}
      <nav className="flex justify-between items-center p-6 sticky top-0 bg-white/70 backdrop-blur-md z-50 border-b border-rose-100">
        <h2 className="serif text-2xl font-bold cursor-pointer hover:opacity-70 transition-opacity" onClick={() => setView('home')}>Crafted Stories</h2>
        <div className="flex gap-6 items-center">
            <div className="relative cursor-pointer group" onClick={() => setView('cart')}>
                <i data-lucide="shopping-bag" className="w-6 h-6 group-hover:text-rose-500 transition-colors"></i>
                {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                        {cart.length}
                    </span>
                )}
            </div>
        </div>
      </nav>

      {/* HOME VIEW */}
      {view === 'home' && (
        <div className="max-w-6xl mx-auto p-6">
          <header className="py-10 text-center">
            <h3 className="serif text-4xl italic mb-4">The Summer Collection</h3>
            <p className="text-gray-400 text-sm font-light uppercase tracking-widest">Hand-crafted with effort & love</p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map(p => (
              <div key={p.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col">
                <div className="h-72 overflow-hidden">
                    <img src={p.img} className="w-full h-full object-cover cursor-pointer hover:scale-110 transition-transform duration-700" onClick={() => {setSelectedProduct(p); setView('detail');}} />
                </div>
                <div className="p-6 text-center">
                  <h4 className="serif text-lg mb-1">{p.name}</h4>
                  <p className="text-[#C5A059] font-bold mb-4">₹{p.price}</p>
                  <button onClick={() => {setCart([...cart, p]); alert("Added to your collection!");}} className="w-full border border-gray-100 py-3 rounded-xl text-[9px] font-bold uppercase tracking-[0.2em] hover:bg-gray-50 transition-colors">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DETAIL VIEW */}
      {view === 'detail' && selectedProduct && (
        <div className="max-w-4xl mx-auto p-6 animate-fade-in">
            <button onClick={() => setView('home')} className="mb-6 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black">← Back to Shop</button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-10 rounded-[3rem] shadow-sm">
                <img src={selectedProduct.img} className="w-full h-[450px] object-cover rounded-[2rem] shadow-lg" />
                <div className="flex flex-col justify-center">
                    <span className="text-rose-300 uppercase tracking-[0.3em] text-[10px] font-bold mb-2">{selectedProduct.category}</span>
                    <h2 className="serif text-5xl mb-4 leading-tight">{selectedProduct.name}</h2>
                    <p className="text-2xl text-[#C5A059] mb-8 italic font-light">Price: ₹{selectedProduct.price}</p>
                    <div className="bg-rose-50 p-6 rounded-2xl text-gray-600 text-sm leading-relaxed italic mb-8 border-l-2 border-rose-200">
                        {selectedProduct.desc}
                    </div>
                    <button onClick={() => {setCart([...cart, selectedProduct]); setView('cart');}} className="bg-[#2D2D2D] text-white py-5 rounded-full font-bold uppercase text-[10px] tracking-widest hover:bg-black transition-all">Buy Now</button>
                </div>
            </div>
        </div>
      )}

      {/* CART VIEW */}
      {view === 'cart' && (
        <div className="max-w-xl mx-auto p-6 animate-fade-in">
            <h2 className="serif text-3xl mb-10 text-center italic">Your Shopping Bag</h2>
            {cart.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-gray-300 uppercase tracking-widest text-xs mb-4">No items selected</p>
                    <button onClick={() => setView('home')} className="text-rose-500 font-bold underline">Explore Art</button>
                </div>
            ) : (
                <div className="space-y-4">
                    {cart.map((item, idx) => (
                        <div key={idx} className="flex justify-between bg-white p-5 rounded-2xl shadow-sm">
                            <span className="font-semibold text-sm">{item.name}</span>
                            <span className="text-rose-500 font-bold">₹{item.price}</span>
                        </div>
                    ))}
                    
                    <div className="mt-10 bg-white p-8 rounded-[2.5rem] border border-rose-100 shadow-sm">
                        <p className="serif text-xl mb-4 italic">Shipping Details</p>
                        <textarea 
                            className="w-full bg-gray-50 border-none p-5 rounded-2xl text-sm focus:ring-1 focus:ring-rose-200 outline-none" 
                            placeholder="Type your full address & pincode here..." 
                            rows="4"
                            onChange={e => setAddress(e.target.value)} 
                        />
                    </div>

                    {address.length > 10 && (
                        <div className="mt-10 pt-6 border-t border-gray-100">
                            <div className="flex justify-between text-2xl font-bold mb-8 italic px-2">
                                <span>Grand Total</span>
                                <span>₹{cart.reduce((s, i) => s + i.price, 0)}</span>
                            </div>
                            <button onClick={sendOrderToWhatsApp} className="w-full bg-[#25D366] text-white py-6 rounded-full font-bold shadow-xl hover:opacity-90 transition-all flex items-center justify-center gap-3">
                                <i data-lucide="check-circle"></i> Confirm & Pay on WhatsApp
                            </button>
                            <p className="text-center mt-6 text-[9px] text-gray-400 uppercase tracking-widest">Payable via PhonePe/GPay: {UPI_ID}</p>
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
