import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import FamilyAvatarsList from "../GENERAL-COMPONENTS/FamilyAvatarsList";
// import RecipeCar from "../GENERAL-COMPONENTS/RecipeCar"
import { Family } from "../MODELS/Family";
import Recipe from "../MODELS/Recipe";
import { FamilyContext } from "../Provider/FamilyProvider";
import { getFamily } from "../SERVICES/FamilyService";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import './Home.css'
import {Meal} from "../MODELS/Meal";
import {EditMealContext} from "../Provider/EditMealProvider";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../Redux/reducers";
import {bindActionCreators} from "redux";
import {updateMealAction} from "../Redux/action-creators/mealActionCreator";
import AddToMeal from "./Edit-Meal/AddToMeal";

export default function HomePage(){

    /**\
     * This Hook is for selecting the desired component
     * (1) For Home Screen
     * (2) For Add A recipe To A Meal
     * (3) For Edit Meal Entirely
     */
    const [displaySelection,setDisplaySelection] =useState<number>(1);


    /**\
     * Those Method Are For Updating the Selected Meal using a Redux store
     */
    const  dispatch = useDispatch();
    const updateMealFunc = bindActionCreators(updateMealAction,dispatch);

    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


    /**\
     * This si the section for the family API
     */
    const family = useContext(FamilyContext);
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    /**
     * This Section is for the Add Recipe To Meal Feature
     * @param meal the meal the user Selected and will pass to the EditMealComponent
     */
  function handleClickOnAddButton(meal:Meal){
      setDisplaySelection(2);
      updateMealFunc(meal);
  }
    return (
        <>
        {(displaySelection===1) ? ( <>
            <div className="familiy-list-cont">
                <FamilyAvatarsList/>
            </div>
            <div className="car-cont">
                <h1>WELCOME </h1>
                {family?.name} Family
            </div>

            <h4 className="next-meals-title">OUR NEXT MEALS</h4>

            <div className="next-meals-cont">

                {family.dayList?.map(day => (

                    <div key={day.id} className="day-cont">
                        <h5 className="day-of-week-title" >{day.dayOfWeek}</h5>
                        {day.mealList.map((meal) => (
                            <>
                                <div key={meal.id} className="meal-cont">
                                    <div>
                                        <h5 className="meal-time-head">{meal.mealTime}</h5>
                                    </div>
                                    <div className="recipes-cont">
                                        {meal.recipeList.map((recipe) => (
                                            <div key={recipe.id} className="recipe-card">
                                                <div className="img-cont">
                                                    <img src={recipe.imgUrl} alt={recipe.name} />
                                                </div>
                                                <h6 className="recipe-name">{recipe.name}</h6>

                                            </div>

                                        ))}

                                    </div>
                                    <div className="nice-points-cont">
                                        <EditIcon sx={{fontSize:'2.5rem' , cursor:'pointer'}}  className="nice-point" style={{animationDelay:'0.25s'}}></EditIcon>
                                        <AddIcon onClick={()=>handleClickOnAddButton(meal)}  sx={{fontSize:'2.5rem' , cursor:'pointer'}} className="nice-point" style={{animationDelay:'0.75s'}}></AddIcon>
                                        {/* <DeleteIcon sx={{fontSize:'2rem'}}  className="nice-point" style={{animationDelay:'0.75s'}}></DeleteIcon> */}

                                    </div>
                                </div>
                            </>
                        ))}

                    </div>
                ))}




            </div>


        </>) :null}
        {(displaySelection===2) ? (<AddToMeal recipes={family.favoriteRecipes}/>) :null}

        </>

    ) 
}