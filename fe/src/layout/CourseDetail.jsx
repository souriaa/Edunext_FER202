import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import Button from '@mui/material/Button';
import SideMenu from '../components/SideMenu';
import './Css/CourseDetail.css';
import {
    Container,
    Link,
    Breadcrumbs,

} from "@mui/material";
import Pagination from '@mui/material/Pagination';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SvgIcon from '@mui/material/SvgIcon';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import AddSlotModal from '../components/Modal/CreateSlotModal';
import AddQuestionModal from '../components/Modal/CreateQuestionModal';
import AddAssignmentModal from '../components/Modal/CreateAssignmentModal';

function SlotItem({ slot, handleLoadSlot }) {
    const [openModal, setOpenModal] = useState(false);
    const [openAssignmentModal, setOpenAssignmentModal] = useState(false);
    const courseId = useParams().id;
    const nagivate = useNavigate();


    const handleAddQuestion = (e) => {
        e.preventDefault();
        handleOpenModal();
    }

    const handleAddAssignment = (e) => {
        e.preventDefault();
        handleOpenAssignmentModal();
    }

    const handleOpenModal = () => {
        setOpenModal(true);
        handleLoadSlot();
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        handleLoadSlot();
    };


    const handleOpenAssignmentModal = () => {
        setOpenAssignmentModal(true);
        handleLoadSlot();
    }

    const handleCloseAssignmentModal = () => {
        setOpenAssignmentModal(false);
        handleLoadSlot();
    }

    return (
        <div>
            <div className='session-item'>
                <div style={{ position: 'relative' }}>
                    <Accordion style={{ backgroundColor: '#f7f7f7', border: 'solid 1px #e4e4e4' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1d-content"
                            id="panel1d-header"
                        >
                            <Paper elevation={0} className="MuiPaper-root MuiPaper-elevation MuiPaper-elevation0 MuiAccordion-root css-av0tg4" style={{ width: '100%', border: '1px solid #f7f7f7', backgroundColor: '#f7f7f7' }}>
                                <div className="MuiButtonBase-root MuiAccordionSummary-root d-block css-30swig" tabIndex={0} role="button" aria-expanded={false} aria-controls="panel1d-content" id="panel1d-header">
                                    <div className="MuiAccordionSummary-content css-1n11r91">
                                        <div style={{ paddingBottom: 40 }}>
                                            <div className="slot-header">
                                                <div className="w-100">
                                                    <span title="undefined" className="slot">Slot {slot.id}</span>
                                                    <div className="mt-2">

                                                        <span className="time" value="">{slot.time}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="slot-title" style={{ marginTop: 25 }}>
                                                <Typography variant="body2">
                                                    <b>
                                                        <span title="Course Introduction Course Introduction - Project Group Module 01 -Chapter 01: Introduction to ASP.NET Core and RESTful Service" value="Course Introduction Course Introduction - Project Group Module 01 -Chapter 01: Introduction to ASP.NET Core and RESTful Service">
                                                            SLOTS Descreption
                                                        </span>
                                                        <br />
                                                        <span title="Course Introduction Course Introduction - Project Group Module 01 -Chapter 01: Introduction to ASP.NET Core and RESTful Service" value="Course Introduction Course Introduction - Project Group Module 01 -Chapter 01: Introduction to ASP.NET Core and RESTful Service">
                                                            -----
                                                        </span>
                                                        <br />
                                                        <span title="Course Introduction Course Introduction - Project Group Module 01 -Chapter 01: Introduction to ASP.NET Core and RESTful Service" value="Course Introduction Course Introduction - Project Group Module 01 -Chapter 01: Introduction to ASP.NET Core and RESTful Service">
                                                            {slot.description}
                                                        </span>
                                                        <br />
                                                    </b>

                                                </Typography>
                                                {localStorage.getItem("role") === "teacher" && (
                                                    <div>
                                                        <Button variant="contained" color="primary" style={{ marginRight: '10px' }} onClick={(e) => handleAddQuestion(e)}> Add Question</Button>
                                                        <Button variant="contained" color="primary" onClick={(e) => handleAddAssignment(e)}>Add Assignment</Button>
                                                    </div>
                                                )}

                                            </div>
                                            <div style={{ position: 'absolute', bottom: '12%' }}>
                                                <div style={{ marginLeft: 0, paddingLeft: 0 }}>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="MuiAccordionSummary-expandIconWrapper css-1fx8m19">
                                        <ExpandMoreIcon />
                                    </div>
                                </div>
                            </Paper>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="list-activities none-list" style={{ display: 'block' }}>

                                <div className="card rounded-0">
                                    <div className="card-header bg-white">
                                        <Typography variant="subtitle2">QUESTION</Typography>
                                    </div>
                                    {slot.questions.map((question, index) => (
                                        <div className="card-body" key={index}>
                                            <div className="row combo-align-center">
                                                <div className="col-md-9 col-sm-12">
                                                    <div className="activity-item">
                                                        <div className="activity-item__summary">
                                                            <a href={`/slots/${slot.id}/question/${question.id}`} className="text-normal text-decoration-none">
                                                                <span className="activity-name text-ellipsis" title="【CODE-119851】 1_CQ1.1" value="【CODE-119851】 1_CQ1.1">
                                                                    {question.text}
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="position-relative col-md-3 col-sm-12 combo-flex-right">
                                                    <span className="activity-state-label fs-12 finished" title="Finished" value="Finished">Finished</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="card rounded-0">
                                    <div className="card-header bg-white">
                                        <Typography variant="subtitle2">ASSIGNMENTS</Typography>
                                    </div>
                                    {slot.assignments.map((assignment, index) => (
                                        <div className="card-body" key={index}>
                                            <div className="row combo-align-center">
                                                <div className="col-md-9 col-sm-12">
                                                    <div className="activity-item">
                                                        <div className="activity-item__summary">
                                                            <a href={`/slots/${slot.id}/assignments/${assignment.id}`} className="text-normal text-decoration-none">
                                                                <span className="activity-name text-ellipsis" title="【CODE-119851】 1_CQ1.1" value="【CODE-119851】 1_CQ1.1">
                                                                    {assignment.text}
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="position-relative col-md-3 col-sm-12 combo-flex-right">
                                                    <span className="activity-state-label fs-12 finished" title="Finished" value="Finished">Finished</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>

            <AddQuestionModal
                open={openModal}
                handleClose={handleCloseModal}
                slotId={slot.id}
                onCreate={() => handleLoadSlot()}
            />

            <AddAssignmentModal
                open={openAssignmentModal}
                handleClose={handleCloseAssignmentModal}
                slotId={slot.id}
                onCreate={() => handleLoadSlot()}
            />

        </div>
    )
}


export default function CourseDetail({ }) {
    const [slotList, setSlotList] = React.useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [teacher, setTeacher] = useState(null);
    const [status, setStatus] = useState(null);

    const courseId = useParams().id;

    const handleLoadSlot = async (status) => {
        try {
            const response = await axios.get("/slots");
            if (status) {
                if (status === "All Activities") {
                    setSlotList(response.data.filter(slot => slot.course_id === courseId));
                    return;
                }
                const data = response.data.filter(slot => slot.course_id === courseId && slot.status === status);
                setSlotList(data);
                return;
            }
            const data = response.data.filter(slot => slot.course_id === courseId);
            setSlotList(data);
        } catch (error) {
            console.error(error);
        }
    }

    const loadTeacher = async (teacher_id) => {
        try {
            const response = await axios.get(`/teachers`);
            const data = response.data.find(teacher => teacher.id === teacher_id);
            setTeacher(data);
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        handleLoadSlot();
    }, []);

    useEffect(() => {
        if (status) {
            console.log(status);
            handleLoadSlot(status);
        }
    }, [status]);

    useEffect(() => {
        if (slotList[0]) {
            loadTeacher(slotList[0].teacher_id);
        }
    }, [slotList]);

    const handleOpenModal = () => {
        setOpenModal(true);
        handleLoadSlot();
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        handleLoadSlot();
    };



    return (
        <div>
            <div className="wrapper">
                <SideMenu />
                <div className='w-100 menu-height-dynamic'>
                    <div className='site-main'>
                        <div>
                            <div className='row'>
                                <div className='col-11-5'>
                                    <div className='cource-detail' style={{ paddingBottom: '0px' }}>
                                        <Breadcrumbs
                                            aria-label="breadcrumb" sx={{ color: "#000000" }}
                                        >
                                            <Link
                                                underline="hover"
                                                sx={{ display: "flex", alignItems: "center" }}
                                                color="#000000"
                                                href="/courses"
                                            >
                                                Courses
                                            </Link>
                                            <Link
                                                underline="hover"
                                                sx={{ display: "flex", alignItems: "center" }}
                                                color="#000000"
                                                href={`/courses/${courseId}`}
                                            >
                                                course {courseId}
                                            </Link>
                                        </Breadcrumbs>

                                        <div className='course-detail-row '>
                                            <div>
                                                <div style={{ overflowY: 'auto' }}>
                                                    <div className='w-100 mt-4' style={{ textAlign: 'unset' }}>
                                                        <div className='select-native-custom d-inline-flex'>
                                                            <div className='select'>
                                                                <label htmlFor="slot-jump">Filter activities</label>
                                                                <select style={{ maxWidth: '250px' }} onChange={(e) => setStatus(e.target.value)}>
                                                                    <option value={null} > All Activities</option>
                                                                    <option value={"not-started"}>Not Started</option>
                                                                    <option value={"on-going"}>On Going</option>
                                                                    <option value={"completed"}>Completed</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        {/* <div className='select-native-custom d-inline-flex'>
                                                            <div className='select'>
                                                                <label htmlFor="slot-jump">Jump Slot</label>
                                                                <select style={{ maxWidth: '115px' }}>
                                                                    <option value> All Activities</option>
                                                                    <option>Hidden</option>
                                                                    <option>On Going</option>
                                                                    <option>Assignment or Feedback</option>
                                                                </select>
                                                            </div>
                                                        </div> */}
                                                        {/* <div className='select-native-custom d-inline-flex' style={{ maxWidth: '300px' }}>
                                                            <div className='select'>
                                                                <label htmlFor="slot-jump">className Name</label>
                                                                <select style={{ maxWidth: '300px' }}>
                                                                    <option value> All Activities</option>
                                                                    <option>Hidden</option>
                                                                    <option>On Going</option>
                                                                    <option>SE1707-NET-APHL-SUMMER2024</option>
                                                                </select>
                                                            </div>
                                                        </div> */}

                                                        {/* <div className='learning-materials'>
                                                            <Button variant="contained" size="large" color='primary'>Assignments</Button>
                                                        </div> */}
                                                        {localStorage.getItem("role") === "teacher" && (
                                                            <div>
                                                                <div className='learning-materials'>
                                                                    <Button variant="contained" size="large" color='primary' onClick={handleOpenModal}>Add Slot</Button>
                                                                </div>
                                                            </div>
                                                        )}
                                                        <br />
                                                        <b className="fs-10">TEACHERS:  </b>
                                                        <span className="fs-10  "><b>{teacher && teacher.email}</b></span>
                                                    </div>
                                                </div>

                                                <div className='course-detail-content'>
                                                    <div style={{ position: "relative" }}>
                                                        <div>
                                                            <div className='container-sessions'>

                                                                {setSlotList && slotList.map((slot, index) => (
                                                                    <SlotItem key={index} slot={slot} handleLoadSlot={() => handleLoadSlot()} />
                                                                ))}


                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* <div style={{ width: '100%', paddingTop: '5px', position: 'sticky', backgroundColor: 'white', bottom: '20px', zIndex: '9999' }}>
                                                    <Pagination count={10} variant="outlined" color="primary" />
                                                </div> */}
                                            </div>

                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AddSlotModal
                open={openModal}
                handleClose={handleCloseModal}
                onCreate={() => handleLoadSlot()}
                courseId={courseId}
            />
        </div >
    )
};