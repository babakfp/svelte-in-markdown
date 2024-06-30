import type { MdxSvelteConfigSchemaOutput } from "./index.js"
import type { MarkdownData } from "./MarkdownData.js"
import type { MarkupPreprocessorOptions } from "./MarkupPreprocessorOptions.js"
import type { RequiredNonNullable } from "./RequiredNonNullable.js"

/** MDX Svelte config callback options. */
export type MdxSvelteConfigCallbacks = {
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
     * Use this to build your own transformer or customize the built-in plugins.
     * You will receive every markdown file and'll get to transform it.
     */
    onTransform?: (
        /** Info about the markdown file that is going to be preprocessed. */
        markupPreprocessorOptions: RequiredNonNullable<MarkupPreprocessorOptions>,
        /** The config that is passed to `mdxSvelte()` by you, which also contains the default values for options. */
        config: MdxSvelteConfigSchemaOutput,
    ) => Promise<{
        /** Transformed content. */
        content: string
        /** Data to be accessible when getting the markdown files via `import.meta.glob` and in the layout file via context. */
        data: MarkdownData
    }>
}