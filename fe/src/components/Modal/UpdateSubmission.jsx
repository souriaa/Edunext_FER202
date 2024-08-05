import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { InputNumber, Space } from 'antd';
import axios from 'axios';
import { notification } from 'antd';

const UpdateSubmission = ({ open, handleClose, onCreate, submission, slotId, assignmentId }) => {
    const [description, setDescription] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [timeSlot, setTimeSlot] = useState('');
    const [value, setValue] = useState('10');
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

    const handleUpdateScore = async () => {
        try {
            const slot = await axios.get(`/slots/${slotId}`);
            const slotData = slot.data;
            const assignmnetUpdate = slotData.assignments.find(a => a.id === assignmentId);
            const submissionUpdate = assignmnetUpdate.submissions.find(s => s.student_id === submission.student_id);
            console.log(submissionUpdate);
            if (submissionUpdate) {
                submissionUpdate.score = value;
                await axios.put(`/slots/${slotId}`, slotData);
                onCreate();
            }
            openNotificationWithIcon('success', 'Update score successfully');
        } catch (e) {
            console.log(e);
        }
    }


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
                        Chấm điểm {submission.student_id}
                    </Typography>
                    {/* <TextField
                    fullWidth
                    id="description"
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    variant="outlined"
                    margin="normal"
                /> */}
                    <InputNumber size="large" min={1} max={10} value={value} onChange={setValue} />
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
                            style={{ marginTop: '10px' }}
                            onClick={handleUpdateScore}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
};

export default UpdateSubmission;
