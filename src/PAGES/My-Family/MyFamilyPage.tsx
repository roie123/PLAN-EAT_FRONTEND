import react from 'react';
import { Link } from 'react-router-dom';
import './MyFamilyStyles.css'



export default function MyFamilyPage(){

    return(
        <>
        
       <Link to={'/add-new-user'}>TO ADD </Link>
        
        </>
    )
}