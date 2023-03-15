import Recipe from "./Recipe";
import {MealAddOnRequestDTO} from "./MealAddOnRequestDTO";

export interface Meal{
id:number,
timeToMakeInMinutes :number,
numberOfEaters:number,
isActive:boolean,
mealTime:string,
approvedRecipes:Recipe[],
    pendingRecipes : Recipe[],
    mealAddOnRequestDTOList:MealAddOnRequestDTO[]
}


/*
  private Long id;

    private int timeToMakeInMinutes;
    private int numberOfEaters;
    private boolean isActive= true;
    @Enumerated(EnumType.STRING)
    private MealTime mealTime;
    @OneToMany(cascade = {CascadeType.PERSIST,CascadeType.MERGE})
    private List<Recipe> recipeList= new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

@ManyToOne
@JsonIgnore
private Family family;

*/