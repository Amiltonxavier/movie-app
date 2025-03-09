function compactNumberFormat(amount: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact",
        compactDisplay: "short",
        maximumFractionDigits: 1,
    }).format(amount);
}

function getRating(isAdult: boolean) {
    return isAdult ? 'R' : 'PG-13';
}



function formatDate(date: string) {
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(new Date(date));
}


const humamizeRuntime = (runtime: number) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
};

export { compactNumberFormat, getRating, formatDate, humamizeRuntime };