import { TransText } from '@/components/TransText';

const STEPS = [
    { number: 1, label: <TransText en="Content" fr="Content" ar="Content" /> },
    {
        number: 2,
        label: (
            <TransText
                en="Settings & rules"
                fr="Settings & rules"
                ar="Settings & rules"
            />
        ),
    },
    { number: 3, label: <TransText en="Review" fr="Review" ar="Review" /> },
];

export default function ExerciseStepIndicator({ currentStep }) {
    return (
        <div className="flex gap-2">
            {STEPS.map((step) => (
                <div key={step.number} className="flex flex-1 flex-col gap-1.5">
                    <div
                        className={`h-1 rounded-full transition-all duration-500 ${
                            step.number <= currentStep ? 'bg-alpha' : 'bg-beta/12'
                        }`}
                    />
                    <span
                        className={`text-[11px] font-medium transition-colors ${
                            step.number <= currentStep
                                ? 'text-alpha'
                                : 'text-beta/30 dark:text-light/30'
                        }`}
                    >
                        {step.label}
                    </span>
                </div>
            ))}
        </div>
    );
}
