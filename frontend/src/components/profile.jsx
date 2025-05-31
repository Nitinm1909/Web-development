import { useState } from 'react';
import { Camera, Heart, ShoppingCart, Package, LogOut } from 'lucide-react';
import './profile.css';

const Profile = () => {
  const [showWishlist, setShowWishlist] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [profilePic, setProfilePic] = useState('https://via.placeholder.com/150');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfilePic(URL.createObjectURL(file));
  };

  return (
    <div className="profile-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="profile-section">
          <label htmlFor="image-upload" className="profile-image">
            <img src={profilePic} alt="Profile" />
            <Camera className="camera-icon" />
          </label>
          <input id="image-upload" type="file" onChange={handleImageChange} hidden />
          <h2>Mr. Taylon</h2>
          <p>taylon6447@brickmail.com</p>
        </div>
        <nav>
          <button onClick={() => setShowWishlist(!showWishlist)}>
            <Heart /> Wishlist
          </button>
          <button onClick={() => setShowCart(!showCart)}>
            <ShoppingCart /> My Cart
          </button>
          <button>
            <Package /> Track Orders
          </button>
          <button className="logout-btn">
            <LogOut /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <h1>Profile Dashboard</h1>
        <section className="grid-container">
          <div className="grid-item">Personal Information</div>
          <div className="grid-item">Order History</div>
          <div className="grid-item">Track Your Orders</div>
          <div className="grid-item">Hearing Aid Recommendations</div>
        </section>

        {/* Book a Free Consultation Section */}
        <section className="consultation">
          <h2>📞 Book a Free Consultation</h2>
          <p>Need expert advice? Schedule a call with our specialists today!</p>
          <button onClick={() => alert('Consultation booked! 🎉')}>
            Book Now
          </button>
        </section>
      </main>

      {/* Wishlist & Cart */}
      {showWishlist && (
        <div className="wishlist-overlay">
          <h2>Wishlist</h2>
          <p>Product 1</p>
          <p>Product 2</p>
        </div>
      )}
      {showCart && (
        <div className="cart-overlay">
          <h2>My Cart</h2>
          <p>Item 1</p>
          <p>Item 2</p>
        </div>
      )}
    </div>
  );
};

export default Profile;