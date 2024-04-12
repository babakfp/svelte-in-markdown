import * as v from "valibot"
import type { Options } from "remark-rehype"

import { CustomPluginsSchema } from "./CustomPluginsSchema.js"

export const RemarkRehypeSchema = v.optional(
    v.object(
        {
            /** @readonly This plugin can't be disabled. */
            enable: v.optional(v.literal(true), true),

            options: v.optional(v.special<CustomOptions>(() => true)),

            /** Useful to add a plugin before or after this plugin. */
            plugins: CustomPluginsSchema,
        },
        v.unknown()
    ),
    {}
)

/**
 * A modified version of the original option types of {@link Options}.
 *
 * Some options (`allowDangerousHtml`) are omitted because they are required and should not modified!
 */
type CustomOptions = Omit<Options, "allowDangerousHtml">