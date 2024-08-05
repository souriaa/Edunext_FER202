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
    Button
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ImageIcon from '@mui/icons-material/Image';
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from '@mui/lab/TabPanel';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MUIRichTextEditor from "mui-rte";
import AvatarLogo from '../image/avatar.png'
import { EditorState, convertToRaw } from 'draft-js'
import { Select } from "@material-ui/core";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import StarIcon from '@mui/icons-material/Star';
import { notification } from 'antd';

function StudentItem() {
    return (
        <div className="student-item">
            <div className="edu-collapsible" style={{ position: 'relative' }}>
                <div className="action-position"></div>
                <Paper elevation={0} className="MuiPaper-root MuiPaper-elevation MuiPaper-elevation0 MuiAccordion-root css-av0tg4">
                    <Accordion square className="MuiAccordion-root">
                        <AccordionSummary
                            expandIcon={<KeyboardArrowDownIcon />}
                            aria-controls="panel1d-content"
                            id="panel1d-header"
                            className="MuiButtonBase-root MuiAccordionSummary-root"
                        >
                            <div className="MuiAccordionSummary-content css-1n11r91">
                                <Grid container alignItems="center">
                                    <Grid item xs={6}>
                                        <div className="row">
                                            <div className="col-12">
                                                <Typography variant="body2" className="ms-2 me-1" value="Nguyễn Quang Thuận Thành">Nguyễn Quang Thuận Thành</Typography>
                                            </div>
                                            <div className="col-12">
                                                <Typography variant="body2" className="ms-2 me-1 color-italic">thanhnqthe150520@fpt.edu.vn</Typography>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={3} className="element-center user-online-status">
                                        <div className="dot offline"></div>
                                        <Typography variant="body2" className="text-semibold ms-2 me-5 gray-color" value="Offline">Offline</Typography>
                                    </Grid>
                                    <Grid item xs={3} className="student-item__actions"></Grid>
                                </Grid>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails className="MuiCollapse-root MuiCollapse-vertical MuiCollapse-hidden css-a0y2e3">
                            <div className="MuiCollapse-wrapper MuiCollapse-vertical css-hboir5">
                                <div className="MuiCollapse-wrapperInner MuiCollapse-vertical css-8atqhb">
                                    <div id="panel1d-content" role="region" className="MuiAccordion-region">
                                        <AccordionDetails className="MuiAccordionDetails-root css-7avtwz">
                                            <div className="student-item__content">
                                                <div className="individual-pass-detail" style={{ marginLeft: 55 }}>
                                                    <div className="individual-row">
                                                        <span className="left"><i className="las la-minus not-pass"></i><span className="ms-1">View question</span></span>
                                                    </div>
                                                    <div className="individual-row">
                                                        <span className="left"><i className="las la-minus not-pass"></i><span className="ms-1">No. of comments posted</span></span>
                                                        <span className="right text-lightbold">0/1</span>
                                                    </div>
                                                    <div className="individual-row">
                                                        <span className="left"><i className="las la-minus not-pass"></i><span className="ms-1">No. of stars rated by others</span></span>
                                                        <span className="right text-lightbold">0/1</span>
                                                    </div>
                                                    <div className="individual-row">
                                                        <span className="left"><i className="las la-minus not-pass"></i><span className="ms-1">No. of votes</span></span>
                                                        <span className="right text-lightbold">0/1</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </AccordionDetails>
                                    </div>
                                </div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </Paper>
            </div>
        </div>
    )
}

