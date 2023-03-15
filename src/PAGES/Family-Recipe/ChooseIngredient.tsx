import React, {FormEvent, useContext, useEffect, useState} from "react";
import IngredientTypeCard from "../../GENERAL-COMPONENTS/IngredientTypeCard";
import {getAllIngredientsBySearch, getAllIngredientTypes} from '../../SERVICES/IngredientService';
import SearchIcon from '@mui/icons-material/Search';
import MoneyIcon from '@mui/icons-material/MonetizationOn';
import './ChooseIngredientsStyles.css'
import {IngredientType} from "../../MODELS/ENUMS/IngredientType";
import {Ingredient} from "../../MODELS/Ingredient";
import {SubmitHandler, useForm} from "react-hook-form";
import IngredientTypeList from "../../GENERAL-COMPONENTS/IngredientComponents/IngredientTypeList";
import IngredientCard from "../../GENERAL-COMPONENTS/IngredientComponents/IngredientCard";
import Recipe from "../../MODELS/Recipe";
import {createRecipe} from "../../SERVICES/RecipeService";
import {NewRecipeValuesContext} from "../../SERVICES/NewRecipeContext";
import {FamilyContext} from "../../Provider/FamilyProvider";
import {FamilyRole} from "../../MODELS/ENUMS/FamilyRole";


export default function ChooseIngredients() {
    let defaultRecipe: Recipe = {
        requestCreator: {
            id :0 ,
            isActive:true,
            name:"",
            favoriteRecipes:[],
            imgUrl:"",
            familyRole:FamilyRole.regular
        },
        id: 0,
        name: "",
        estimatedPrice: 0,
        ingredients: []
    }
    const recipe: Recipe = useContext(NewRecipeValuesContext);
    const [recipeFromParent, setRecipeFromParent] = useState<Recipe>(recipe);
    let familyId: number = useContext(FamilyContext).id
    useEffect(() => {
        setRecipeFromParent(recipe)
    }, [recipe])

    useEffect(() => {


    }, [recipeFromParent])

    //THE SELECTED INGREDIENTS TO MOVE TO CHOOSE INGREDIENT

    const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);

//ADDING THE USER IS FINISHED
// const [userIsFinished, setuserIsFinished] = useState<boolean>(false); 
    const [userIsFinished, setuserIsFinished] = useState(false);


    ///CALLING INGREDIENT ITEMS BY SEARCH FEATURE
    const [searchQuery, setsearchQuery] = useState<string>('c');
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    //ADDING INGREDIENT FROM THE CHILD ELEMENT 


    const handleAddingIngredient = (ingredient: Ingredient, finished: boolean) => {
        setSelectedIngredients([...selectedIngredients, ingredient])
    }


    useEffect(() => {
        (async () => {
            if (searchQuery.length>2){
                const allIngredientsBySearch = await getAllIngredientsBySearch(searchQuery);
                setIngredients(allIngredientsBySearch);
            }

        })();
    }, [searchQuery]);

    function sendUserToDB() {
        recipeFromParent.ingredients = selectedIngredients;
        createRecipe(recipeFromParent, familyId);
        window.location.href = '/my-family-recipes';
    }


    ///THE FORM SEARCH FEATURE
    interface SearchValue {
        value: string
    }

    const {register, handleSubmit} = useForm<SearchValue>();
    const onSave: SubmitHandler<SearchValue> = async (formValues) => {
        setIngredients(await getAllIngredientsBySearch(formValues.value));
    }


    function preventDefaultAndSetIngredientSearchQuery(event: FormEvent, value: string) {
        event.preventDefault();
    }

    const handleFormEvent = (event: FormEvent) => {
        event.preventDefault();
        handleSubmit(onSave)(event);
    }
    return (


        <>
            <div className="search-wrapper">
                <div className="search-container">
                    <form onChange={handleFormEvent}>
                        <input type="text" required={true} {...register("value")} className="search-input" placeholder="Search"/>

                    </form>

                </div>
            </div>
            <div className="filter-buttons-cont">
                <button className="search-button">Filter</button>
                <button className="search-button">Sort</button>
                <button className="search-button" onClick={() => sendUserToDB()}>DONE</button>

            </div>


            {ingredients.map((ing) => (<><IngredientCard ingredient={ing}
                                                         onClick={() => handleAddingIngredient(ing, userIsFinished)}/></>))}

        </>


    )

}