import * as v from "valibot"
import type { Preset } from "unified"

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

const CustomPluginsSchema = v.optional(
    v.object(
        {
            /** Useful to add a plugin before this plugin. */
            before: v.optional(v.special<Preset>(() => true)),

            /** Useful to add a plugin after this plugin. */
            after: v.optional(v.special<Preset>(() => true)),
        },
        v.never()
    )
)

export const ConfigSchema = v.optional(
    v.object(
        {
            builtInPlugins: v.optional(
                v.object(
                    {
                        /** [View on NPM](https://npmjs.com/package/remark-frontmatter). */
                        remarkFrontmatter: v.optional(
                            v.object(
                                {
                                    /** @default true */
                                    enable: v.optional(v.boolean(), true),

                                    // TODO: Add `"toml"`, `"json"`, `"jsonc"` and `"json5"` support.
                                    /**
                                     * **Important**: Don't change!
                                     *
                                     * Only `"yaml"` is supported for now.
                                     */
                                    lang: v.optional(
                                        v.union([v.literal("yaml")]),
                                        "yaml"
                                    ),

                                    /** Useful to add a plugin before or after this plugin. */
                                    plugins: CustomPluginsSchema,
                                },
                                v.unknown()
                            ),
                            {}
                        ),

                        /**
                         * [View on NPM](https://npmjs.com/package/remark-frontmatter-yaml).
                         * If `remarkFrontmatter` is disabled, this plugin will be disabled too.
                         */
                        remarkFrontmatterYaml: v.optional(
                            v.object(
                                {
                                    /** @default true */
                                    enable: v.optional(v.boolean(), true),

                                    /** Useful to add a plugin before or after this plugin. */
                                    plugins: CustomPluginsSchema,
                                },
                                v.unknown()
                            ),
                            {}
                        ),

                        /** [View on NPM](https://npmjs.com/package/remark-gfm). */
                        remarkGfm: v.optional(
                            v.object(
                                {
                                    /** @default true */
                                    enable: v.optional(v.boolean(), true),

                                    /** Useful to add a plugin before or after this plugin. */
                                    plugins: CustomPluginsSchema,
                                },
                                v.unknown()
                            ),
                            {}
                        ),

                        /** [View on NPM](https://npmjs.com/package/remark-unwrap-images). */
                        remarkUnwrapImages: v.optional(
                            v.object(
                                {
                                    /** @default true */
                                    enable: v.optional(v.boolean(), true),

                                    /** Useful to add a plugin before or after this plugin. */
                                    plugins: CustomPluginsSchema,
                                },
                                v.unknown()
                            ),
                            {}
                        ),

                        /**
                         * [View on NPM](https://npmjs.com/package/remark-toc).
                         *
                         * If you are importing markdown files into other markdown files, Remark Toc won't be able to extract the headings of those components.
                         * In order to fix this issue, use need to select the headings on runtime, which there is a built-in plugin that you can use.
                         * Don't forget to disable this plugin first:
                         *
                         * ```ts
                         * {
                         *     remarkToc: {
                         *         enable: false,
                         *     },
                         * }
                         * ```
                         */
                        remarkToc: v.optional(
                            v.object(
                                {
                                    /** @default true */
                                    enable: v.optional(v.boolean(), true),

                                    /** Useful to add a plugin before or after this plugin. */
                                    plugins: CustomPluginsSchema,
                                },
                                v.unknown()
                            ),
                            {}
                        ),

                        /**
                         * [View on NPM](https://npmjs.com/package/remark-rehype).
                         * Can't be disabled.
                         */
                        remarkRehype: v.optional(
                            v.object(
                                {
                                    /** Useful to add a plugin before or after this plugin. */
                                    plugins: CustomPluginsSchema,
                                },
                                v.unknown()
                            ),
                            {}
                        ),

                        /** Can't be disabled. */
                        rehypeMarkdownElementsContext: v.optional(
                            v.object(
                                {
                                    /** Useful to add a plugin before or after this plugin. */
                                    plugins: CustomPluginsSchema,
                                },
                                v.unknown()
                            ),
                            {}
                        ),

                        /** [View on NPM](https://npmjs.com/package/rehype-slug). */
                        rehypeSlug: v.optional(
                            v.object(
                                {
                                    /** @default true */
                                    enable: v.optional(v.boolean(), true),

                                    /** Useful to add a plugin before or after this plugin. */
                                    plugins: CustomPluginsSchema,
                                },
                                v.unknown()
                            ),
                            {}
                        ),

                        /**
                         * [View on NPM](https://npmjs.com/package/rehype-autolink-headings).
                         *
                         * ## Example usage
                         *
                         * ```ts
                         * {
                         *     rehypeAutolinkHeadings: {
                         *         enable: true,
                         *         options: {
                         *             behavior: "append",
                         *             properties: {
                         *                 class: "heading-permalink",
                         *                 "aria-label": "Permalink to this headline",
                         *             },
                         *             content() {
                         *                 // import { fromHtml } from "svelte-in-markdown/transformers/unified/hast-util-from-html"
                         *                 return fromHtml(
                         *                     `<svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5"/></svg>`,
                         *                     {
                         *                         fragment: true,
                         * //                      ^^^^^^^^^^^^^^^ (important)
                         *                     },
                         *                 ).children
                         *             },
                         *             test: ["h2", "h3", "h4", "h5", "h6"],
                         *         },
                         *     },
                         * }
                         * ```
                         */
                        rehypeAutolinkHeadings: v.optional(
                            v.object(
                                {
                                    /** @default false */
                                    enable: v.optional(v.boolean(), false),

                                    /** Useful to add a plugin before or after this plugin. */
                                    plugins: CustomPluginsSchema,
                                },
                                v.unknown()
                            ),
                            {}
                        ),

                        /**
                         * [View on NPM](https://npmjs.com/package/@shikijs/rehype).
                         *
                         * ## Example usage
                         *
                         * ```ts
                         * {
                         *     rehypeShiki: {
                         *         options: {
                         *             theme: "rose-pine-moon",
                         *             langs: [
                         *                 "html",
                         *                 "css",
                         *                 "js",
                         *                 "svelte",
                         *                 "php",
                         *                 "bash",
                         *             ],
                         *         },
                         *     },
                         * }
                         * ```
                         */
                        rehypeShiki: v.optional(
                            v.object(
                                {
                                    /** @default true */
                                    enable: v.optional(v.boolean(), true),

                                    /** Useful to add a plugin before or after this plugin. */
                                    plugins: CustomPluginsSchema,
                                },
                                v.unknown()
                            ),
                            {}
                        ),

                        /**
                         * A custom plugin that sanitizes the some characters in code elements.
                         *
                         * **Important**: This plugin changes the `type` property of `text` nodes to `"raw"`.
                         *
                         * Can't be disabled.
                         */
                        rehypeSanitizeCodeElement: v.optional(
                            v.object(
                                {
                                    /** Useful to add a plugin before or after this plugin. */
                                    plugins: CustomPluginsSchema,
                                },
                                v.unknown()
                            ),
                            {}
                        ),

                        /**
                         * A custom plugin that enables customizing HTML elements with Svelte components.
                         * Disabled by default.
                         * Can be enabled by setting `NonNullable<Parameters<typeof svelteInMarkdown>[0]>['markdownElementsStrategy']` to `"expensive"`.
                         */
                        rehypeMarkdownElements: v.optional(
                            v.object(
                                {
                                    /** Useful to add a plugin before or after this plugin. */
                                    plugins: CustomPluginsSchema,
                                },
                                v.unknown()
                            ),
                            {}
                        ),

                        /**
                         * [View on NPM](https://npmjs.com/package/rehype-external-links).
                         * This function sets the `target` attribute to `"_blank"` and the `rel` attribute to `"nofollow noopener noreferrer"` for hyperlinks containing `"http://"` or `"https://"`.
                         */
                        rehypeExternalLinks: v.optional(
                            v.object(
                                {
                                    /** @default true */
                                    enable: v.optional(v.boolean(), true),

                                    /** Useful to add a plugin before or after this plugin. */
                                    plugins: CustomPluginsSchema,
                                },
                                v.unknown()
                            ),
                            {}
                        ),

                        /**
                         * [View on NPM](https://npmjs.com/package/rehype-stringify).
                         * Can't be disabled.
                         */
                        rehypeStringify: v.optional(
                            v.object(
                                {
                                    /** Useful to add a plugin before or after this plugin. */
                                    plugins: CustomPluginsSchema,
                                },
                                v.unknown()
                            ),
                            {}
                        ),
                    },
                    v.never()
                ),
                {}
            ),
        },
        v.never()
    ),
    {}
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
    /** @default false */
    anywhere?: boolean
}

