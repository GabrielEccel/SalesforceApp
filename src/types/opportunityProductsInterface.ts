export interface opportunityProductsInterface {
    Id: string,
    OpportunityId: string,
    PricebookEntryId: string,
    Quantity: number,
    UnitPrice: number,
    TotalPrice: number,
    Product2Id: string,
    Product2: {
        Name: string
    }
}