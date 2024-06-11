import * as v from "valibot"

import type { Options as RemarkRehypeOptions } from "remark-rehype"
import type { RehypeShikiOptions } from "@shikijs/rehype"
import type { Options as RehypeStringifyOptions } from "rehype-stringify"

import { getPluginBaseSchema } from "./getPluginBaseSchema.js"

export const ConfigSchema = v.optional(
    v.object(
        {
            builtInPlugins: v.optional(
                v.object(
                    {
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

                        /** [View on NPM](https://npmjs.com/package/@shikijs/rehype). */
                        rehypeShiki: getPluginBaseSchema({
                            /** @default true */
                            enable: v.optional(v.boolean(), true),
                            options: v.optional(
                                v.special<RehypeShikiOptions>(() => true),
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
