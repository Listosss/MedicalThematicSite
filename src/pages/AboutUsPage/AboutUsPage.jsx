import React, { useEffect, useRef } from 'react'
import './AboutUsPage.css'
import { useLocation } from 'react-router-dom';

export function AboutUsPage() {
    const privacyRef = useRef(null);
    const termsRef = useRef(null);
    const contactUsRef = useRef(null)
    const location = useLocation();

    useEffect(()=>{
        if (location.hash === '#privacy-policy' && privacyRef.current) 
            privacyRef.current.scrollIntoView({ behavior: 'smooth' });
        
        else if (location.hash === '#terms-of-use' && termsRef.current) 
            termsRef.current.scrollIntoView({ behavior: 'smooth' });
        
        else if(location.hash==="#contact-us" && contactUsRef.current)
            contactUsRef.current.scrollIntoView({behavior: 'smooth'})
        
    }, [location])
    return (
        <div className='page_wrapper'>
            <section>
                <h1 className='about_title'>ABOUT US</h1>
                <p className='about_text'>Welcome to our site, your trusted partner in health and wellness.</p>
                <p className='about_text'>Our mission is to empower individuals to take charge of their health by providing reliable, accurate, and easy-to-understand information.
                    We are dedicated to making high-quality medical content accessible to everyone, from curious readers to healthcare professionals.</p>
                <p className='about_text about_article'>We want to help you own your well-being.</p>
                <p className='about_text'>Our team of experts includes medical writers, researchers, and healthcare professionals who ensure that every piece of information is backed by scientific evidence and updated regularly.
                    We cover a broad range of topics, including disease prevention, mental health, nutrition, and the latest in medical research, all tailored to provide guidance and support for a healthier lifestyle.</p>
                <p className='about_text'>Beyond information, our site also offers a vibrant online community where users can connect, share experiences, and find support.
                    Whether you’re seeking advice, looking to share knowledge, or aiming to stay informed about health trends, our community is here for you.</p>
                <p className='about_text'>Thank you for choosing [Portal Name] as your trusted source for health and wellness. Together, let’s build a healthier future.</p></section>
            
            <section ref={privacyRef}>
                <h1 className='about_title'>Privacy Policy</h1>
                <p className='about_text'>At our site, we are committed to protecting your privacy and safeguarding your personal information.
                    This Privacy Policy explains how we collect, use, and share information about you when you access our website, use our services, or interact with us in other ways.</p>
                <p className='about_text about_article'>Information We Collect</p>
                <ul className='privacy_policy_ul'>
                    <li>
                        <p className='about_text about_article'>Personal Information:</p>
                        <p className='about_text'>We may collect personal information you provide directly, such as your name, email address, and account details when you register or sign up for our newsletter.</p>
                    </li>
                    <li>
                        <p className='about_text about_article'>Usage Data:</p>
                        <p className='about_text'>We automatically collect certain information about your use of our website, including your IP address, device information, browser type, and interactions with our website.</p>
                    </li>
                    <li>
                        <p className='about_text about_article'>Cookies:</p>
                        <p className='about_text'>We use cookies to enhance your experience, analyze website traffic, and improve our services. You can control cookie preferences through your browser settings.</p>
                    </li>
                </ul>
                <a href='/about' className='about_us_link'>Please visit this page to learn more about our Privacy Policy.</a>
            </section>
            
            <section ref={termsRef}>
                <h1 className='about_title'>Terms of Use</h1>
                <p className='about_text'>By accessing or using our website, you agree to comply with these Terms of Use. Please read them carefully.
                    All content provided on our site is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a healthcare professional before making health-related decisions.
                </p>
                <a href='/about' className='about_us_link'>Read more about our Terms of Use</a>
            </section>

            <section ref={contactUsRef}>
                <h1 className='about_title'>Contact Us</h1>
                <p className='about_text about_article'>Do you have a medical question?</p>
                <p className='about_text'>We’re unable to offer personal health advice. If you’re facing a medical emergency, call your local emergency services immediately or visit the nearest emergency room.</p>
                <p className='about_text about_article'>Wellness City, CA 90210</p>
                <p className='about_text about_article'>Mailing address</p>
                <p className='about_text about_color_text'>P.O. Box 789 <br />
                    Wellness City, CA 90211 <br />
                    United States</p>
                <p className='about_text about_article'>Phone</p>
                <p className='about_text about_color_text'>(555) 123-4567</p>
            </section>
        </div>
    )
}
