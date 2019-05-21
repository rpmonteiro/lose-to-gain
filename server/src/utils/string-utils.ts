export const sanitizeGoogleEmail = (email?: string) => {
    return (email || '').toLowerCase().replace('.', '')
}
