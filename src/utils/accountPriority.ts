export function accountPriority(text: string){
    if(text === 'Low'){
        return 'Baixa';
    }
    else if (text === 'Medium'){
        return 'Média';
    }
    else if (text === 'High'){
        return 'Alta';
    }
    else {
        return text;
    }
}