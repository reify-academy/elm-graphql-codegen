query : SelectionSet (Maybe Human) RootQuery
query =
    Query.human { id = Id "1001" } humanSelection

type alias HumanData =
    { name : String
    , homePlanet : Maybe String
    }


humanSelection : SelectionSet Human StarWars.Object.Human
humanSelection =
    SelectionSet.map2 HumanData
        Human.name
        Human.homePlanet