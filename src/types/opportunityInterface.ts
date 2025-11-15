export interface opportunityInterface{
    Name: string,
    Id: string,
    CloseDate: string,
    StageName: string,
    Probability: number,
    Type: string,
    AccountId: string,
    Amount: number,
    ExpectedRevenue: number,
    Account:{
        Name: string
    }
}