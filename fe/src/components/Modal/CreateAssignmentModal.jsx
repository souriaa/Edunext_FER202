import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import axios from 'axios';
import { notification } from 'antd';


const AddAssignmentModal = ({ open, handleClose, onCreate, slotId }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [text, setText] = useState('');
    const [content, setContent] = useState('');
    const [timeSlot, setTimeSlot] = useState([]);
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type, mess) => {
        api[type]({
            message: 'Notification Title',
            description: mess
        });
    };


    const handleSubmit = () => {
        try {
            const newAssignment = {
                id: Date.now().toString(36).slice(-4),
                text: text,
                content: content,
                due_date: selectedDate.toLocaleDateString(),
                slot_id: slotId,
                status: 'on-going',
                submissions: []
            };
            const slotData = axios.get(`/slots/${slotId}`).then(response => {
                const slot = response.data;
                slot.assignments.push(newAssignment);
                axios.put(`/slots/${slotId}`, slot);

            });
        } catch (error) {
            console.error(error);
        }

        handleClose();
        //reload page
        onCreate();
        window.location.reload();
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
                        id="Text"
                        label="Title"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        id="content"
                        label="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        variant="outlined"
                        margin="normal"
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                                label="DUA DATE"
                                onChange={(newVal) => setSelectedDate(new Date(newVal))}
                                disablePast
                            />
                        </DemoContainer>
                    </LocalizationProvider>
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

export default AddAssignmentModal;
