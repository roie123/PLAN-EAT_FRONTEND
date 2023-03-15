import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import Recipe from '../../MODELS/Recipe';
import {Ingredient} from '../../MODELS/Ingredient';
import ChooseIngredients from './ChooseIngredient';
import {NewRecipeValuesContext} from '../../SERVICES/NewRecipeContext';
import {FamilyRole} from "../../MODELS/ENUMS/FamilyRole";

interface AddNewRecipeProp {
    selectedRecipe: Recipe;

    familyId: number,
    familyName?: string
}


export default function AddNewRecipe(recipe: AddNewRecipeProp) {
    const ing: Ingredient = {
        name: '',
        price: -1,
        id: 0

    }
    // let defaultRecipe:Recipe ={
    //   id:0,
    //   imgUrl:'cxvz',
    //   estimatedPrice:0,
    //   ingredients:[],
    //   name:"deaf"
    //
    // }
    const [defaultRecipe, setDefaultRecipe] = useState<Recipe>({
        requestCreator: {
            id :0 ,
            isActive:true,
            name:"",
            favoriteRecipes:[],
            imgUrl:"",
            familyRole:FamilyRole.regular
        },
        id: 0,
        imgUrl: 'NO',
        estimatedPrice: 0,
        ingredients: [],
        name: "NO",
        timeToMake: 0
    })


    ///DISPLAY SELECTION
    const [displaySelection, setdisplaySelection] = useState<number>(1);
    useEffect(() => {
    }, [displaySelection]);
    //THE INGREDIENTS HOOK AND LOGIC
    const [ingredients, setIngridients] = useState<Ingredient[]>([])
    const handleAddIngredient = (ingredients: Ingredient[], finished: boolean) => {
        setIngridients(ingredients);
    }
    const [showingChoosingSelectionMethod, setshowingChoosingSelectionMethod] = useState<boolean>(false);
    ///END OF INGREDIENT LOGIC

    const {register, handleSubmit} = useForm<Recipe>();
    const [selectedImg, setSelectedImage] = useState<string>('https://w7.pngwing.com/pngs/269/105/png-transparent-cuideo-dish-computer-icons-menu-restaurant-dish-miscellaneous-food-text.png');


    useEffect(() => {
    }, [defaultRecipe]);

    async function scrollToChild(values: Recipe) {

        const recipeToDeliver: Recipe = {
            requestCreator: {
                id :0 ,
                isActive:true,
                name:"",
                favoriteRecipes:[],
                imgUrl:"",
                familyRole:FamilyRole.regular
            },
            timeToMake: 0,
            estimatedPrice: 0, id: 0, imgUrl: selectedImg, ingredients: [], name: values.name

        }

        const child = document.getElementById('choose-ingredients-comp');
        setDefaultRecipe(recipeToDeliver);

        await setdisplaySelection(2);
        // @ts-ignore
        child.scrollIntoView({behavior: 'smooth'})

    }

    //
    const [recipeImg, setRecipeImg] = useState<string[]>(
        [
            'https://i1.wp.com/www.oursweetadventures.com/wp-content/uploads/2019/10/Spaghetti-Carbonara-2.jpg?resize=720%2C720&ssl=1',
            'https://alexandracooks.com/wp-content/uploads/2014/11/15807880225_09d7bd37e6_o-1-550x600.jpg',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSXyS1Dx7eIiUCD1ZGt4PqK6UcezuIlayJTg&usqp=CAU',
            'https://www.bestoflasvegas.com/custom/domain_1/image_files/sitemgr_photo_20354.jpg'


        ]
    );

    function selecImg(value: string) {
        setSelectedImage((...prev) => value);

    }


    return (
        <>
            {(displaySelection === 1) ? (
                <form className="all-cont" onSubmit={handleSubmit(scrollToChild)}>


                    <div className="new-recipe-cont">
                        <h4 className='new-recipe-title'>Let's Add Some Of The <span>{recipe.familyName}</span> Family
                            Recipes !</h4>
                        <div className="form-cont">
                            <div className='seperate-title'>


                                <div className='label-input-cont'>
                                    <label>Recipe Name</label>
                                    <input {...register("name")} type="text" required/>
                                </div>


                            </div>


                            <div className='seperate-title'>
                                <h4 className='recipe-pic-title'>Select An Image Or Upload Your Own </h4>

                                <div className='img-select-cont'>

                                    {recipeImg.map((img) => (
                                        <>
                                            <div key={img} className="img-cont">
                                                <img src={img} className='img-select'
                                                     onClick={() => setSelectedImage((...prev) => img)}
                                                     alt="image of recipe"/>
                                            </div>


                                        </>
                                    ))
                                    }
                                </div>

                            </div>


                        </div>

                    </div>
                    <button className='main-button' type='submit'>Choose Ingredients</button>
                    {(showingChoosingSelectionMethod) ? (

                        <>
                            <div className="ingredient-selection-method-buttons-cont">
                                <button type='button' className='main-button'>Let Us Help</button>
                                <button type='button' className='main-button'>Select Items</button>
                            </div>
                        </>
                    ) : null}


                </form>) : (null)}
            {/* END OF THE DISPLAY SELECTION 1 */}
            {(displaySelection === 2) ? (<NewRecipeValuesContext.Provider value={defaultRecipe}>
                <div id={'choose-ingredients-comp'}>
                    <ChooseIngredients/>

                </div>

            </NewRecipeValuesContext.Provider>) : (null)}


        </>

    )
}