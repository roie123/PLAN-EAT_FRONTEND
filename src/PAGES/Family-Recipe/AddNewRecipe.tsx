import { Button, MenuItem, Select, TextField } from '@mui/material';
import react, { createContext, FormEvent, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Recipe from '../../MODELS/Recipe';
import { createRecipe } from '../../SERVICES/RecipeService';
import AddCircleIcon from '@mui/icons-material/AddCircleOutline';
import { Ingredient } from '../../MODELS/Ingredient';
import MoneyIcon from '@mui/icons-material/AttachMoney';
import { IngredientType } from '../../MODELS/ENUMS/IngredientType';
import { Link } from 'react-router-dom';
import ChooseIngredients from './ChooseIngredient';
import { NewRecipeValues } from '../../SERVICES/NewRecipeContext';
import Test from './Test';
import { json } from 'stream/consumers';
interface AddNewRecipeProp{
    selectedRecipe : Recipe;
   
    familyId:number,
    familyName?:string
}


export default function AddNewRecipe(recipe:AddNewRecipeProp){
  const ing: Ingredient={
    name : '', 
    price: -1,
    id:0

  }
  let defaultRecipe:Recipe ={
    id:0,
    imgUrl:'cxvz',
    estimatedPrice:0,
    ingredients:[],
    name:"deaf"

  }
  ///DISPLAY SELECTION 
const [displaySelection, setdisplaySelection] = useState<number>(1);
  //THE INGREDIENTS HOOK AND LOGIC 
  const [ingredients, setIngridients] = useState<Ingredient[]>([]) 
  const handleAddIngredient = (ingredients:Ingredient[] , finished : boolean)=>{
    setIngridients(ingredients);
    console.log(ingredients);
  }
  const ingredientsToDisplay :string[] = (Object.keys(IngredientType) as Array<keyof typeof IngredientType>);
  const [showingChoosingSelectionMethod, setshowingChoosingSelectionMethod] = useState<boolean>(false);
  ///END OF INGREDIENT LOGIC 

  const {register , handleSubmit} = useForm<Recipe>();
  const [selectedImg ,setSelectedImage] = useState<string>('https://w7.pngwing.com/pngs/269/105/png-transparent-cuideo-dish-computer-icons-menu-restaurant-dish-miscellaneous-food-text.png');
  const onSave : SubmitHandler<Recipe> = (formValues)=> {
    formValues.imgUrl= selectedImg;
    console.log(formValues);
     defaultRecipe.imgUrl =selectedImg ;
     defaultRecipe.name = formValues.name;
     defaultRecipe.ingredients = ingredients;
    console.log(defaultRecipe);
    setdisplaySelection(2);
    createRecipe(formValues,recipe.familyId);
  }
  
  console.log(ingredients);
  

  const handleFormEvent = (values:Recipe) => {
    
    localStorage.setItem('recipeName' , JSON.stringify(values.name));
    localStorage.setItem('recipeImgUrl',JSON.stringify(selectedImg));
    localStorage.setItem('familyId',recipe.familyId.toString());
    let temp:string= JSON.stringify(localStorage.getItem('recipeImgUrl')?.toString());
    values.imgUrl = temp;
    console.log(temp);
    window.location.href = "/add-ingredients"

  }
    const [recipeImg, setRecipeImg] = useState<string[]>(
        [
        'https://i1.wp.com/www.oursweetadventures.com/wp-content/uploads/2019/10/Spaghetti-Carbonara-2.jpg?resize=720%2C720&ssl=1',
        'https://alexandracooks.com/wp-content/uploads/2014/11/15807880225_09d7bd37e6_o-1-550x600.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSXyS1Dx7eIiUCD1ZGt4PqK6UcezuIlayJTg&usqp=CAU',
        'https://www.bestoflasvegas.com/custom/domain_1/image_files/sitemgr_photo_20354.jpg'
        
      
      ]
        );
      
      function selecImg(value:string){
          setSelectedImage((...prev) => value);
      
      }
    
    return(
      <>
      {(displaySelection===1) ? ( 
      <form  className="all-cont" onSubmit={handleSubmit(handleFormEvent)}> 
    
    
  
     
    <div className="new-recipe-cont">
  <h4 className='new-recipe-title'>Let's Add Some Of  The <span>{recipe.familyName}</span> Family Recipes !</h4>
  <div className="form-cont">
  <div className='seperate-title'>


  <div className='label-input-cont'>
    <label >Recipe Name</label>
  <input {...register("name")} type="text" required    />
  </div>




  </div>
  




  <div className='seperate-title'>
  <h4 className='recipe-pic-title'>Select An Image Or Upload Your Own </h4>
  
  <div  className='img-select-cont'>
  
  {recipeImg.map((img) => (
    <>
    <div key={img} className="img-cont">
      <img src={img} className='img-select' onClick={() => setSelectedImage((...prev) => img)}  alt="image of recipe" />
    </div>
  
   
    </>
    ))
    }
    </div>
  
  </div>
  
  
  </div>
  
  </div>
  <button className='main-button' type='submit'   >Choose Ingredients</button>
  {(showingChoosingSelectionMethod) ? (

    <>
    <div className="ingredient-selection-method-buttons-cont">
      <button type='button'  className='main-button'>Let Us Help</button>
      <button type='button' className='main-button'>Select Items</button>
    </div>
    </>
  ):null}
    
   


  </form>):(null)} 
  {/* END OF THE DISPLAY SELECTION 1 */}
  {(displaySelection===2) ? (<ChooseIngredients />):(null)}
       
    
    

    </>
   
    )
}