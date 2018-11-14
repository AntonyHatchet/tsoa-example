export interface ReportVskAgentLockCommAvrData {
    isn: number;
    act_item_id: number;
    policy_no: string;
    policy_id: string;
    act_id: number;
    act_no: string;
    agent_agreement_id: number;
    bank_statement_item_id: number;
    source_no: string;
    act_item_status: string;
    policy_issue_date: string;
    policy_begin_date: string;
    policy_end_date: string;
    amount_cur: number;
    comm_cur_total: number;
    comm_rate: number;
    holder_name: string;
    policy_holder_id: number;
    agent_id: number;
    policy_currency_id: number;
    policy_currency_code: string;
    item_status_id: number;
    item_substatus_id: number;
    main_policy_id: string;
    oper_status: number;
    sys_id: number;
    case_id: string;
    flag: number;
}

export interface ReportVskAgentLockCommAvr {
    data: ReportVskAgentLockCommAvrData[];
    pageCount: number;
}

