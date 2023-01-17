import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import PopoverComponent from "../../components/PopoverComponent";
import ButtonComponent from "../../components/ButtonComponent";

const Home = () => {
  const [normalnotes, setnormalnotes] = React.useState(false);
  const [mnemonicnotes, setmnemonicnotes] = React.useState(false);
  const [closehomepopover, setclosehomepopover] = React.useState(false);

  useEffect(() => {
 return ()=> document.title = "Mnemonic";
  },[]);

  const handlenotes = (type) => {
    if(type === 'normal'){
      setnormalnotes(true);
      setclosehomepopover(true)
    }else if(type === 'mnemonic'){
      setmnemonicnotes(true);
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
            normalnotes ? (
              <PopoverComponent popoverclassname={'normalnotes'} popovercontent={popovernormalcontent} />
            ) : mnemonicnotes ? (
              <PopoverComponent popoverclassname={'mnemonicnotes'} popovercontent={popovermnemoniccontent} />
            ) : (
              <PopoverComponent popoverclassname={'homecontentpopover'} popovercontent={popovercontent} popoverclose={closehomepopover} />
            )
          }
        </div>
      </div>
    </>
  );
};

export default Home;
