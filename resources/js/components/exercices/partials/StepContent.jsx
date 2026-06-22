import { Check, Cloud, Loader2 } from 'lucide-react';
import { TransText } from '@/components/TransText';
import { Input } from '@/components/ui/input';
import { DESCRIPTION_FORMATS } from './DescriptionEditor';
import DescriptionEditor from './DescriptionEditor';
import ExerciseField from './ExerciseField';

const inputClass =
    'border-beta/15 text-beta placeholder:text-beta/35 focus-visible:border-alpha/60 focus-visible:ring-alpha/20 dark:border-light/15 dark:text-light';

function AutosaveBadge({ status }) {
    if (status === 'saving') {
        return (
            <span className="inline-flex items-center gap-1.5 text-xs text-beta/50 dark:text-light/50">
                <Loader2 className="size-3 animate-spin" />
                <TransText en="Saving..." fr="Saving..." ar="Saving..." />
            </span>
        );
    }
    if (status === 'saved') {
        return (
            <span className="inline-flex items-center gap-1.5 text-xs text-good">
                <Check className="size-3" />
                <TransText en="Draft saved" fr="Draft saved" ar="Draft saved" />
            </span>
        );
    }
    return (
        <span className="inline-flex items-center gap-1.5 text-xs text-beta/40 dark:text-light/40">
            <Cloud className="size-3" />
            <TransText en="Auto-save enabled" fr="Auto-save enabled" ar="Auto-save enabled" />
        </span>
    );
}

export default function StepContent({
    data,
    errors,
    onChange,
    autosaveStatus,
    coachType = 'coding',
}) {
    const defaultFormat =
        coachType === 'media'
            ? DESCRIPTION_FORMATS.TIPTAP
            : DESCRIPTION_FORMATS.MARKDOWN;

    return (
        <div className="space-y-5">
            <ExerciseField
                id="title"
                label={<TransText en="Title" fr="Title" ar="Title" />}
                error={errors.title}
            >
                <Input
                    id="title"
                    value={data.title}
                    onChange={(e) => onChange('title', e.target.value)}
                    placeholder="Build a responsive navbar"
                    className={inputClass}
                />
            </ExerciseField>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-beta dark:text-light">
                        <TransText
                            en="Description"
                            fr="Description"
                            ar="Description"
                        />
                    </span>
                    <AutosaveBadge status={autosaveStatus} />
                </div>

                <DescriptionEditor
                    data={data}
                    errors={errors}
                    onChange={onChange}
                    defaultFormat={defaultFormat}
                />
            </div>
        </div>
    );
}
