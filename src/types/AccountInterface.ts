export interface accountInterface{
    Name: string,
    Id: string,
    Phone: string,
    BillingAddress: {
        city: string,
        country: string,
        countryCode: string,
        postalCode: string,
        state: string,
        stateCode: string,
        street: string
    },
    Website: string,
    Type: string,
    Active__c: string,
    Industry: string,
    CustomerPriority__c: string
}

