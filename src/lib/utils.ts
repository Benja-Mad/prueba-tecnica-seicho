export const formatSeniority = (seniority: string): string => {
    return seniority
        .replace('_', '-')
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('-')
}
