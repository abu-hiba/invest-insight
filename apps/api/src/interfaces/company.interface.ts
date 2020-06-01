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