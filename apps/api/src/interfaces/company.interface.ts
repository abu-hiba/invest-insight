 export interface Company {
    symbol: string,
    companyName?: string,
    exchange: string,
    industry?: string,
    website?: string,
    description?: string,
    CEO?: string,
    securityName: string,
    issueType?: string,
    sector?: string,
    primarySicCode?: number,
    employees?: number,
    tags?: string[],
    address?: string,
    address2?: string,
    state?: string,
    region?: string,
    zip?: string,
    country?: string,
    phone?: string,
}

export interface Sector { name: string }

export interface Quote {
    symbol: string,
    companyName: string,
    open: number,
    close: number,
    high: number,
    low: number
}

export interface Exchange {
    exchange: string,
    region: string,
    description: string,
    mic: string,
    exchangeSuffix: string
}

export interface InternationalSymbol {
    symbol: string,
    exchange: string,
    name: string,
    date: string,
    type: string,
    iexId: string,
    region: string,
    currency: string,
    isEnabled: boolean
}