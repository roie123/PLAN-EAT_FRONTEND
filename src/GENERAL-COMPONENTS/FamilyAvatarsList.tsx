import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange } from '@mui/material/colors';
import { useContext, useEffect, useState } from 'react';
import { Family } from '../MODELS/Family';
import { getFamily } from '../SERVICES/FamilyService';
import { FamilyContext } from '../Provider/FamilyProvider';
import './AvatarListStyle.css'
export default function FamilyAvatarsList() {
  const family = useContext(FamilyContext);

  return (
    <>
   
    <div className='avatar-cont'>
    <Stack direction="row"  spacing={3}>

      {family?.familyMembers?.map((user)=> (
        <>
        <div className='user-cont'>
        <Avatar
        sx={{ bgcolor: deepOrange[500] , borderStyle:'groove' , borderColor:'lightgray'}}
        alt={user.name}
        src="/broken-image.jpg" 
        key={user?.id}
        style={{width:'10vh', height:'10vh',fontSize:'1rem',textAlign:'center'}}
      >
        <img src={user?.imgUrl} alt={user.name} />
      </Avatar>
      <p>{user.name.split(" ")[0]}</p>
      </div>
      </>
      ))}
      
     
    

    </Stack>
    </div>
    </>
  );
}