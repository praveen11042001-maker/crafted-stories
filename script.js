const PHONE = "918106676763";

const products = [
  { id: 1, name: "Pearl Bridal Earrings", price: 599, img: "https://images.unsplash.com/photo-1528797664208-e5a8c0b98881" },
  { id: 2, name: "Ocean Resin Coasters", price: 599, img: "https://images.unsplash.com/photo-1713097458865-34f9821d60f3" },
  { id: 3, name: "Floral Necklace Set", price: 1299, img: "https://images.unsplash.com/photo-1722510825242-0d8f2064c2e2" },
  { id: 4, name: "Resin Jewelry Tray", price: 799, img: "https://images.pexels.com/photos/7256631/pexels-photo-7256631.jpeg" }
];

function App() {
  const sendWhatsApp = (pName, pPrice) => {
    const text = `Hi Crafted Stories! 👋%0A%0AI would like to order: *${pName}*%0ATotal Price: *₹${pPrice}*%0A%0APlease share your UPI/QR code so I can pay via PhonePe/GPay. My shipping address is:`;
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
      <section className="rose-gradient text-center py-24 px-5">
        <h1 className="serif text-5xl md:text-7xl mb-6">Handmade with Love,<br/>Built with Soul.</h1>
        <p className="text-lg max-w-2xl mx-auto mb-10 text-gray-600">
          Two sisters, Jyothi & Preethi Reddy, turning childhood struggles into independent artistry. Unique jewelry & resin art.
        </p>
        <a href="#shop" className="bg-rose-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-rose-600 transition-all shadow-lg">Explore Collection</a>
      </section>

      {/* Shop */}
      <section id="shop" className="py-20 px-[5%]">
        <h2 className="serif text-center text-4xl mb-12">The Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(p => (
            <div key={p.id} className="bg-white rounded-3xl overflow-hidden border border-rose-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="h-80 overflow-hidden">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{p.name}</h3>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-2xl font-bold text-rose-500">₹{p.price}</span>
                  <button onClick={() => sendWhatsApp(p.name, p.price)} className="bg-rose-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-rose-600">Order Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-rose-50 py-20 px-[5%] text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="serif text-4xl mb-8">Two Sisters. No Shortcuts.</h2>
          <p className="text-lg leading-relaxed text-gray-700">
            Growing up, life taught us resilience through hardship. We are <strong>Jyothi & Preethi Reddy</strong>. 
            We started Crafted Stories not just to sell art, but to stand on our own feet. Every piece 
            is a symbol of our independence. When you buy from us, you support a dream built from scratch.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16 px-[5%]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="serif text-3xl mb-6">Contact Us</h3>
            <p className="mb-2">📞 +91 8106676763</p>
            <p className="mb-2">✉️ praveen11042001@gmail.com</p>
            <p>📸 @craftedstories._</p>
          </div>
          <div>
            <h3 className="serif text-3xl mb-6">Payment (UPI)</h3>
            <p className="text-gray-400 mb-4">PhonePe / GPay / Paytm</p>
            <p className="text-3xl font-bold text-rose-400">8106676763</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
setTimeout(() => lucide.createIcons(), 500);
