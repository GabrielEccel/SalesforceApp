export function sanitizeContactName(name: string){
    return name.split(' ')
}

export function sanitizeContactEmail(email: string) {
    return /^[^@]+@[a-zA-Z]+\.com$/.test(email);
}

export function sanitizeContactPhone(phone: string){
    return /[a-zA-Z]/.test(phone)
}