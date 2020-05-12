// https://the-guild.dev/blog/graphql-code-generator
// https://graphql-code-generator.com/docs/custom-codegen/write-your-plugin
// https://github.com/dillonkearns/elm-graphql

import { Types, PluginFunction } from "@graphql-codegen/plugin-helpers";
import { GraphQLSchema, OperationDefinitionNode, FieldNode } from "graphql";
import {
  RawTypesConfig,
  AvoidOptionalsConfig,
} from "@graphql-codegen/visitor-plugin-common";

export interface TypeScriptPluginConfig extends RawTypesConfig {}

export const plugin: PluginFunction<
  TypeScriptPluginConfig,
  Types.PluginOutput
> = (
  schema: GraphQLSchema,
  documents: Types.DocumentFile[],
  config: TypeScriptPluginConfig
) =>
  documents
    .map((doc) => {
      if (doc.document.definitions) {
        const docsNames = doc.document.definitions.map((def) => def);
        const opDefinition = doc.document
          .definitions[0] as OperationDefinitionNode;
        const output = `${opDefinition.name} ${
          opDefinition.operation
        } ${JSON.stringify(opDefinition.selectionSet)}`;
        const querySelectionSet = opDefinition.selectionSet
          .selections[0] as FieldNode;
        const selectionSet = querySelectionSet.selectionSet.selections
          .map((x: FieldNode) => `HumanSchema.${x.name.value}`)
          .join("\n        ");
        return `
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
        ${selectionSet}
                    `;
      }
      return "Empty file";
    })
    .join("\n");
