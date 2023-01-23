import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { setActivePopOver } from "../../features/popoverslice";
import ButtonComponent from "../../components/ButtonComponent";
import PopoverComponent from "../../components/PopoverComponent";
import Avatar from "@mui/material/Avatar";
import NoteCard from "../../components/NoteCard";

const Home = () => {
  const dispatch = useDispatch();
  const [homedisabled, setHomeDisabled] = React.useState(false);

  useEffect(() => {
    return ()=> document.title = "Mnemonic";
  },[]);

  const handlenotes = (type) => {
    if(type === 'normal'){
      dispatch(setActivePopOver('normal'));
      setHomeDisabled(true);
    }else if(type === 'mnemonic'){
      dispatch(setActivePopOver('mnemonic'));
      setHomeDisabled(true);
    }
  }

  const cardcontent = [
    {
      heading: 'Note 1',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia, nunc nisl aliquam nisl, eget aliquam nunc nisl eu nunc. Sed euismod, nunc vel tincidunt lacinia, nunc nisl aliquam nisl, eget aliquam nunc nisl eu nunc.',
      sharing: [{
        name: 'batman',
        image: 'https://www.lifehacker.com.au/wp-content/uploads/sites/4/2022/02/01/The-Batman-.jpg?quality=80&w=832'
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
        name: 'wonder woman',
        image: 'https://www.lifehacker.com.au/wp-content/uploads/sites/4/2020/12/22/5e7ehPZf5RT6Jt2H9cQP6k-e1608616459844.jpg?quality=80&w=832'
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
        name: 'superman',
        image: 'https://www.comicbasics.com/wp-content/uploads/2017/09/Superman.jpg'
      }],
      date: '12/12/2021',
      time: '12:12:12',
      type: 'normal',
      id: 3
    }
  ]

  const popovercontent = [
    <div className="notetopcontent">
      <div className="normalnotes" onClick={()=>handlenotes('normal')}>
        <ButtonComponent buttontext='Normal Notes' customButtonStyle={{backgroundColor: 'black', width: '70%', maxWidth: '250px'}} starticon={<Avatar>N</Avatar>}/>
      </div>
      <div className="Mnemonicnotes" onClick={()=>handlenotes('mnemonic')}>
        <ButtonComponent buttontext='Mnemonic Notes' customButtonStyle={{backgroundColor: '#1976d2', width: '70%', maxWidth: '250px'}} starticon={<Avatar>M</Avatar>}/>
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
                <Grid item xs={12} sm={6} md={4} lg={3} index={index}>
                  <NoteCard heading={item.heading} content={item.content} sharing={item.sharing} type={item.type}/>
                </Grid>
              ))
            }
          </Grid>
          <PopoverComponent btnname={'home'} popoverclassname={'homecontentpopover'} popovercontent={popovercontent} popoverstate={homedisabled ? true : false} />
        </div>
      </div>
    </>
  );
};

export default Home;
