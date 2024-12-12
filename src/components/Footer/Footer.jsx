import React from 'react'
import './Footer.css'
import { NavLink } from 'react-router-dom'

export function Footer() {
    return (
        <div className='footer_wrapper page_wrapper'>
            <div className='footer_rule'><hr></hr></div>
            <div className='footer_row_top'>
                <NavLink to={'/news'} className={'footer_link'}>News</NavLink>
                <NavLink to={'/about'} className={'footer_link'}>About Us</NavLink>
                <NavLink to={'/about#terms-of-use'} className={'footer_link'}>Terms</NavLink>
                <NavLink to={'/about#privacy-policy'} className={'footer_link'}>Privacy</NavLink>
                <NavLink to={'/about#contact-us'} className={'footer_link'}>Contuct</NavLink></div>
            <div className='footer_row_bottom'>
                <p>© 2008-2024. All rights reserved.</p>
                <div className='our_brands'>
                    <p>MediCare Pro</p>
                    <p>NutriVital</p>
                    <p>HealTouch</p>
                    <p>WellWise Labs</p>
                    <p>CareCloud</p>
                </div>
                </div>
        </div>
    )
}
