import react, {useEffect, useState} from 'react';
import './EntryPageStyle.css'
import {Family} from "../../MODELS/Family";
import {User} from "../../MODELS/User";
import {LocalStorgeKeyName} from "../../MODELS/ENUMS/LocalStorgeKeyName";
import store from "../../Redux/store";
import {CurrentUserActionType} from "../../Redux/reducers/actionTypes/CurrentUserActionType";


interface EntryPageProps{
    users:User[],
    handleChange(user:User):void
}


export default function EntryPage(props:EntryPageProps){

    const [users,setusers] =useState<User[]>([...props.users]);
    useEffect(()=>{    },[users])//for testing

    function handleClickOnUser(user:User){
        props.handleChange(user);
    localStorage.setItem(LocalStorgeKeyName.selectedUserName,user.name);
    localStorage.setItem(LocalStorgeKeyName.selectedUserRole,user.familyRole);
    localStorage.setItem(LocalStorgeKeyName.selectedUserId,user.id.toString());

    store.dispatch({type:CurrentUserActionType.SET , payload:user});
    // window.location.href='http://localhost:3000/';
    }

    return(
        <>
            <div className="user-selection-cont">
                <div className="title-cont">
                    <h1>Who Are You</h1>
                </div>
                <div className="user-card-cont">
                    {props.users.map((user)=> (
                        <div key={user.id} onClick={()=> handleClickOnUser(user)} className="user-card">
                                <h4>{user.name}</h4>
                            <div className="entry-img-cont">
                                <img src={user.imgUrl} alt="shows a users avatar img"/>
                            </div>
                        </div>

                    ))}


                </div>

            </div>


        </>
    )
}
