module.exports = {
  incomeTax: function(x) {
    const allowance = 11500
    if (x > allowance && x < 45001) {
      let tax_x = x - allowance
      let income_tax = tax_x * 0.2
      return income_tax
    } else if (x >= 45001 && x < 100001) {
      let higher_tax_x = x - allowance - 33500
      let basic_tax_x = x - higher_tax_x - allowance
      let income_tax = higher_tax_x * 0.4 + basic_tax_x * 0.2
      return income_tax
    } else if (x >= 100001 && x < 123000) {
      let adjustedAllowance = allowance - (x - 100000) / 2
      let higher_tax_x = x - adjustedAllowance - 33500
      let basic_tax_x = x - higher_tax_x - adjustedAllowance
      let income_tax = higher_tax_x * 0.4 + basic_tax_x * 0.2
      return income_tax
    } else if (x >= 123000 && x < 150001) {
      let higher_tax_x = x - 33500
      let basic_tax_x = x - higher_tax_x
      let income_tax = higher_tax_x * 0.4 + basic_tax_x * 0.2
      return income_tax
    } else if (x >= 150001 && x > allowance) {
      let additional_tax_x = x - 150000
      let higher_tax_x = x - additional_tax_x - 33500
      let basic_tax_x = x - additional_tax_x - higher_tax_x
      let income_tax =
        additional_tax_x * 0.45 + higher_tax_x * 0.4 + basic_tax_x * 0.2
      return income_tax
    } else {
      return 0
    }
  },
  natIns: function(x) {
    if (x <= 8164) {
      return 0
    } else if (x > 8164 && x <= 45032) {
      return (x - 8164) * 0.12
    } else {
      let top_x = x - 45032
      let bottom_x = x - top_x - 8164
      let niTax = bottom_x * 0.12 + top_x * 0.02
      return niTax
    }
  },
  afterTax: function(x) {
    return x - this.natIns(x) - this.incomeTax(x)
  }
}
