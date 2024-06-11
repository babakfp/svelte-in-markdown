import type { MarkdownData } from "./MarkdownData.js"
import type { MarkupPreprocessorOptions } from "./MarkupPreprocessorOptions.js"
import type { RequiredNonNullable } from "./RequiredNonNullable.js"
import type { ConfigOutput } from "./index.js"

/** Svelte in Markdown config callback options. */
export type ConfigCallbacks = {
    /**
     * Callback function to determine whether a file should be ignored during preprocessing.
     * It runs after the `nodeModules` option.
     * @param options - Contains file path and content.
     * @returns Return `true` to ignore the file, otherwise return `false`.
     */
    onFileIgnore?: (
        options: RequiredNonNullable<MarkupPreprocessorOptions>,
    ) => boolean

    /**
     * You will receive every markdown file and'll get to transform it.
     */
    onTransform?: (
        /** Info about the markdown file that is going to be preprocessed. */
        markupPreprocessorOptions: RequiredNonNullable<MarkupPreprocessorOptions>,
        config: ConfigOutput,
    ) => Promise<{
        /** Transformed content. */
        content: string
        /** Data to be accessible when getting the markdown files via `import.meta.glob` and in the layout file via context. */
        data: MarkdownData
    }>
}
