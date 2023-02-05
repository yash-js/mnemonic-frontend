import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useDispatch, useSelector } from "react-redux";
import {
  setActivePopOver,
  getActivePopOver,
} from "../../features/popoverslice";
import ButtonComponent from "../../components/ButtonComponent";
import PopoverComponent from "../../components/PopoverComponent";
import RichTextEditor from "../../components/RichTextEditor";
import InputField from "../../components/InputField";
import AutoCompleteComponent from "../../components/AutoCompleteComponent";
import Avatar from "@mui/material/Avatar";
import NoteCard from "../../components/NoteCard";
import { createNote, getNotes } from "../../lib/API_Calls";
import { useState } from "react";
import { userdata, userData } from "../../features/userSlice";
import NotesSkeleton from "../../skeletons/NotesSkeleton";
import AlertComponent from "../../components/AlertComponent";

const Home = () => {
  const user = useSelector(userData);
  const dispatch = useDispatch();
  const activepopover = useSelector(getActivePopOver);
  const [homedisabled, setHomeDisabled] = React.useState(false);
  const [noteTitle, setNoteTitle] = React.useState("");
  const [error, setError] = React.useState(null);
  const [value, setValue] = useState();
  const [mentions, setMentions] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const onFocusField = () => setError({});
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [tabvalue, setTabValue] = React.useState(0);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        style={{height: 'calc(100% - 48.8px)'}}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const handlenotes = (type) => {
    if (type === "normal") {
      dispatch(setActivePopOver("normal"));
      setHomeDisabled(true);
    } else if (type === "mnemonic") {
      dispatch(setActivePopOver("mnemonic"));
      setHomeDisabled(true);
    }
  };

  const popovernormalcontent = [
    <div className="notetopcontent normalnotebox">
      <div className="normalnotesheading">
        <h3>Normal Notes</h3>
      </div>
      <div className="normalnotescontent">
        <RichTextEditor setValue={setValue} value={value} />
      </div>
    </div>,
  ];

  const popovermnemoniccontent = [
    <div className="notetopcontent mnemonicnotebox">
      <div className="mnemonicnotesheading">
        <h3>Mnemonic Notes</h3>
      </div>
      <div className="mnemonicnotescontent">
        <Box sx={{ width: '100%', height: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabvalue} onChange={handleChangeTab} aria-label="basic tabs example">
              <Tab label="Text" {...a11yProps(0)} />
              <Tab label="Audio" {...a11yProps(1)} />
              <Tab label="Image" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={tabvalue} index={0}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} className={"textsummary"}>
                <h4>Add Text</h4>
              </Grid>
              <Grid item xs={12} sm={6} className={"textsummary"}>
                <h1>Summary Text</h1>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={tabvalue} index={1}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} className={"textaudio"}>
                <h4>Add Text</h4>
              </Grid>
              <Grid item xs={12} sm={6} className={"textaudio"}>
                <h1>Audio File</h1>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={tabvalue} index={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} className={"textimage"}>
                <h4>Add Text</h4>
              </Grid>
              <Grid item xs={12} sm={6} className={"textimage"}>
                <h1>Image File</h1>
              </Grid>
            </Grid>
          </TabPanel>
        </Box>
      </div>
    </div>,
  ];

  const popovernotetitlecontent = [
    <div className="notetopcontent notetitlebox">
      <div className="notetitleheading">
        <h3>Note Settings</h3>
      </div>
      <div className="notetitlecontent">
        <Grid container spacing={2}>
          <Grid item xs={12} className={"notedetails"}>
            <h4>Note Details</h4>
            <InputField
              extraclass={"signupInput"}
              type="text"
              label="Note Title"
              name="noteTitle"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              error={error && error.field === "noteTitle"}
              errorText={error && error.field === "noteTitle" && error.error}
              onFocusField={onFocusField}
            />
          </Grid>
          <Grid item xs={12} className={"notesharing"}>
            <h4>Share Note</h4>
            <div className="notesharingcontent">
              <AutoCompleteComponent
                mentions={mentions}
                setMentions={setMentions}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>,
  ];

  const openAlert = (open, type, message) => {
    setOpen(open);
    setMessage(message);
    setType(type);
  };

  const createNoteAPI = async () => {
    setLoading(true);
    const res = await createNote({
      noteTitle,
      noteContent: value,
      noteType: "normal",
      mentions: mentions,
    });
    if (res?.data?.savedNote) {
      openAlert(true, "success", "Note Created Successfully");
      setNotes([...notes, res?.data?.savedNote]);
      dispatch(
        userdata({
          ...user,
          notes: [...notes, res?.data?.savedNote],
        })
      );
    } else {
      openAlert(true, "error", "Something Went Wrong!");
    }
    dispatch(setActivePopOver(""));
    setLoading(false);
  };

  const popovercontent = [
    <div className="notetopcontent">
      <div className="normalnotes" onClick={() => handlenotes("normal")}>
        <ButtonComponent
          buttontext="Normal Notes"
          customButtonStyle={{
            backgroundColor: "black",
            width: "70%",
            maxWidth: "250px",
          }}
          starticon={<Avatar>N</Avatar>}
        />
      </div>
      <div className="Mnemonicnotes" onClick={() => handlenotes("mnemonic")}>
        <ButtonComponent
          buttontext="Mnemonic Notes"
          customButtonStyle={{
            backgroundColor: "#1976d2",
            width: "70%",
            maxWidth: "250px",
          }}
          starticon={<Avatar>M</Avatar>}
        />
      </div>
    </div>,
  ];

  useEffect(() => {
    setLoading(true)
    if (user && user?.notes) {
      setNotes(user?.notes);
    }
    setLoading(false)
    return () => (document.title = "Mnemonic");
  }, []);

  useEffect(() => {
    setLoading(true)
    if (user && user?.notes) {
      setNotes(user?.notes);
    }
    setLoading(false)
    return () => user && user?.notes && setNotes(user?.notes)
  }, [user]);

  return (
    <>
      <div className="home">
        <div className="homecontent">
          <Grid container spacing={3} height={"100%"} className="homecontentbox">
            {loading ?<NotesSkeleton/> :notes && notes.length > 0 ? (
              notes.map((item, index) => (
                <Grid
                  key={index}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  index={index}
                >
                  <NoteCard
                    name={"home"}
                    heading={item?.noteTitle}
                    content={item?.noteContent}
                    date={item?.notedOn}
                    sharing={item?.mentions}
                    type={item?.noteType}
                    normalcontent={popovernormalcontent}
                    mnemoniccontent={popovermnemoniccontent}
                    notetitlecontent={popovernotetitlecontent}
                    editorvalue={value}
                    noteapi={createNoteAPI}
                    seteditorvalue={setValue}
                  />
                </Grid>
              ))
            ) : (
              <Grid
                display={"flex"}
                flexDirection={"column"}
                justifyContent="center"
                alignItems={"center"}
                width="100%"
                height="100%"
              >
                <h2>Notes Not Found.</h2>
              </Grid>
            )}
          </Grid>
          {activepopover === "normal" ? (
            <PopoverComponent
              popoverclassname={"normalnotes"}
              popovercontent={popovernormalcontent}
              richtext={true}
              popoverstate={true}
              nextBtnDisabled={value && value.length > 0 ? false : true}
            />
          ) : activepopover === "mnemonic" ? (
            <PopoverComponent
              popoverclassname={"mnemonicnotes"}
              popovercontent={popovermnemoniccontent}
              popoverstate={true}
            />
          ) : activepopover === "notetitle" ? (
            <PopoverComponent
              handleRichText={createNoteAPI}
              loading={loading}
              popoverclassname={"notetitle"}
              popovercontent={popovernotetitlecontent}
              popoverstate={true}
            />
          ) : (
            <PopoverComponent
              btnname={"home"}
              popoverclassname={"homecontentpopover"}
              popovercontent={popovercontent}
              popoverstate={homedisabled ? true : false}
            />
          )}
        </div>
        <AlertComponent
          setOpen={setOpen}
          setType={setType}
          setMessage={setMessage}
          alertOpen={open}
          alertMessage={message}
          alertType={type}
        />
      </div>
    </>
  );
};

export default Home;
