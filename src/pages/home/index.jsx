import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setActivePopOver, getActivePopOver } from "../../features/popoverslice";
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

  const onFocusField = () => setError({});

  useEffect(() => {
    document.title = "Mnemonic"
    return () => getNotesAPI();
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
        <RichTextEditor />
      </div>
    </div>
  ]

  const popovermnemoniccontent = [
    <div className="notetopcontent mnemonicnotebox">
      <div className="mnemonicnotesheading">
        <h3>Mnemonic Notes</h3>
      </div>
      <div className="mnemonicnotescontent">
        <h1>Mnemonic Notes</h1>
      </div>
    </div>
  ]

  const popovernotetitlecontent = [
    <div className="notetopcontent notetitlebox">
      <div className="notetitleheading">
        <h3>Note Settings</h3>
      </div>
      <div className="notetitlecontent">
        <Grid container spacing={2}>
          <Grid item xs={12} className={'notedetails'}>
            <h4>Note Details</h4>
            <InputField
                extraclass={"signupInput"}
                type="text"
                label="Note Title"
                name="noteTitle"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                error={error && error.field === "noteTitle"}
                errorText={
                  error && error.field === "noteTitle" && error.error
                }
                onFocusField={onFocusField}
              />
          </Grid>
          <Grid item xs={12} className={'notesharing'}>
            <h4>Note Sharing</h4>
            <div className="notesharingcontent">
              <AutoCompleteComponent />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  ]

  const cardcontent = [
    {
      heading: "Note 1",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia, nunc nisl aliquam nisl, eget aliquam nunc nisl eu nunc. Sed euismod, nunc vel tincidunt lacinia, nunc nisl aliquam nisl, eget aliquam nunc nisl eu nunc.",
      sharing: [
        {
          name: "batman",
          image:
            "https://www.lifehacker.com.au/wp-content/uploads/sites/4/2022/02/01/The-Batman-.jpg?quality=80&w=832",
        },
      ],
      date: "12/12/2021",
      time: "12:12:12",
      type: "normal",
      id: 1,
    },
    {
      heading: "Note 2",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia, nunc nisl aliquam nisl, eget aliquam nunc nisl eu nunc. Sed euismod, nunc vel tincidunt lacinia, nunc nisl aliquam nisl, eget aliquam nunc nisl eu nunc.",
      sharing: [
        {
          name: "wonder woman",
          image:
            "https://www.lifehacker.com.au/wp-content/uploads/sites/4/2020/12/22/5e7ehPZf5RT6Jt2H9cQP6k-e1608616459844.jpg?quality=80&w=832",
        },
      ],
      date: "12/12/2021",
      time: "12:12:12",
      type: "mnemonic",
      id: 2,
    },
    {
      heading: "Note 3",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia, nunc nisl aliquam nisl, eget aliquam nunc nisl eu nunc. Sed euismod, nunc vel tincidunt lacinia, nunc nisl aliquam nisl, eget aliquam nunc nisl eu nunc.",
      sharing: [
        {
          name: "superman",
          image:
            "https://www.comicbasics.com/wp-content/uploads/2017/09/Superman.jpg",
        },
      ],
      date: "12/12/2021",
      time: "12:12:12",
      type: "normal",
      id: 3,
    },
  ];

  const [notes, setNotes] = useState([]);

  const createNoteAPI = async () => {
    const res = await createNote();
    setNotes([...notes, res?.data?.saveNote]);
  };

  const getNotesAPI = async () => {
    const res = await getNotes();
    setNotes(res?.data?.notes);
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
            {notes && notes.length > 0 && notes.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} index={index}>
                <NoteCard
                  heading={item?.noteTitle}
                  content={item?.noteContent}
                  date={item?.notedOn}
                  // sharing={item.sharing}
                  type={"normal"}
                />
              </Grid>
            ))}
          </Grid>
          {
            activepopover === 'normal' ? (
              <PopoverComponent popoverclassname={'normalnotes'} popovercontent={popovernormalcontent} richtext={true} popoverstate={true}/>
            ) : activepopover === 'mnemonic' ? (
              <PopoverComponent popoverclassname={'mnemonicnotes'} popovercontent={popovermnemoniccontent} popoverstate={true}/>
            ) : activepopover === 'notetitle' ? (
              <PopoverComponent popoverclassname={'notetitle'} popovercontent={popovernotetitlecontent} popoverstate={true}/>
            ) : (
                <PopoverComponent
                btnname={"home"}
                popoverclassname={"homecontentpopover"}
                popovercontent={popovercontent}
                popoverstate={homedisabled ? true : false}
              />
            )
          }
        </div>
      </div>
    </>
  );
};

export default Home;
