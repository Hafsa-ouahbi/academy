import { TransText } from '@/components/TransText';
import { cn } from '@/lib/utils';
import MarkdownPreview from './MarkdownPreview';

const textareaClass =
    'min-h-[320px] w-full resize-none rounded-md border border-beta/15 bg-transparent px-3 py-2 font-mono text-sm text-beta outline-none focus-visible:border-alpha/60 focus-visible:ring-2 focus-visible:ring-alpha/20 dark:border-light/15 dark:text-light';

const previewWrapperClass = cn(
    'custom-scrollbar min-h-[320px] overflow-y-auto rounded-md border border-beta/15 bg-light/50 px-4 py-3',
    'dark:border-beta dark:bg-dark_gray',
);

export default function MarkdownEditor({ value, onChange, error }) {
    return (
        <div className="space-y-2">
            <div className="grid min-h-[360px] grid-cols-1 gap-3 lg:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wide text-beta/50 dark:text-light/50">
                        <TransText
                            en="Write (Markdown)"
                            fr="Write (Markdown)"
                            ar="Write (Markdown)"
                        />
                    </span>
                    <textarea
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={
                            '# Exercise\n\nDescribe the task...\n\n- Requirement 1\n- Requirement 2'
                        }
                        className={textareaClass}
                        spellCheck={false}
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wide text-beta/50 dark:text-light/50">
                        <TransText en="Preview" fr="Preview" ar="Preview" />
                    </span>
                    <div className={previewWrapperClass}>
                        {value.trim() ? (
                            <MarkdownPreview>{value}</MarkdownPreview>
                        ) : (
                            <p className="text-sm text-beta/40 dark:text-light/40">
                                <TransText
                                    en="Preview will appear here..."
                                    fr="Preview will appear here..."
                                    ar="Preview will appear here..."
                                />
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {error && <p className="text-sm text-error">{error}</p>}
        </div>
    );
}
