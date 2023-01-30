import { TextField } from '@mui/material';
import react, { FormEvent, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Recipe from '../../MODELS/Recipe';
import { updateRecipe } from '../../SERVICES/RecipeService';
import './MyFamilyRecipeStyle.css';
import {EditRecipeContext} from "../../SERVICES/EditRecipeContext";
import EditIngredients from "./EditIngredients";
import ts from "typescript/lib/tsserverlibrary";
import formatMessage = ts.server.formatMessage;




interface EditRecipeWindowProps {
recipes? : Recipe[];
familyId:number
}

export default function EditRecipeWindow(editRecipeWindowProps:EditRecipeWindowProps){
    const defaultRecipe :Recipe= {
        id:-1,
        imgUrl:'',
        estimatedPrice:-1,
        name:'default',
        ingredients:[]
    }
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe>(defaultRecipe);

    function handleChange(recipe:Recipe){
   
          setSelectedRecipe(() => recipe);
          
      }

    
    useEffect(() => {
    }, [selectedRecipe])


    ////  ********** FORM LOGIC ******** /////////////////
    const {register, handleSubmit} = useForm<Recipe>();
    const [selectedImg ,setSelectedImage] = useState<string>('https://w7.pngwing.com/pngs/269/105/png-transparent-cuideo-dish-computer-icons-menu-restaurant-dish-miscellaneous-food-text.png');
    const onSave:SubmitHandler<Recipe> = (formValues) => {
        selectedRecipe.name=formValues.name;
        formValues.imgUrl= selectedImg;
        formValues.id = selectedRecipe.id;
        setSelectedRecipe(formValues);
        console.log(selectedRecipe.id);

    }


      const handleFormEvent = (event: FormEvent) => {
        // event.preventDefault();
        handleSubmit(onSave)(event);
        setDisplaySelection(2);
      }

///RECIPE IMG ARRAY 
const [recipeImg, setRecipeImg] = useState<string[]>(
    [
    'https://i1.wp.com/www.oursweetadventures.com/wp-content/uploads/2019/10/Spaghetti-Carbonara-2.jpg?resize=720%2C720&ssl=1',
    'https://alexandracooks.com/wp-content/uploads/2014/11/15807880225_09d7bd37e6_o-1-550x600.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSXyS1Dx7eIiUCD1ZGt4PqK6UcezuIlayJTg&usqp=CAU',
    'https://www.bestoflasvegas.com/custom/domain_1/image_files/sitemgr_photo_20354.jpg'
    
  
  ]
    );
    /**
     * This method will tell us what component will be displayed
     */
    const [displaySelection,setDisplaySelection] = useState<number>(1);
    useEffect(()=>{} ,[displaySelection]);

return(


<>
    {(displaySelection===1) ? ( (selectedRecipe.estimatedPrice===-1) ? (<div className="cards-list">
            {editRecipeWindowProps.recipes?.map((recipe)=>(

                    <div key={recipe.id} className="card" onClick={() => handleChange(recipe)}>
                        <div className="card_image"> <img src={recipe.imgUrl} alt={recipe.name} /> </div>
                        <div className="card_title title-white">
                            <p>{recipe.name}</p>
                        </div>
                    </div>

                )//End of thingy

            )}


        </div>)
        :
        <form  className="all-cont" onSubmit={handleFormEvent}>

            <div className="new-recipe-cont">
                <div className="form-cont">
                    <div className='seperate-title'>



                        <div className="label-input-cont">

                            <label>Recipe Name</label>
                            <input {...register("name")}
                                   type="text"
                                   required
                                   defaultValue={selectedRecipe.name}
                            />
                        </div>




                    </div>


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
            <button className='main-button' type='submit' >Done</button>
        </form> ) :<EditRecipeContext.Provider value={selectedRecipe}>
        <EditIngredients id={selectedRecipe.id}/>
    </EditRecipeContext.Provider>
//END OF FORM ELEMENT !!!!}

}
()





</>
)

}