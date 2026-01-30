const PHONE_OWNER = "918106676763";
const UPI_ID = "8106676763-2@ybl";

// --- PASTE YOUR FIREBASE KEYS HERE ---
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const products = [
  { id: 1, name: "Pearl Bridal Earrings", price: 599, category: "Jewelry", desc: "Each pearl is hand-selected and wired with precision. We spend hours on every pair to ensure they catch the light perfectly for your special day. Handmade with love by sisters.", img: "https://images.unsplash.com/photo-1528797664208-e5a8c0b98881" },
  { id: 2, name: "Ocean Resin Coasters", price: 599, category: "Resin", desc: "Crafted using premium high-gloss resin. We layer pigments over 48 hours to create realistic waves that bring the beauty of the ocean to your home.", img: "https://images.unsplash.com/photo-1713097458865-34f9821d60f3" },
  { id: 3, name: "Floral Necklace Set", price: 1299, category: "Jewelry", desc: "Real preserved flowers encased in crystal resin. This delicate process preserves nature's beauty forever in a wearable form.", img: "https://images.unsplash.com/photo-1722510825242-0d8f2064c2e2" }
];

function App() {
  const [view, setView] = React.useState('home'); // home, detail, cart
  const [user, setUser] = React.useState(null);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [cart, setCart] = React.useState([]);
  const [address, setAddress] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [showOtpField, setShowOtpField] = React.useState(false);

  // OTP Login Logic
  const setupRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'normal'
    });
  };

  const handleSendOtp = () => {
    if (!phoneNumber) return alert("Enter number with country code (e.g. 91...)");
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber("+" + phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setShowOtpField(true);
      }).catch((error) => alert("Error: " + error.message));
  };

  const handleVerifyOtp = () => {
    window.confirmationResult.confirm(otp)
      .then((result) => setUser(result.user))
      .catch((error) => alert("Invalid OTP"));
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert("Added to cart! Total items: " + (cart.length + 1));
  };

  const sendOrderToWhatsApp = () => {
    if (!address) return alert("Please enter your shipping address!");
    const items = cart.map(i => i.name).join(", ");
    const total = cart.reduce((sum, i) => sum + i.price, 0);
    const text = `*NEW ORDER FROM WEBSITE*%0A%0A*Items:* ${items}%0A*Total Amount:* ₹${total}%0A*Shipping Address:* ${address}%0A%0A_Ready to pay via UPI ID: ${UPI_ID}_`;
    window.open(`https://wa.me/${PHONE_OWNER}?text=${text}`, '_blank');
  };

  // Login View
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-white">
        <h1 className="serif text-4xl mb-2 text-center">Crafted Stories</h1>
        <p className="text-gray-400 mb-8 uppercase tracking-widest text-xs">Authentic Sister-Made Art</p>
        <div id="recaptcha-container" className="mb-4"></div>
        <input 
          className="border-b-2 border-gray-100 p-4 w-full max-w-xs text-center outline-none focus:border-rose-300 transition-all" 
          placeholder="Enter Mobile (91...)" 
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        {showOtpField && (
          <input 
            className="border-b-2 border-gray-100 p-4 w-full max-w-xs text-center mt-4 outline-none focus:border-rose-300" 
            placeholder="Enter 6-Digit OTP" 
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        )}
        <button 
          onClick={showOtpField ? handleVerifyOtp : handleSendOtp}
          className="mt-8 bg-black text-white px-12 py-4 rounded-full font-bold uppercase tracking-tighter hover:bg-gray-800"
        >
          {showOtpField ? "Verify & Enter" : "Send OTP"}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF5F6]">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 sticky top-0 bg-white/70 backdrop-blur-md z-50">
        <h2 className="serif text-2xl font-bold cursor-pointer" onClick={() => setView('home')}>Crafted Stories</h2>
        <div className="flex gap-6 items-center">
            <div className="relative cursor-pointer" onClick={() => setView('cart')}>
                <i data-lucide="shopping-bag" className="w-6 h-6"></i>
                {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold">
                        {cart.length}
                    </span>
                )}
            </div>
            <button onClick={() => firebase.auth().signOut().then(() => setUser(null))} className="text-[10px] uppercase font-bold text-gray-400">Logout</button>
        </div>
      </nav>

      {/* Main Home View */}
      {view === 'home' && (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {products.map(p => (
            <div key={p.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all group">
              <img src={p.img} className="h-80 w-full object-cover cursor-pointer hover:scale-105 transition-transform duration-500" onClick={() => {setSelectedProduct(p); setView('detail');}} />
              <div className="p-8 text-center">
                <h3 className="serif text-2xl mb-2">{p.name}</h3>
                <p className="text-rose-500 font-bold mb-6">₹{p.price}</p>
                <div className="flex gap-3">
                    <button onClick={() => addToCart(p)} className="flex-1 border-2 border-black py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">Add to Cart</button>
                    <button onClick={() => {setCart([p]); setView('cart');}} className="flex-1 bg-black text-white py-3 rounded-full text-[10px] font-bold uppercase tracking-widest">Buy Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Detail View */}
      {view === 'detail' && selectedProduct && (
        <div className="p-8 max-w-4xl mx-auto">
            <button onClick={() => setView('home')} className="mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">← Back to Shop</button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-[3rem] shadow-sm">
                <img src={selectedProduct.img} className="w-full h-[500px] object-cover rounded-[2rem]" />
                <div className="flex flex-col justify-center">
                    <span className="text-rose-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">{selectedProduct.category}</span>
                    <h2 className="serif text-5xl mb-6">{selectedProduct.name}</h2>
                    <p className="text-3xl font-light text-gray-800 mb-8">₹{selectedProduct.price}</p>
                    <div className="mb-8 p-6 bg-rose-50 rounded-2xl italic text-gray-600 border-l-4 border-rose-300">
                        {selectedProduct.desc}
                    </div>
                    <button onClick={() => addToCart(selectedProduct)} className="bg-black text-white py-5 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform">Add to My Collection</button>
                </div>
            </div>
        </div>
      )}

      {/* Cart & Checkout View */}
      {view === 'cart' && (
        <div className="p-8 max-w-2xl mx-auto">
            <h2 className="serif text-4xl mb-10 text-center italic">Your Selection</h2>
            {cart.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-[2rem]">
                    <p className="text-gray-400 mb-6 uppercase tracking-widest">Your cart is empty</p>
                    <button onClick={() => setView('home')} className="text-rose-500 font-bold underline">Go Shopping</button>
                </div>
            ) : (
                <div className="space-y-4">
                    {cart.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-white p-6 rounded-2xl">
                            <span className="font-semibold">{item.name}</span>
                            <span className="text-rose-500 font-bold tracking-tighter text-xl">₹{item.price}</span>
                        </div>
                    ))}
                    <div className="mt-12 bg-white p-8 rounded-[2rem] shadow-inner border-2 border-dashed border-rose-200">
                        <p className="serif mb-4 text-xl italic font-bold">Shipping Address</p>
                        <textarea 
                            className="w-full border-none bg-gray-50 p-6 rounded-2xl outline-none focus:ring-2 focus:ring-rose-200 text-sm" 
                            placeholder="Full Name, House No, Locality, City, State, Pincode..." 
                            rows="4"
                            onChange={e => setAddress(e.target.value)} 
                        />
                    </div>
                    {address.length > 10 && (
                        <div className="mt-10 animate-fade-in">
                            <div className="flex justify-between text-2xl font-bold mb-6 px-4">
                                <span>Total Payable</span>
                                <span>₹{cart.reduce((s, i) => s + i.price, 0)}</span>
                            </div>
                            <button onClick={sendOrderToWhatsApp} className="w-full bg-rose-500 text-white py-6 rounded-full font-bold text-lg shadow-xl hover:bg-rose-600 transition-all flex items-center justify-center gap-3">
                                <i data-lucide="message-circle"></i> Confirm & Pay on WhatsApp
                            </button>
                            <p className="text-center mt-4 text-[10px] text-gray-400 uppercase tracking-widest font-bold">UPI Payment: {UPI_ID}</p>
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
