import {useState} from 'react';
import './MyFamilyStyles.css'
import {Family} from "../../MODELS/Family";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import AddNewUser from "./AddNewUser/AddNewUserPage";
import EditUser from "./EditUser";
import {User} from "../../MODELS/User";
import {deleteUser} from "../../SERVICES/UserService";
import {FamilyRole} from "../../MODELS/ENUMS/FamilyRole";

interface MyFamilyPageProps {
    family: Family
}

export default function MyFamilyPage(props: MyFamilyPageProps) {

    /**
     * This state stores and manages the displayed component
     * (1)For The FamilySpace
     * (2) For Adding a User
     * (3) For Edit User
     */
    const [dispalySelection, setdispalySelection] = useState<number>(1);
const emptyUser:User={
    familyRole: FamilyRole.regular,
    favoriteRecipes: [], id: 0, imgUrl: "", isActive: false, name: ""

}
    /**
     * This const stores the selected user by the user
     */
    const [selectedUser,setselectedUser] =useState<User>(emptyUser);


    function handleAddUserButton() {
        setdispalySelection(2);
    }

    function handleEditUserButton(user:User){
        setselectedUser(user);
        setdispalySelection(3);
    }

    /**
     * This function deletes the user
     * @param user the user to be deleted
     */
    function handleDeleteButton(user:User){
        deleteUser(user.id);
}
    return (
        <>
            {(dispalySelection === 1) ? <>
                <div className="my-family-title-cont">
                    <span className={'family-name-word'}>The </span>
                    <span className={'family-name-word'}>{props.family.name} </span>
                    <span className={'family-name-word'}> Family</span>


                </div>
                <div className="family-members">
                    {props.family.familyMembers.map((user) => (
                        <div key={user.id} className="member-card">
                            <div className="img-cont">
                                <img src={user.imgUrl} alt='shows a picture of a user'/>
                            </div>
                            <div className="user-desc">
                                <div className="name-and-buttons">
                                    <h4>{user.name}</h4>
                                    <div className="buttons">
                                        <EditIcon onClick={()=> handleEditUserButton(user)} sx={{fontSize: '2.2rem'}}/>
                                        <DeleteIcon onClick={()=> handleDeleteButton(user)} sx={{fontSize: '2.2rem'}}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}


                </div>
                <div className="add-member-but-cont">
                    <button className={'but-but-no'}>
                        <AddIcon onClick={() => handleAddUserButton()} sx={{fontSize: '4rem'}}/>
                    </button>

                </div>
            </> : null}
            {(dispalySelection === 2) ? (<AddNewUser family={props.family}/>) : null}
            {(dispalySelection === 3) ? (<EditUser family={props.family} selectedUser={selectedUser}/>) : null}


        </>
    )
}