import react, {FormEvent, useContext, useEffect, useState} from 'react'
import Recipe from "../../MODELS/Recipe";
import {NewRecipeValuesContext} from "../../SERVICES/NewRecipeContext";
import {Ingredient} from "../../MODELS/Ingredient";
import {getAllIngredientsBySearch} from "../../SERVICES/IngredientService";
import {createRecipe, updateRecipe} from "../../SERVICES/RecipeService";
import {SubmitHandler, useForm} from "react-hook-form";
import IngredientCard from "../../GENERAL-COMPONENTS/IngredientComponents/IngredientCard";
import IngredientTypeList from "../../GENERAL-COMPONENTS/IngredientComponents/IngredientTypeList";
import React from "react";
import {EditRecipeContext} from "../../SERVICES/EditRecipeContext";

interface EditIngredientsProps{
    id:number;
}

export default  function EditIngredients (props:EditIngredientsProps) {


    let defaultRecipe: Recipe = {
        id: 0,
        name: "",
        estimatedPrice: 0,
        ingredients: []
    }
    const recipe: Recipe = useContext(EditRecipeContext);
    const [recipeFromParent, setRecipeFromParent] = useState<Recipe>(recipe);

    useEffect(() => {
        setRecipeFromParent(recipe);
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
            const allIngredientsBySearch = await getAllIngredientsBySearch(searchQuery);
            setIngredients(allIngredientsBySearch);
        })();
    }, [searchQuery]);

    function sendRecipeToBeUpdated() {
        recipeFromParent.id = props.id;
        recipeFromParent.ingredients = selectedIngredients;
        console.log(recipeFromParent);
        updateRecipe(recipeFromParent.id, recipeFromParent);
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
                        <input type="text" {...register("value")} className="search-input" placeholder="Search"/>

                    </form>

                </div>
            </div>
            <div className="filter-buttons-cont">
                <button className="search-button">Filter</button>
                <button className="search-button">Sort</button>
                <button className="search-button" onClick={() => sendRecipeToBeUpdated()}>DONE</button>

            </div>


            {ingredients.map((ing) => (<><IngredientCard ingredient={ing}
                                                         onClick={() => handleAddingIngredient(ing, userIsFinished)}/></>))}
            <IngredientTypeList/>

        </>


    )
}