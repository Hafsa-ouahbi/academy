<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreConceptBuilderRequest;
use App\Http\Requests\UpdateConceptBuilderRequest;
use App\Models\Concept;
use App\Models\Course;
use App\Models\Topic;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ConceptBuilderController extends Controller
{
    public function create()
    {
        $course = Course::query()->orderBy('id')->first();

        return Inertia::render('Concepts/index', [
            'concept' => null,
            'topics' => [],
            'course_id' => $course?->id,
            'courses' => Course::query()
                ->orderBy('title')
                ->get(['id', 'title']),
        ]);
    }

    public function store(StoreConceptBuilderRequest $request)
    {
        $validated = $request->validated();
        $courseId = $validated['course_id'] ?? Course::query()->orderBy('id')->value('id');

        if (! $courseId) {
            return back()->withErrors([
                'course_id' => 'A course is required before creating a concept.',
            ]);
        }

        $concept = DB::transaction(function () use ($validated, $courseId) {
            $concept = Concept::create([
                'course_id' => $courseId,
                'title' => $validated['title'],
                'description' => $validated['description'] ?? null,
                'order_index' => (Concept::where('course_id', $courseId)->max('order_index') ?? 0) + 1,
            ]);

            $this->syncTopics($concept, $validated['topics'] ?? []);

            return $concept;
        });

        return redirect()->route('concept.edit', $concept);
    }

    public function edit(Concept $concept)
    {
        $concept->load([
            'topics' => fn ($query) => $query->orderBy('order_index'),
            'topics.lessons' => fn ($query) => $query->orderBy('order_index'),
            'topics.quizzes',
            'topics.exercises',
        ]);

        return Inertia::render('Concepts/index', [
            'concept' => [
                'id' => $concept->id,
                'course_id' => $concept->course_id,
                'title' => $concept->title,
                'description' => $concept->description,
            ],
            'topics' => $concept->topics->map(fn (Topic $topic) => $this->transformTopic($topic))->values(),
        ]);
    }

    public function update(UpdateConceptBuilderRequest $request, Concept $concept)
    {
        $validated = $request->validated();

        DB::transaction(function () use ($concept, $validated) {
            $concept->update([
                'title' => $validated['title'],
                'description' => $validated['description'] ?? null,
            ]);

            $this->syncTopics($concept, $validated['topics'] ?? []);
        });

        return redirect()
            ->route('concept.edit', $concept)
            ->with('success', 'Concept saved.');
    }

    private function syncTopics(Concept $concept, array $topics): void
    {
        $keptTopicIds = [];

        foreach (array_values($topics) as $index => $topicData) {
            $topic = null;

            if (! empty($topicData['id'])) {
                $topic = $concept->topics()
                    ->whereKey($topicData['id'])
                    ->first();
            }

            if (! $topic) {
                $topic = new Topic(['concept_id' => $concept->id]);
            }

            $topic->fill([
                'title' => ($topicData['title'] ?? '') ?: 'Untitled lesson',
                'description' => $topicData['description'] ?? null,
                'order_index' => $index + 1,
            ]);
            $topic->concept_id = $concept->id;
            $topic->save();

            $keptTopicIds[] = $topic->id;
            $this->syncMainLesson($topic, $topicData);
        }

        $concept->topics()
            ->whereNotIn('id', $keptTopicIds)
            ->delete();
    }

    private function syncMainLesson(Topic $topic, array $topicData): void
    {
        $lesson = $topic->lessons()
            ->orderBy('order_index')
            ->first();

        $topic->lessons()->updateOrCreate(
            ['id' => $lesson?->id],
            [
                'title' => $topic->title ?: 'Lesson',
                'description' => $topic->description,
                'content_type' => 'mixed',
                'content' => $topicData['theory'] ?? null,
                'content_url' => $topicData['videoUrl'] ?? null,
                'duration_minutes' => $topicData['duration_minutes'] ?? null,
                'order_index' => 1,
            ]
        );
    }

    private function transformTopic(Topic $topic): array
    {
        $lesson = $topic->lessons->sortBy('order_index')->first();

        return [
            'id' => $topic->id,
            'title' => $topic->title,
            'description' => $topic->description,
            'order_index' => $topic->order_index,
            'theory' => $lesson?->content ?? '',
            'videoUrl' => $lesson?->content_url ?? '',
            'duration_minutes' => $lesson?->duration_minutes,
            'difficulty' => 'easy',
            'status' => 'draft',
            'resources' => [],
            'hasQuiz' => $topic->quizzes->isNotEmpty(),
            'hasExercise' => $topic->exercises->isNotEmpty(),
            'lessons' => $topic->lessons->values(),
        ];
    }
}
