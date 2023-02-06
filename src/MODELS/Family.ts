import { Day } from "./Day";
import Recipe from "./Recipe";
import { User } from "./User";
import {Cart} from "./Cart";

export interface Family{
    id:number,
    name?:string,
    isActive?:boolean,
    familyMembers:User[],
    dayList ?: Day[],
    favoriteRecipes :Recipe[],
    email ?:string,
    password?:string
    imgUrl?:string,
    cart:Cart

}

/*
 private Long id;

    private String name;
    private boolean isActive =true;

    @OneToMany(cascade = {CascadeType.MERGE , CascadeType.PERSIST} ,fetch = FetchType.EAGER, mappedBy = "family")
    private List<User> familyMembers = new ArrayList<>();


    @OneToMany(cascade = {CascadeType.MERGE ,CascadeType.PERSIST}, fetch = FetchType.EAGER, mappedBy = "family")
    private List<Day> dayList= new ArrayList<>();

    @OneToMany(mappedBy = "family" ,cascade = {CascadeType.MERGE ,CascadeType.PERSIST} ,fetch = FetchType.EAGER)
    private List<Recipe> favoriteRecipes= new ArrayList<>();

    private String email;
    private String password;


*/