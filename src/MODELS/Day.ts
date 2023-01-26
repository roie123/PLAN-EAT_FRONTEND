import { Meal } from "./Meal";

export interface Day{
id:number,
dayOfWeek:string,
isActive:boolean,
localDate :Date,
mealList:Meal[],



}


/*
   private Long id;

    private DayOfWeek dayOfWeek;

    private boolean isActive = true;

    private LocalDate localDate;

    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE} ,fetch = FetchType.EAGER)
    private List<Meal> mealList = new ArrayList<>();

    @ManyToOne(cascade = CascadeType.MERGE)
    @JsonIgnore
    private Family family;


*/