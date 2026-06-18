import { Head, router, useForm } from '@inertiajs/react';
import {
    Clock,
    Edit3,
    ImageIcon,
    Layers3,
    Plus,
    Save,
    Trash2,
    X,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const emptyCourseForm = {
    title: '',
    slug: '',
    description: '',
    thumbnail: null,
    estimated_duration_days: '',
    status: 'draft',
};

const slugify = (value) =>
    value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

const courseStatus = (status) => (status === 'published' ? 'assigned' : status);

const courseStatusLabel = (status) =>
    ({
        draft: 'Draft',
        assigned: 'Assigned',
        archived: 'Archived',
    })[courseStatus(status)] ?? 'Draft';

const normalizeCoursePayload = (data) => {
    const payload = { ...data };

    if (!(payload.thumbnail instanceof File)) {
        delete payload.thumbnail;
    }

    if (payload.estimated_duration_days === '') {
        payload.estimated_duration_days = null;
    }

    return payload;
};

export default function CoursesIndex({ courses = [] }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [courseToDelete, setCourseToDelete] = useState(null);
    const [deleteProcessing, setDeleteProcessing] = useState(false);

    const form = useForm(emptyCourseForm);
    const isEditing = Boolean(editingCourse);

    const stats = useMemo(
        () => ({
            total: courses.length,
            assigned: courses.filter((course) => courseStatus(course.status) === 'assigned')
                .length,
            drafts: courses.filter((course) => course.status === 'draft')
                .length,
        }),
        [courses],
    );

    const openCreateModal = () => {
        setEditingCourse(null);
        form.clearErrors();
        form.setData(emptyCourseForm);
        setModalOpen(true);
    };

    const openEditModal = (course) => {
        setEditingCourse(course);
        form.clearErrors();
        form.setData({
            title: course.title ?? '',
            slug: course.slug ?? '',
            description: course.description ?? '',
            thumbnail: null,
            estimated_duration_days: course.estimated_duration_days ?? '',
            status: courseStatus(course.status) ?? 'draft',
        });
        setModalOpen(true);
    };

    const closeCourseModal = () => {
        setModalOpen(false);
        setEditingCourse(null);
        form.clearErrors();
        form.setData(emptyCourseForm);
    };

    const updateField = (field, value) => {
        form.setData(field, value);

        if (field === 'title' && !isEditing) {
            form.setData('slug', slugify(value));
        }
    };

    const submitCourse = (event) => {
        event.preventDefault();

        form.transform(normalizeCoursePayload);

        if (isEditing) {
            form.post(`/courses/${editingCourse.id}/update`, {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: closeCourseModal,
                onFinish: () => form.transform((data) => data),
            });

            return;
        }

        form.post('/courses', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: closeCourseModal,
            onFinish: () => form.transform((data) => data),
        });
    };

    const deleteCourse = () => {
        if (!courseToDelete) {
            return;
        }

        setDeleteProcessing(true);
        router.delete(`/courses/${courseToDelete.id}`, {
            preserveScroll: true,
            onFinish: () => setDeleteProcessing(false),
            onSuccess: () => setCourseToDelete(null),
        });
    };

    return (
        <>
            <Head title="Courses" />

            <div className="min-h-full bg-muted/20 px-4 py-5 text-foreground sm:px-6 lg:px-8">
                <div className="mx-auto flex max-w-7xl flex-col gap-5">
                    <header className="flex flex-col justify-between gap-4 rounded-lg border border-border bg-background p-5 shadow-xs md:flex-row md:items-center">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs font-medium tracking-wide text-alpha uppercase">
                                <Layers3 className="size-4" />
                                Coach workspace
                            </div>
                            <h1 className="text-2xl font-semibold text-foreground">
                                Courses
                            </h1>
                            <p className="max-w-2xl text-sm text-muted-foreground">
                                Manage reusable courses before assigning them to
                                promotions.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <div className="grid grid-cols-3 gap-2 text-sm">
                                <Metric label="Total" value={stats.total} />
                                <Metric label="Assigned" value={stats.assigned} />
                                <Metric label="Drafts" value={stats.drafts} />
                            </div>
                            <Button
                                type="button"
                                className="bg-alpha"
                                onClick={openCreateModal}
                            >
                                <Plus />
                                New course
                            </Button>
                        </div>
                    </header>

                    <section className="rounded-lg border border-border bg-background shadow-xs">
                        <div className="flex items-center justify-between gap-3 border-b border-border p-5">
                            <div>
                                <h2 className="text-lg font-semibold text-foreground">
                                    Course catalog
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    {courses.length} course
                                    {courses.length === 1 ? '' : 's'} ready to
                                    manage.
                                </p>
                            </div>
                        </div>

                        {courses.length === 0 ? (
                            <div className="flex min-h-96 flex-col items-center justify-center px-6 text-center">
                                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-alpha text-black">
                                    <Plus className="size-5" />
                                </div>
                                <h3 className="text-base font-semibold text-foreground">
                                    No courses yet
                                </h3>
                                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                                    Create the first course and it will show up
                                    here as a catalog item.
                                </p>
                                <Button
                                    type="button"
                                    className="mt-4 bg-alpha"
                                    onClick={openCreateModal}
                                >
                                    <Plus />
                                    Create course
                                </Button>
                            </div>
                        ) : (
                            <div className="grid gap-4 p-4">
                                {courses.map((course) => (
                                    <CourseCard
                                        key={course.id}
                                        course={course}
                                        onEdit={() => openEditModal(course)}
                                        onDelete={() =>
                                            setCourseToDelete(course)
                                        }
                                    />
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </div>

            <CourseModal
                open={modalOpen}
                onOpenChange={(open) => {
                    if (!open) {
                        closeCourseModal();
                    } else {
                        setModalOpen(true);
                    }
                }}
                form={form}
                isEditing={isEditing}
                onSubmit={submitCourse}
                onUpdateField={updateField}
            />

            <Dialog
                open={Boolean(courseToDelete)}
                onOpenChange={(open) => !open && setCourseToDelete(null)}
            >
                <DialogContent className="border-alpha/30">
                    <DialogHeader>
                        <DialogTitle>Delete course</DialogTitle>
                        <DialogDescription>
                            Delete "{courseToDelete?.title ?? 'this course'}"?
                            This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setCourseToDelete(null)}
                            disabled={deleteProcessing}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={deleteCourse}
                            disabled={deleteProcessing}
                        >
                            {deleteProcessing ? 'Deleting...' : 'Delete'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

function CourseModal({
    open,
    onOpenChange,
    form,
    isEditing,
    onSubmit,
    onUpdateField,
}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? 'Edit course' : 'Create course'}
                    </DialogTitle>
                    <DialogDescription>
                        {isEditing
                            ? 'Update the reusable course shell.'
                            : 'Create a reusable course for the catalog.'}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Title" error={form.errors.title}>
                            <Input
                                value={form.data.title}
                                onChange={(event) =>
                                    onUpdateField('title', event.target.value)
                                }
                                placeholder="Full-Stack JavaScript"
                            />
                        </Field>

                        <Field label="Slug" error={form.errors.slug}>
                            <Input
                                value={form.data.slug}
                                onChange={(event) =>
                                    onUpdateField(
                                        'slug',
                                        slugify(event.target.value),
                                    )
                                }
                                placeholder="full-stack-javascript"
                            />
                        </Field>
                    </div>

                    <Field label="Description" error={form.errors.description}>
                        <textarea
                            value={form.data.description}
                            onChange={(event) =>
                                onUpdateField('description', event.target.value)
                            }
                            placeholder="What learners will build, practice, and master."
                            className="min-h-28 w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                        />
                    </Field>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field
                            label="Banner image"
                            error={form.errors.thumbnail}
                        >
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(event) =>
                                    onUpdateField(
                                        'thumbnail',
                                        event.target.files?.[0] ?? null,
                                    )
                                }
                            />
                        </Field>

                        <Field
                            label="Estimated duration"
                            error={form.errors.estimated_duration_days}
                        >
                            <Input
                                type="number"
                                min="1"
                                value={form.data.estimated_duration_days}
                                onChange={(event) =>
                                    onUpdateField(
                                        'estimated_duration_days',
                                        event.target.value,
                                    )
                                }
                                placeholder="10 days"
                            />
                        </Field>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Status" error={form.errors.status}>
                            <Select
                                value={form.data.status}
                                onValueChange={(value) =>
                                    onUpdateField('status', value)
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="assigned">
                                        Assigned
                                    </SelectItem>
                                    <SelectItem value="archived">
                                        Archived
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            <X />
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={form.processing}
                            className="bg-alpha"
                        >
                            {isEditing ? <Save /> : <Plus />}
                            {form.processing
                                ? 'Saving...'
                                : isEditing
                                  ? 'Save changes'
                                  : 'Create course'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

function Metric({ label, value }) {
    return (
        <div className="min-w-20 rounded-md border border-border bg-muted/40 px-3 py-2">
            <div className="text-lg leading-none font-semibold text-foreground">
                {value}
            </div>
            <div className="mt-1 text-xs text-muted-foreground">{label}</div>
        </div>
    );
}

function Field({ label, error, children }) {
    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            {children}
            <InputError message={error} />
        </div>
    );
}

function CourseCard({ course, onEdit, onDelete }) {
    return (
        <article className="group relative overflow-hidden rounded-lg border border-border bg-card shadow-xs transition-colors hover:border-alpha/60">
            <div className="grid h-56 sm:grid-cols-[1fr_34%]">
                <div className="flex flex-col justify-between gap-8 p-5">
                    <div>
                        <p className="text-xs font-medium text-muted-foreground">
                            Created by {course.creator_name ?? 'Local Coach'}
                        </p>
                        <h3 className="mt-2 text-2xl leading-tight font-semibold text-foreground transition-colors group-hover:text-alpha">
                            {course.title}
                        </h3>
                        <span className="mt-3 inline-flex w-fit rounded-full border border-border bg-muted/40 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                            {courseStatusLabel(course.status)}
                        </span>
                    </div>

                    {course.estimated_duration_days && (
                        <span className="inline-flex w-fit items-center gap-2 text-xs font-medium text-muted-foreground">
                            <Clock className="size-4 text-alpha" />
                            {course.estimated_duration_days} days
                        </span>
                    )}
                </div>

                <BannerVisual imageUrl={course.thumbnail_url} />
            </div>

            <div className="absolute right-3 bottom-3 flex gap-2">
                <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    onClick={onEdit}
                    aria-label="Edit course"
                    className="bg-background/90 backdrop-blur"
                >
                    <Edit3 />
                </Button>
                <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={onDelete}
                    aria-label="Delete course"
                >
                    <Trash2 />
                </Button>
            </div>
        </article>
    );
}

function BannerVisual({ imageUrl }) {
    const [imageFailed, setImageFailed] = useState(false);

    return (
        <div className="relative h-56 overflow-hidden bg-muted">
            {imageUrl && !imageFailed ? (
                <>
                    <img
                        src={imageUrl}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-35 blur-md"
                    />
                    <img
                        src={imageUrl}
                        alt=""
                        onError={() => setImageFailed(true)}
                        className="relative h-full w-full object-contain"
                    />
                </>
            ) : (
                <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,var(--color-alpha)_0%,var(--color-alpha)_42%,var(--color-background)_42%,var(--color-background)_100%)]">
                    <ImageIcon className="size-10 text-foreground/70" />
                </div>
            )}
        </div>
    );
}

CoursesIndex.layout = {
    breadcrumbs: [
        {
            title: 'Courses',
            href: '/courses',
        },
    ],
};
