import react, { FormEvent, useContext, useEffect, useState } from 'react'
import './MyFamilyRecipeStyle.css'
import { useForm, SubmitHandler } from "react-hook-form";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { FamilyContext } from '../../Provider/FamilyProvider';
import Recipe from '../../MODELS/Recipe';
import { Button, Link, TextField } from '@mui/material';
import {createRecipe ,updateRecipe } from '../../SERVICES/RecipeService'
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import EditRecipeWindow from './EditRecipe';
import AddNewRecipe from './AddNewRecipe';
import DeleteRecipe from './DeleteRecipe';
export default function(){
const family = useContext(FamilyContext);
const recipe :Recipe= {
    id:-1,
    imgUrl:'',
    estimatedPrice:-1,
    name:'default',
    ingredients:[]
}
let isRecipesHidden :boolean= false;

const [isInEditMode, setIsInEditMode] = useState<boolean>(false);
const [selectedRecipe, setSelectedRecipe] = useState<Recipe>(recipe);
const [componentSelector, setComponentSelector] = useState<number>(1); // 1 for default 2  for add and 3 for edit 4 for delete 
const[hideRecipes,setHideRecipes] = useState<boolean>(false);//false for default 
function handleChange(recipe:Recipe){

    setSelectedRecipe((...prev) => recipe);
    
}






// THE TOGGLE COMPONENTS FUNCTIONS 
function toggleFamilyrecipesView(){
  setComponentSelector((...prev) => 1);
}
function toggleAddNewRecipe(){
  if(componentSelector===2){
    setComponentSelector((...prev) => 1);
  }
  setComponentSelector((...prev) => 2);
}
function toggleEditMode(){
  if(componentSelector===3){
    setComponentSelector((...prev) => 1)
  }
  setComponentSelector((...prev) => 3);
}
function toggleDeleteMode(){
  if(componentSelector===4){
    setComponentSelector((...prev) => 1)
  }
  setComponentSelector((...prev) => 4);
}
//END OF TOGGLE COMPONENTS 

useEffect(() => {
  
}, [componentSelector])

    return(
<>

<div className="nice-points-cont">
  <Button onClick={()=> toggleEditMode()}>
   <EditIcon sx={{fontSize:'2.5rem' , cursor:'pointer'}}  className="nice-point" style={{animationDelay:'0.25s'}}></EditIcon>
   </Button>
     {(componentSelector===1) ?                    
    <Button onClick={() => toggleAddNewRecipe()}>
      <AddIcon   sx={{fontSize:'2.5rem' , cursor:'pointer'}} className="nice-point" style={{animationDelay:'0.5s'}}></AddIcon></Button>
                          : 
    <Button onClick={() => toggleFamilyrecipesView()}>
      <CalendarViewMonthIcon   sx={{fontSize:'2.5rem' , cursor:'pointer' }} className="nice-point" style={{animationName:'none' , opacity:'1'}}></CalendarViewMonthIcon></Button>
                        }
    <Button  onClick={() => toggleDeleteMode()} >
    <DeleteIcon sx={{fontSize:'2rem'}}  className="nice-point" style={{animationDelay:'0.75s'}}></DeleteIcon>

    </Button>

</div>


 {(componentSelector===1) ? (
  
  
<div className="cards-list">

{family.favoriteRecipes?.map((recipe)=>(

  <div key={recipe.id} className="card" >
    <div className="card_image"> <img src={recipe.imgUrl} alt={recipe.name} /> </div>
    <div className="card_title title-white">
      <p>{recipe.name}</p>
    </div>
  </div>
  
    )//End of thingy 
    
    )}</div>) :(null) } 

{(componentSelector===2) ? (<AddNewRecipe selectedRecipe={selectedRecipe} familyId={family.id} familyName={family.name}   />
) : (null) }  

{(componentSelector===3) ? <EditRecipeWindow recipes={family.favoriteRecipes} familyId={family.id} /> : (null)}

{(componentSelector===4) ? <DeleteRecipe recipes={family.favoriteRecipes} familyId={family.id}/> : (null)}




</>


    )
}






/**
 * {family.favoriteRecipes?.map((recipe)=>(

<div className="card" onClick={() => handleChange(recipe)}>
  <div className="card_image"> <img src={recipe.imgUrl} alt={recipe.name} /> </div>
  <div className="card_title title-white">
    <p>{recipe.name}</p>
  </div>
</div>

  )//End of thingy 
  
  )}

 */