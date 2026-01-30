const PHONE_OWNER = "918106676763";
const UPI_ID = "8106676763-2@ybl";

const firebaseConfig = {
  apiKey: "AIzaSyDvUAAI7_Wzzo7s1mZNduP8BxqI4DT1lPs", 
  authDomain: "crafted-stories-996ef.firebaseapp.com",
  projectId: "crafted-stories-996ef",
};

if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }

const products = [
  { id: 1, name: "Pearl Bridal Earrings", price: 599, category: "Jewelry", desc: "Hand-wired ivory pearls crafted over 4 hours for perfection.", img: "https://images.unsplash.com/photo-1528797664208-e5a8c0b98881" },
  { id: 2, name: "Ocean Resin Coasters", price: 599, category: "Resin", desc: "Three layers of resin and real sand for a realistic 3D wave effect.", img: "https://images.unsplash.com/photo-1713097458865-34f9821d60f3" },
  { id: 3, name: "Floral Necklace Set", price: 1299, category: "Jewelry", desc: "Real preserved flowers encased in crystal-clear resin.", img: "https://images.unsplash.com/photo-1722510825242-0d8f2064c2e2" }
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
    if (phoneNumber.length < 10) return alert("Enter 10-digit number");
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', { 'size': 'invisible' });
    firebase.auth().signInWithPhoneNumber("+91" + phoneNumber, window.recaptchaVerifier)
      .then(res => { window.confirmationResult = res; setShowOtpField(true); })
      .catch(err => alert("Error: " + err.message));
  };

  const handleVerifyOtp = () => {
    window.confirmationResult.confirm(otp).then(res => setUser(res.user)).catch(() => alert("Invalid OTP"));
  };

  const sendOrderToWhatsApp = () => {
    if (address.length < 10) return alert("Please enter full address");
    const items = cart.map(i => `${i.name} (₹${i.price})`).join(", ");
    const total = cart.reduce((sum, i) => sum + i.price, 0);
    const text = `*NEW ORDER*%0A%0A*Items:* ${items}%0A*Total:* ₹${total}%0A*Address:* ${address}%0A%0APlease send QR code for payment!`;
    window.open(`https://wa.me/${PHONE_OWNER}?text=${text}`, '_blank');
  };

  if (!user) return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-[#FFF5F6]">
      <div className="bg-white p-10 rounded-[3rem] shadow-xl w-full max-w-md text-center">
        <h1 className="serif text-4xl mb-6">Crafted Stories</h1>
        <div id="recaptcha-container"></div>
        <div className="border-b mb-6 pb-2 flex items-center">
          <span className="text-gray-400 mr-2">+91</span>
          <input className="w-full outline-none text-lg" placeholder="Mobile Number" onChange={e => setPhoneNumber(e.target.value)} />
        </div>
        {showOtpField && <input className="w-full border-b mb-6 py-2 text-center text-xl tracking-widest outline-none" placeholder="OTP CODE" onChange={e => setOtp(e.target.value)} />}
        <button onClick={showOtpField ? handleVerifyOtp : handleSendOtp} className="w-full bg-black text-white py-4 rounded-full font-bold uppercase text-xs tracking-widest">
          {showOtpField ? "Verify OTP" : "Get Secret Code"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FFF5F6]">
      <nav className="flex justify-between p-6 sticky top-0 bg-white/70 backdrop-blur-md z-50">
        <h2 className="serif text-2xl font-bold cursor-pointer" onClick={() => setView('home')}>Crafted Stories</h2>
        <div className="relative cursor-pointer" onClick={() => setView('cart')}>
          <i data-lucide="shopping-bag"></i>
          {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center">{cart.length}</span>}
        </div>
      </nav>

      {view === 'home' && (
        <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map(p => (
            <div key={p.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-all">
              <img src={p.img} className="h-72 w-full object-cover cursor-pointer" onClick={() => {setSelectedProduct(p); setView('detail');}} />
              <div className="p-6 text-center">
                <h3 className="serif text-xl mb-2">{p.name}</h3>
                <p className="text-rose-500 font-bold mb-4">₹{p.price}</p>
                <button onClick={() => {setCart([...cart, p]); alert("Added to cart!");}} className="w-full border border-black py-2 rounded-full text-[10px] font-bold uppercase">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {view === 'detail' && selectedProduct && (
        <div className="max-w-4xl mx-auto p-6">
          <button onClick={() => setView('home')} className="mb-4 text-xs font-bold text-gray-400 uppercase">← Back</button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-10 rounded-[2rem]">
            <img src={selectedProduct.img} className="w-full h-96 object-cover rounded-2xl" />
            <div className="flex flex-col justify-center">
              <h2 className="serif text-4xl mb-4">{selectedProduct.name}</h2>
              <p className="text-2xl text-rose-500 font-bold mb-6">₹{selectedProduct.price}</p>
              <p className="text-gray-600 italic mb-8 border-l-2 border-rose-200 pl-4">{selectedProduct.desc}</p>
              <button onClick={() => {setCart([...cart, selectedProduct]); setView('cart');}} className="bg-black text-white py-4 rounded-full font-bold uppercase text-xs tracking-widest">Buy Now</button>
            </div>
          </div>
        </div>
      )}

      {view === 'cart' && (
        <div className="max-w-xl mx-auto p-6">
          <h2 className="serif text-3xl mb-8 text-center italic">Your Selection</h2>
          {cart.map((item, idx) => (
            <div key={idx} className="flex justify-between border-b py-3 text-sm">
              <span>{item.name}</span>
              <span className="font-bold">₹{item.price}</span>
            </div>
          ))}
          <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm">
            <p className="serif mb-2 font-bold italic">Shipping Address</p>
            <textarea className="w-full border p-4 rounded-xl text-sm outline-none" placeholder="Enter Full Address & Pincode" onChange={e => setAddress(e.target.value)} />
          </div>
          {address.length > 5 && (
            <button onClick={sendOrderToWhatsApp} className="w-full bg-[#25D366] text-white py-4 rounded-full font-bold mt-8 shadow-lg">Confirm & Pay on WhatsApp</button>
          )}
        </div>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
setTimeout(() => lucide.createIcons(), 500);
