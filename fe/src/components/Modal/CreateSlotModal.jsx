import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import axios from 'axios';
import { notification } from 'antd';

const AddSlotModal = ({ open, handleClose, onCreate, courseId }) => {
    const [description, setDescription] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [timeSlot, setTimeSlot] = useState('');
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type, mess) => {
        api[type]({
            message: 'Notification Title',
            description: mess
        });
    };

    // const handleDateChange = (newDate) => {
    //     setSelectedDate(newDate);
    // };

    const handleSlotChange = (event) => {
        setTimeSlot(event.target.value);
    };

    const handleSubmit = () => {
        // Handle submit logic, e.g., send data to parent component or API
        let timeString = '';
        switch (timeSlot) {
            case '1':
                timeString = selectedDate ? ' 7h30 ' + selectedDate.toLocaleDateString() + '  - 9h50 ' + selectedDate.toLocaleDateString() : '';
                break;
            case '2':
                timeString = selectedDate ? ' 10h00 ' + selectedDate.toLocaleDateString() + '  - 12h20 ' + selectedDate.toLocaleDateString() : '';
                break;
            case '3':
                timeString = selectedDate ? ' 13h00 ' + selectedDate.toLocaleDateString() + '  - 15h20 ' + selectedDate.toLocaleDateString() : '';
                break;
            case '4':
                timeString = selectedDate ? ' 15h30 ' + selectedDate.toLocaleDateString() + '  - 17h50 ' + selectedDate.toLocaleDateString() : '';
                break;
            default:
                break;
        }
        try {
            const newSlot = {
                description: description,
                time: timeString,
                teacher_id: localStorage.getItem('userId'),
                course_id: courseId,
                questions: [],
                assignments: []
            };
            axios.post('/slots', newSlot).then(response => {
                console.log(response);
                onCreate();
            });

        } catch (error) {
            console.error(error);
        }

        handleClose();
        openNotificationWithIcon('success', 'Add slot successfully');
    };

    return (
        <div>
            {contextHolder}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="add-event-modal"
                aria-describedby="add-new-event"
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
                        Add New Event
                    </Typography>
                    <TextField
                        fullWidth
                        id="description"
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        variant="outlined"
                        margin="normal"
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                                label="Basic date picker"
                                onChange={(newVal) => setSelectedDate(new Date(newVal))}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <FormControl fullWidth variant="outlined" margin="normal">
                        <InputLabel id="time-slot-label">Time Slot</InputLabel>
                        <Select
                            labelId="time-slot-label"
                            id="time-slot"
                            value={timeSlot}
                            onChange={handleSlotChange}
                            label="Time Slot"
                        >
                            <MenuItem value={'1'}>Slot1</MenuItem>
                            <MenuItem value={'2'}>Slot2</MenuItem>
                            <MenuItem value={'3'}>Slot3</MenuItem>
                            <MenuItem value={'4'}>Slot4</MenuItem>
                        </Select>
                    </FormControl>
                    <Grid container justifyContent="flex-end">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            style={{ marginTop: '10px' }}
                        >
                            Add Event
                        </Button>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
};

export default AddSlotModal;
