import { useRef, useState } from 'react';
import { ClipboardPaste, FileJson, Upload } from 'lucide-react';
import { TransText } from '@/components/TransText';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ExerciseField from './ExerciseField';

const MODES = {
    PASTE: 'paste',
    UPLOAD: 'upload',
};

const textareaClass =
    'min-h-[200px] w-full resize-y rounded-md border border-beta/15 bg-transparent px-3 py-2 font-mono text-sm text-beta outline-none focus-visible:border-alpha/60 focus-visible:ring-2 focus-visible:ring-alpha/20 dark:border-light/15 dark:text-light';

function parseRulesJson(text) {
    const parsed = JSON.parse(text);
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
        throw new Error('Rules must be a JSON object.');
    }
    return parsed;
}

export default function RulesJsonEditor({ data, errors, onChange }) {
    const inputRef = useRef(null);
    const [mode, setMode] = useState(data.rulesSource ?? MODES.PASTE);
    const [jsonText, setJsonText] = useState(
        data.rules ? JSON.stringify(data.rules, null, 2) : '',
    );
    const [localError, setLocalError] = useState(null);

    const applyParsed = (parsed, source, fileName = '') => {
        onChange('rules', parsed);
        onChange('rulesSource', source);
        onChange('rulesFileName', fileName);
        setLocalError(null);
    };

    const handlePasteChange = (text) => {
        setJsonText(text);
        if (!text.trim()) {
            onChange('rules', null);
            onChange('rulesFileName', '');
            setLocalError(null);
            return;
        }
        try {
            applyParsed(parseRulesJson(text), MODES.PASTE);
        } catch (err) {
            setLocalError(err.message ?? 'Invalid JSON.');
            onChange('rules', null);
        }
    };

    const handleFile = async (file) => {
        if (!file) return;
        if (!file.name.endsWith('.json')) {
            setLocalError('Only .json files are allowed.');
            return;
        }
        try {
            const text = await file.text();
            const parsed = parseRulesJson(text);
            setJsonText(JSON.stringify(parsed, null, 2));
            applyParsed(parsed, MODES.UPLOAD, file.name);
        } catch (err) {
            setLocalError(err.message ?? 'Invalid JSON file.');
            onChange('rules', null);
        }
    };

    const displayError = errors.rules ?? localError;

    return (
        <ExerciseField
            id="rules"
            label={<TransText en="Rules (JSON)" fr="Rules (JSON)" ar="Rules (JSON)" />}
            error={displayError}
        >
            <div className="flex gap-2 rounded-lg border border-beta/10 bg-beta/5 p-1 dark:border-light/10">
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className={cn(
                        'flex-1',
                        mode === MODES.PASTE && 'bg-alpha text-beta',
                    )}
                    onClick={() => setMode(MODES.PASTE)}
                >
                    <ClipboardPaste className="size-4" />
                    <TransText en="Paste JSON" fr="Paste JSON" ar="Paste JSON" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className={cn(
                        'flex-1',
                        mode === MODES.UPLOAD && 'bg-alpha text-beta',
                    )}
                    onClick={() => setMode(MODES.UPLOAD)}
                >
                    <Upload className="size-4" />
                    <TransText en="Upload file" fr="Upload file" ar="Upload file" />
                </Button>
            </div>

            {mode === MODES.PASTE ? (
                <textarea
                    value={jsonText}
                    onChange={(e) => handlePasteChange(e.target.value)}
                    placeholder={'{\n  "maxAttempts": 3,\n  "passScore": 70\n}'}
                    className={textareaClass}
                    spellCheck={false}
                />
            ) : (
                <>
                    <input
                        ref={inputRef}
                        type="file"
                        accept=".json,application/json"
                        className="hidden"
                        onChange={(e) => handleFile(e.target.files?.[0])}
                    />
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full border-dashed border-beta/20"
                        onClick={() => inputRef.current?.click()}
                    >
                        <FileJson />
                        <TransText
                            en="Choose rules.json"
                            fr="Choose rules.json"
                            ar="Choose rules.json"
                        />
                    </Button>
                    {data.rulesFileName && (
                        <p className="text-xs text-beta/60 dark:text-light/60">
                            <TransText en="File:" fr="File:" ar="File:" />{' '}
                            {data.rulesFileName}
                        </p>
                    )}
                </>
            )}

            {data.rules && !displayError && (
                <pre className="custom-scrollbar max-h-36 overflow-auto rounded-md border border-good/30 bg-good/5 p-3 text-xs text-beta dark:text-light">
                    {JSON.stringify(data.rules, null, 2)}
                </pre>
            )}
        </ExerciseField>
    );
}
