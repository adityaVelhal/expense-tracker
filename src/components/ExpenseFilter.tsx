import categories from "../categories";

interface FilterProps {
    onSelectChange: (category: string) => void
}

const ExpenseFilter = ({  onSelectChange }: FilterProps) => {
    return (
        <select className="form-select mt-3" onChange={(e) => onSelectChange(e.target.value)}>
            <option value="">All</option>
            {categories.map((category) => (
                <option key={category} value={category}>
                    {category}
                </option>
            ))}
        </select>
    );
};

export default ExpenseFilter;
