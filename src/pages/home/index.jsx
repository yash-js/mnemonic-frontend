import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import PopoverComponent from "../../components/PopoverComponent";
import ButtonComponent from "../../components/ButtonComponent";

const Home = () => {
  useEffect(() => {
    document.title = "Mnemonic";
  });

  const popovercontent = [
    <div style={{width: '80%', height: '100%', display:'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      <div style={{width: '35%', minWidth: '150px'}}>
        <ButtonComponent customButtonStyle={{backgroundColor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'space-around', margin: '0px !important'}} starticon={<Avatar><span style={{color: 'black'}}>N</span></Avatar>} buttontext={'Normal Notes'}/>
      </div>
      <div style={{width: '35%', minWidth: '150px'}}>
        <ButtonComponent customButtonStyle={{backgroundColor: '#4F7BD2', display: 'flex', alignItems: 'center', justifyContent: 'space-around', margin: '0px !important'}} starticon={<Avatar><span style={{color: 'black'}}>M</span></Avatar>} buttontext={'Mnemonics Notes'}/>
      </div>
    </div>
  ]

  return (
    <>
      <div className="home">
        <div className="homecontent">
          Home
          <PopoverComponent popoverclassname='homecontentpopover' popovercontent={popovercontent} />
        </div>
      </div>
    </>
  );
};

export default Home;
