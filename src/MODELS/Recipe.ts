import { Ingredient } from "./Ingredient";


export default interface Recipe{
    id:number,
    imgUrl?:string,
    name:string ,
    estimatedPrice:number,
    ingredients: Ingredient[],
    
}

/**
 *   private Long id;
    private String name;
    private boolean isRecommended = false;
    private double estimatedPrice;
    private boolean isActive = true;
    private String imgUrl;

    @ManyToMany(cascade = {CascadeType.MERGE,CascadeType.PERSIST})
    private List<Ingredient> ingredients = new ArrayList<>();

    @ManyToOne(cascade = {CascadeType.MERGE,CascadeType.PERSIST})
    private Meal meal;

    @JsonIgnore
    @ManyToOne
    private Family family;

 */