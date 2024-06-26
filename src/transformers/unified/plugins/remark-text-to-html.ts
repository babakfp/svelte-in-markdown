import type { Root } from "mdast"
import type { Transformer } from "unified"
import { visit } from "unist-util-visit"

/*
Turns this:

```
{
    type: "text",
    value: "</svelte:fragment>",
}
```

To this:

```
{
    type: "html",
    value: "</svelte:fragment>",
}
```

So that "rehype-stringify" doesn't escape it!
If the value contains HTML tags, then it wil be converted to type of "html".
*/
export default (): Transformer<Root> => {
    return (tree) => {
        visit(tree, "text", (node, index, parent) => {
            if (!parent || index === undefined) return

            if (
                !node.value.startsWith("</") &&
                !node.value.match(
                    /<\/?[a-z][a-z0-9]*(?:\:[a-z][a-z0-9]*)*.*?\s*\/?>/,
                )
            )
                return

            parent.children.splice(index, 1, {
                type: "html",
                value: node.value,
            })
        })
    }
}
