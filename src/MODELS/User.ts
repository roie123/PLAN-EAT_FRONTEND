import Recipe from "./Recipe";
import {FamilyRole} from "./ENUMS/FamilyRole";

export interface User{
id :number ,
isActive:boolean,
name:string,
favoriteRecipes:Recipe[],
imgUrl?:string,
    familyRole:FamilyRole;
}

/**
 *   private Long id;
    private boolean isActive= true;
    private String name;



    @OneToMany(cascade = {CascadeType.PERSIST,CascadeType.MERGE})
    private List<Recipe> favoriteRecipes=new ArrayList<>();



@JsonIgnore
    @ManyToOne(cascade = {CascadeType.MERGE} ,fetch = FetchType.EAGER)
    private Family family;
 */