const PHONE = "918106676763";
const UPI_ID = "8106676763-2@ybl"; // Your specific UPI ID
const INSTA_ID = "craftedstories._";
const EMAIL = "praveen11042001@gmail.com";

const products = [
  { id: 1, name: "Pearl Bridal Earrings", price: 599, img: "https://images.unsplash.com/photo-1528797664208-e5a8c0b98881" },
  { id: 2, name: "Ocean Resin Coasters", price: 599, img: "https://images.unsplash.com/photo-1713097458865-34f9821d60f3" },
  { id: 3, name: "Floral Necklace Set", price: 1299, img: "https://images.unsplash.com/photo-1722510825242-0d8f2064c2e2" },
  { id: 4, name: "Resin Jewelry Tray", price: 799, img: "https://images.pexels.com/photos/7256631/pexels-photo-7256631.jpeg" }
];

function App() {
  const [address, setAddress] = React.useState("");

  // FUNCTION 1: DIRECT UPI PAYMENT (PhonePe/GPay/Paytm)
  const handleDirectPay = (pName, pPrice) => {
    if (!address.trim()) {
      alert("Please enter your shipping address first so we know where to send your order!");
      return;
    }
    
    // This link triggers the UPI apps on the user's phone
    const upiLink = `upi://pay?pa=${UPI_ID}&pn=Crafted%20Stories&am=${pPrice}&cu=INR&tn=Order%20for%20${pName}`;
    
    window.location.href = upiLink;

    // Optional: Also send address to WhatsApp after 2 seconds so you have their details
    setTimeout(() => {
        const text = `Hi! I just initiated a Direct Payment for *${pName}* (₹${pPrice}).%0A%0A*My Shipping Address is:*%0A${address}`;
        window.open(`https://wa.me/${PHONE}?text=${text}`, '_blank');
    }, 2000);
  };

  // FUNCTION 2: CHECK AVAILABILITY VIA WHATSAPP
  const checkAvailability = (pName, pPrice) => {
    const text = `Hi Crafted Stories! 👋%0A%0AIs *${pName}* (₹${pPrice}) available?%0A%0A*My Address:*%0A${address || 'Not provided yet'}`;
    window.open(`https://wa.me/${PHONE}?text=${text}`, '_blank');
  };

  return (
    <div>
      <a href={`https://wa.me/${PHONE}`} className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-xl z-50 hover:scale-110 transition-transform">
        <i data-lucide="message-circle"></i>
      </a>

      <nav className="flex justify-between items-center px-[5%] py-5 bg-white sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-2">
          <i data-lucide="heart" className="text-rose-400 fill-rose-400"></i>
          <h2 className="serif text-2xl font-bold">Crafted Stories</h2>
        </div>
        <div className="hidden md:flex gap-8 font-medium">
          <a href="#shop" className="hover:text-rose-500">Shop</a>
          <a href="#about" className="hover:text-rose-500">Our Story</a>
          <a href="#contact" className="hover:text-rose-500">Contact</a>
        </div>
      </nav>

      <section className="rose-gradient text-center py-16 px-5">
        <h1 className="serif text-5xl md:text-7xl mb-6">Handmade with Love,<br/>Built with Soul.</h1>
        <p className="text-lg max-w-2xl mx-auto mb-10 text-gray-600">Handmade by Jyothi & Preethi Reddy.</p>
        <a href="#shop" className="bg-rose-500 text-white px-10 py-4 rounded-full font-bold shadow-lg">Shop Now</a>
      </section>

      <section id="shop" className="py-20 px-[5%]">
        <div className="max-w-xl mx-auto mb-12 bg-white p-6 rounded-2xl border-2 border-dashed border-rose-200 shadow-inner">
          <label className="block text-sm font-bold text-rose-600 mb-2 uppercase tracking-widest">Step 1: Enter Shipping Address</label>
          <textarea 
            className="w-full p-4 border border-rose-100 rounded-xl focus:ring-2 focus:ring-rose-300" 
            placeholder="Full Name, House No, City, Pincode..."
            rows="3"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(p => (
            <div key={p.id} className="bg-white rounded-3xl overflow-hidden border border-rose-100 shadow-sm flex flex-col">
              <img src={p.img} alt={p.name} className="w-full h-72 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{p.name}</h3>
                <span className="text-2xl font-bold text-rose-500">₹{p.price}</span>
                <div className="mt-4 flex flex-col gap-2">
                  <button onClick={() => handleDirectPay(p.name, p.price)} className="w-full bg-rose-500 text-white py-3 rounded-xl font-bold hover:bg-rose-600">Pay Now (UPI)</button>
                  <button onClick={() => checkAvailability(p.name, p.price)} className="w-full border border-rose-500 text-rose-500 py-3 rounded-xl font-bold hover:bg-rose-50">Check Availability</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer id="contact" className="bg-gray-900 text-white py-16 px-[5%]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="serif text-2xl mb-6 text-rose-400">Contact</h3>
            <a href={`tel:+91${PHONE}`} className="block mb-2 hover:text-rose-400">📞 +91 {PHONE}</a>
            <a href={`mailto:${EMAIL}`} className="block mb-2 hover:text-rose-400">✉️ {EMAIL}</a>
            <a href={`https://instagram.com/${INSTA_ID}`} target="_blank" className="block hover:text-rose-400">📸 @{INSTA_ID}</a>
          </div>
          <div>
            <h3 className="serif text-2xl mb-6 text-rose-400">Payments</h3>
            <p className="text-gray-400">Accepted: PhonePe, GPay, Paytm</p>
            <p className="text-xl font-bold mt-2 text-white">{UPI_ID}</p>
          </div>
          <div>
            <h3 className="serif text-2xl mb-6 text-rose-400">Location</h3>
            <p className="text-gray-400">Shipping all over India from Andhra Pradesh.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
setTimeout(() => lucide.createIcons(), 500);
