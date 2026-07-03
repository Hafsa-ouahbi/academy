import React, { useState } from 'react';
import { router, usePage } from '@inertiajs/react';

import ConceptTopbar from '../courses/partials/concept_builder/ConceptTopbar';
import CourseStructureSidebar from '../courses/partials/concept_builder/CourseStructureSidebar';
import TopicWorkspace from '../courses/partials/concept_builder/TopicWorkspace';

export default function Concept() {
    const {
        concept: serverConcept,
        topics: serverTopics = [],
        course_id: fallbackCourseId = null,
    } = usePage().props;

    const [concept] = useState(serverConcept || {
        id: null,
        course_id: fallbackCourseId,
        title: 'New Concept',
        description: '',
    });

    const [topics, setTopics] = useState(() =>
        serverTopics.map((topic) => ({
            id: topic.id,
            title: topic.title || '',
            description: topic.description || '',
            order_index: topic.order_index,
            theory: topic.theory ?? topic.lessons?.[0]?.content ?? '',
            videoUrl: topic.videoUrl ?? topic.lessons?.[0]?.content_url ?? '',
            videoFile: null,
            resources: topic.resources || [],
            duration_minutes: topic.duration_minutes ?? null,
            difficulty: topic.difficulty || 'easy',
            status: topic.status || 'draft',
            hasQuiz: Boolean(topic.hasQuiz),
            hasExercise: Boolean(topic.hasExercise),
        }))
    );

    const [activeTopicId, setActiveTopicId] = useState(
        topics[0]?.id ?? null
    );

    const activeTopic =
        topics.find((topic) => topic.id === activeTopicId) || null;

    const addTopic = () => {
        const newId = topics.length
            ? Math.max(...topics.map((topic) => topic.id)) + 1
            : 1;

        const newTopic = {
            id: newId,
            title: '',
            description: '',
            order_index: topics.length + 1,
            theory: '',
            videoUrl: '',
            videoFile: null,
            resources: [],
            duration_minutes: null,
            difficulty: 'easy',
            status: 'draft',
            hasQuiz: false,
            hasExercise: false,
        };

        setTopics((prev) => [...prev, newTopic]);
        setActiveTopicId(newId);
    };

    const updateTopic = (topicId, updates) => {
        setTopics((prev) =>
            prev.map((topic) =>
                topic.id === topicId
                    ? { ...topic, ...updates }
                    : topic
            )
        );
    };

    const handleSave = () => {
        const payload = {
            course_id: concept.course_id ?? fallbackCourseId, // TODO: replace with course selector when the UI supports choosing a course.
            title: concept.title || 'New Concept',
            description: concept.description || '',
            topics: topics.map((topic, index) => ({
                id: topic.id,
                title: topic.title || '',
                description: topic.description || '',
                order_index: index + 1,
                theory: topic.theory || '',
                videoUrl: topic.videoUrl || '',
                duration_minutes: topic.duration_minutes ?? null,
                difficulty: topic.difficulty || 'easy',
                status: topic.status || 'draft',
                resources: topic.resources || [],
                hasQuiz: Boolean(topic.hasQuiz),
                hasExercise: Boolean(topic.hasExercise),
            })),
        };

        if (concept.id) {
            router.put(`/concept/${concept.id}`, payload);
            return;
        }

        router.post('/concept', payload);
    };

    return (
        <div className="flex h-screen flex-col overflow-hidden bg-background text-foreground">
            <ConceptTopbar concept={concept} onSave={handleSave} />

            <div className="flex flex-1 overflow-hidden">
                <CourseStructureSidebar
                    concept={concept}
                    topics={topics}
                    activeTopicId={activeTopicId}
                    onSelectTopic={setActiveTopicId}
                    onAddTopic={addTopic}
                />

                <TopicWorkspace
                    topic={activeTopic}
                    onUpdateTopic={(updates) => {
                        if (!activeTopic) return;
                        updateTopic(activeTopic.id, updates);
                    }}
                />
            </div>
        </div>
    );
}
