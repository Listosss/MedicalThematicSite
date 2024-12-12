import React, { useContext, useState , useEffect} from 'react'
import './Header.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import 'font-awesome/css/font-awesome.min.css';

export function Header() {
    const [menuOpen, setMenuOpen] = useState(false); 
    const { user } = useContext(AuthContext);
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate()

    const handleSearch = () => {
        if (searchValue.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchValue.trim())}`);
            setSearchValue("")
        }
    }

    const handleMenuClose = () => setMenuOpen(false);
    return (
        <div className='header_wrapper'>
            <div className='header_firstline'>
                <h1 className='header_title' onClick={()=>{navigate('/')}}>
                    Thematic<br /> Portal
                </h1>
                <div className='search_account_div'>
                    
                    <input className='search_input' placeholder='Search...'
                        value={searchValue} onChange={e => setSearchValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSearch();
                        }} />
                    <button onClick={handleSearch}><i className="fa fa-search" style={{ fontSize: '20px', borderBottom: '1px solid  #32323267', paddingBottom: '3px', marginRight: '10px' }}></i></button>

                    {user ? <NavLink to={'/account'} className={'user_header_avatar'}><img src={user?.avatar} /></NavLink> : 
                    <div className='autorization_btns'>
                        <NavLink to={'/login'} >Log in</NavLink>
                        <NavLink to={'/register'} >Sign up</NavLink>
                    </div>}
                    <button className="burger_button" onClick={() => setMenuOpen(!menuOpen)}>
                    <i className={`fa ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                </button>
                </div>
            </div>
            <div className={`header_menu ${menuOpen ? 'menu_open' : ''}`}>
            {menuOpen && <button className="burgermenu_open_button" onClick={() => setMenuOpen(!menuOpen)}><i className={` fa ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i></button>}
                <NavLink to={'/'} onClick={handleMenuClose} className={({ isActive }) => isActive ? 'header_link_active' : 'header_link'}>Home</NavLink>
                <NavLink to={'/news'} onClick={handleMenuClose} className={({isActive})=> isActive? 'header_link_active' : 'header_link'}>News</NavLink>
                <NavLink to={'/about'} onClick={handleMenuClose} className={({isActive})=> isActive? 'header_link_active' : 'header_link'}>About Us</NavLink>
            </div>
        </div>
    )
}

