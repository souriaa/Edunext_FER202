import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { notification } from 'antd';

const AddCourseModal = ({ open, handleClose, onCreate }) => {
    const [nameCourse, setNameCourse] = useState('');
    const [classValue, setClassValue] = useState('');
    const [semester, setSemester] = useState('');
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type, mess) => {
        api[type]({
            message: 'Notification Title',
            description: mess
        });
    };

    const handleNameChange = (event) => {
        setNameCourse(event.target.value);
    };

    const handleClassChange = (event) => {
        setClassValue(event.target.value);
    };

    const handleSemesterChange = (event) => {
        setSemester(event.target.value);
    };

    const handleSubmit = () => {
        const newCourse = {
            name: nameCourse,
            class: classValue,
            semester: semester + new Date().getFullYear(),
            teacher_id: localStorage.getItem('userId'),
            students: []
        };
        try {
            axios.post('/courses', newCourse).then(response => {
                console.log(response);
                onCreate();
            });
        } catch (error) {
            console.error(error);
        }
        handleClose(); // Close modal after handling submit
    };

    return (
        <div>
            {contextHolder}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="add-course-modal"
                aria-describedby="add-new-course"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography variant="h6" gutterBottom>
                        Add New Course
                    </Typography>
                    <TextField
                        fullWidth
                        id="nameCourse"
                        label="Name"
                        value={nameCourse}
                        onChange={handleNameChange}
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        id="class"
                        label="Class"
                        value={classValue}
                        onChange={handleClassChange}
                        variant="outlined"
                        margin="normal"
                    />
                    <FormControl fullWidth variant="outlined" margin="normal">
                        <InputLabel id="semester-label">Semester</InputLabel>
                        <Select
                            labelId="semester-label"
                            id="semester"
                            value={semester}
                            onChange={handleSemesterChange}
                            label="Semester"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'Spring'}>SPRING</MenuItem>
                            <MenuItem value={'Summer'}>SUMMER</MenuItem>
                            <MenuItem value={'Fall'}>FALL</MenuItem>
                            <MenuItem value={'Winter'}>WINTER</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        style={{ marginTop: '10px' }}
                    >
                        Add Course
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default AddCourseModal;
