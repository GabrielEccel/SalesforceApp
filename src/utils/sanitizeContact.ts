export function sanitizeContactName(name: string) {
    return name.split(' ')
}

export function sanitizeContactEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function sanitizeContactPhone(phone: string) {
    return /[a-zA-Z]/.test(phone)
}