const PHONE = "918106676763";
const UPI_ID = "8106676763-2@ybl"; 
const INSTA_ID = "craftedstories._";
const EMAIL = "praveen11042001@gmail.com";

const products = [
  { id: 1, name: "Trial Product (Test)", price: 1, img: "https://images.unsplash.com/photo-1528797664208-e5a8c0b98881" },
  { id: 2, name: "Ocean Resin Coasters", price: 599, img: "https://images.unsplash.com/photo-1713097458865-34f9821d60f3" },
  { id: 3, name: "Floral Necklace Set", price: 1299, img: "https://images.unsplash.com/photo-1722510825242-0d8f2064c2e2" },
  { id: 4, name: "Resin Jewelry Tray", price: 799, img: "https://images.pexels.com/photos/7256631/pexels-photo-7256631.jpeg" }
];

function App() {
  const [address, setAddress] = React.useState("");

  // 1. THE DIRECT UPI ACTION
  const handleDirectPay = (e, pName, pPrice) => {
    e.preventDefault(); // Stop any other actions
    
    if (!address.trim()) {
      alert("Please enter your Shipping Address in the box above first!");
      return;
    }

    // Creating the UPI URL
    const upiUrl = `upi://pay?pa=${UPI_ID}&pn=CraftedStories&am=${pPrice}&cu=INR&tn=Order_${pName.replace(/\s/g, '_')}`;
    
    // Redirecting directly to the UPI apps
    window.location.href = upiUrl;

    // We only open WhatsApp manually IF they want to send the screenshot/address after
    console.log("UPI Intent launched for: " + pName);
  };

  // 2. THE WHATSAPP ACTION
  const checkAvailability = (pName, pPrice) => {
    const text = `Hi Crafted Stories! 👋%0A%0AIs *${pName}* (₹${pPrice}) available?%0A%0AMy Address: ${address}`;
    window.open(`https://wa.me/${PHONE}?text=${text}`, '_blank');
  };

  return (
    <div className="pb-20">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-[5%] py-4 bg-white sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-2">
          <i data-lucide="heart" className="text-rose-500 fill-rose-500"></i>
          <span className="serif text-xl font-bold">Crafted Stories</span>
        </div>
        <div className="flex gap-4">
            <a href={`tel:+91${PHONE}`} className="p-2 bg-gray-100 rounded-full"><i data-lucide="phone" className="w-5 h-5"></i></a>
            <a href={`https://instagram.com/${INSTA_ID}`} className="p-2 bg-gray-100 rounded-full"><i data-lucide="instagram" className="w-5 h-5"></i></a>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-rose-50 text-center py-12 px-5">
        <h1 className="serif text-4xl mb-4">Handmade by Sisters</h1>
        <p className="text-gray-600 mb-6">Jyothi & Preethi Reddy</p>
        
        {/* ADDRESS BOX - MUST BE FILLED FIRST */}
        <div className="max-w-md mx-auto bg-white p-4 rounded-xl shadow-sm border-2 border-rose-200">
          <label className="block text-xs font-bold text-rose-500 text-left mb-1 uppercase tracking-tighter">Enter Delivery Address First:</label>
          <textarea 
            className="w-full p-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-300 outline-none" 
            placeholder="Full Name, House No, Area, City, Pincode..."
            rows="2"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
        </div>
      </section>

      {/* Products */}
      <section id="shop" className="px-5 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(p => (
          <div key={p.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <img src={p.img} alt={p.name} className="w-full h-64 object-cover" />
            <div className="p-4 flex-grow">
              <h3 className="font-bold text-lg mb-1">{p.name}</h3>
              <p className="text-rose-500 font-bold text-xl mb-4">₹{p.price}</p>
              
              <div className="space-y-2">
                {/* THIS IS THE DIRECT PAY BUTTON */}
                <button 
                  onClick={(e) => handleDirectPay(e, p.name, p.price)} 
                  className="w-full bg-rose-500 text-white font-bold py-3 rounded-lg hover:bg-rose-600 transition-colors"
                >
                  Pay Now (PhonePe/GPay)
                </button>
                
                <button 
                  onClick={() => checkAvailability(p.name, p.price)} 
                  className="w-full border border-rose-500 text-rose-500 font-bold py-2 rounded-lg text-sm"
                >
                  Check Availability
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Footer Contact */}
      <footer className="bg-gray-900 text-white p-10 mt-10">
        <div className="text-center">
            <h2 className="serif text-2xl mb-4 text-rose-400">Crafted Stories</h2>
            <p className="text-gray-400 text-sm mb-6">Handmade Jewelry & Resin Art</p>
            <div className="flex justify-center gap-6 mb-8">
                <a href={`tel:+91${PHONE}`}><i data-lucide="phone"></i></a>
                <a href={`mailto:${EMAIL}`}><i data-lucide="mail"></i></a>
                <a href={`https://instagram.com/${INSTA_ID}`}><i data-lucide="instagram"></i></a>
            </div>
            <p className="text-xs text-gray-500">UPI ID: {UPI_ID}</p>
        </div>
      </footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
setTimeout(() => lucide.createIcons(), 500);
