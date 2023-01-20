import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getActivePopOver, getHidePopOver, setActivePopOver, setHidePopOver } from "../../features/popoverslice";
import ButtonComponent from "../../components/ButtonComponent";
import RichTextEditor from "../../components/RichTextEditor";
import PopoverComponent from "../../components/PopoverComponent";
import Avatar from "@mui/material/Avatar";
import NoteCard from "../../components/NoteCard";

const Home = () => {
  const dispatch = useDispatch();
  const activepopover = useSelector(getActivePopOver);
  const hidepopover = useSelector(getHidePopOver);

  useEffect(() => {
    return ()=> document.title = "Mnemonic";
  },[]);

  const handlenotes = (type) => {
    if(type === 'normal'){
      dispatch(setActivePopOver('normal'));
      dispatch(setHidePopOver('home'));
    }else if(type === 'mnemonic'){
      dispatch(setActivePopOver('mnemonic'));
      dispatch(setHidePopOver('home'));
    }
  }

  const cardcontent = [
    {
      heading: 'Note 1',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia, nunc nisl aliquam nisl, eget aliquam nunc nisl eu nunc. Sed euismod, nunc vel tincidunt lacinia, nunc nisl aliquam nisl, eget aliquam nunc nisl eu nunc.',
      sharing: [{
        name: 'User 1',
        image: 'https://images.unsplash.com/photo-1629209067863-8b2b2e1b2b1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      }],
      date: '12/12/2021',
      time: '12:12:12',
      type: 'normal',
      id: 1
    },
    {
      heading: 'Note 2',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia, nunc nisl aliquam nisl, eget aliquam nunc nisl eu nunc. Sed euismod, nunc vel tincidunt lacinia, nunc nisl aliquam nisl, eget aliquam nunc nisl eu nunc.',
      sharing: [{
        name: 'User 1',
        image: 'https://images.unsplash.com/photo-1629209067863-8b2b2e1b2b1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      }],
      date: '12/12/2021',
      time: '12:12:12',
      type: 'mnemonic',
      id: 2
    },
    {
      heading: 'Note 3',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia, nunc nisl aliquam nisl, eget aliquam nunc nisl eu nunc. Sed euismod, nunc vel tincidunt lacinia, nunc nisl aliquam nisl, eget aliquam nunc nisl eu nunc.',
      sharing: [{
        name: 'User 1',
        image: 'https://images.unsplash.com/photo-1629209067863-8b2b2e1b2b1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      }],
      date: '12/12/2021',
      time: '12:12:12',
      type: 'normal',
      id: 3
    }
  ]

  const popovercontent = [
    <div className="notebottomcontent">
      <div className="normalnotes" onClick={()=>handlenotes('normal')}>
        <ButtonComponent buttontext='Normal Notes' customButtonStyle={{backgroundColor: 'black', width: '70%', maxWidth: '250px'}} starticon={<Avatar>N</Avatar>}/>
      </div>
      <div className="Mnemonicnotes" onClick={()=>handlenotes('mnemonic')}>
        <ButtonComponent buttontext='Mnemonic Notes' customButtonStyle={{backgroundColor: '#1976d2', width: '70%', maxWidth: '250px'}} starticon={<Avatar>M</Avatar>}/>
      </div>
    </div>
  ]

  const popovernormalcontent = [
    <div className="notebottomcontent normalnotebox">
      <div className="normalnotesheading">
        <h3>Normal Notes</h3>
      </div>
      <div className="normalnotescontent">
        <RichTextEditor/>
      </div>
    </div>
  ]

  const popovermnemoniccontent = [
    <div className="notebottomcontent mnemonicnotebox">
      <div className="mnemonicnotesheading">
        <h3>Mnemonic Notes</h3>
      </div>
      <div className="mnemonicnotescontent">
        <h1>Mnemonic Notes</h1>
      </div>
    </div>
  ]

  return (
    <>
      <div className="home">
        <div className="homecontent">
          <Grid container spacing={3}>
            {
              cardcontent.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <NoteCard heading={item.heading} content={item.content} sharing={item.sharing} type={item.type}/>
                </Grid>
              ))
            }
          </Grid>
          {
            activepopover === 'normal' ? (
              <PopoverComponent popoverclassname={'normalnotes'} popovercontent={popovernormalcontent} richtext={true}/>
            ) : activepopover === 'mnemonic' ? (
              <PopoverComponent popoverclassname={'mnemonicnotes'} popovercontent={popovermnemoniccontent}/>
            ) : (
              <PopoverComponent btnname={'home'} popoverclassname={'homecontentpopover'} popovercontent={popovercontent} popoverstate={hidepopover === 'home' ? true : false} />
            )
          }
        </div>
      </div>
    </>
  );
};

export default Home;
