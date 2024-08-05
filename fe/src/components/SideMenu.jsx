import React from 'react';
import '../layout/CourseList.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";


export default function SideMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const navigate = useNavigate();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    //handle log out
    const handleLogout = async (e) => {
        try {
            localStorage.removeItem("userId");
            localStorage.removeItem("rollNumber");
            localStorage.removeItem("role");
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <aside style={{ width: '250px', float: 'left' }} className="aside-menu">
            <div className="side-menu">
                <nav>
                    <ul className="ul-side-menu" style={{ padding: '0px' }}>
                        <div style={{ textAlign: 'center', width: '100%' }}>
                            <a style={{ textDecoration: 'underline' }}>
                                <img src="https://edunext.fpt.edu.vn/assets/logo-home-Djb_K2V0.png" style={{ width: '100%' }}></img>
                            </a>
                        </div>
                        <li>
                            <a onClick={handleClick} >
                                <span>
                                    <div className='logo-side-menu' style={{ textAlign: 'center', fontSize: '0.625rem' }}>
                                        <AccountCircleIcon style={{ fontSize: '1.5rem' }} />
                                    </div>
                                </span>
                            </a>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleClose}>{localStorage.getItem("email")}</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </li>
                        <li>
                            <a href="/courses">
                                <span>
                                    <div className='logo-side-menu' style={{ textAlign: 'center', fontSize: '0.625rem' }}>
                                        <HomeOutlinedIcon style={{ fontSize: '1.5rem' }} />
                                    </div>
                                </span>
                            </a>
                        </li>
                        {/* <li>
                            <a href="/assignments">
                                <span>
                                    <div className='logo-side-menu' style={{ textAlign: 'center', fontSize: '0.625rem' }}>
                                        <AssignmentIcon style={{ fontSize: '1.5rem' }} />
                                    </div>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="/slots">
                                <span>
                                    <div className='logo-side-menu' style={{ textAlign: 'center', fontSize: '0.625rem' }}>
                                        <UpcomingIcon style={{ fontSize: '1.5rem' }} />
                                    </div>
                                </span>
                            </a>
                        </li> */}
                        <li>
                            <a href="#">
                                <span>
                                    <div className='logo-side-menu' style={{ textAlign: 'center', fontSize: '0.625rem' }}>
                                        <PictureAsPdfIcon style={{ fontSize: '1.5rem' }} />
                                    </div>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span>
                                    <div className='logo-side-menu' style={{ textAlign: 'center', fontSize: '0.625rem' }}>
                                        <SupportAgentIcon style={{ fontSize: '1.5rem' }} />
                                    </div>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span>
                                    <div className='logo-side-menu' style={{ textAlign: 'center', fontSize: '0.625rem' }}>
                                        <LiveHelpIcon style={{ fontSize: '1.5rem' }} />
                                    </div>
                                </span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    )
}