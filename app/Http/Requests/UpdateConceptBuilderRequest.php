<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateConceptBuilderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'topics' => ['nullable', 'array'],
            'topics.*.id' => ['nullable', 'integer'],
            'topics.*.title' => ['nullable', 'string', 'max:255'],
            'topics.*.description' => ['nullable', 'string'],
            'topics.*.order_index' => ['nullable', 'integer'],
            'topics.*.theory' => ['nullable', 'string'],
            'topics.*.videoUrl' => ['nullable', 'string', 'max:2048'],
            'topics.*.duration_minutes' => ['nullable', 'integer', 'min:0'],
            'topics.*.difficulty' => ['nullable', 'string', 'max:50'],
            'topics.*.status' => ['nullable', 'string', 'max:50'],
        ];
    }
}
