class CPF {
  constructor(value) {
    this.value = value;
  }

  static validate(cpfNumber) {
    const cpfNumbers = cpfNumber.replace(/[^\d]/g, "");
    if (cpfNumbers.length !== 11) {
      throw new Error("CPF invalid");
    }
    return cpfNumbers;
  }

  getValue() {
    return this.value;
  }
}

module.exports = CPF;
