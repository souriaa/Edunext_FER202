import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import axios from 'axios';
import { notification } from 'antd';

const AddQuestionModal = ({ open, handleClose, onCreate, slotId }) => {
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
            const newQuestion = {
                id: Date.now().toString(36).slice(-4),
                text: text,
                content: content,
                slot_id: slotId,
                status: 'on-going',
                answers: []
            };
            const slotData = axios.get(`/slots/${slotId}`).then(response => {
                const slot = response.data;
                slot.questions.push(newQuestion);
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
                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker
                            label="Basic date picker"
                            onChange={(newVal) => setSelectedDate(new Date(newVal))}
                        />
                    </DemoContainer>
                </LocalizationProvider> */}
                    {/* <FormControl fullWidth variant="outlined" margin="normal">
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
                </FormControl> */}
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

export default AddQuestionModal;
