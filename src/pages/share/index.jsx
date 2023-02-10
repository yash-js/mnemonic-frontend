import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import NoteCard from "../../components/NoteCard";
import RichTextEditor from "../../components/RichTextEditor";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../features/userSlice";
import NotesSkeleton from "../../skeletons/NotesSkeleton";
import ReadonlyEditor from "../../components/ReadonlyEditor";

function Share() {
  const [notes, setNotes] = useState([]);
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);
  const user = useSelector(userData);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    if (user && user?.notes) {
      setNotes(user?.notes.filter((note) => note?.author?._id === user.id));
    }
    setLoading(false);
    return () => (document.title = "Share");
  }, []);

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
    <div className="share">
      <div className="sharecontent">
        <Grid container spacing={3} className="sharecontentbox">
          {loading ? (
            <NotesSkeleton />
          ) : notes && notes.length > 0 ? (
            notes.map((item, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3} index={index}>
                <NoteCard
                  name={"share"}
                  heading={item?.noteTitle}
                  content={item?.noteContent}
                  date={item?.notedOn}
                  sharing={item?.mentions}
                  type={item?.noteType}
                  normalcontent={
                    <div className="notetopcontent normalnotebox">
                      <div className="normalnotesheading">
                        <h3>Normal Notes</h3>
                      </div>
                      <div className="normalnotescontent">
                        <ReadonlyEditor
                          setValue={setValue}
                          value={item?.noteContent}
                        />
                      </div>
                    </div>
                  }
                  mnemoniccontent={popovermnemoniccontent}
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
  );
}

export default Share;
