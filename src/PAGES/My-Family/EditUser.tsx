import react, {useEffect, useState} from "react";
import {Family} from "../../MODELS/Family";
import {useForm} from "react-hook-form";
import {User} from "../../MODELS/User";
import {addFamilyMember} from "../../SERVICES/FamilyService";
import {updateUser} from "../../SERVICES/UserService";

interface AvatarImage {
    img: string,
    isSelected: boolean
}
interface EditUserProps {
    selectedUser:User,
    family: Family;
}



export default function EditUser(props: EditUserProps){
    /**
     * This state stores the family from the Parent (HomePage)
     */
    const [family, setfamily] = useState<Family>(props.family);
    useEffect(() => {
    }, [family]);// For testing

    /**
     * This state stores the default avatar img url the user can choose
     */
    const [avatarsImg, setavatarsImg] = useState<AvatarImage[]>([
        {
            img: 'https://cdn.pixabay.com/photo/2016/04/01/11/25/avatar-1300331_1280.png',
            isSelected: false
        },
        {
            img: 'https://cdn.pixabay.com/photo/2014/04/03/10/32/businessman-310819_1280.png',
            isSelected: false
        },
        {
            img: 'https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_1280.png',
            isSelected: false
        },
        {
            img: 'https://cdn.pixabay.com/photo/2016/04/26/07/57/woman-1353825_1280.png',
            isSelected: false
        }, {
            img: 'https://cdn.pixabay.com/photo/2013/07/12/13/28/girl-147105_1280.png',
            isSelected: false
        },
        {
            img: 'https://cdn.pixabay.com/photo/2021/06/21/07/11/woman-6352831_1280.png',
            isSelected: false
        },
        {
            img: 'https://cdnb.artstation.com/p/assets/images/images/049/218/333/large/ben-yu-132-irate-homeless-man.jpg?1651974117',
            isSelected: false
        },


    ]);
    useEffect(() => {}, [avatarsImg])//for testing

const defaultAvatarImg = (props.selectedUser.imgUrl!==undefined) ? props.selectedUser.imgUrl : 'https://t4.ftcdn.net/jpg/04/08/24/43/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg';
    const [selectedAvatar, setselectedAvatar] = useState<string>(defaultAvatarImg);

    useEffect(()=>{props.selectedUser.imgUrl=selectedAvatar},[selectedAvatar])

    /**
     * This function handles the click on the img, it updates the selectedAvatar img , it iterates over the array to make sure the
     * isSelected value is false and than it iterate again to find the correct img and make isSelected true
     * ## Can be optimized , it is the way it is for future features
     *
     * @param avatar the avatar he user has selected
     */
    function handleClickOnAvatarImg(avatar: AvatarImage) {
        setselectedAvatar((prev) => avatar.img);
        const temp: AvatarImage[] = [...avatarsImg];
        temp.forEach((avatarObject) => {
            avatarObject.isSelected = false;
        });
        temp.forEach((avatarObject) => {
            if (avatarObject.img === avatar.img) {
                avatarObject.isSelected = true;
            }
        });
        setavatarsImg(temp);
    }
    /**
     * Those are the functions needed for the form
     */
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<User>();
    /**
     * This function handles the submit of the form
     * @param data the form values
     */
    const onSubmit = (data: User) => {
        props.selectedUser.name=data.name;
        // props.selectedUser.imgUrl=selectedAvatar;
        updateUser(props.selectedUser, props.selectedUser.id);
        window.location.href='/';


    };

    return(
        <>
            <div className="all-newuser-cont">
                <div className="new-user-title-cont">
                    <h2 className={'user-title'}>Want To Edit A Family Member ?</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className={'new-user-form'}>
                    <div className="form-name-cont">
                        <label>Family Member Name</label>
                        <input type="text"
                               {...register("name")}
                               required={true}
                               placeholder={props.selectedUser.name}
                        defaultValue={props.selectedUser.name}
                        />
                    </div>
                    <div className="img-form-cont">
                        <div className="avatar-selection-cont">
                            {avatarsImg.map((avatar) => (
                                <div key={avatar.img} className="avatar-card">
                                    <div className="dot">
                                        {(avatar.isSelected ? (<div className="real-dot">

                                        </div>) : null)}

                                    </div>
                                    <div className="avatar-img">
                                        <img src={avatar.img} onClick={() => handleClickOnAvatarImg(avatar)}
                                             alt="show an avatar img"/>

                                    </div>
                                </div>


                            ))}

                        </div>


                    </div>

                    <button type={"submit"} className={'button-5'}>Submit</button>
                </form>


            </div>

        </>
    )
}