import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import PopoverComponent from "../../components/PopoverComponent";
import ButtonComponent from "../../components/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import { getActivePopOver, setActivePopOver } from "../../features/popoverslice";

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
    <h1>Normal Notes</h1>
  ]

  const popovermnemoniccontent = [
    <h1>Mnemonic Notes</h1>
  ]

  return (
    <>
      <div className="home">
        <div className="homecontent">
          Home
          {
            activepopover === 'normal' ? (
              <PopoverComponent popoverclassname={'normalnotes'} popovercontent={popovernormalcontent}/>
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
