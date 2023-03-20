import React, {useContext, useEffect, useState} from "react";
import './CartStyle.css'
import {Family} from "../../MODELS/Family";
import {Cart} from "../../MODELS/Cart";
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {Ingredient} from "../../MODELS/Ingredient";
import LoopIcon from '@mui/icons-material/Loop';
import {delay} from "@reduxjs/toolkit/dist/utils";
import {generateCart} from "../../SERVICES/FamilyService";
import {FamilyContext} from "../../Provider/FamilyProvider";
import {getCartByFamily, updateCart} from "../../SERVICES/CartService";
import Dialog from '@mui/material/Dialog';
import {Button, Typography} from "@mui/material";
import store from "../../Redux/store";
import {FamilyActionTypes} from "../../Redux/reducers/actionTypes/FamilyActionTypes";
import StoreComponent from "../STORE/StoreComponent";

interface CartPageProps {
    family: Family
}

/**
 * This interface is needed to show the items as a multiplier with no duplicates
 */
interface ItemAndNumber {
    ingredient: Ingredient,
    value: number
}

export default function CartPage(props: CartPageProps) {

    let defaultCart: Cart = (store.getState().family.cart !== null && (store.getState().family.cart.items.length) > 0) ? store.getState().family.cart : new Cart();
    const familyId:number = useContext(FamilyContext).id;

    /**
     * This state will controll the displayed component
     */
    const [displaySelection,setdisplaySelection] =useState<number>(0);
    
    /**
     * This state stores the family's cart
     */
    const [cart, setcart] = useState<Cart>(() => defaultCart);
    const [noCouponsFound, setnoCouponsFound] = useState<boolean>(false);

    /**
     * This state stores the displayed items, the reason for separating the arrays is to have logic between
     * them
     */
    const [displayedCart, setDisplayedCart] = useState<ItemAndNumber[]>([]);

    /**
     * This state is for the popUp selection
     * 0 is default for no popUp
     * 1 is for SaveCart Accept
     * 2 is for ClearCart Accept
     */
    const [popUpSelection,setpopUpSelection] =useState<number>(0);



    /**
     * This function i responsible for the displaying of the cart items, it takes the array and creates a
     * new one to display the item only once with a multiplier
     */
    useEffect(() => {
        const temp: ItemAndNumber[] = [];
        defaultCart = cart.items.length===0 ? defaultCart : cart;
        defaultCart.items.map((item) => {
            if (temp.findIndex((shit) => shit.ingredient.name === item.name) > -1) {
                let indexOfEvilItem: number = 0;
                if (temp.findIndex((shit) => shit.ingredient.name === item.name) !== undefined) {
                    indexOfEvilItem = temp.findIndex((shit) => shit.ingredient.name === item.name);

                }
                // @ts-ignore
                const duplication: number = temp.at(indexOfEvilItem).value;

                temp.splice(indexOfEvilItem, 1);
                temp.push({ingredient: item, value: duplication + 1})
            } else {
                temp.push({ingredient: item, value: 1} as ItemAndNumber)

            }

        })//end of defaultCart map

        // @ts-ignore
        temp.sort((a, b) => a.ingredient.name?.localeCompare(b.ingredient.name));

        setDisplayedCart(temp);
    }, [cart]);

    function handleClickOnAddButton(ingredient: Ingredient) {
        let tempCart: Cart = new Cart();
        tempCart.items = [...cart.items];
        tempCart.items.push(ingredient);
        tempCart.id=cart.id;
    setcart(tempCart);

    }

    function handleClickOnMinusButton(ingredient: Ingredient) {
        let tempCart: Cart = new Cart();
        tempCart.items = [...cart.items];
        let indexOfToBeRemovedItem= cart.items.indexOf(ingredient);
        tempCart.items.splice(indexOfToBeRemovedItem,1);

        setcart(tempCart);

    }


    /**
     * This useEffect will keep the cart updated when there is a change in the family's Cart
     */
    useEffect(() => {
        setcart(defaultCart);
        if (defaultCart.items.length === 0) {
            setTimeout(() => {
                setnoCouponsFound(true);

            }, 2000)
        }
    }, [defaultCart.items.length !== 0]);

console.log(cart);
    /**
     * This state stores the amount of weeks to resupply the user with
     */
    const [numberOfWeeks, setnumberOfWeeks] = useState<number>(1);

    /**
     * This states stores the error messages for the restocking logic
     */
    const [restockErrorMessage, setrestockErrorMessage] = useState<string>('');

    /**
     * This function handles the click on the add button in the week number restock section,
     * it adds to the week count of the user
     */
    function handleAddButtonInRestock() {
        if (numberOfWeeks === 5) {
            setrestockErrorMessage("Cannot Restock For More Then 5 Weeks")
            return;
        }
        setnumberOfWeeks((prevState) => prevState + 1);

    }

    /**
     * This function handles the click on the Minus button in the week number restock section,
     * it decimates ??  to the week count of the user
     */
    function handleMinusButtonInRestock() {
        if (numberOfWeeks === 1) {
            setrestockErrorMessage("Cannot Restock For Less Then 1 Week")
            return;
        }
        setnumberOfWeeks((prevState) => prevState - 1);

    }

    /**
     * This function handles the Generate Cart button, it creates a new Cart in the DB from the items the user needs and brings them back here
     */
    async  function handleGenerateCartButton(){

        let cartFromDB:Cart= await generateCart(familyId);
        let family:Family = {...store.getState().family};
        family.cart=cartFromDB;
        store.dispatch({type:FamilyActionTypes.SET_FAMILY , payload:family});
        setcart(cartFromDB);
    }

async function handleSaveCarButton(){
    setpopUpSelection(1);


}
    async function handleSaveCart(){
        await setcart(await updateCart(cart,cart.id));
        let family:Family= {...store.getState().family}
        family.cart=cart;
        store.dispatch({type:FamilyActionTypes.SET_FAMILY , payload:family});
        setpopUpSelection(0);


    }




function handleClearCartButton(){
setpopUpSelection(2);
}
   async function handleClearCart(){
        let  cart1  = new Cart();
        cart1.id=cart.id
       // await updateCart(cart1,cart1.id);
     await updateCart(cart1,cart.id)
       let family:Family= {...store.getState().family};
        family.cart=cart1;
       store.dispatch({type:FamilyActionTypes.SET_FAMILY , payload:family});


       await   setcart(cart1);

       setpopUpSelection(0);

    }

    return (
    <>
        {(displaySelection === 1) ? (<StoreComponent/>) : null}

        {(displaySelection === 0) ? (<>
            <div className="cart-cont">
                <div className="title-cont">
                    <h4>Hi ! </h4>
                    <h4>This is all you need for the next week</h4>

                </div>


                <div className="item-card-cont">
                    {displayedCart.length === 0 ? (
                        //This will be displayed When there are no Items / The list is empty
                        noCouponsFound ? (
                                <div className={"no-items-cont"}>

                                    <p>Sorry , we haven't been able to find any Item in your Cart </p>
                                    <div className={"no-items-lower"}>
                                        <button onClick={() => handleGenerateCartButton()}>Generate My Cart</button>
                                        <p id={"desc-line"}>*Generating your cart will calculate all the ingredients you
                                            will need in this week</p>


                                    </div>
                                </div>

                            )
                            :
                            <div className={"loading-loop-cont"}>
                                <LoopIcon sx={{
                                    animationName: "loading-loop-ani"
                                    , animationFillMode: 'forwards',
                                    animationDuration: '1s',
                                    animationIterationCount: 'infinite',
                                    fontSize: '6rem'
                                }}/>
                            </div>


                    ) : (

                        displayedCart.map((item) => (
                            <div key={item.ingredient.id! * Math.random()} className="item-card">
                                <div className="upper-cont">
                                    <div className="item-img-cont">
                                        <img src={item.ingredient.imgUrl} alt="shows a pic of an item"/>
                                    </div>
                                    <div className="item-desc">
                                        <p>{item.ingredient.name}</p>
                                        <div className="item-buttons">
                                            <AddIcon onClick={() => handleClickOnAddButton(item.ingredient)}
                                                     sx={{fontSize: '2rem'}}/>
                                            <RemoveCircleOutlineIcon
                                                onClick={() => handleClickOnMinusButton(item.ingredient)}
                                                sx={{fontSize: '2rem'}}/>
                                        </div>
                                    </div>

                                </div>
                                <div className="lower-cont">
                                    <p>{item.ingredient.ingredientType}</p>
                                    <p>{item.ingredient.priceCategory}</p>
                                    <p>{item.value}X{item.ingredient.price?.toPrecision(3)} Per unit</p>
                                </div>

                            </div>
                        ))


                    )}

                </div>
                <div className={"cart-action-cont"}>
                    <button className={"restock-button"} onClick={() => handleSaveCarButton()}>Save</button>
                    <button className={"restock-button"} onClick={() => handleClearCartButton()}>Clear</button>
                </div>
                <button className={"restock-button"} onClick={() => setdisplaySelection(1)}>Add From Store</button>

                <div className="restock-cont">
                    <div className="week-number">
                        <p>Restock For <span>{numberOfWeeks}</span> Weeks</p>
                        <div className="restock-butt-cont">
                            <AddIcon onClick={() => handleAddButtonInRestock()} sx={{fontSize: '2rem'}}/>
                            <RemoveCircleOutlineIcon onClick={() => handleMinusButtonInRestock()}
                                                     sx={{fontSize: '2rem'}}/>
                        </div>

                    </div>
                    <button className='restock-button'>RESTOCK</button>

                </div>
                <p className={'restock-error'}>{restockErrorMessage}</p>

            </div>
            <Dialog open={popUpSelection === 2} sx={{padding: "1rem"}}>
                <Typography sx={
                    {
                        textAlign: "center",
                        padding: "1rem"
                    }
                } component="div">
                    Are You Sure You Want To Clear Your Cart ?
                </Typography>
                <br/>
                <Button onClick={() => handleClearCart()} variant="outlined">
                    Yes
                </Button>
                <Button onClick={() => setpopUpSelection(0)} variant="outlined">
                    No
                </Button>
            </Dialog>

            <Dialog open={popUpSelection === 1} sx={{padding: "1rem"}}>
                <Typography sx={
                    {
                        textAlign: "center",
                        padding: "1rem"
                    }
                } component="div">
                    Are You Sure You Want To Save Your Cart ?
                </Typography>
                <br/>
                <Button onClick={() => handleSaveCart()} variant="outlined">
                    Yes
                </Button>
                <Button onClick={() => setpopUpSelection(0)} variant="outlined">
                    No
                </Button>
            </Dialog>
        </>) : null}
    </>

    )
}