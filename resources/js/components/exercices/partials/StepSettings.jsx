import { TransText } from '@/components/TransText';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import ExerciseField from './ExerciseField';
import RulesJsonEditor from './RulesJsonEditor';

const inputClass =
    'border-beta/15 text-beta focus-visible:border-alpha/60 focus-visible:ring-alpha/20 dark:border-light/15 dark:text-light';

const DIFFICULTIES = [
    {
        value: 'beginner',
        label: <TransText en="Beginner" fr="Beginner" ar="Beginner" />,
    },
    {
        value: 'intermediate',
        label: <TransText en="Intermediate" fr="Intermediate" ar="Intermediate" />,
    },
    {
        value: 'advanced',
        label: <TransText en="Advanced" fr="Advanced" ar="Advanced" />,
    },
];

export default function StepSettings({ data, errors, onChange }) {
    return (
        <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
                <ExerciseField
                    id="difficulty"
                    label={
                        <TransText en="Difficulty" fr="Difficulty" ar="Difficulty" />
                    }
                    error={errors.difficulty}
                >
                    <Select
                        value={data.difficulty}
                        onValueChange={(value) => onChange('difficulty', value)}
                    >
                        <SelectTrigger className={inputClass}>
                            <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                            {DIFFICULTIES.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </ExerciseField>

                <ExerciseField
                    id="xp_reward"
                    label={
                        <TransText en="XP reward" fr="XP reward" ar="XP reward" />
                    }
                    error={errors.xp_reward}
                >
                    <Input
                        id="xp_reward"
                        type="number"
                        min={0}
                        value={data.xp_reward}
                        onChange={(e) =>
                            onChange('xp_reward', Number(e.target.value))
                        }
                        className={inputClass}
                    />
                </ExerciseField>

                <ExerciseField
                    id="order_index"
                    label={<TransText en="Order" fr="Order" ar="Order" />}
                    error={errors.order_index}
                >
                    <Input
                        id="order_index"
                        type="number"
                        min={1}
                        value={data.order_index}
                        onChange={(e) =>
                            onChange('order_index', Number(e.target.value))
                        }
                        className={inputClass}
                    />
                </ExerciseField>
            </div>

            <RulesJsonEditor data={data} errors={errors} onChange={onChange} />
        </div>
    );
}
