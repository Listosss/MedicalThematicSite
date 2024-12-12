import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const loadUserFromStorage = () => {
    try {
      const userData = localStorage.getItem("currentUser");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error loading user from localStorage:", error);
      return null;
    }
  };

  useEffect(() => {
    const loadedUser = loadUserFromStorage();
    if (loadedUser) setUser(loadedUser)
  }, [])

  const login = (username, pass) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.length === 0) {
      alert("No registered users found. Please check your username or password.")
      return;
    }
    const thisUser = users.find(user => String(user.password) === String(pass) && user.name === username)
    if (thisUser) {
      setUser(thisUser);
      localStorage.setItem("currentUser", JSON.stringify(thisUser));
      navigate('/account');
    }
    else
      alert("Invalid username or password. Please try again.")
  }

  const checkNameUniqueness = (username) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    return !users.some(user => user.name === username);
  }

  const register = (data) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push(data)

    localStorage.setItem("users", JSON.stringify(users));
    navigate('/login');
  };

  const logout = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    console.log(users)
    const newUsers = [...users.filter(this_user => this_user.name !== user.name), user];
    localStorage.clear();
    localStorage.setItem("users", JSON.stringify(newUsers))

    setUser(null);
    navigate("/")
  };


  const updateUser = (updatedFields) => {
    const updatedUser = { ...user, ...updatedFields }
    setUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
  }

  const saveArticle = ({ uid, title }) => {
    if (!user) return

    const updatedFields = { savedArticles: [...(user.savedArticles || []), { uid, title }] }
    updateUser(updatedFields)
  }

  const deleteSavedArticle = ({ uid }) => {
    if (!user) return;

    const updatedFields = { savedArticles: user.savedArticles.filter(article => String(article.uid) !== String(uid)) }
    updateUser(updatedFields)
  }

  const rateArticle = (uid, rating) => {
    if (!user) return;
    const ratedArticles = user?.ratedArticles?.filter(article => article.uid !== uid) || [];
    ratedArticles.push({ uid, rating })
    updateUser({ ratedArticles })
  }

  const updateAvatar = (newAvatar) => {
    if (!user) return;

    const avatar = newAvatar;
    updateUser({ avatar })
  }


  const authContextValue = {
    user,
    login,
    logout,
    register,
    checkNameUniqueness,
    saveArticle,
    deleteSavedArticle,
    updateAvatar,
    rateArticle,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  )
}