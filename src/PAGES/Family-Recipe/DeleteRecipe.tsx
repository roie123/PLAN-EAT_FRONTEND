import { debounce } from '@mui/material';
import react, { useState } from 'react'
import Recipe from '../../MODELS/Recipe'
import { deleteRecipe } from '../../SERVICES/RecipeService';


interface DeleteRecipeProps{
    recipes:Recipe[],
    familyId:number
}
export default function DeleteRecipe(props:DeleteRecipeProps){
const defaultRecipe:Recipe={
    id: 0,
    name: '',
    imgUrl: '',
    estimatedPrice: -1,
    ingredients: []
}

    const [selectedRecipe, setSelectedRecipe] = useState<Recipe>(defaultRecipe);

    function handleChange(recipe:Recipe){
   
          setSelectedRecipe((...prev) => recipe);
          
      }
function sendToDelete(){
deleteRecipe(selectedRecipe.id,props.familyId);
const newSetOfRecipes = currentRecipes.filter((recipe) => recipe.id!== selectedRecipe.id);
setCurrentRecipes((prev) => newSetOfRecipes);
}

const [currentRecipes, setCurrentRecipes] = useState<Recipe[]>(props.recipes)

    return(<>
    <div className="cards-list">

{currentRecipes.map((recipe)=>(

  <div key={recipe.id} className="card" onClick={() => handleChange(recipe)}>
    <div className="card_image"> <img src={recipe.imgUrl} alt={recipe.name} /> </div>
    <div className="card_title title-white">
      <p>{recipe.name}</p>
    </div>
  </div>
    )//End of thingy 
    
    )}
    
</div>
<button className='main-button' onClick={() => sendToDelete()} >Done</button>
    
    
    
    </>)
}