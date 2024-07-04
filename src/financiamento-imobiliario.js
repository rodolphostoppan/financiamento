class FinanciamentoImobiliario {
  constructor() {
    this.CPF = "";
    this.birthDate = new Date();
  }

  setCPF(cpfNumber) {
    this.CPF = cpfNumber;
  }

  getCPF() {
    return this.CPF;
  }

  validateCPF(cpfNumber) {
    const cpfNumbers = cpfNumber.replace(/[^\d]/g, "");
    if (cpfNumbers.length != 11) {
      throw new Error("CPF invalid");
    }
    return true;
  }

  setBirthDate(birthDate) {
    this.birthDate = birthDate;
  }

  getBirthDate() {
    return this.birthDate;
  }

  validateBirthDate(dateString) {
    const [day, month, year] = dateString.split("/").map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    const isBiggerThan18 =
      age > 18 ||
      (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)));
    const isLowerThan90 =
      age < 90 ||
      (age === 90 && (monthDiff < 0 || (monthDiff === 0 && dayDiff <= 0)));

    if (birthDate <= today && isBiggerThan18 && isLowerThan90) {
      return true;
    }

    throw new Error("Age invalid, you must be between 18 and 90");
  }

  calculateParcela(initialValue, type) {
    const parcelasNumber = 360;
    const poupancaTax = 0.11;
    const ipcaTax = 0.05;
    const fixoTax = 0.08;

    switch (type) {
      case "poupanca":
        const parcelaPoupanca =
          (poupancaTax / (1 - Math.pow(1 + poupancaTax, -parcelasNumber))) *
          initialValue;

        return Math.round(parcelaPoupanca);
      case "ipca":
        const parcelaIpca =
          (ipcaTax / (1 - Math.pow(1 + ipcaTax, -parcelasNumber))) *
          initialValue;

        return Math.round(parcelaIpca);
      case "fixo":
        const parcelaFixo =
          (fixoTax / (1 - Math.pow(1 + fixoTax, -parcelasNumber))) *
          initialValue;

        return Math.round(parcelaFixo);
      default:
        return 0;
    }
  }

  calculateFinalValue(initialValue, type) {
    const parcelasNumber = 360;

    switch (type) {
      case "poupanca":
        const finalValuePoupanca =
          this.calculateParcela(initialValue, "poupanca") * parcelasNumber;

        return Math.round(finalValuePoupanca);
      case "ipca":
        const finalValueIpca =
          this.calculateParcela(initialValue, "ipca") * parcelasNumber;

        return Math.round(finalValueIpca);
      case "fixo":
        const finalValueFixo =
          this.calculateParcela(initialValue, "fixo") * parcelasNumber;

        return Math.round(finalValueFixo);
      default:
        return 0;
    }
  }
}

module.exports = FinanciamentoImobiliario;
