import * as v from "valibot"

import type { Options as RemarkFrontmatterOptions } from "remark-frontmatter"
import type { Options as RemarkFrontmatterYamlOptions } from "remark-frontmatter-yaml"
import type { Options as RemarkGfmOptions } from "remark-gfm"
import type { Options as RemarkTocOptions } from "remark-toc"
import type { Options as RemarkRehypeOptions } from "remark-rehype"
import type { Options as RehypeSlugOptions } from "rehype-slug"
import type { Options as RehypeAutolinkHeadingsOptions } from "rehype-autolink-headings"
import type { RehypeShikiOptions } from "@shikijs/rehype"
import type { Options as RehypeExternalLinksOptions } from "rehype-external-links"
import type { Options as RehypeStringifyOptions } from "rehype-stringify"

import { getPluginBaseSchema } from "./getPluginBaseSchema.js"

export const ConfigSchema = v.optional(
    v.object(
        {
            builtInPlugins: v.optional(
                v.object(
                    {
                        /** [View on NPM](https://npmjs.com/package/remark-frontmatter). */
                        remarkFrontmatter: getPluginBaseSchema({
                            /** @default true */
                            enable: v.optional(v.boolean(), true),
                            /** **Important**: Don't change! Only `"yaml"` is supported for now. */
                            lang: v.optional(
                                v.union([v.literal("yaml")]),
                                "yaml",
                            ),
                            options: v.optional(
                                v.special<RemarkFrontmatterCustomOptions>(
                                    () => true,
                                ),
                            ),
                        }),

                        /** [View on NPM](https://npmjs.com/package/remark-frontmatter-yaml). */
                        remarkFrontmatterYaml: getPluginBaseSchema({
                            /** @default true */
                            enable: v.optional(v.boolean(), true),
                            options: v.optional(
                                v.special<RemarkFrontmatterYamlCustomOptions>(
                                    () => true,
                                ),
                            ),
                        }),

                        /** [View on NPM](https://npmjs.com/package/remark-gfm). */
                        remarkGfm: getPluginBaseSchema({
                            /** @default true */
                            enable: v.optional(v.boolean(), true),
                            options: v.optional(
                                v.special<RemarkGfmOptions>(() => true),
                            ),
                        }),

                        /** [View on NPM](https://npmjs.com/package/remark-unwrap-images). */
                        remarkUnwrapImages: getPluginBaseSchema({
                            /** @default true */
                            enable: v.optional(v.boolean(), true),
                        }),

                        /** [View on NPM](https://npmjs.com/package/remark-toc). */
                        remarkToc: getPluginBaseSchema({
                            /** @default true */
                            enable: v.optional(v.boolean(), true),
                            options: v.optional(
                                v.special<RemarkTocOptions>(() => true),
                            ),
                        }),

                        /** [View on NPM](https://npmjs.com/package/remark-rehype). */
                        remarkRehype: getPluginBaseSchema({
                            /** @readonly This plugin can't be disabled. */
                            enable: v.optional(v.literal(true), true),
                            options: v.optional(
                                v.special<RemarkRehypeCustomOptions>(
                                    () => true,
                                ),
                            ),
                        }),

                        rehypeMarkdownElementsContext: getPluginBaseSchema({
                            /** @readonly This plugin can't be disabled. */
                            enable: v.optional(v.literal(true), true),
                        }),

                        /** [View on NPM](https://npmjs.com/package/rehype-slug). */
                        rehypeSlug: getPluginBaseSchema({
                            /** @default true */
                            enable: v.optional(v.boolean(), true),
                            options: v.optional(
                                v.special<RehypeSlugOptions>(() => true),
                            ),
                        }),

                        /** [View on NPM](https://npmjs.com/package/rehype-autolink-headings). */
                        rehypeAutolinkHeadings: getPluginBaseSchema({
                            /** @default false */
                            enable: v.optional(v.boolean(), false),
                            options: v.optional(
                                v.special<RehypeAutolinkHeadingsOptions>(
                                    () => true,
                                ),
                            ),
                        }),

                        /** [View on NPM](https://npmjs.com/package/@shikijs/rehype). */
                        rehypeShiki: getPluginBaseSchema({
                            /** @default true */
                            enable: v.optional(v.boolean(), true),
                            options: v.optional(
                                v.special<RehypeShikiOptions>(() => true),
                            ),
                        }),

                        /**
                         * A custom plugin that sanitizes the some characters in code elements.
                         *
                         * **Important**: This plugin changes the `type` property of `text` nodes to `"raw"`.
                         */
                        rehypeSanitizeCodeElement: getPluginBaseSchema({
                            /** @readonly This plugin can't be disabled. */
                            enable: v.optional(v.literal(true), true),
                        }),

                        /** A custom plugin that enables customizing HTML elements with Svelte components. */
                        rehypeMarkdownElements: getPluginBaseSchema({
                            /** @default true */
                            enable: v.optional(v.boolean(), true),
                        }),

                        /** [View on NPM](https://npmjs.com/package/rehype-external-links). */
                        rehypeExternalLinks: getPluginBaseSchema({
                            /** @default true */
                            enable: v.optional(v.boolean(), true),
                            options: v.optional(
                                v.special<RehypeExternalLinksOptions>(
                                    () => true,
                                ),
                            ),
                        }),

                        /** [View on NPM](https://npmjs.com/package/rehype-stringify). */
                        rehypeStringify: getPluginBaseSchema({
                            /** @readonly This plugin can't be disabled. */
                            enable: v.optional(v.literal(true), true),
                            options: v.optional(
                                v.special<RehypeStringifyCustomOptions>(
                                    () => true,
                                ),
                            ),
                        }),
                    },
                    v.never(),
                ),
                {},
            ),
        },
        v.never(),
    ),
    {},
)

/**
 * A simplified version of the original option types of {@link RemarkFrontmatterOptions}.
 * Some options are omitted for simplicity and readability.
 */
type RemarkFrontmatterCustomOptions = {
    /**
     * @default
     * { open: "---", close: "---" }
     */
    fence?: {
        /** @default "---" */
        close: string
        /** @default "---" */
        open: string
    }
}

/**
 * A modified version of the original option types of {@link RemarkFrontmatterYamlOptions}.
 *
 * Some options (`"name"`) are omitted because they are required and should not modified!
 * Removed the `"name"` option for type-safety reasons.
 */
type RemarkFrontmatterYamlCustomOptions = Omit<
    NonNullable<RemarkFrontmatterYamlOptions>,
    "name"
>

/**
 * A modified version of the original option types of {@link Options}.
 *
 * Some options (`allowDangerousHtml`) are omitted because they are required and should not modified!
 */
type RemarkRehypeCustomOptions = Omit<RemarkRehypeOptions, "allowDangerousHtml">

/**
 * A modified version of the original option types of {@link RehypeStringifyOptions}.
 *
 * Some options (`allowDangerousCharacters`, `allowDangerousHtml`) are omitted because they are required and should not modified!
 */
type RehypeStringifyCustomOptions = Omit<
    RehypeStringifyOptions,
    "allowDangerousCharacters" | "allowDangerousHtml"
>
