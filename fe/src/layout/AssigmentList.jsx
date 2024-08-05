//import all necessary modules
import React from 'react';
import { Button, Grid, Paper, Typography } from '@material-ui/core';
import './CourseList.css'
import './Icon.css'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideMenu from '../components/SideMenu';


function CardItem({ }) {
    return (
        <Grid item md={3} xs={8} className="course-item" style={{ zIndex: '9999', marginBottom: '20px' }}>
            {/* <div className="course-item col-md-4 col-sm-6 col-lg-3" style={{ zIndex: '9999', marginBottom: '20px', width: '200px' }}> */}
            <div className='wrap-course-item'>
                <div className='course-info'>
                    <h3 class="course-title mg-b-15 fs-18">
                        <a href="#">
                            <span class="title">Lập trình Web hahahahahahahahahaha</span>
                        </a>
                    </h3>

                    <ul className='bottom-course-sum none-list'>
                        <li>
                            <i class="las la-chalkboard-teacher"></i>
                            <span title="SE1707-NET" className="text-ellipsis" value="SE1707-NET">SE1707-NET</span>
                        </li>
                        <li>
                            <i class="las la-user-circle"></i>
                            <span title="SE1707-NET" className="text-ellipsis" value="SE1707-NET">SE1707-NETda</span>
                        </li>
                        <li>
                            <i class="las la-id-card"></i>
                            <span title="SE1707-NET" className="text-ellipsis" value="SE1707-NET">SE1707-Nsdasdasdasd</span>
                        </li>
                    </ul>

                    <a class="view-detail text-decoration-none" title="Go to course">
                        <span title="Go to course" value="Go to course">Go to course</span>
                        <i class="las la-arrow-right"></i>
                    </a>
                </div>
            </div>
            {/* </div> */}
        </Grid>
    )
}


export default function AssignmentList() {
    const [value, setValue] = React.useState('1');
    const [age, setAge] = React.useState('');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeAge = (event) => {
        setAge(event.target.value);
    };


    return (
        <div>
            <div className="wrapper">
                <SideMenu />

                <div className="main-content">
                    <div className='site-main' style={{ padding: '20px', flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className='container'>
                            <div className='lesson-detail-tab edu-tabs'>

                                <Grid container spacing={2}>
                                    <div className='list-course row' style={{ margin: 'auto' }}>
                                        <CardItem />
                                        <CardItem />
                                        <CardItem />
                                        <CardItem />
                                    </div>
                                </Grid>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    )
};