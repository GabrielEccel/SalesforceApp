export default function currencyFormatter(value: string){
    return Number(value.replace(',', '.'))
}