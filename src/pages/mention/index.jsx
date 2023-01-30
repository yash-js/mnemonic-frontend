import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../../features/userSlice";
import { Grid } from "@mui/material";
import NoteCard from "../../components/NoteCard";
import RichTextEditor from "../../components/RichTextEditor";
import NotesSkeleton from "../../skeletons/NotesSkeleton";

function Mention() {
  const user = useSelector(userData);
  const [notes, setNotes] = useState([]);
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      document.title = "Mentions";
      if (user && user?.notes && user.notes.length > 0) {
        setNotes(user?.notes.filter((note) => note?.author?._id !== user.id));
      } else {
        setNotes([]);
      }
    };
  }, []);

  const popovernormalcontent = [
    <div className="notetopcontent normalnotebox">
      <div className="normalnotesheading">
        <h3>Normal Notes</h3>
      </div>
      <div className="normalnotescontent">
        <RichTextEditor setValue={setValue} initialValue={value} />
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

  return (
    <div className="mention">
      <div className="mentioncontent">
        <Grid container spacing={3} className="mentioncontentbox">
          {loading ? (
            <NotesSkeleton />
          ) : notes && notes.length > 0 ? (
            notes.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} index={index}>
                <NoteCard
                  name={"share"}
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
              width="100%"
              height="100%"
            >
              <h2>Notes Not Found.</h2>
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  )
}

export default Mention;
