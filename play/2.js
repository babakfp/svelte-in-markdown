import { mdxPreprocessSchema } from "../dist/mdxPreprocess/schema.js"
import { transformer } from "../dist/transformers/unified/index.js"
import { ConfigSchema as TransformerSchema } from "../dist/transformers/unified/schemas/index.js"
import { replaceMdxDataPlaceholderWithData } from "../dist/utils/replaceMdxDataPlaceholderWithData.js"

const mdxPreprocessConfig = mdxPreprocessSchema.parse()
const transformerConfig = TransformerSchema.parse()

const content = `
<script></script>
<script context="module"></script>

# Hello, World!
`

const result = await transformer(
    { content },
    mdxPreprocessConfig,
    transformerConfig,
)
const code = replaceMdxDataPlaceholderWithData(result.content, result.data)

console.log(code)
