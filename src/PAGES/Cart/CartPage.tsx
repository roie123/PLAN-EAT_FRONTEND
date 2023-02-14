import React, {useEffect, useState} from "react";
import './CartStyle.css'
import {Family} from "../../MODELS/Family";
import {Cart} from "../../MODELS/Cart";
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {Ingredient} from "../../MODELS/Ingredient";

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

    const defaultCart: Cart = ((props.family.cart.items.length) > 0) ? props.family.cart : new Cart();
    /**
     * This state stores the family's cart
     */
    const [cart, setcart] = useState<Cart>(() => defaultCart);

    /**
     * This state stores the displayed items, the reason for separating the arrays is to have logic between
     * them
     */
    const [displayedCart, setDisplayedCart] = useState<ItemAndNumber[]>([]);

    /**
     * This function i responsible for the displaying of the cart items, it takes the array and creates a
     * new one to display the item only once with a multiplier
     */
    useEffect(() => {
        const temp: ItemAndNumber[] = [];
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
                console.log(temp);

            }

        })//end of defaultCart map


        setDisplayedCart(temp);
    }, [cart]);

    function handleClickOnAddButton(ingredient: Ingredient) {
        console.log("ss");
        const tempCart: Cart = cart;
        tempCart.items.concat(ingredient);
    }

    console.log(cart);


    /**
     * This useEffect will keep the cart updated when there is a change in the family's Cart
     */
    useEffect(() => {
        setcart(defaultCart);
    }, [defaultCart]);


    /**
     * This state stores the amount of weeks to resupply the user with
     */
    const [numberOfWeeks,setnumberOfWeeks] =useState<number>(1);

    /**
     * This states stores the error messages for the restocking logic
     */
    const [restockErrorMessage,setrestockErrorMessage] =useState<string>('');
    
    /**
     * This function handles the click on the add button in the week number restock section,
     * it adds to the week count of the user
     */
    function handleAddButtonInRestock() {
        if (numberOfWeeks===5){
            setrestockErrorMessage("Cannot Restock For More Then 5 Weeks")
            return;
        }
        setnumberOfWeeks((prevState) => prevState+1);

    }

    /**
     * This function handles the click on the Minus button in the week number restock section,
     * it decimates ??  to the week count of the user
     */
    function handleMinusButtonInRestock() {
        if (numberOfWeeks===1){
    setrestockErrorMessage("Cannot Restock For Less Then 1 Week")
            return;
        }
        setnumberOfWeeks((prevState) => prevState-1);

    }


    return (

        <>
            <div className="cart-cont">
                <div className="title-cont">
                    <h4>Hi ! </h4>
                    <h4>This is all you need for the next week</h4>
                </div>


                <div className="item-card-cont">
                    {displayedCart.map((item) => (
                        <div className="item-card">
                            <div className="upper-cont">
                                <div className="item-img-cont">
                                    <img src={item.ingredient.imgUrl} alt="show a pic of an item"/>
                                </div>
                                <div className="item-desc">
                                    <p>{item.ingredient.name}</p>
                                    <div className="item-buttons">
                                        <AddIcon onClick={() => handleClickOnAddButton(item.ingredient)}
                                                 sx={{fontSize: '2rem'}}/>
                                        <RemoveCircleOutlineIcon sx={{fontSize: '2rem'}}/>
                                    </div>
                                </div>

                            </div>
                            <div className="lower-cont">
                                <p>{item.ingredient.ingredientType}</p>
                                <p>{item.ingredient.priceCategory}</p>
                                <p>{item.value}X{item.ingredient.price?.toPrecision(3)} Per unit</p>
                            </div>

                        </div>
                    ))}

                </div>
<div className="restock-cont">
    <div className="week-number">
        <p>Restock For <span>{numberOfWeeks}</span> Weeks</p>
        <div className="restock-butt-cont">
            <AddIcon onClick={()=> handleAddButtonInRestock()} sx={{fontSize:'2rem'}} />
            <RemoveCircleOutlineIcon onClick={()=> handleMinusButtonInRestock()} sx={{fontSize:'2rem'}} />
        </div>

        </div>
    <button className='restock-button'>RESTOCK</button>
</div>
                <p className={'restock-error'}>{restockErrorMessage}</p>

            </div>
        </>
    )
}