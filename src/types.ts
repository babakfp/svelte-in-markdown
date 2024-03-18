import * as v from "valibot"

import type { ConfigInput as RemarkParseFrontmatterYamlOptions } from "./remark-parse-frontmatter-yaml.js"
import type { Options as RemarkGfmOptions } from "remark-gfm"
import type { Options as RemarkRehypeOptions } from "remark-rehype"
import type { Options as RehypeSlugOptions } from "rehype-slug"
import type { Options as RehypeAutolinkHeadingsOptions } from "rehype-autolink-headings"
import type { RehypeShikiOptions } from "@shikijs/rehype"
import type { Options as RehypeExternalLinksOptions } from "rehype-external-links"
import type { Options as RehypeStringifyOptions } from "rehype-stringify"

import { DEFAULT_EXTENSIONS } from "./constants.js"

export type ConfigCallbacks = {
    /**
     * Callback function to determine whether a file should be ignored during preprocessing.
     * It runs after `allowNodeModules` and `allowNodeModulesItems`.
     * @param options - Options for the file preprocessing.
     * @param options.content - The content of the file.
     * @param options.filename - The name of the file.
     * @returns Return `true` to ignore the file, otherwise return `false`.
     */
    onFileIgnore?: (options: { content: string; filename: string }) => boolean
}

export const ConfigSchema = v.optional(
    v.object({
        /** File extensions to be preprocessed. */
        extensions: v.optional(
            v.array(
                v.string([
                    v.minLength(1),
                    v.regex(
                        /^\.[a-z]+(\.[a-z]+)?$/,
                        `Invalid file extension! Valid examples: ${JSON.stringify(
                            DEFAULT_EXTENSIONS
                        )}.`
                    ),
                ]),
                [v.minLength(1)]
            ),
            DEFAULT_EXTENSIONS
        ),
        /** Should files in packages located in the `node_modules` folder be preprocessed? */
        allowNodeModules: v.optional(v.boolean(), false),
        /** Include the name of the installed packages you want to exclude from being preprocessed. */
        allowNodeModulesItems: v.optional(
            v.array(v.string([v.minLength(1)])),
            []
        ),
        builtInPlugins: v.optional(
            v.object({
                /**
                 * [View on NPM](https://npmjs.com/package/vfile-matter).
                 * Can be disabled by disabling the `remarkFrontmatter` plugin.
                 */
                vfileMatter: v.optional(v.object({}), {}),

                /**
                 * [View on NPM](https://npmjs.com/package/remark-frontmatter).
                 */
                remarkFrontmatter: v.optional(
                    v.object({
                        /** @default true */
                        enable: v.optional(v.boolean(), true),
                        // TODO: Add `"toml"`, `"json"`, `"jsonc"` and `"json5"` support.
                        /** Only `"yaml"` is supported for now. */
                        lang: v.optional(v.union([v.literal("yaml")]), "yaml"),
                    }),
                    {}
                ),

                /**
                 * [View on NPM](https://npmjs.com/package/remark-gfm).
                 */
                remarkGfm: v.optional(
                    v.object({
                        /** @default true */
                        enable: v.optional(v.boolean(), true),
                    }),
                    {}
                ),

                /**
                 * [View on NPM](https://npmjs.com/package/remark-unwrap-images).
                 */
                remarkUnwrapImages: v.optional(
                    v.object({
                        /** @default true */
                        enable: v.optional(v.boolean(), true),
                    }),
                    {}
                ),

                /**
                 * [View on NPM](https://npmjs.com/package/remark-rehype).
                 * Can't be disabled.
                 */
                remarkRehype: v.optional(v.object({}), {}),

                /**
                 * [View on NPM](https://npmjs.com/package/rehype-slug).
                 */
                rehypeSlug: v.optional(
                    v.object({
                        /** @default false */
                        enable: v.optional(v.boolean(), false),
                    }),
                    {}
                ),

                /**
                 * [View on NPM](https://npmjs.com/package/rehype-autolink-headings).
                 */
                rehypeAutolinkHeadings: v.optional(
                    v.object({
                        /** @default false */
                        enable: v.optional(v.boolean(), false),
                    }),
                    {}
                ),

                /**
                 * [View on NPM](https://npmjs.com/package/@shikijs/rehype).
                 */
                rehypeShiki: v.optional(
                    v.object({
                        /** @default true */
                        enable: v.optional(v.boolean(), true),
                    }),
                    {}
                ),

                /**
                 * [View on NPM](https://npmjs.com/package/rehype-external-links).
                 * This function sets the `target` attribute to `"_blank"` and the `rel` attribute to `"nofollow noopener noreferrer"` for hyperlinks containing `"http://"` or `"https://"`.
                 */
                rehypeExternalLinks: v.optional(
                    v.object({
                        /** @default true */
                        enable: v.optional(v.boolean(), true),
                    }),
                    {}
                ),

                /**
                 * [View on NPM](https://npmjs.com/package/rehype-stringify).
                 * Can't be disabled.
                 */
                rehypeStringify: v.optional(v.object({}), {}),
            }),
            {}
        ),
    }),
    {}
)

// The original types for options suck, this way users will have easier type configuring their custom options.
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

// Some options are omitted because they are required and should not be disabled.
type OmittedRemarkRehypeOptions = Omit<
    RemarkRehypeOptions,
    "allowDangerousHtml"
>

// Some options are omitted because they are required and should not be disabled.
type OmittedRehypeStringifyOptions = Omit<
    RehypeStringifyOptions,
    "allowDangerousCharacters" | "allowDangerousHtml"
>

type BuiltInPluginsOptions = {
    builtInPlugins: {
        vfileMatter: {
            options?: RemarkParseFrontmatterYamlOptions
        }
        remarkFrontmatter: {
            options?: RemarkFrontmatterCustomOptions
        }
        remarkGfm: {
            options?: RemarkGfmOptions
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

// NOTE: Generating Valibot schema with TypeScript types is impossible. https://github.com/fabian-hiller/valibot/discussions/477
export type ConfigInput = v.Input<typeof ConfigSchema> &
    Partial<BuiltInPluginsOptions>

// NOTE: Generating Valibot schema with TypeScript types is impossible. https://github.com/fabian-hiller/valibot/discussions/477
export type ConfigOutput = v.Output<typeof ConfigSchema> & BuiltInPluginsOptions

// TODO: Whenever [this issue](https://github.com/microsoft/TypeScript/issues/42873) resolves, I can move the extra types from `ConfigInput` and `ConfigOutput` to the schema itself.
