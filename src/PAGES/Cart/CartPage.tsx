import React, {useEffect, useState} from "react";
import './CartStyle.css'
import {Family} from "../../MODELS/Family";
import {Cart} from "../../MODELS/Cart";
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {Ingredient} from "../../MODELS/Ingredient";

interface CartPageProps{
    family:Family
}
interface ItemAndNumber{
    ingredient:Ingredient,
    value:number
}

export default function CartPage(props:CartPageProps){

    const defaultCart:Cart = ((props.family.cart.items.length)>0) ? props.family.cart : new Cart();
    /**
     * This state stores the family's cart
     */
    const [cart,setcart] =useState<Cart>(()=>defaultCart);

    /**
     * This state stores the displayed items, the reason for separating the arrays is to have logic between
     * them
     */
    const [displayedCart,setDisplayedCart] =useState<ItemAndNumber[]>([]);

    /**
     * This function i responsible for the displaying of the cart items, it takes the array and creates a
     * new one to display the item only once with a multiplier
     */
    useEffect(()=>{
        const temp : ItemAndNumber[]=[];
        defaultCart.items.map((item) => {
            if (temp.findIndex((shit)=> shit.ingredient.name===item.name)>-1){
                let indexOfEvilItem:number=0;
                if (temp.findIndex((shit)=> shit.ingredient.name===item.name)!==undefined){
                    indexOfEvilItem = temp.findIndex((shit)=> shit.ingredient.name===item.name) ;

                }
                // @ts-ignore
                const duplication:number =temp.at(indexOfEvilItem).value;

                    temp.splice(indexOfEvilItem,1);
               temp.push({ingredient:item , value:duplication+1})
            }else {
                temp.push({ingredient:item , value:1} as ItemAndNumber)
                    console.log(temp);

            }

        })//end of defaultCart map


        setDisplayedCart(temp);
    },[cart]);


    /**
     * This useEffect wiil keep the cart updated when there is a change in the family's Cart
     */
    useEffect(()=>{
        setcart(defaultCart);
    },[defaultCart]);

    return(

        <>
        <div className="cart-cont">
            <div className="title-cont">
                <h4>Hi ! </h4>
                <h4>This is all you need for the next week</h4>
            </div>


            <div className="item-card-cont">
                {displayedCart.map((item)=>(
                    <div className="item-card">
                        <div className="item-img-cont">
                            <img src={item.ingredient.imgUrl} alt="show a pic of an item"/>
                        </div>
                        <div className="item-desc">
                            <p>{item.ingredient.name}</p>
                            <div className="item-buttons">
                                <p>{item.value}</p>
                                <AddIcon sx={{fontSize:'2rem'}}/>
                                <RemoveCircleOutlineIcon sx={{fontSize:'2rem'}} />
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
        </>
    )
}