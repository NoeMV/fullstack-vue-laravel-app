<?php

namespace App\Http\Requests\V1;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateInvoiceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'customer_id' => ['required', 'integer'],
            'amount' => ['required', 'numeric'],
            'status' => ['required', Rule::in(['B', 'P', 'V'])],
            'billed_date' => ['required', 'date_format:Y-m-d H:i:s'],
            'paid_date' => ['nullable', 'date_format:Y-m-d H:i:s']
        ];
    }

    public function prepareforValidation(){
        $this->merge([
            'customer_id' => $this->customerId,
            'billed_date' => $this->billedDate,
            'paid_date' => $this->paidDate
        ]);
    }
}
