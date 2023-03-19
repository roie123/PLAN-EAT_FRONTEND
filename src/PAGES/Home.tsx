import React, {useContext, useEffect, useState} from "react";
import FamilyAvatarsList from "../GENERAL-COMPONENTS/FamilyAvatarsList";
// import RecipeCar from "../GENERAL-COMPONENTS/RecipeCar"
import {FamilyContext} from "../Provider/FamilyProvider";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import './Home.css'
import {Meal} from "../MODELS/Meal";
import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import {updateMealAction} from "../Redux/action-creators/mealActionCreator";
import AddToMeal from "./Edit-Meal/AddToMeal";
import EditMeal from "./Edit-Meal/EditMeal";
import MyFamilyPage from "./My-Family/MyFamilyPage";
import EntryPage from "./Entry/EntryPage";
import {LocalStorgeKeyName} from "../MODELS/ENUMS/LocalStorgeKeyName";
import {User} from "../MODELS/User";
import {FamilyRole} from "../MODELS/ENUMS/FamilyRole";
import store from "../Redux/store";
import {Family} from "../MODELS/Family";
import Dialog from "@mui/material/Dialog";
import {Button, Typography} from "@mui/material";
import {CurrentUserActionType} from "../Redux/reducers/actionTypes/CurrentUserActionType";
import Recipe from "../MODELS/Recipe";
import {approveMealAddOnRequest, updateMeal} from "../SERVICES/MealService";
import {MealAddOnRequestDTO} from "../MODELS/MealAddOnRequestDTO";
import {Day} from "../MODELS/Day";
import {FamilyActionTypes} from "../Redux/reducers/actionTypes/FamilyActionTypes";

