import { TransText } from '@/components/TransText';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { DESCRIPTION_FORMATS } from './DescriptionEditor';
import MarkdownPreview from './MarkdownPreview';

function ReviewRow({ label, value }) {
    return (
        <div className="flex items-start justify-between gap-4 text-sm">
            <span className="text-beta/50 dark:text-light/50">{label}</span>
            <span className="max-w-[60%] text-right font-medium text-beta dark:text-light">
                {value || '—'}
            </span>
        </div>
    );
}

const htmlPreviewClass = cn(
    'text-sm text-beta dark:text-light',
    '[&_h2]:text-lg [&_h2]:font-semibold [&_h3]:text-base [&_h3]:font-semibold',
    '[&_p]:mb-2 [&_ul]:mb-2 [&_ul]:list-disc [&_ul]:pl-5',
    '[&_ol]:mb-2 [&_ol]:list-decimal [&_ol]:pl-5',
);

export default function StepReview({ data }) {
    const isMarkdown = data.description_format === DESCRIPTION_FORMATS.MARKDOWN;

    return (
        <Card className="border-beta/10 bg-light py-4 shadow-none dark:border-light/10 dark:bg-dark">
            <CardHeader className="px-4 pb-2">
                <CardTitle className="text-base text-beta dark:text-light">
                    <TransText en="Summary" fr="Summary" ar="Summary" />
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-4">
                <ReviewRow
                    label={<TransText en="Title" fr="Title" ar="Title" />}
                    value={data.title}
                />
                <Separator className="bg-beta/10 dark:bg-light/10" />

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-beta/50 dark:text-light/50">
                            <TransText
                                en="Description"
                                fr="Description"
                                ar="Description"
                            />
                        </span>
                        <Badge variant="outline" className="capitalize">
                            {isMarkdown ? 'Markdown' : 'TipTap'}
                        </Badge>
                    </div>
                    <div
                        className={cn(
                            'rounded-md border border-beta/10 bg-beta/5 p-3 dark:border-light/10',
                            !isMarkdown && htmlPreviewClass,
                        )}
                    >
                        {isMarkdown ? (
                            data.description_markdown.trim() ? (
                                <MarkdownPreview>
                                    {data.description_markdown}
                                </MarkdownPreview>
                            ) : (
                                '—'
                            )
                        ) : data.description_html.replace(/<[^>]*>/g, '').trim() ? (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: data.description_html,
                                }}
                            />
                        ) : (
                            '—'
                        )}
                    </div>
                </div>

                <Separator className="bg-beta/10 dark:bg-light/10" />

                <div className="flex items-center justify-between">
                    <span className="text-sm text-beta/50 dark:text-light/50">
                        <TransText en="Difficulty" fr="Difficulty" ar="Difficulty" />
                    </span>
                    <Badge className="bg-alpha capitalize text-beta">
                        {data.difficulty}
                    </Badge>
                </div>

                <Separator className="bg-beta/10 dark:bg-light/10" />

                <ReviewRow
                    label={<TransText en="XP reward" fr="XP reward" ar="XP reward" />}
                    value={data.xp_reward}
                />
                <ReviewRow
                    label={<TransText en="Order" fr="Order" ar="Order" />}
                    value={data.order_index}
                />

                <Separator className="bg-beta/10 dark:bg-light/10" />

                <div className="space-y-2">
                    <ReviewRow
                        label={
                            <TransText
                                en="Rules file"
                                fr="Rules file"
                                ar="Rules file"
                            />
                        }
                        value={data.rulesFileName || 'Pasted JSON'}
                    />
                    {data.rules && (
                        <pre className="custom-scrollbar max-h-40 overflow-auto rounded-md border border-beta/10 bg-beta/5 p-3 text-xs text-beta dark:text-light">
                            {JSON.stringify(data.rules, null, 2)}
                        </pre>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
