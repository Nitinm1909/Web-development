// Profile.js
import React, { useState } from 'react';
import './profile.css';
import {
  Moon,
  Sun,
  Upload,
  User,
  ClipboardList,
  Gift,
  CreditCard,
  Settings,
  Trash2,
  Wallet,
} from 'lucide-react';

export default function Profile() {
  const [darkMode, setDarkMode] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('Profile');

  const [formData, setFormData] = useState({
    fullName: 'Janu Gita',
    mobile: '7845110537',
    email: 'sjaanu2005@gmail.com',
    gender: 'NOTSET',
    dob: '',
    location: '',
    altMobile: '',
    hintName: '',
  });

  const sidebarItems = [
    { icon: <User size={16} />, label: 'Overview' },
    { icon: <ClipboardList size={16} />, label: 'Orders & Returns' },
    { icon: <Gift size={16} />, label: 'Coupons' },
    { icon: <Wallet size={16} />, label: 'Wallet' },
    { icon: <User size={16} />, label: 'Profile' },
    { icon: <CreditCard size={16} />, label: 'Saved Cards' },
    { icon: <Settings size={16} />, label: 'Settings' },
    { icon: <Trash2 size={16} />, label: 'Delete Account' },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setEditing(false);
    // TODO: Save changes to backend here
  };

  return (
    <div className={`profile-container ${darkMode ? 'dark' : ''}`}>
      <aside className="sidebar">
        <h2>My Account</h2>
        <ul>
          {sidebarItems.map((item) => (
            <li
              key={item.label}
              className={activeTab === item.label ? 'active' : ''}
              onClick={() => setActiveTab(item.label)}
            >
              {item.icon} {item.label}
            </li>
          ))}
        </ul>
        <button
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle Theme"
        >
          {darkMode ? <Sun /> : <Moon />}
        </button>
      </aside>

      <main className="profile-content">
        <h1>Account Settings</h1>

        <div className="profile-form-container">
          <div className="left-section">
            <div className="image-preview large">
              {preview ? (
                <img src={preview} alt="Profile" />
              ) : (
                <div className="placeholder">No Image</div>
              )}
            </div>

            <label className="upload-btn full-width">
              <Upload size={16} />
              Upload Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </label>

            <div className="password-fields">
              <label htmlFor="oldPassword">Old Password</label>
              <input id="oldPassword" type="password" placeholder="Enter old password" />
              <label htmlFor="newPassword">New Password</label>
              <input id="newPassword" type="password" placeholder="Enter new password" />
              <button className="edit-btn">Change Password</button>
            </div>
          </div>

          <div className="right-section">
            <div className="two-column-grid">
              {[
                ['Full Name', 'fullName'],
                ['Mobile', 'mobile'],
                ['Email', 'email'],
                ['Gender', 'gender'],
                ['Date of Birth', 'dob'],
                ['Location', 'location'],
                ['Alternate Mobile', 'altMobile'],
                ['Hint Name', 'hintName'],
              ].map(([label, key]) => (
                <div key={key} className="field-group">
                  <label htmlFor={key}>{label}</label>
                  {editing ? (
                    key === 'gender' ? (
                      <select
                        id={key}
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                      >
                        <option value="NOTSET">Not Set</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      <input
                        id={key}
                        type={key === 'dob' ? 'date' : 'text'}
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                      />
                    )
                  ) : (
                    <div className="readonly">
                      {formData[key] ? formData[key] : '- not added -'}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="button-row">
              {editing ? (
                <>
                  <button className="edit-btn" onClick={handleSave}>
                    Save
                  </button>
                  <button className="cancel-btn" onClick={() => setEditing(false)}>
                    Cancel
                  </button>
                </>
              ) : (
                <button className="edit-btn" onClick={() => setEditing(true)}>
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
