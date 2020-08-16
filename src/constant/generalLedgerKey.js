export const GENERAL_LEDGER = 'General ledger'
export const TRIAL_BALANCE = 'Trial balance'
export const PROFIT_AND_LOSS = 'Profit and loss'
export const BALANCE_SHEET = 'Balance sheet'

export const GL_SINGLE = 'Local'
export const GL_MULTIPLE = 'Multiple'

export const localeGeneralLedgerKey = [
  {
    key: 'date',
    label: 'Date',
    fr_label: 'Date',
    width: '100px',
    align: 'left'
  },
  {
    key: 'invoice_no',
    label: 'Invoice No.',
    fr_label: 'N° facture',
    width: '120px',
    align: 'left'
  },
  {
    key: 'voucher_no',
    label: 'Voucher No.',
    fr_label: 'N° écriture',
    width: '120px',
    align: 'left'
  },
  {
    key: 'explanation',
    label: 'Explanation',
    fr_label: 'Libellé',
    width: '',
    align: 'left'
  },
  {
    key: 'debit_amount',
    label: 'Debit',
    fr_label: 'Débit',
    width: '160px',
    align: 'right'
  },
  {
    key: 'credit_amount',
    label: 'Credit',
    fr_label: 'Crédit',
    width: '160px',
    align: 'right'
  },
  {
    key: 'balance',
    label: 'Balance',
    fr_label: 'Solde',
    width: '160px',
    align: 'right'
  }
]

export const multipleGeneralLedgerKey = [
  {
    key: 'date',
    label: 'Date',
    fr_label: 'Date',
    width: '90px',
    align: 'left'
  },
  {
    key: 'invoice_no',
    label: 'Invoice No.',
    fr_label: 'N° facture',
    width: '120px',
    align: 'left'
  },
  {
    key: 'voucher_no',
    label: 'Voucher No.',
    fr_label: 'N° écriture',
    width: '120px',
    align: 'left'
  },
  {
    key: 'explanation',
    label: 'Explanation',
    fr_label: 'Libellé',
    width: '',
    align: 'left'
  },
  {
    key: 'currency',
    label: 'Currency',
    fr_label: 'Devise',
    width: '100px',
    align: 'left'
  },
  {
    key: 'currency_amount',
    label: 'Currency amount',
    fr_label: 'Montant en devise',
    width: '100px',
    align: 'right'
  },
  {
    key: 'exchange_rate',
    label: 'Exchange rate',
    fr_label: 'Taux de change',
    width: '100px',
    align: 'right'
  },
  {
    key: 'debit_amount',
    label: 'Debit',
    fr_label: 'Débit',
    width: '100px',
    align: 'right'
  },
  {
    key: 'credit_amount',
    label: 'Credit',
    fr_label: 'Crédit',
    width: '100px',
    align: 'right'
  },
  {
    key: 'balance_originale',
    label: 'Balance',
    fr_label: 'Solde en devise originale',
    width: '120px',
    align: 'right'
  },
  {
    key: 'balance_locale',
    label: 'Balance',
    fr_label: 'Solde en devise locale',
    width: '120px',
    align: 'right'
  }
]

export const monthOptions = {
  cn: [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月'
  ],
  en: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ],
  fr: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avr.',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.'
  ]
}
