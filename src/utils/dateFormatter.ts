export function dateFormatter(date: string){
    if(!date) return 'Indisponível';

    const d = new Date(date);
    if(isNaN(d.getTime())) return 'Indisponível';

    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();

    return `${day}/${month}/${year}`;
}