/**
 * A modified version of the original option types of {@link RemarkRehypeOptions}.
 * Some options are omitted because they are required and should not be disabled.
 */
type OmittedRemarkRehypeOptions = Omit<
    RemarkRehypeOptions,
    "allowDangerousHtml"
>

/**
 * A modified version of the original option types of {@link RehypeStringifyOptions}.
 * Some options are omitted because they are required and should not be disabled.
 */
type OmittedRehypeStringifyOptions = Omit<
    RehypeStringifyOptions,
    "allowDangerousCharacters" | "allowDangerousHtml"
>

// TODO: [^1]
type BuiltInPluginsOptions = {
    builtInPlugins: {
        remarkFrontmatter: {
            options?: RemarkFrontmatterCustomOptions
        }
        remarkFrontmatterYaml: {
            options?: RemarkFrontmatterYamlOptions
        }
        remarkGfm: {
            options?: RemarkGfmOptions
        }
        remarkToc: {
            options?: RemarkTocOptions
        }
        remarkRehype: {
            options?: OmittedRemarkRehypeOptions
        }
        rehypeSlug: {
            options?: RehypeSlugOptions
        }
        rehypeAutolinkHeadings: {
            options?: RehypeAutolinkHeadingsOptions
        }
        rehypeShiki: {
            options?: RehypeShikiOptions
        }
        rehypeExternalLinks: {
            options?: RehypeExternalLinksOptions
        }
        rehypeStringify: {
            options?: OmittedRehypeStringifyOptions
        }
    }
}

// TODO: [^1]
export type ConfigInput = v.Input<typeof ConfigSchema> &
    Partial<BuiltInPluginsOptions>

// TODO: [^1]
export type ConfigOutput = v.Output<typeof ConfigSchema> & BuiltInPluginsOptions

/*
[^1]: TypeScript types with Valibot
- This is how to use TypeScript types with Valibot: https://github.com/fabian-hiller/valibot/discussions/477.
- Whenever https://github.com/microsoft/TypeScript/issues/42873 fixes, move the extra types from `ConfigInput` and `ConfigOutput` to the schema itself.
*/
