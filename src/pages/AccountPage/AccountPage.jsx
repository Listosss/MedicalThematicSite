import React, { useContext, useState, useRef } from 'react'
import { AuthContext } from '../../context/AuthContext'
import "./AccountPage.css"
import { SavedUserArticles } from '../../components/SavedUserArticles/SavedUserArticles';

export function AccountPage() {
  const { user, logout, updateAvatar } = useContext(AuthContext);
  const [preview, setPreview] = useState(user?.avatar || "./assets/avatars/default_avatar.png");
  const [isChoosing, setChoosing] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setChoosing(true)
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      }
      reader.readAsDataURL(file);
    }
  }
  const handleFileClick = () => {
    if (preview) {
      setChoosing(false)
      updateAvatar(preview);
    }
  }
  const cancelChangeAvatar = () => {
    if (preview) {
      setChoosing(false)
      setPreview(user?.avatar || "./assets/avatars/default_avatar.png");
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; 
      }
    }
  }

  return (
    <div className='page_wrapper'>
      <div className='account_wrapper'>
        <div className='account_info'>

          <label htmlFor="account_name">Name:</label>
          <p name="account_name">{user?.name}</p>

          <label htmlFor="account_email">Email:</label>
          <p name="account_email">{user?.email}</p>

          <label htmlFor="account_date">Date:</label>
          <p name="account_date">{user? Object.values(user?.date).join(" "):""}</p>

          <label htmlFor="account_role">Role:</label>
          <p name="account_role">{user?.role}</p>
          
        </div>
        <div className='change_avatar_div'>
          <img src={preview} alt='avatar' className='account_avatar_preview' />

          <div className="file_input">
            <label htmlFor="file">Choose file</label>
            <input type='file' id="file" className='change_avatar_input' onChange={handleFileChange} accept="image/*" ref={fileInputRef} />
          </div>

          <div className='avatar_btns_panel' hidden={!isChoosing}>
            <button onClick={handleFileClick} className='change_avatar_btn'>Ok</button>
            <button onClick={cancelChangeAvatar} className='cancel_avatar_btn'>Cancel</button>
          </div>
        </div>
        </div>
        <SavedUserArticles />
        <button onClick={logout} className='exit_btn'>Exit</button>
    </div>
  )
}
