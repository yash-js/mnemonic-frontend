import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import NoteCard from "../../components/NoteCard";
import RichTextEditor from "../../components/RichTextEditor";
import { getNotes } from "../../lib/API_Calls";

function Share() {
  const [notes, setNotes] = useState([]);
  const [value, setValue] = useState();

  useEffect(() => {
    getNotesAPI();
    return () => (document.title = "Share");
  }, []);

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
        <h1>Mnemonic Notes</h1>
      </div>
    </div>,
  ];

  const getNotesAPI = async () => {
    const res = await getNotes();
    setNotes(res?.data?.notes);
  };

  return (
    <div className="share">
      <div className="sharecontent">
        <Grid container spacing={3}>
          {notes && notes.length > 0 ? (
            notes.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} index={index}>
                <NoteCard
                  name={'share'}
                  heading={item?.noteTitle}
                  content={item?.noteContent}
                  date={item?.notedOn}
                  sharing={item?.mentions}
                  type={item?.noteType}
                  normalcontent={popovernormalcontent}
                  mnemoniccontent={popovermnemoniccontent}
                  editorvalue={value}
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
              width='100%'
              height='100%'
            >
              <h2>Notes Not Found.</h2>
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  )
}

export default Share;
