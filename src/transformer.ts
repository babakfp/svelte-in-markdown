import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeShiki from "@shikijs/rehype"
import rehypeStringify from "rehype-stringify"

export const transformer = async (content: string) => {
    const processor = unified()

    processor.use(remarkParse)

    processor.use(remarkRehype)

    processor.use(rehypeShiki, {
        theme: "github-dark",
    })

    processor.use(rehypeStringify)

    await processor.process(content)
}
