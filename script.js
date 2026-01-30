const PHONE = "918106676763";
const INSTA_ID = "craftedstories._";
const EMAIL = "praveen11042001@gmail.com";

const products = [
  { id: 1, name: "Pearl Bridal Earrings", price: 599, img: "https://images.unsplash.com/photo-1528797664208-e5a8c0b98881" },
  { id: 2, name: "Ocean Resin Coasters", price: 599, img: "https://images.unsplash.com/photo-1713097458865-34f9821d60f3" },
  { id: 3, name: "Floral Necklace Set", price: 1299, img: "https://images.unsplash.com/photo-1722510825242-0d8f2064c2e2" },
  { id: 4, name: "Resin Jewelry Tray", price: 799, img: "https://images.pexels.com/photos/7256631/pexels-photo-7256631.jpeg" }
];

function App() {
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [address, setAddress] = React.useState("");

  const sendWhatsApp = (pName, pPrice, method) => {
    if (!address.trim()) {
      alert("Please enter your shipping address first!");
      return;
    }
    
    const intent = method === 'check' 
      ? `Check Availability & Order` 
      : `Order & Pay via UPI`;

    const text = `Hi Crafted Stories! 👋%0A%0A*New Order Request*%0AItem: ${pName}%0APrice: ₹${pPrice}%0A%0A*Shipping Address:*%0A${address}%0A%0A*Action:* I want to ${intent}. Please guide me for payment to 8106676763.`;
    
    window.open(`https://wa.me/${PHONE}?text=${text}`, '_blank');
  };

  return (
    <div>
      {/* Floating WhatsApp */}
      <a href={`https://wa.me/${PHONE}`} className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-xl z-50 hover:scale-110 transition-transform">
        <i data-lucide="message-circle"></i>
      </a>

      {/* Navigation */}
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

      {/* Hero */}
      <section className="rose-gradient text-center py-20 px-5">
        <h1 className="serif text-5xl md:text-7xl mb-6">Handmade with Love,<br/>Built with Soul.</h1>
        <p className="text-lg max-w-2xl mx-auto mb-10 text-gray-600">
          Two sisters, Jyothi & Preethi Reddy, turning childhood struggles into independent artistry. Unique jewelry & resin art.
        </p>
        <a href="#shop" className="bg-rose-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-rose-600 shadow-lg">Explore Collection</a>
      </section>

      {/* Shop */}
      <section id="shop" className="py-20 px-[5%]">
        <h2 className="serif text-center text-4xl mb-4">The Collection</h2>
        <p className="text-center text-gray-500 mb-12 italic text-sm">Step 1: Enter your address below | Step 2: Click Order on your favorite item</p>
        
        {/* Address Entry Section */}
        <div className="max-w-xl mx-auto mb-12 bg-white p-6 rounded-2xl border-2 border-dashed border-rose-200">
          <label className="block text-sm font-bold text-rose-600 mb-2 uppercase">Delivery Address (Required)</label>
          <textarea 
            className="w-full p-4 border border-rose-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300" 
            placeholder="Enter your full name, house no, area, city, and pincode..."
            rows="3"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(p => (
            <div key={p.id} className="bg-white rounded-3xl overflow-hidden border border-rose-100 shadow-sm flex flex-col">
              <img src={p.img} alt={p.name} className="w-full h-72 object-cover" />
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold mb-2">{p.name}</h3>
                <span className="text-2xl font-bold text-rose-500">₹{p.price}</span>
                <div className="mt-4 flex flex-col gap-2">
                  <button onClick={() => sendWhatsApp(p.name, p.price, 'pay')} className="w-full bg-rose-500 text-white py-3 rounded-xl font-bold text-sm hover:bg-rose-600 transition-colors">Pay Now via UPI</button>
                  <button onClick={() => sendWhatsApp(p.name, p.price, 'check')} className="w-full border border-rose-500 text-rose-500 py-3 rounded-xl font-bold text-sm hover:bg-rose-50">Check Availability First</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16 px-[5%]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="serif text-2xl mb-6 text-rose-400">Connect With Us</h3>
            <a href={`tel:+91${PHONE}`} className="flex items-center gap-3 mb-4 hover:text-rose-400">
              <i data-lucide="phone" className="w-5 h-5"></i> +91 {PHONE}
            </a>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 mb-4 hover:text-rose-400">
              <i data-lucide="mail" className="w-5 h-5"></i> {EMAIL}
            </a>
            <a href={`https://instagram.com/${INSTA_ID}`} target="_blank" className="flex items-center gap-3 hover:text-rose-400">
              <i data-lucide="instagram" className="w-5 h-5"></i> @{INSTA_ID}
            </a>
          </div>
          <div>
            <h3 className="serif text-2xl mb-6 text-rose-400">Payment Center</h3>
            <p className="text-gray-400 mb-2 italic">Official PhonePe / GPay Number:</p>
            <p className="text-3xl font-bold tracking-wider">{PHONE}</p>
          </div>
          <div>
            <h3 className="serif text-2xl mb-6 text-rose-400">Our Promise</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Every item is handmade by Jyothi & Preethi Reddy. We ensure safe packaging and delivery across India. Support sister-led businesses!
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
setTimeout(() => lucide.createIcons(), 500);
