import React from 'react';
import Logo from "../Shared/Logo";
import { CiMail } from "react-icons/ci";
import { FaClock, FaFacebook, FaInstagram, FaLinkedin, FaRegCopyright, FaTwitter, } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdCall } from "react-icons/md";
import { Link } from "react-router";


const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
            <div className="max-w-7xl mx-auto px-6">

                
                <div className="grid gap-10 md:gap-6 sm:grid-cols-2 md:grid-cols-4">

                    {/*Logo */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Logo></Logo>
                            <h2 className="text-xl font-bold text-white"> CivicCare </h2>
                        </div>
                        <p className="text-sm font-medium">
                             Empowering citizens to report and track public issues easily, ensuring faster responses, better transparency, and smarter city services.
                        </p>
                    </div>

                    {/* Contact Info  */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="flex  gap-2 items-center"><CiMail className="text-[#fff022] text-xl" /> support@civiccare.com</li>
                            
                            <li className="flex  gap-2 items-center"><MdCall className="text-[#fff022] text-xl"/> +880 1234-567890</li>

                            <li className="flex items-center gap-2"><FaLocationDot className="text-[#fff022] text-xl" /> House 12, Road 5, uttara, Dhaka, Bangladesh</li>

                            <li className="flex  gap-2 items-center"><FaClock  className="text-[#fff022] text-xl"/> Sun - Thursday : 9AM - 6PM</li>
                        </ul>
                    </div>

                    {/* Useful Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/" className="hover:text-white duration-200">Home</Link></li>
                            <li><Link to="/allIssues" className="hover:text-white duration-200">All Issues</Link></li>
                            <li><Link to="/services" className="hover:text-white duration-200">Services</Link></li>

                        </ul>
                    </div>

                    {/* Terms & Social */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-3">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/terms" className="hover:text-white duration-200">Terms & Conditions</Link></li>
                            <li><Link to="/privacy" className="hover:text-white duration-200">Privacy Policy</Link></li>
                        </ul>

                        {/* Social Icons */}
                        <div className="flex gap-4 mt-4 text-xl">
                            <a href="#" className="hover:text-white"><FaFacebook /></a>
                            <a href="#" className="hover:text-white"><FaInstagram /></a>
                            <a href="#" className="hover:text-white"><FaTwitter /></a>
                            <a href="https://www.linkedin.com/in/mohammad-shefaul-karim-24b2b52ba" className="hover:text-white"><FaLinkedin /></a>
                        </div>
                    </div>
                </div>

                
                <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm flex justify-center items-center gap-1">
                    
                    <span>{new Date().getFullYear()}</span>
                    <FaRegCopyright />
                    <span>CivicCare — All Rights Reserved.</span>
                </div>


            </div>
        </footer>
    );
};

export default Footer;