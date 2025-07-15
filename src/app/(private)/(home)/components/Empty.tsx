

export const Empty = () => {
    return (
        <div className="text-center py-8">
            <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
                Nenhum paciente encontrado
            </h3>
            <p className="mt-1 text-sm text-gray-500">
                Nenhum paciente corresponde aos filtros aplicados.
            </p>
        </div>
    )
}