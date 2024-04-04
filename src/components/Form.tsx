import { z } from 'zod';
import { useForm } from 'react-hook-form';
import categories from '../categories';
import { zodResolver } from '@hookform/resolvers/zod';

interface FormProps {
    onSubmit: (expense: ExpenseFormData) => void;
}

const schema = z.object({
    description: z
        .string()
        .min(3, 'Description should have atleast 3 characters')
        .max(50),
    amount: z
        .number({ invalid_type_error: 'Amount is required' })
        .min(0.01, 'Minimum allowed amout is 0.01')
        .max(100_000, 'Max amount allowed is 1,00,000'),
    category: z.enum(categories),
});

type ExpenseFormData = z.infer<typeof schema>;

const Form = ({ onSubmit }: FormProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { isValid, errors },
    } = useForm<ExpenseFormData>({ resolver: zodResolver(schema) });

    return (
        <form onSubmit={handleSubmit((data) => {
            onSubmit(data)
            reset()
        })}>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">
                    Description
                </label>
                <input
                    {...register('description')}
                    id="description"
                    type="text"
                    className="form-control"
                />
                {errors.description && (
                    <p className="text-danger">{errors.description.message}</p>
                )}
            </div>
            <div className="mb-3">
                <label htmlFor="amount" className="form-label">
                    Amount
                </label>
                <input
                    {...register('amount', { valueAsNumber: true })}
                    id="amount"
                    type="number"
                    className="form-control"
                />
                {errors.amount && (
                    <p className="text-danger">{errors.amount.message}</p>
                )}
            </div>
            <div className="mb-3">
                <label htmlFor="category" className="form-label">
                    Category
                </label>
                <select
                    {...register('category')}
                    className="form-select"
                    id="category"
                >
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                {errors.category && (
                    <p className="text-danger">{errors.category.message}</p>
                )}
            </div>
            <button className="btn btn-primary" type="submit">
                Submit
            </button>
        </form>
    );
};

export default Form;
