//import all necessary modules
import React, { useEffect, useState } from 'react';
import { Button, ButtonBase, Grid, Paper, Typography } from '@material-ui/core';
import './CourseList.css'
import './Icon.css'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Tabs from '@mui/material/Tabs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideMenu from '../components/SideMenu';
import axios from 'axios';
import AddCourseModal from '../components/Modal/CreateCourseModal';
import { notification } from "antd";


function CardItem({ course, all, handleEnrollCourse }) {
    return (
        <Grid item md={3} xs={8} className="course-item" style={{ zIndex: '9999', marginBottom: '20px' }}>
            {/* <div className="course-item col-md-4 col-sm-6 col-lg-3" style={{ zIndex: '9999', marginBottom: '20px', width: '200px' }}> */}
            <div className='wrap-course-item'>
                <div className='course-info'>
                    <h3 class="course-title mg-b-15 fs-18">
                        check all null
                        {all ? (
                            <a>
                                <span className="title">{course.name}</span>
                            </a>
                        ) : (
                            <a href={`/courses/${course.id}`}>
                                <span className="title">{course.name}</span>
                            </a>
                        )}

                    </h3>

                    <ul className='bottom-course-sum none-list'>
                        <li>
                            <i class="las la-chalkboard-teacher"></i>
                            <span title="SE1707-NET" className="text-ellipsis" value="SE1707-NET">{course.class}</span>
                        </li>
                        <li>
                            <i class="las la-user-circle"></i>
                            <span title="SE1707-NET" className="text-ellipsis" value="SE1707-NET">edu_next_ltr_fpt_edu_{course.teacher_id}</span>
                        </li>
                        <li>
                            <i class="las la-id-card"></i>
                            <span title="SE1707-NET" className="text-ellipsis" value="SE1707-NET">Number of student: {course.students.length}</span>
                        </li>
                    </ul>

                    {!all ? (
                        <a class="view-detail text-decoration-none" title="Go to course" href={`/courses/${course.id}`}>

                            <span title="Go to course" value="Go to course">Go to course</span>
                            <i class="las la-arrow-right"></i>
                        </a>
                    ) : (
                        <a class="view-detail text-decoration-none" title="Go to course" onClick={handleEnrollCourse}>
                            <span title="Enroll Course" value="Go to course">Enroll Course</span>
                            <i class="las la-arrow-right"></i>
                        </a>
                    )}

                </div>
            </div>
            {/* </div> */}
        </Grid>
    )
}


