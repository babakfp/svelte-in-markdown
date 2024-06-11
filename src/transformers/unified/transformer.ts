import * as v from "valibot"
import { unified } from "unified"
import remarkParse from "remark-parse" // Options not needed because `Options: {}`.
import remarkRehype from "remark-rehype"
import rehypeShiki from "@shikijs/rehype"
import rehypeStringify from "rehype-stringify"

import type {
    RequiredNonNullable,
    MarkupPreprocessorOptions,
    ConfigInput as SvelteInMarkdownConfigInput,
    ConfigOutput as SvelteInMarkdownConfigOutput,
} from "../../types/index.js"
import { ConfigSchema } from "./schemas/index.js"
import type { ConfigInput } from "./types/index.js"
import { isHrefExternal } from "./isHrefExternal.js"

/**
 * This is a transformer for that used unified ecosystem.
 */
export const transformer = (async (
    markupPreprocessorOptions: RequiredNonNullable<MarkupPreprocessorOptions>,
    svelteInMarkdownConfig: SvelteInMarkdownConfigOutput,
    config?: ConfigInput,
) => {
    const config_ = v.parse(ConfigSchema, config)

    const processor = unified()

    processor.use(remarkParse)

    processor.use(config_.builtInPlugins.remarkRehype.plugins?.before)
    processor.use(remarkRehype, {
        ...config_.builtInPlugins.remarkRehype.options,
        allowDangerousHtml: true,
    })
    processor.use(config_.builtInPlugins.remarkRehype.plugins?.after)

    processor.use(config_.builtInPlugins.rehypeShiki.plugins?.before)
    if (config_.builtInPlugins.rehypeShiki.enable) {
        processor.use(rehypeShiki, {
            theme: "github-dark",
            ...config_.builtInPlugins.rehypeShiki.options,
        })
    }
    processor.use(config_.builtInPlugins.rehypeShiki.plugins?.after)

    processor.use(config_.builtInPlugins.rehypeStringify.plugins?.before)
    processor.use(rehypeStringify, {
        ...config_.builtInPlugins.rehypeStringify.options,
        allowDangerousCharacters: true,
        allowDangerousHtml: true,
        allowParseErrors: true,
    })
    processor.use(config_.builtInPlugins.rehypeStringify.plugins?.after)

    const result = await processor.process(markupPreprocessorOptions.content)

    return {
        content: result.value.toString(),
        data: result.data,
    }
}) satisfies SvelteInMarkdownConfigInput["onTransform"]
