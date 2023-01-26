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


export default function HomePage(){
  const family = useContext(FamilyContext);
  
    return (
        <>
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
                          <AddIcon  sx={{fontSize:'2.5rem' , cursor:'pointer'}} className="nice-point" style={{animationDelay:'0.75s'}}></AddIcon>
                          {/* <DeleteIcon sx={{fontSize:'2rem'}}  className="nice-point" style={{animationDelay:'0.75s'}}></DeleteIcon> */}

                               </div>
                            </div>
</>
                  ))}
                  
                </div>
              ))}
             



            </div>

            {/* <RecipeCar recipesToRender={family.favoriteRecipes}  /> */}
 
            </>

    ) 
}