import SideMenu from "../components/SideMenu"
import "./Css/SlotDetail.css"
import {
    Container,
    Link,
    Breadcrumbs,
    Typography,
    Grid,
    List,
    ListItemButton,
    ListItemAvatar,
    Avatar,
    Box,
    Tab,
    Button,
    Input,
    TextField
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ImageIcon from '@mui/icons-material/Image';
import { Space, Table, Tag } from 'antd';
import UpdateSubmission from "../components/Modal/UpdateSubmission";
import { notification } from "antd";


export default function AssignmentDetail() {
    const [data, setData] = useState([]);
    const [listQuestion, setListQuestion] = useState([]);
    const [listAssignment, setListAssignment] = useState([]);
    const [submitText, setSubmitText] = useState('');
    const [submitFile, setSubmitFile] = useState('');
    const [submitList, setSubmitList] = useState([]); // List of submissions [ {student_id: "", submission_text: ""}
    const [openModal, setOpenModal] = useState(false);
    const [assignmentUpdate, setAssignmentUpdate] = useState({}); // {id: "", student_id: "", submission_text: "", score: ""}
    const [studentScore, setStudentScore] = useState(0);
    const [slot, setSlot] = useState([]);
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type, mess) => {
        api[type]({
            message: 'Notification Title',
            description: mess
        });
    };

    const assignmentId = useParams().assignmentId;
    const slotId = useParams().slotId;

    const handleLoadQuestion = async () => {
        try {
            const response = await axios.get("/slots/" + slotId);
            setSlot(response.data);
            //take the first question that has the same id as the questionId
            const data = response.data.assignments.filter(assignment => assignment.id === assignmentId)[0];
            setListQuestion(response.data.questions);
            setListAssignment(response.data.assignments);
            setData(data);
            const submission = data.submissions.filter(submission => submission.student_id === localStorage.getItem("userId"))[0];
            if (submission) {
                setSubmitFile(submission.submission_text);
                setStudentScore(submission.score);
            }

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        handleLoadQuestion();
        handleLoadSubmission();
    }, []);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        handleLoadQuestion();
        handleLoadSubmission();
    };

    const handleSetAssignmentUpdate = (assignment) => {
        setAssignmentUpdate(assignment);
        handleOpenModal();
    }


    const handleUpdateFile = async () => {
        try {
            const response = await axios.get("/slots/" + slotId);
            const data = response.data;
            const submission = data.assignments.filter(assignment => assignment.id === assignmentId)[0].submissions.filter(submission => submission.student_id === localStorage.getItem("userId"))[0];
            if (!submission) {
                const newSubmission = {
                    // id: Date.now().toString(36).slice(-4),
                    student_id: localStorage.getItem("userId"),
                    submission_text: submitText,
                }

                data.assignments.filter(assignment => assignment.id === assignmentId)[0].submissions.push(newSubmission);
                await axios.put("/slots/" + slotId, data);
                setSubmitText('');
                openNotificationWithIcon('success', 'Load file URL successfully!');
                handleLoadQuestion();
            } else {
                submission.submission_text = submitText;
                await axios.put("/slots/" + slotId, data);
                setSubmitText('');
                openNotificationWithIcon('success', 'Load file URL successfully!');
                handleLoadQuestion();
            }


        } catch (error) {
            console.error(error);
        }
    }

    const handleLoadSubmission = async () => {
        try {
            const response = await axios.get("/slots/" + slotId);
            const data = response.data;
            const submission = data.assignments.filter(assignment => assignment.id === assignmentId)[0].submissions;
            if (submission) {
                setSubmitList(submission);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const columns = [
        {
            title: 'Sutdent id',
            dataIndex: 'student_id',
            key: 'student_id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Link Url',
            dataIndex: 'submission_text',
            key: 'submission_text',
        },
        {
            title: 'score',
            dataIndex: 'score',
            key: 'score',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Button variant="contained" color="primary" onClick={(e) => handleSetAssignmentUpdate(record)}>Mark</Button>
            ),
        },
    ];




    return (
        <div>
            {contextHolder}
            <div className="wrapper">
                <SideMenu />
                <div className="w-100 menu-height-dynamic">
                    <div className="site-main">
                        <div className="activity-details container">
                            <div>
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
                                        href={`/courses/${slot.course_id}`}
                                    >
                                        course {slot.course_id}
                                    </Link>
                                    <Link
                                        underline="hover"
                                        sx={{ display: "flex", alignItems: "center" }}
                                        color="#000000"

                                    >
                                        assignment {assignmentId}
                                    </Link>


                                </Breadcrumbs>

                                <div style={{ paddingTop: '10px' }}>
                                    <Typography variant="h5" gutterBottom>(Assignment) {data.text}</Typography>
                                </div>
                                <Grid container spacing={2} className="main-content-lesson row">
                                    <Grid item xs={12} md={7} lg={8} xl={8}>
                                        <div className="assignment-details-page">
                                            <div className="activity-content-title">
                                                <h3 className="fs-20">Content</h3>
                                                <hr style={{ marginBottom: '8px' }}></hr>
                                                <div className="styled"><p>{data.content}</p></div>
                                            </div>
                                        </div>

                                        {localStorage.getItem("role") === "teacher" ? null :
                                            <div>
                                                <Typography>
                                                    <Box fontWeight="fontWeightBold">ADDITIONAL FILES</Box>
                                                </Typography>
                                                <Typography>
                                                    <Box fontWeight="fontWeightBold">DUE DATE: 2023-09-05 23:00:00 (GMT+07)</Box>
                                                </Typography>
                                                <Typography>
                                                    <Box fontWeight="fontWeightBold">
                                                        SCORE (Điểm số của bạn): {' '}
                                                        <Box component="span" style={{ color: 'red' }}>
                                                            {studentScore}
                                                        </Box>
                                                    </Box>
                                                </Typography>


                                            </div>
                                        }

                                        <hr style={{ marginBottom: '30px', marginTop: '50px' }}></hr>

                                        {localStorage.getItem("role") === "teacher" ? <Table columns={columns} dataSource={submitList} /> :
                                            <div className="submit-for-student">
                                                <Grid container spacing={2} className="submit-overview">

                                                    <Grid item xs={12} md={4} lg={4} xl={4}>
                                                        <div class="mg-b-10 content-assignment">
                                                            <div>
                                                                <span title="SUBMISSION STATUS" value="SUBMISSION STATUS" class="top text-lightbold">SUBMISSION STATUS</span>
                                                            </div>
                                                            <div>
                                                                <span title="Late" value="Late" class="fs-14 text-lightbold activity-state-label late">Late</span>
                                                            </div>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12} md={4} lg={4} xl={4}>
                                                        <div class="mg-b-10 content-assignment">
                                                            <div>
                                                                <span title="SUBMISSION FILE URL" value="SUBMISSION FILE URL" class="top text-lightbold">SUBMISSION FILE URL</span>
                                                            </div>
                                                            <div>
                                                                <span title="Late" value="Late" class="fs-14 text-lightbold activity-state-label late">{submitFile}</span>
                                                            </div>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12} md={4} lg={4} xl={4}>
                                                        <div class="mg-b-10 content-assignment">
                                                            <div>
                                                                <span title="SUBMISSION URL" value="SUBMISSION URL" class="top text-lightbold">SUBMISSION URL</span>
                                                            </div>
                                                            <div className="text-ellipsis text-left" style={{ paddingBottom: "20px" }}>
                                                                <Button variant="contained" color="success" className="btn-submit" onClick={handleUpdateFile}>GET MY FILE</Button>
                                                            </div>
                                                            <TextField id="outlined-basic" label="Link drive" variant="outlined" value={submitText} onChange={(e) => setSubmitText(e.target.value)} />
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        }




                                    </Grid>

                                    <Grid item xs={12} md={5} lg={4} xl={4}>
                                        <div className="entry-lesson-tabs">
                                            <div className="wrap-lesson-tabs pd-20">
                                                <div className="list-activity-activityDetail pd-t-20 sidebar-block">
                                                    <h3>Table of contents</h3>
                                                </div>
                                                <List className="css-1ontqvh ">
                                                    <div className="">
                                                        <span className="fs-10"> QUESTION</span>
                                                    </div>

                                                    {listQuestion.map((question) => (
                                                        <a href={`/slots/${slotId}/question/${question.id}`} className="css-qs2q9j">
                                                            <ListItemButton className="css-qs2q9j" >
                                                                <ListItemAvatar>
                                                                    <Avatar>
                                                                        <ImageIcon />
                                                                    </Avatar>
                                                                </ListItemAvatar>

                                                                <Grid container spacing={0} className="">
                                                                    <Grid item xs={8} md={8} lg={8} xl={8} sm={8}>
                                                                        <span className="fs-10"> {question.text}</span>
                                                                    </Grid>
                                                                    <Grid item xs={3} md={3} lg={3} xl={3} sm={3}>
                                                                        <div className="activity-state-label on-going">
                                                                            <span className="fs-10"> {question.status}</span>
                                                                        </div>
                                                                    </Grid>
                                                                </Grid>
                                                            </ListItemButton>
                                                        </a>
                                                    ))}


                                                    <div className="">
                                                        <span className="fs-10"> ASSIGNMENT</span>
                                                    </div>
                                                    {listAssignment.map((assignment) => (
                                                        <a href={`/slots/${slotId}/assignments/${assignment.id}`} className="css-qs2q9j">
                                                            <ListItemButton className="css-qs2q9j" >
                                                                <ListItemAvatar>
                                                                    <Avatar>
                                                                        <ImageIcon />
                                                                    </Avatar>
                                                                </ListItemAvatar>

                                                                <Grid container spacing={0} className="">
                                                                    <Grid item xs={8} md={8} lg={8} xl={8} sm={8}>
                                                                        <span className="fs-10"> {assignment.text}</span>
                                                                    </Grid>
                                                                    <Grid item xs={3} md={3} lg={3} xl={3} sm={3}>
                                                                        <div className="activity-state-label on-going">
                                                                            <span className="fs-10"> {assignment.status}</span>
                                                                        </div>
                                                                    </Grid>
                                                                </Grid>
                                                            </ListItemButton>
                                                        </a>
                                                    ))
                                                    }


                                                </List>
                                            </div>
                                        </div>
                                    </Grid>


                                </Grid>


                            </div>

                        </div>
                    </div>
                </div >
            </div >

            <UpdateSubmission
                open={openModal}
                handleClose={handleCloseModal}
                onCreate={handleCloseModal}
                courseId={slotId}
                submission={assignmentUpdate}
                slotId={slotId}
                assignmentId={assignmentId}
            />
        </div >
    )
}