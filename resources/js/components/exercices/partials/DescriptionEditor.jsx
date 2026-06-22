import { FileCode2, Type } from 'lucide-react';
import { TransText } from '@/components/TransText';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';
import MarkdownEditor from './MarkdownEditor';
import TipTapEditor from './TipTapEditor';

export const DESCRIPTION_FORMATS = {
    MARKDOWN: 'markdown',
    TIPTAP: 'tiptap',
};

export default function DescriptionEditor({
    data,
    errors,
    onChange,
    defaultFormat = DESCRIPTION_FORMATS.MARKDOWN,
}) {
    const format = data.description_format ?? defaultFormat;

    return (
        <div className="space-y-3">
            <ToggleGroup
                type="single"
                value={format}
                onValueChange={(value) =>
                    value && onChange('description_format', value)
                }
                className="w-full justify-start rounded-lg border border-beta/10 bg-beta/5 p-1 dark:border-light/10"
            >
                <ToggleGroupItem
                    value={DESCRIPTION_FORMATS.MARKDOWN}
                    className={cn(
                        'flex flex-1 items-center justify-center gap-2 data-[state=on]:bg-alpha data-[state=on]:text-beta',
                    )}
                >
                    <FileCode2 className="size-4" />
                    <TransText en="Markdown" fr="Markdown" ar="Markdown" />
                </ToggleGroupItem>
                <ToggleGroupItem
                    value={DESCRIPTION_FORMATS.TIPTAP}
                    className={cn(
                        'flex flex-1 items-center justify-center gap-2 data-[state=on]:bg-alpha data-[state=on]:text-beta',
                    )}
                >
                    <Type className="size-4" />
                    <TransText en="TipTap" fr="TipTap" ar="TipTap" />
                </ToggleGroupItem>
            </ToggleGroup>

            {format === DESCRIPTION_FORMATS.MARKDOWN ? (
                <MarkdownEditor
                    value={data.description_markdown}
                    onChange={(value) => onChange('description_markdown', value)}
                    error={errors.description}
                />
            ) : (
                <TipTapEditor
                    value={data.description_html}
                    onChange={(html) => onChange('description_html', html)}
                    error={errors.description}
                />
            )}
        </div>
    );
}
