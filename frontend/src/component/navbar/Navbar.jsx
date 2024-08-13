import React from "react";
import "./navbar.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaFileZipper } from "react-icons/fa6";
import { ImUserTie } from "react-icons/im";
import { BsBriefcaseFill } from "react-icons/bs";
import { BiSolidMessageAltDetail } from "react-icons/bi";
import { FaPeopleGroup } from "react-icons/fa6";

const Navbar = () => {
    const navIcons = {
        // fontSize: "1.5rem",
        marginRight: "2rem",
    };

    const navIconsMobile = {
        fontSize: "1.5rem",
    };

    const linkStyle = {
        textDecoration: "none",
        color: "white",
        display: "flex",
        alignItems: "flex-end",
    };

    const linkStyleMobile = {
        textDecoration: "none",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    };

    return (
        <nav>
            <div className="nav-desk">
                <div className="wrapper-desk group">
                    <ul>
                        <div>
                            <a href="#" style={linkStyle}>
                                <li>
                                    <FaHome style={navIcons} /> <p>Home</p>
                                </li>
                            </a>
                        </div>
                        <div>
                            <Link to="/showAllLeads" style={linkStyle}>
                                <li>
                                    <ImUserTie style={navIcons} /><p>Leads</p>
                                </li>
                            </Link>
                        </div>
                        <div>
                            <Link to="/adminAvailableDays" style={linkStyle}>
                                <li>
                                    <BsBriefcaseFill style={navIcons} />{" "}
                                    <p>Days</p>
                                </li>
                            </Link>
                        </div>
                        <div>
                            <a href="/allCounsellorsReport" style={linkStyle}>
                                <li>
                                    <FaFileZipper style={navIcons} />{" "}
                                    <p>Report</p>
                                </li>
                            </a>
                        </div>
                        <div>
                            <a href="#contact" style={linkStyle}>
                                <li>
                                    <BiSolidMessageAltDetail style={navIcons} />{" "}
                                    <p>Contact</p>
                                </li>
                            </a>
                        </div>
                        <div>
                            <a href="/seniorAdmHead" style={linkStyle}>
                                <li className="">
                                    <FaPeopleGroup style={navIcons} />{" "}
                                    <p className=" group-hover:flex hidden">Senior Admission Head</p>
                                </li>
                            </a>
                        </div>
                    </ul>
                </div>
            </div>
            <div className="nav-mobile">
                <div className="wrapper-mobile">
                    <ul>
                        <li title="Home">
                            <a href="#" style={linkStyleMobile}>
                                <FaHome style={navIconsMobile} />
                            </a>
                        </li>
                        <li title="About">
                            <a href="#about" style={linkStyleMobile}>
                                <ImUserTie style={navIconsMobile} />
                            </a>
                        </li>
                        <li title="Experience">
                            <a href="#experience" style={linkStyleMobile}>
                                <BsBriefcaseFill style={navIconsMobile} />
                            </a>
                        </li>
                        <li title="Portfolio">
                            <a href="#projects" style={linkStyleMobile}>
                                <FaFileZipper style={navIconsMobile} />
                            </a>
                        </li>
                        <li title="Contact">
                            <a href="#contact" style={linkStyleMobile}>
                                <BiSolidMessageAltDetail
                                    style={navIconsMobile}
                                />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaHome } from 'react-icons/fa';
// import { FaFileZipper } from 'react-icons/fa6';
// import { ImUserTie } from 'react-icons/im';
// import { BsBriefcaseFill } from 'react-icons/bs';
// import { BiSolidMessageAltDetail } from 'react-icons/bi';

// const Navbar = () => {
//   const navIcons = {
//     marginRight: '2rem',
//   };

//   const navIconsMobile = {
//     fontSize: '1.5rem',
//   };

//   const linkStyle = {
//     textDecoration: 'none',
//     color: 'white',
//     display: 'flex',
//     alignItems: 'flex-end',
//   };

//   const linkStyleMobile = {
//     textDecoration: 'none',
//     color: 'white',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'column',
//   };

//   return (
//     <nav>
//       <div className="nav-desk">
//         <div className="wrapper-desk">
//           <ul>
//             <li>
//               <Link to="/" style={linkStyle}>
//                 <FaHome style={navIcons} /> <p>Home</p>
//               </Link>
//             </li>
//             <li>
//               <Link to="/about" style={linkStyle}>
//                 <ImUserTie style={navIcons} /> <p>About</p>
//               </Link>
//             </li>
//             <li>
//               <Link to="/experience" style={linkStyle}>
//                 <BsBriefcaseFill style={navIcons} /> <p>Experience</p>
//               </Link>
//             </li>
//             <li>
//               <Link to="/projects" style={linkStyle}>
//                 <FaFileZipper style={navIcons} /> <p>Portfolio</p>
//               </Link>
//             </li>
//             <li>
//               <Link to="/contact" style={linkStyle}>
//                 <BiSolidMessageAltDetail style={navIcons} /> <p>Contact</p>
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//       <div className="nav-mobile">
//         <div className="wrapper-mobile">
//           <ul>
//             <li title="Home">
//               <Link to="/" style={linkStyleMobile}>
//                 <FaHome style={navIconsMobile} />
//               </Link>
//             </li>
//             <li title="About">
//               <Link to="/about" style={linkStyleMobile}>
//                 <ImUserTie style={navIconsMobile} />
//               </Link>
//             </li>
//             <li title="Experience">
//               <Link to="/experience" style={linkStyleMobile}>
//                 <BsBriefcaseFill style={navIconsMobile} />
//               </Link>
//             </li>
//             <li title="Portfolio">
//               <Link to="/projects" style={linkStyleMobile}>
//                 <FaFileZipper style={navIconsMobile} />
//               </Link>
//             </li>
//             <li title="Contact">
//               <Link to="/contact" style={linkStyleMobile}>
//                 <BiSolidMessageAltDetail style={navIconsMobile} />
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;