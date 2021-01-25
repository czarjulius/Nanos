class Calculation{
    static calc_vat_amount(invoice_amount) {
        let vat_amount = ((7.7/100) * invoice_amount)
    return vat_amount

    }

    static calc_net_amount(invoice_amount, vat_amount) {
        let net_amount = invoice_amount -  vat_amount
    return net_amount
    }
}

export default Calculation;