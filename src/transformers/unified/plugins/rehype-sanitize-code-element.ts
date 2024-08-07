import type { Root } from "hast"
import { stringifyEntities } from "stringify-entities"
import type { Transformer } from "unified"
import { visit } from "unist-util-visit"

// Default values used in `"stringify-entities"` package.
const HTML_DANGEROUS_CHARACTERS = ['"', "&", "'", "<", ">", "`"] as const

// Svelte syntax characters.
const SVELTE_DANGEROUS_CHARACTERS = ["{", "}"] as const

/*
This code resolves an issue with the Rehype Stringify plugin. 
When trying to sanitize custom characters within a code element, 
the plugin mistakenly attempts to sanitize them again, leading to unexpected outcomes. 

To fix this:

1. We convert the node types from `text` to `raw`, bypassing the plugin's sanitation process.
2. Then, we use the same library that the plugin uses to sanitize both its default characters 
   and our custom characters related to Svelte syntax.
*/
export default (): Transformer<Root> => {
    return (tree) => {
        visit(tree, "element", (node) => {
            if (node.tagName !== "code") return

            visit(node, "text", (textNode, textIndex, textParent) => {
                if (!textParent || textIndex === undefined) return

                textParent.children.splice(textIndex, 1, {
                    type: "raw",
                    value: stringifyEntities(textNode.value, {
                        subset: [
                            ...HTML_DANGEROUS_CHARACTERS,
                            ...SVELTE_DANGEROUS_CHARACTERS,
                        ],
                    }),
                })
            })
        })
    }
}
