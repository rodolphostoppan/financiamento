const BirthDate = require("./birth-date");
const CPF = require("./cpf");

class FinanciamentoImobiliario {
  constructor() {
    this.cpf = null;
    this.birthDate = null;
  }

  setCPF(cpfNumber) {
    this.cpf = new CPF(cpfNumber);
  }

  getCPF() {
    return this.cpf.getValue();
  }

  validateCPF(cpfNumber) {
    CPF.validate(cpfNumber);
    return true;
  }

  setBirthDate(birthDate) {
    this.birthDate = new BirthDate(birthDate);
  }

  getBirthDate() {
    return this.birthDate.getValue();
  }

  validateBirthDate(dateString) {
    BirthDate.validate(dateString);
    return true;
  }

  calculateParcela(initialValue, type) {
    const taxa = this.getTaxa(type);
    return this.calcularParcelaComTaxa(initialValue, taxa);
  }

  getTaxa(type) {
    const taxas = {
      poupanca: 0.11,
      ipca: 0.05,
      fixo: 0.08,
    };

    if (!taxas[type]) {
      throw new Error("Tipo de financiamento inválido");
    }

    return taxas[type];
  }

  calcularParcelaComTaxa(initialValue, taxa) {
    const parcelasNumber = 360;
    return Math.round(
      (taxa / (1 - Math.pow(1 + taxa, -parcelasNumber))) * initialValue
    );
  }

  calculateFinalValue(initialValue, type) {
    const parcelasNumber = 360;
    return this.calculateParcela(initialValue, type) * parcelasNumber;
  }
}

module.exports = FinanciamentoImobiliario;
