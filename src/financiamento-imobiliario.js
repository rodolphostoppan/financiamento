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
}

module.exports = FinanciamentoImobiliario;
