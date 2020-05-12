module Main exposing (HumanData, humanSelection, query)

import Graphql.Operation exposing (RootQuery)
import Graphql.SelectionSet as SelectionSet exposing (SelectionSet)
import StarWars.Object.Human as HumanSchema
import StarWars.Query as Query
import StarWars.Scalar exposing (Id(..))


query : SelectionSet (Maybe HumanData) RootQuery
query =
    Query.human { id = Id "1001" } humanSelection


type alias HumanData =
    { name : String
    , homePlanet : Maybe String
    }


humanSelection : SelectionSet HumanData HumanSchema
humanSelection =
    SelectionSet.map2 HumanData
        HumanSchema.name
        HumanSchema.homePlanet
