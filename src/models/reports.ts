export interface BaseReport {
    agent_nsi: string; // НСИ агента
    agent: string; // Агент (наименование)
    agent_agreement_num: string; // Агентский договор (номер)
    agent_agreement_id:  number; // ID агентского договора
    policy_no: string; // Номер договора (полиса)
}

export interface ReportLKAgentSaleData extends BaseReport {
    ins_type: string; // Вид (страхования)
    insurant: string; // Страхователь (ФИО / наименование)
    policy_begin_date: string; // Дата начала ответственности
    policy_end_date: string; // Дата окончания ответственности
    policy_gpw: number; // Страховая премия начисленная (RUR)
    commission: number; // КВ начисленное (RUR)
    created: number; // Дата создания записи
}

export interface ReportLKAgentProlongationData extends BaseReport {
    ins_type: string; // Вид (страхования)
    insurant: string; // Страхователь (ФИО / наименование)
    policy_begin_date: string; // Дата начала ответственности
    policy_end_date: string; // Дата окончания ответственности
    policy_gpw: number; // Страховая премия начисленная (RUR)
    commission: number; // КВ начисленное (RUR)
    created: number; // Дата создания записи
}

export interface ReportLKAgentNextPaymentData extends BaseReport {
    insurant: string; // Страхователь
    sum_to_pay: number; // Сумма к оплате (в чём неизвестно)
    date_to_pay: string; // Дата оплаты
    created: string; // Дата создания записи
}

export interface ReportLKAgentSale {
    success: boolean;
    error?: any;
    data?: ReportLKAgentSaleData[];
    pageCount?: number;
}

export interface ReportLKAgentProlongation {
    success: boolean;
    error?: any;
    data?: ReportLKAgentProlongationData[];
    pageCount?: number;
}

export interface ReportLKAgentNextPayment {
    success: boolean;
    error?: any;
    data?: ReportLKAgentNextPaymentData[];
    pageCount?: number;
}

