export default function removeLineBreak(text: string){
    return text.replace(/\n/g, ' - ')
}