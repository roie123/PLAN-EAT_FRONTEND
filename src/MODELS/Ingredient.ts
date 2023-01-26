import { PriceCategory } from "./ENUMS/PriceCategory";

export interface Ingredient{
id ?:number ,
name?:string,
price ?:number ,
priceCategory?:PriceCategory

}


/**\
 *   private Long id;


    private String name;

    private double price;
    private boolean isActive=true;


    @ManyToMany(cascade = {CascadeType.PERSIST,CascadeType.MERGE})
    @ToString.Exclude
    private List<Recipe> recipeList= new ArrayList<>();
 */