export default function HomePage(){

    /**\
     * This Hook is for selecting the desired component
     * (0) For Entry Screen
     * (1) For Home Screen
     * (2) For Add A recipe To A Meal
     * (3) For Edit Meal Entirely
     * (4) For FamilySpace
     */
    const [displaySelection,setDisplaySelection] =useState<number>(0);

    const defaultUser:User={
        familyRole: FamilyRole.regular, favoriteRecipes: [], id: 0, imgUrl: "", isActive: false, name: ""

    }

    /**\
     * Those Method Are For Updating the Selected Meal using a Redux store
     */
    const  dispatch = useDispatch();
    const updateMealFunc = bindActionCreators(updateMealAction,dispatch);

    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    /**\
     * This si the section for the family API
     */

    const [family,setfamily] =useState<Family>(useContext(FamilyContext));

    const [currentActiveUser,setcurrentActiveUser] =useState<User>();

    function handleUserChange(user:User){
        setcurrentActiveUser(user);
    }

    /**
     * This is for emigrating to the Redux state Management
     */
    useEffect(()=>{
        const unsubscribe = store.subscribe(()=>{
            setfamily(store.getState().family);
        });

        return () => unsubscribe();
    },[currentActiveUser])



//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    /**
     * This section checks if the local storage has a selected user's name AND if the display is the Entry Screen
     * if those conditions are true it sets the display to the Home  Screen and updates the current user
     */
    if (localStorage.getItem(LocalStorgeKeyName.selectedUserName)!==null

        && displaySelection===0){

        setDisplaySelection(1);
    }
    /**
     * This Section is for the Add Recipe To Meal Feature
     * @param meal the meal the user Selected and will pass to the EditMealComponent
     */
  function handleClickOnAddButton(meal:Meal){
      setDisplaySelection(2);
      updateMealFunc(meal);
  }

    /**
     * This method handles the click on the edit button , it sets the display value to the editMeal
     * @param meal the selected meal by the user in the home component, for  passing down as a prop to edit meal
     */
    function handleClickOnEditButton(meal:Meal){
        if (currentActiveUser?.familyRole!=="mainUser"){
            setpopUpSelection(1);
            return;
        }
        setDisplaySelection(3);
        updateMealFunc(meal);
    }

    /**
     * this functions sets the displayValue to the familySpace , the click in on the whole  div
     */
    function moveToFamilySpace() {
        setDisplaySelection(4);
    }


    /**
     * This state is in charge of displaying the popups 
     */
    const [popUpSelection,setpopUpSelection] =useState<number>(0);



    function handleChangeInCurrentUserInStore(){
        if(currentActiveUser!==store.getState().currentUser){
            if (store.getState().currentUser.id===0){
                family.familyMembers.map(user => {
                    if (localStorage.getItem(LocalStorgeKeyName.selectedUserName) === user.name){
                        store.dispatch({type:CurrentUserActionType.SET , payload:user})
                        return;
                    }
                });

                setDisplaySelection(0);
                return;
            }


            setcurrentActiveUser(store.getState().currentUser);
        }


    }
const unsubscribe = store.subscribe(handleChangeInCurrentUserInStore);

function handleUserAddedRecipesToMeal(){
    setDisplaySelection(1);
}



    const [selectedRecipeToPop,setselectedRecipeToPop] =useState<Recipe>();
    const [requestCreator,setrequestCreator] =useState<string>('');
    const [selectedMeal,setselectedMeal] =useState<Meal>();
    const [selectedMealAddOnRequest,setselectedMealAddOnRequest] =useState<MealAddOnRequestDTO>();
    const [selectedDay,setselectedDay] =useState<Day>();
    
    async function handleClickOnRecipeImage(recipe: Recipe , isRequest:boolean, userName:string , mealAddOn:MealAddOnRequestDTO|null , meal:Meal, day:Day) {
        setselectedDay(day);
        setselectedMeal(meal);
        setselectedRecipeToPop(recipe);
        setrequestCreator(userName);
        if (isRequest && mealAddOn){
            setselectedMealAddOnRequest(mealAddOn);
            setpopUpSelection(3);
        }
        else setpopUpSelection(2);
           // !isRequest ?   setpopUpSelection(2) : setpopUpSelection(3);
    }

     async function approveMealAddOn(recipe:Recipe){

               const updatedMeal =  await   approveMealAddOnRequest(selectedMeal?.id!,selectedMealAddOnRequest?.id!,recipe);
                let newFamily : Family = {...store.getState().family};
                let day : Day = {...selectedDay!};
                    const evilIndex :number =  day.mealList.findIndex(meal => meal===selectedMeal);

                    day.mealList.splice(evilIndex,1,updatedMeal);
                    const evilIndexOfDay: number = family.dayList?.indexOf(selectedDay!)!;
                    newFamily.dayList?.splice(evilIndexOfDay,1,day);
                    console.log(newFamily);

         store.dispatch({type:FamilyActionTypes.SET_FAMILY, payload:newFamily});

         setpopUpSelection(0);
            // }

    }
    
    
    const [animationSelection,setanimationSelection] =useState<boolean>(true);

console.log(family);
    return (
        <>
            {(displaySelection === 0) ? (<EntryPage users={family.familyMembers} handleChange={handleUserChange}/>) : null}
            {(displaySelection === 1) ? (<>
                <div className="familiy-list-cont" onClick={() => moveToFamilySpace()} >
                    <FamilyAvatarsList/>
                </div>
                <div className="car-cont">
                    <h1>WELCOME </h1>
                    {family?.name} Family
                </div>

                <h4 className="next-meals-title">OUR NEXT MEALS</h4>

                <div className="next-meals-cont">

                    {family.dayList?.map(day => (

                        <div key={day.id + Math.random() * (10)} className="day-cont">
                            <h5 className="day-of-week-title">{day.dayOfWeek}</h5>
                            {day.mealList.map((meal) => (
                                <div key={meal.id + Math.random() * (100)} className="meal-cont">
                                    <div>
                                        <h5 className="meal-time-head">{meal.mealTime}</h5>
                                    </div>
                                    <div className="recipes-cont">
                                        {meal.approvedRecipes.map((recipe) => (
                                                <div key={recipe.id + Math.random() * (100)}
                                                     className="recipe-card" onClick={()=> handleClickOnRecipeImage(recipe,false,'',null , meal,day)}>
                                                    <div className="img-cont" >
                                                        <img src={recipe.imgUrl} alt={recipe.name}/>
                                                    </div>
                                                    <h6 className="recipe-name">{recipe.name}</h6>

                                                </div>




                                        ))}
                                        {meal.mealAddOnRequestDTOList.map((addOn) => (

                                            addOn.requestedRecipes.map((recipe) => (

                                                    <div key={recipe.id + Math.random() * (1000)}
                                                         className="recipe-card-pending" onClick={()=> handleClickOnRecipeImage(recipe,true, addOn.userName,addOn, meal,day)}>
                                                        <div className={"user-circle-pending"} >
                                                            <div className="img-cont">
                                                                <img   src={addOn.userImgUrl} alt={recipe.name}/>

                                                            </div>
                                                        </div>
                                                        <div className="img-cont">
                                                            <img src={recipe.imgUrl} alt={recipe.name}/>
                                                        </div>
                                                        <h6 className="recipe-name">{recipe.name}</h6>

                                                    </div>




                                            ))



                                        ))}

                                    </div>


                                    <div className=  { "nice-points-cont"} >
                                        <EditIcon onClick={() => handleClickOnEditButton(meal)}
                                                  sx={{ fontSize: '3rem', cursor: 'pointer'}} className=  {(animationSelection) ?"nice-point" : "nice-point-no-ani"}
                                                  style={{animationDelay: '0.25s'}}></EditIcon>
                                        <AddIcon onClick={() => handleClickOnAddButton(meal)}
                                                 sx={{fontSize: '3rem', cursor: 'pointer'}} className=  {(animationSelection) ?"nice-point" : "nice-point-no-ani" } onAnimationEnd={()=>setanimationSelection(false)}
                                                 style={{animationDelay: '0.75s'}}></AddIcon>
                                        {/*<DeleteIcon sx={{fontSize:'2rem'}}  className="nice-point" style={{animationDelay:'0.75s'}}></DeleteIcon> */}

                                    </div>
                                </div>
                            ))}

                        </div>

                    ))}


                </div>


            </>) : null}
            {(displaySelection === 2) ? (<AddToMeal handleDone={handleUserAddedRecipesToMeal} recipes={family.favoriteRecipes}/>) : null}
            {(displaySelection === 3) ? (<EditMeal handleDone={handleUserAddedRecipesToMeal} recipes={family.favoriteRecipes}/>) : null}
            {(displaySelection === 4) ? (<MyFamilyPage family={family}/>) : null}




            <Dialog open={popUpSelection===1}>
                    <Typography>
                        We Are Sorry, Only Your Family's Main User Can Fully Edit Your Meals
                    </Typography>
                    <Button onClick={()=> setpopUpSelection(0)}>Close</Button>
            </Dialog>

            <Dialog open={popUpSelection===2}>
                <div className={'recipe-pop-up'}>

                    <div className="img-cont">
                        <img src={selectedRecipeToPop?.imgUrl} alt={selectedRecipeToPop?.name}/>

                    </div>
                        <h2>{selectedRecipeToPop?.name}</h2>

                    <h4>Ingredients</h4>

                    <div className={'ing-circle-cont'}>
                        {selectedRecipeToPop?.ingredients.map(ing=> (
                            <div className={'ing-circle'}>
                                <div className="img-cont">
                                    <img  src={ing.imgUrl} alt={ing.name}/>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Button sx={{height:'9vh'}} onClick={()=> setpopUpSelection(0)}>Close</Button>
            </Dialog>





            <Dialog open={popUpSelection===3}> {/*// this is the pop up for a mealAddOn Request*/}

                <div className={'recipe-pop-up'}>

                    <div className="img-cont">
                        <img src={selectedRecipeToPop?.imgUrl} alt={selectedRecipeToPop?.name}/>

                    </div>
                    <h2>{selectedRecipeToPop?.name}</h2>

                    <p>requested by {requestCreator}</p>


                </div>
                {currentActiveUser?.familyRole === FamilyRole.mainUser ? <Button sx={{height:'9vh'}}  onClick={()=> approveMealAddOn(selectedRecipeToPop as Recipe)} >Accept Request</Button> : null}
                <Button sx={{height:'9vh'}} onClick={()=> setpopUpSelection(0)}>Close</Button>
            </Dialog>





        </>


    );
}