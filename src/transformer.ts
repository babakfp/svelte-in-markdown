import { unified } from "unified"
import remarkParse from "remark-parse"
import rehypeShiki from "@shikijs/rehype"
import rehypeStringify from "rehype-stringify"

// IMPORTANT: COMMENT THIS TO FIX THE ISSUE.
import remarkRehype from "remark-rehype"

export const transformer = async (content: string) => {
    const processor = unified()

    processor.use(remarkParse)

    // IMPORTANT: COMMENT THIS TO FIX THE ISSUE.
    processor.use(remarkRehype)

    processor.use(rehypeShiki, {
        theme: "github-dark",
    })

    processor.use(rehypeStringify)

    await processor.process(content)
}
