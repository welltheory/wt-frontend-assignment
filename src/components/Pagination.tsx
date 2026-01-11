
interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
    const handlePrev = () => {
        if (page > 1) onPageChange(page - 1);
    };

    const handleNext = () => {
        if (page < totalPages) onPageChange(page + 1);
    };

    return (
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <button disabled={page === 1} onClick={handlePrev}>
                Prev
            </button>

            <span>
                Page {page} of {totalPages}
            </span>

            <button disabled={page === totalPages} onClick={handleNext}>
                Next
            </button>
        </div>
    );
}
