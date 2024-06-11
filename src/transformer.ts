import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeShiki from "@shikijs/rehype"
import rehypeStringify from "rehype-stringify"

export const transformer = async (content: string) => {
    const processor = unified()

    processor.use(remarkParse)

    processor.use(remarkRehype, {
        allowDangerousHtml: true,
    })

    processor.use(rehypeShiki, {
        theme: "github-dark",
    })

    processor.use(rehypeStringify, {
        allowDangerousCharacters: true,
        allowDangerousHtml: true,
        allowParseErrors: true,
    })

    await processor.process(content)
}
