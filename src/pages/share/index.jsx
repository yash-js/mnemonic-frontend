import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import NoteCard from "../../components/NoteCard";
import RichTextEditor from "../../components/RichTextEditor";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../features/userSlice";
import NotesSkeleton from "../../skeletons/NotesSkeleton";
import ReadonlyEditor from "../../components/ReadonlyEditor";
import InputField from "../../components/InputField";

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

  return (
    <div className="share">
      <div className="sharecontent">
        <Grid container spacing={3} className="sharecontentbox">
          {loading ? (
            <NotesSkeleton />
          ) : notes && notes.length > 0 ? (
            notes.map((item, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3} index={index}>
              {console.log(item)}
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
                  mnemoniccontent={
                    <>
                      {item?.noteType === "mnemonic" && item?.summary ? (
                        <div className="notetopcontent mnemonicnotebox">
                          <div className="mnemonicnotesheading">
                            <h3>Mnemonic Notes</h3>
                          </div>
                          <div className="mnemonicnotescontent">
                            <Grid container spacing={2} style={{ height: "100%" }}>
                              <Grid item xs={12} sm={6} className={"textpara"}>
                                <h4>Text Summary</h4>
                                <InputField
                                  disabled={true}
                                  extraclass={"textparaInput"}
                                  type="text"
                                  name="textparaInput"
                                  value={item?.noteContent}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6} className={"textpara"}>
                                <h4>Summarized Text</h4>
                                <p >{item?.summary}</p>
                              </Grid>
                            </Grid>
                          </div>
                        </div>
                      ) : item?.noteType === "mnemonic" &&
                        item?.noteContent &&
                        !item?.summary &&
                        !item?.image ? (
                          <div className="notetopcontent mnemonicnotebox">
                            <div className="mnemonicnotesheading">
                              <h3>Mnemonic Notes</h3>
                            </div>
                            <div className="mnemonicnotescontent">
                              <Grid container spacing={2} style={{ height: "100%" }}>
                                <Grid item xs={12} className={"textaudio"}>
                                  <h4>Add Text</h4>
                                  <InputField
                                    disabled={true}
                                    extraclass={"textaudioInput"}
                                    type="text"
                                    name="textaudioInput"
                                    value={item?.noteContent}
                                    multiline={true}
                                  />
                                </Grid>
                              </Grid>
                            </div>
                          </div>
                      ) : (
                        <div className="notetopcontent mnemonicnotebox">
                          <div className="mnemonicnotesheading">
                            <h3>Mnemonic Notes</h3>
                          </div>
                          <div className="mnemonicnotescontent">
                            <Grid container spacing={2} style={{ height: "100%" }}>
                              <Grid item xs={12} sm={6} className={"textimage"}>
                                <h4>Image Text</h4>
                                <InputField
                                  disabled={true}
                                  extraclass={"textimageInput"}
                                  type="text"
                                  name="textimageInput"
                                  value={item?.noteContent}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6} className={"textimage"}>
                                <h4>Image </h4>
                                <div className="imgbox">
                                  <img
                                    className="w-full h-auto object-cover rounded-xl"
                                    src={item?.image}
                                    alt={item?.noteContent}
                                  />
                                </div>
                              </Grid>
                            </Grid>
                          </div>
                        </div>
                      )}
                    </>
                  }
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
