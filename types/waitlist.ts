export interface WaitlistEntry {
    id?: string;
    created_at?: string;
    full_name: string;
    email: string;
    company_name: string;
    company_size: string;
    seo_spend: string;
    frustration?: string;
    source?: string;
    confirmed?: boolean;
    position?: number;
}