function CommentItem({ answer, slotId, questionId }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [vote, setVote] = useState(0);
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type, mess) => {
        api[type]({
            message: 'Notification Title',
            description: mess
        });
    };

    // cham diem
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLoadPoint = async () => {
        try {
            const response = await axios.get("/slots/" + slotId);
            const data = response.data;
            const question = data.questions.filter(question => question.id === questionId)[0];
            const answers = question.answers.filter(a => a.id === answer.id)[0];

            //get total poitn
            let totalPoint = 0;
            const votes = answers.votes || {};

            Object.values(votes).forEach(points => {

                totalPoint += parseInt(points, 10);
            });
            setVote(totalPoint);
        } catch (error) {
            console.error(error);
        }
    }

    const handlePointing = async (point) => {
        try {
            const response = await axios.get("/slots/" + slotId);
            const data = response.data;
            const question = data.questions.find(question => question.id === questionId);
            if (question) {
                const answers = question.answers.find(a => a.id === answer.id);
                if (answers) {
                    const votes = answers.votes || {};
                    votes[localStorage.getItem("userId")] = point.toString();
                    answers.votes = votes;
                    await axios.put("/slots/" + slotId, data);
                    handleLoadPoint();
                    handleClose(); // Close the menu after voting
                    openNotificationWithIcon('success', 'Voted successfully');
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        handleLoadPoint();
    }, []);


    return (
        <div id="comments-container" class="wrap-comment-section jquery-comments">
            {contextHolder}
            <div class="data-container" data-container="comments">
                <div id="comment-list" class="main">
                    <div>
                        <div id="comment-6686cce78148019cc4ab4736" class="comment parent-comment">
                            <div class="comment-wrapper">
                                <div class="wrap-user-avatar"><img src={AvatarLogo} alt="" class="user-avatar" style={{ width: '34px', height: '34px' }} /></div>
                                <div class="main-comment disable-reply">
                                    <div class="comment-header">
                                        <div class="comment-writer"></div>
                                        <div class="comment-user-info"><i class="fs-10">{answer.time}</i></div>
                                    </div>
                                    <div>
                                        <div class="wrapper">
                                            <div class="content" style={{ position: 'relative' }}>
                                                <div class="wrap-content">
                                                    <div class="styled">
                                                        <p>{answer.text}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="attachments">
                                                <div class="previews"></div>
                                                <div class="tags"></div>
                                            </div>
                                        </div>
                                        <div class="cmt-buttons">
                                            <div class="cmt-acts">
                                                <div class="actions"></div>
                                            </div>
                                            <span class="cmt-summary"><span class="cmt-sum-item vote-sumb"><i class="la la-star"></i><span class="vote-count">{vote && vote}</span></span></span>
                                        </div>
                                        {/* <span title="Reply" class="reply-cmt" value="Reply">Reply</span> */}
                                        <div>
                                            {localStorage.getItem("userId") !== answer.student_id && <span class="vote-cmt" onClick={handleClick}
                                            >Vote</span>}

                                            <Menu
                                                id="basic-menu"
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                                MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                }}
                                            >
                                                <MenuItem onClick={() => handlePointing(1)}> < StarIcon />1</MenuItem>
                                                <MenuItem onClick={() => handlePointing(2)}> < StarIcon color="success" />2</MenuItem>
                                                <MenuItem onClick={() => handlePointing(3)}>< StarIcon color="primary" />3</MenuItem>
                                                <MenuItem onClick={() => handlePointing(4)}>< StarIcon color="error" />4</MenuItem>
                                            </Menu>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <ul class="child-comments"></ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function SlotDetail() {
    const [data, setData] = useState([]);
    const [valueTab, setValueTab] = useState("1");
    const [expanded, setExpanded] = useState(true); // State to control accordion expansion
    const [listQuestion, setListQuestion] = useState([]);
    const [editorState, setEditorState] = useState(null);
    const [comment, setComment] = useState('')
    const [answers, setAnswers] = useState([])
    const [listAssignment, setListAssignment] = useState([])
    const [status, setStatus] = useState([])
    const [slot, setSlot] = useState([])
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type, mess) => {
        api[type]({
            message: 'Notification Title',
            description: mess
        });
    };



    const questionId = useParams().questionId;
    const slotId = useParams().slotId;

    const handleLoadQuestion = async () => {
        try {
            const response = await axios.get("/slots/" + slotId);
            setSlot(response.data);
            //take the first question that has the same id as the questionId
            const data = response.data.questions.filter(question => question.id === questionId)[0];
            setListQuestion(response.data.questions);
            setListAssignment(response.data.assignments);
            setStatus(response.data.status)
            setData(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleLoadAnswer = async () => {
        try {
            const response = await axios.get("/slots/" + slotId);
            const data = response.data;
            const answers = data.questions.filter(question => question.id === questionId)[0].answers;
            // console.log(answers)
            setAnswers(answers);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChangStatusQuestion = async () => {
        try {
            const response = await axios.get("/slots/" + slotId);
            const data = response.data;
            data.questions.filter(question => question.id === questionId)[0].status = status;
            const responsePost = await axios.put("/slots/" + slotId, data);
            handleLoadQuestion();
        } catch (error) {
            console.error(error);
        }
    };


    const handleAccordionChange = () => {
        setExpanded(!expanded); // Toggle accordion state
    };

    const handleChange = (event, newValue) => {
        setValueTab(newValue);
    };

    useEffect(() => {
        handleLoadAnswer();
        handleLoadQuestion();
    }, []);

    const save = (data) => {
        const jsonData = JSON.stringify(data);
        const jsonObject = JSON.parse(jsonData);
        const textValue = jsonObject.blocks[0].text;
        // You can also update your state if needed
        setEditorState(data);
    };

    const onEditorChange = (e) => {
        const plainText = e.getCurrentContent().getPlainText()
        setComment(plainText)
    };

    const postComment = async () => {
        try {
            const response = await axios.get("/slots/" + slotId);
            const data = response.data;
            //time string like that 04-07-2024 23:07:49
            const time = new Date().toLocaleString();

            const newAnswer = {
                id: Date.now().toString(36).slice(-4),
                student_id: localStorage.getItem("userId"),
                text: comment,
                time: time,
                votes: {}
            }


            data.questions.filter(question => question.id === questionId)[0].answers.push(newAnswer);
            const responsePost = await axios.put("/slots/" + slotId, data);
            const emptyContentState = JSON.stringify(
                convertToRaw(EditorState.createEmpty().getCurrentContent()))
            setEditorState(emptyContentState)
            openNotificationWithIcon('success', 'Commented successfully');
            handleLoadAnswer();

        } catch (error) {
            console.error(error);
        }


    };

    const myTheme = createTheme({
        palette: {
            type: 'dark',
        },
    });



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
                                        question {questionId}
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

                                        <Select
                                            native
                                            value={data.status}
                                            onChange={(e) => setStatus(e.target.value)}
                                            inputProps={{
                                                name: 'status',
                                                id: 'status',
                                            }}
                                        >
                                            <option value="upcoming">Not Started</option>
                                            <option value="on-going">In Progress</option>
                                            <option value="completed">Completed</option>
                                        </Select>

                                        <Button variant="contained" color="primary" style={{ margin: '20px' }} onClick={handleChangStatusQuestion}>Change Status</Button>


                                        <div>
                                            <Typography> Discussion time has been started.</Typography>
                                            <Typography> Students can comment and vote for comments during this time.</Typography>
                                            <Typography> Current Timezone: You are currently in Asia/Bangkok time zone (GMT+7)</Typography>

                                            <TabContext value={valueTab}>
                                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                    <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                                                        <Tab label="Members" value="1" />
                                                        <Tab label="Discustion" value="2" />
                                                        {/* <Tab label="Teacher Message" value="3" /> */}
                                                    </TabList>
                                                </Box>

                                                <TabPanel value="1">
                                                    <div>
                                                        <div className='group-item' style={{ marginBottom: '20px' }}>
                                                            <div className="edu-collapsible" style={{ position: 'relative' }}>
                                                                <Paper elevation={0} className="MuiPaper-root MuiPaper-elevation MuiPaper-elevation0 MuiAccordion-root Mui-expanded css-av0tg4">
                                                                    <Accordion square expanded={expanded} onChange={handleAccordionChange} className="MuiAccordion-root Mui-expanded css-av0tg4">
                                                                        <AccordionSummary
                                                                            expandIcon={<KeyboardArrowDownIcon />}
                                                                            aria-controls="panel1d-content"
                                                                            id="panel1d-header"
                                                                            className="MuiButtonBase-root MuiAccordionSummary-root Mui-expanded css-30swig"
                                                                        >
                                                                            <Typography className="MuiAccordionSummary-content Mui-expanded css-1n11r91">
                                                                                <div className="group-item__thumb">
                                                                                    <span className="text-semibold me-2" value="Group 1">Group 1</span>
                                                                                    <span className="text-semibold" value="(10 students)"> (10 students)</span>
                                                                                    <i>&nbsp;- Your group</i>
                                                                                </div>
                                                                            </Typography>
                                                                        </AccordionSummary>
                                                                        <AccordionDetails className="MuiCollapse-root MuiCollapse-vertical MuiCollapse-entered css-c4sutr">
                                                                            <div className="MuiCollapse-wrapper MuiCollapse-vertical css-hboir5">
                                                                                <div className="MuiCollapse-wrapperInner MuiCollapse-vertical css-8atqhb">
                                                                                    <div id="panel1d-content" role="region" className="MuiAccordion-region">
                                                                                        <AccordionDetails className="MuiAccordionDetails-root css-7avtwz">
                                                                                            <div className="group-item__content">

                                                                                                <StudentItem />
                                                                                                <StudentItem />

                                                                                            </div>
                                                                                        </AccordionDetails>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </AccordionDetails>
                                                                    </Accordion>
                                                                </Paper>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TabPanel>

                                                <TabPanel value="2">
                                                    <div>
                                                        <div className='group-item' style={{ marginBottom: '20px' }}>
                                                            <div className="edu-collapsible" style={{ position: 'relative' }}>
                                                                {localStorage.getItem("role") === "teacher" ? <div className="action-position"></div> : <div>
                                                                    <div style={{ border: '' }}>
                                                                        <ThemeProvider theme={myTheme}>
                                                                            <MUIRichTextEditor
                                                                                label="Type something here..."
                                                                                onSave={save}
                                                                                inlineToolbar={true}
                                                                                onChange={(e) => onEditorChange(e)}
                                                                                defaultValue={editorState}
                                                                                value={editorState}
                                                                            />
                                                                        </ThemeProvider>
                                                                    </div>
                                                                    <div className="button-send-comment">
                                                                        <Button variant="contained" color="primary" onClick={postComment}>Send</Button>
                                                                    </div>
                                                                    <hr style={{ marginBottom: '8px', marginTop: '60px' }}></hr></div>}



                                                                {answers && answers.map((answer, index) => (
                                                                    //comment item
                                                                    <div>
                                                                        <CommentItem key={index} answer={answer} slotId={slotId} questionId={questionId} />
                                                                    </div>
                                                                ))
                                                                }

                                                            </div>
                                                        </div>
                                                    </div>
                                                </TabPanel>

                                                {/* <TabPanel value="3">
                                                    <div>
                                                        <div className='group-item' style={{ marginBottom: '20px' }}>
                                                            <div className="edu-collapsible" style={{ position: 'relative' }}>



                                                                {answers && answers.map((answer) => (
                                                                    //comment item
                                                                    <CommentItem answer={answer} />
                                                                ))
                                                                }

                                                            </div>
                                                        </div>
                                                    </div>
                                                </TabPanel> */}

                                            </TabContext>
                                        </div>
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
                </div>
            </div>
        </div >
    )
}