export default function CourseList() {
    const [value, setValue] = useState('course');
    const [age, setAge] = useState('');
    const [listCourse, setListCourse] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [allCourse, setAllCourse] = useState([])
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type, mess) => {
        api[type]({
            message: 'Notification Title',
            description: mess
        });
    };

    const handleLoadCourse = async (age) => {
        if (age) {
            try {
                const response = await axios.get(`/courses`);
                let data = response.data.filter(course => course.semester === age);
                if (localStorage.getItem("role") === "teacher") {
                    data = data.filter(course => course.teacher_id === localStorage.getItem("userId"));
                    setListCourse(data);
                    return;
                }
                data = data.filter(course => course.students.includes(localStorage.getItem("userId")));
                console.log(data);
                setListCourse(data);
                return;
            } catch (error) {
                console.error(error);
            }
        }
        try {
            const response = await axios.get("/courses");
            if (localStorage.getItem("role") === "teacher") {
                const data = response.data.filter(course => course.teacher_id === localStorage.getItem("userId"));
                setListCourse(data);
                return;
            }
            const data = response.data.filter(course => course.students.includes(localStorage.getItem("userId")));
            console.log(data);
            setListCourse(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleLoadAllCourse = async () => {
        try {
            const response = await axios.get("/courses");
            console.log(response.data);
            setAllCourse(response.data);
        } catch (error) {
            console.error(error
            );
        }
    }

    const handleEnroll = async (courseId) => {
        console.log(courseId);
        console.log(localStorage.getItem("userId"));
        try {
            const response = await axios.get(`/courses/${courseId}`);

            if (response) {
                //check if student already enroll course
                if (response.data.students.includes(localStorage.getItem("userId"))) {
                    openNotificationWithIcon('error', 'You already enroll this course');
                    return;
                }
                const course = response.data;
                course.students.push(localStorage.getItem("userId"));
                await axios.put(`/courses/${courseId}`, course);
                handleLoadCourse();
                openNotificationWithIcon('success', 'Enroll course successfully');
            }
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        setValue('course');
        handleLoadAllCourse();
        handleLoadCourse();
    }, []);

    useEffect(() => {
        handleLoadCourse(age);
    }, [age]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeAge = (event) => {
        setAge(event.target.value);
    };

    const handleOpenModal = () => {
        setOpenModal(true);
        handleLoadCourse();
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        handleLoadCourse();
    };

    return (
        <div>
            {contextHolder}
            <div className="wrapper">
                <SideMenu />
                <div className="main-content">
                    <div className='site-main' style={{ padding: '20px', flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className='container'>
                            <div className='lesson-detail-tab edu-tabs'>
                                <TabContext value={value}>
                                    <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        textColor="primary"
                                        indicatorColor="primary"
                                        aria-label="secondary tabs example"
                                        className='edu-tabs-header'
                                    >
                                        <Tab value="course" label="My Course" />
                                        <Tab value="all" label="All" />
                                    </Tabs>
                                    <TabPanel value="course" style={{ padding: '0px' }}>
                                        <Grid container spacing={2}>
                                            <div className='list-course row' style={{ margin: 'auto' }}>
                                                <div>
                                                    <div className="col-md-4 col-sm-6 col-lg-3" style={{ zIndex: '9999', marginBottom: '20px', width: '200px' }}>

                                                        {localStorage.getItem("role") === "teacher" && (
                                                            <div style={{ paddingBottom: '20px' }}>
                                                                <Button variant="contained" color="primary" style={{ marginLeft: '10px' }} onClick={handleOpenModal}>
                                                                    Add new Course
                                                                </Button>
                                                            </div>
                                                        )}



                                                        <div className='edu-combobox' style={{ unicodeBidi: 'isolate', boxSizing: 'border-box', textAlign: 'start', textSizeAdjust: '100%' }}>
                                                            <FormControl sx={{ m: 1, minWidth: 200, margin: '0px' }} size="small">
                                                                <InputLabel id="demo-select-small-label">Semester</InputLabel>
                                                                <Select
                                                                    labelId="demo-select-small-label"
                                                                    id="demo-select-small"
                                                                    value={age}
                                                                    label="Age"
                                                                    onChange={handleChangeAge}
                                                                >
                                                                    <MenuItem>
                                                                        <em>ALL</em>
                                                                    </MenuItem>
                                                                    <MenuItem value={"SPRING2024"}>SPRING</MenuItem>
                                                                    <MenuItem value={"SUMMER2024"}>SUMMER</MenuItem>
                                                                    <MenuItem value={"FALL2024"}>FALL</MenuItem>
                                                                    <MenuItem value={"WINTER2024"}>WINTER</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </div>
                                                    </div>

                                                    <div style={{ marginBottom: '10px' }}>
                                                        <div className="recently mb-2">Recently Updated (Để xem chi tiết về các thay đổi cập nhật gần đây, vui lòng nhấp vào đây)<br />
                                                        </div>
                                                    </div>
                                                </div>

                                                {listCourse && listCourse.map((course, index) => (
                                                    <CardItem key={index} course={course} />
                                                ))}

                                            </div>
                                        </Grid>
                                    </TabPanel>
                                    <TabPanel value="all" style={{ padding: '0px' }}>
                                        <Grid container spacing={2}>
                                            <div className='list-course row' style={{ margin: 'auto' }}>
                                                <div>
                                                    <div style={{ marginBottom: '10px' }}>
                                                        <div className="recently mb-2">Recently Updated (Để xem chi tiết về các thay đổi cập nhật gần đây, vui lòng nhấp vào đây)<br />
                                                        </div>
                                                    </div>
                                                </div>

                                                {allCourse && allCourse.map((course, index) => (
                                                    <CardItem key={index} course={course} all={1} handleEnrollCourse={() => handleEnroll(course.id)} />
                                                ))}

                                            </div>
                                        </Grid>
                                    </TabPanel>
                                </TabContext>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            {/* Modal Component */}
            <AddCourseModal
                open={openModal}
                handleClose={handleCloseModal}
                onCreate={() => handleLoadCourse()}
            />
        </div >
    );
};