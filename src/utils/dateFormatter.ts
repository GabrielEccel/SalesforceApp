export function dateFormatter(date: string){
    if(!date) return 'Indisponível';

    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
}