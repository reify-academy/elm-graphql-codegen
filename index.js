"use strict";
// https://the-guild.dev/blog/graphql-code-generator
// https://graphql-code-generator.com/docs/custom-codegen/write-your-plugin
// https://github.com/dillonkearns/elm-graphql
exports.__esModule = true;
exports.plugin = function (schema, documents, config) {
    return documents
        .map(function (doc) {
        if (doc.document.definitions) {
            var docsNames = doc.document.definitions.map(function (def) { return def; });
            var opDefinition = doc.document
                .definitions[0];
            var output = opDefinition.name + " " + opDefinition.operation + " " + JSON.stringify(opDefinition.selectionSet);
            return "\n        selection : SelectionSet Post StarWars.Object.Human\n        selection =\n            SelectionSet.map2 HumanData\n                Human.name\n                Human.homePlanet\n        ";
        }
        return "Empty file";
    })
        .join("\n");
};
