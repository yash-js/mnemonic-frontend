import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivePopOver, setActivePopOver } from "../../features/popoverslice";
import ButtonComponent from "../../components/ButtonComponent";
import RichTextEditor from "../../components/RichTextEditor";
import PopoverComponent from "../../components/PopoverComponent";
import Avatar from "@mui/material/Avatar";

const Home = () => {
  const dispatch = useDispatch();
  const activepopover = useSelector(getActivePopOver);
  const [closehomepopover, setclosehomepopover] = React.useState(false);

  useEffect(() => {
    return ()=> document.title = "Mnemonic";
  },[]);

  const handlenotes = (type) => {
    if(type === 'normal'){
      dispatch(setActivePopOver('normal'));
      setclosehomepopover(true)
    }else if(type === 'mnemonic'){
      dispatch(setActivePopOver('mnemonic'));
      setclosehomepopover(true)
    }
  }

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
          Home
          {
            activepopover === 'normal' ? (
              <PopoverComponent popoverclassname={'normalnotes'} popovercontent={popovernormalcontent} richtext={true}/>
            ) : activepopover === 'mnemonic' ? (
              <PopoverComponent popoverclassname={'mnemonicnotes'} popovercontent={popovermnemoniccontent}/>
            ) : (
              <PopoverComponent btnname={'home'} popoverclassname={'homecontentpopover'} popovercontent={popovercontent} popoverclose={closehomepopover} />
            )
          }
        </div>
      </div>
    </>
  );
};

export default Home;
