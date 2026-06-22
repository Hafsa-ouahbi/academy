import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, Save } from 'lucide-react';
import { TransText } from '@/components/TransText';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useExerciseAutosave } from '../hooks/useExerciseAutosave';
import { DESCRIPTION_FORMATS } from './DescriptionEditor';
import ExerciseStepIndicator from './ExerciseStepIndicator';
import StepContent from './StepContent';
import StepReview from './StepReview';
import StepSettings from './StepSettings';

const TOTAL_STEPS = 3;

export const EMPTY_EXERCISE_FORM = {
    title: '',
    description_format: DESCRIPTION_FORMATS.MARKDOWN,
    description_markdown: '',
    description_html: '',
    difficulty: '',
    xp_reward: 50,
    order_index: 1,
    rules: null,
    rulesSource: 'paste',
    rulesFileName: '',
};

const STEP_TITLES = {
    1: (
        <TransText
            en="Write the exercise title and description."
            fr="Write the exercise title and description."
            ar="Write the exercise title and description."
        />
    ),
    2: (
        <TransText
            en="Configure difficulty, rewards, and grading rules."
            fr="Configure difficulty, rewards, and grading rules."
            ar="Configure difficulty, rewards, and grading rules."
        />
    ),
    3: (
        <TransText
            en="Review everything before creating the exercise."
            fr="Review everything before creating the exercise."
            ar="Review everything before creating the exercise."
        />
    ),
};

function hasDescriptionContent(data) {
    if (data.description_format === DESCRIPTION_FORMATS.MARKDOWN) {
        return Boolean(data.description_markdown.trim());
    }
    return Boolean(data.description_html.replace(/<[^>]*>/g, '').trim());
}

function validateStep(step, data) {
    const errors = {};

    if (step === 1) {
        if (!data.title.trim()) errors.title = 'Title is required.';
        if (!hasDescriptionContent(data)) {
            errors.description = 'Description is required.';
        }
    }

    if (step === 2) {
        if (!data.difficulty) errors.difficulty = 'Difficulty is required.';
        if (data.xp_reward < 0) errors.xp_reward = 'XP must be 0 or more.';
        if (data.order_index < 1) errors.order_index = 'Order must be at least 1.';
        if (!data.rules) errors.rules = 'Valid rules JSON is required.';
    }

    return errors;
}

function buildPayload(data) {
    return {
        title: data.title,
        description_format: data.description_format,
        description:
            data.description_format === DESCRIPTION_FORMATS.MARKDOWN
                ? data.description_markdown
                : data.description_html,
        description_markdown: data.description_markdown,
        description_html: data.description_html,
        difficulty: data.difficulty,
        xp_reward: data.xp_reward,
        order_index: data.order_index,
        rules: data.rules,
        rulesSource: data.rulesSource,
        rulesFileName: data.rulesFileName,
    };
}

export default function ExerciseModal({
    open,
    onOpenChange,
    isEditing = false,
    initialData,
    onSubmit,
    topicId,
    coachType = 'coding',
}) {
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({
        ...EMPTY_EXERCISE_FORM,
        ...initialData,
    });

    const draftKey = `academy:exercise-draft:${topicId ?? 'new'}`;
    const { status: autosaveStatus, restoreDraft, clearDraft } = useExerciseAutosave(
        draftKey,
        data,
        open,
    );

    useEffect(() => {
        if (!open) return;

        const defaultFormat =
            coachType === 'media'
                ? DESCRIPTION_FORMATS.TIPTAP
                : DESCRIPTION_FORMATS.MARKDOWN;
        const draft = restoreDraft();

        if (draft && !initialData) {
            setData({ ...EMPTY_EXERCISE_FORM, ...draft });
        } else {
            setData({
                ...EMPTY_EXERCISE_FORM,
                description_format: defaultFormat,
                ...initialData,
            });
        }
        setStep(1);
        setErrors({});
    }, [open, initialData, coachType, restoreDraft]);

    const updateField = (key, value) => {
        setData((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => {
            if (!prev[key]) return prev;
            const next = { ...prev };
            delete next[key];
            return next;
        });
    };

    const handleOpenChange = (nextOpen) => {
        if (!nextOpen) {
            setStep(1);
            setErrors({});
        }
        onOpenChange?.(nextOpen);
    };

    const goNext = () => {
        const stepErrors = validateStep(step, data);
        if (Object.keys(stepErrors).length > 0) {
            setErrors(stepErrors);
            return;
        }
        setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
    };

    const goBack = () => setStep((prev) => Math.max(prev - 1, 1));

    const handleSubmit = (event) => {
        event.preventDefault();
        const payload = buildPayload(data);
        onSubmit?.(payload);
        clearDraft();
        handleOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent
                className={cn(
                    'max-h-[90vh] overflow-y-auto',
                    step === 1 ? 'sm:max-w-5xl' : 'sm:max-w-2xl',
                )}
            >
                <DialogHeader className="space-y-4">
                    <div className="space-y-1">
                        <p className="text-xs font-semibold uppercase tracking-widest text-alpha">
                            <TransText
                                en={`Step ${step} of ${TOTAL_STEPS}`}
                                fr={`Step ${step} of ${TOTAL_STEPS}`}
                                ar={`Step ${step} of ${TOTAL_STEPS}`}
                            />
                        </p>
                        <DialogTitle>
                            {isEditing ? (
                                <TransText
                                    en="Edit exercise"
                                    fr="Edit exercise"
                                    ar="Edit exercise"
                                />
                            ) : (
                                <TransText
                                    en="Create exercise"
                                    fr="Create exercise"
                                    ar="Create exercise"
                                />
                            )}
                        </DialogTitle>
                        <DialogDescription>
                            {STEP_TITLES[step]}
                        </DialogDescription>
                    </div>
                    <ExerciseStepIndicator currentStep={step} />
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            {step === 1 && (
                                <StepContent
                                    data={data}
                                    errors={errors}
                                    onChange={updateField}
                                    autosaveStatus={autosaveStatus}
                                    coachType={coachType}
                                />
                            )}
                            {step === 2 && (
                                <StepSettings
                                    data={data}
                                    errors={errors}
                                    onChange={updateField}
                                />
                            )}
                            {step === 3 && <StepReview data={data} />}
                        </motion.div>
                    </AnimatePresence>

                    <DialogFooter className="gap-2 sm:justify-between">
                        <div>
                            {step > 1 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={goBack}
                                >
                                    <ChevronLeft />
                                    <TransText en="Back" fr="Back" ar="Back" />
                                </Button>
                            )}
                        </div>

                        <div className="flex gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => handleOpenChange(false)}
                            >
                                <TransText en="Cancel" fr="Cancel" ar="Cancel" />
                            </Button>

                            {step < TOTAL_STEPS ? (
                                <Button
                                    type="button"
                                    className="bg-alpha"
                                    onClick={goNext}
                                >
                                    <TransText en="Next" fr="Next" ar="Next" />
                                    <ChevronRight />
                                </Button>
                            ) : (
                                <Button type="submit" className="bg-alpha">
                                    {isEditing ? <Save /> : <Plus />}
                                    {isEditing ? (
                                        <TransText
                                            en="Save changes"
                                            fr="Save changes"
                                            ar="Save changes"
                                        />
                                    ) : (
                                        <TransText
                                            en="Create exercise"
                                            fr="Create exercise"
                                            ar="Create exercise"
                                        />
                                    )}
                                </Button>
                            )}
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
