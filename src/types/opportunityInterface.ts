export interface opportunityInterface {
    Name: string,
    Id: string,
    CloseDate: string,
    StageName: string,
    Probability: number,
    Type: string,
    AccountId: string,
    Amount: number,
    ExpectedRevenue: number,
    Pricebook2Id: string,
    Account: {
        Name: string
    },
    Pricebook2: {
        Name: string
    },
    OpportunityLineItems?: {
        totalSize: number
    }
}

export interface opportunityPathInterface {
    fields: {
        name: string
        picklistValues: {
            active: boolean,
            label: string
        }[]
    }[]
}

export interface createOpportunityResponse {
    id: string,
    success: boolean,
    errors: []
}