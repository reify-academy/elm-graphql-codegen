// https://the-guild.dev/blog/graphql-code-generator
// https://graphql-code-generator.com/docs/custom-codegen/write-your-plugin
// https://github.com/dillonkearns/elm-graphql

import { Types, PluginFunction } from "@graphql-codegen/plugin-helpers";
import { GraphQLSchema, OperationDefinitionNode } from "graphql";
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
        return `
        selection : SelectionSet Post StarWars.Object.Human
        selection =
            SelectionSet.map2 HumanData
                Human.name
                Human.homePlanet
        `;
      }
      return "Empty file";
    })
    .join("\n");
