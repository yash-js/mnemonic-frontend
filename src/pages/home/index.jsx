import React, { useEffect } from "react";
import { Grid } from "@mui/material";
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

const Home = () => {
  const dispatch = useDispatch();
  const activepopover = useSelector(getActivePopOver);
  const [homedisabled, setHomeDisabled] = React.useState(false);
  const [noteTitle, setNoteTitle] = React.useState("");
  const [error, setError] = React.useState(null);
  const [notes, setNotes] = useState([]);
  const [value, setValue] = useState();
  const [mentions, setMentions] = useState([]);

  const onFocusField = () => setError({});

  useEffect(() => {
    getNotesAPI();
    return () => (document.title = "Mnemonic");
  }, []);

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
        <RichTextEditor setValue={setValue} />
      </div>
    </div>,
  ];

  const popovermnemoniccontent = [
    <div className="notetopcontent mnemonicnotebox">
      <div className="mnemonicnotesheading">
        <h3>Mnemonic Notes</h3>
      </div>
      <div className="mnemonicnotescontent">
        <h1>Mnemonic Notes</h1>
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
            <h4>Note Sharing</h4>
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

  const createNoteAPI = async () => {
    const res = await createNote({
      noteTitle,
      noteContent: value,
      noteType: "normal",
      mentions: mentions,
    });
    setNotes([...notes, res?.data?.savedNote]);
  };

  const getNotesAPI = async () => {
    const res = await getNotes();
    // setNotes(res?.data?.notes);
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

  return (
    <>
      <div className="home">
        <div className="homecontent">
          <Grid container spacing={3}>
            {notes && notes.length > 0 ? (
              notes.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} index={index}>
                  <NoteCard
                    heading={item?.noteTitle}
                    content={item?.noteContent}
                    date={item?.notedOn}
                    // sharing={item.sharing}
                    type={"normal"}
                  />
                </Grid>
              ))
            ) : (
              <Grid
                display={"flex"}
                flexDirection={"column"}
                justifyContent="center"
                alignItems={"center"}
                width='100%'
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
      </div>
    </>
  );
};

export default Home;
