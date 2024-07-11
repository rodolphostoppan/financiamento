class BirthDate {
  constructor(value) {
    this.value = value;
  }

  static validate(dateString) {
    const [day, month, year] = dateString.split("/").map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();

    this.checkIfDateIsValid(birthDate, today);

    return birthDate;
  }

  static checkIfDateIsValid(birthDate, today) {
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    const isBiggerThan18 = this.checkAgeGreaterThan18(age, monthDiff, dayDiff);
    const isLowerThan90 = this.checkAgeLowerThan90(age, monthDiff, dayDiff);

    if (birthDate > today || !isBiggerThan18 || !isLowerThan90) {
      throw new Error("Age invalid, you must be between 18 and 90");
    }
  }

  static checkAgeGreaterThan18(age, monthDiff, dayDiff) {
    return (
      age > 18 ||
      (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)))
    );
  }

  static checkAgeLowerThan90(age, monthDiff, dayDiff) {
    return (
      age < 90 ||
      (age === 90 && (monthDiff < 0 || (monthDiff === 0 && dayDiff <= 0)))
    );
  }

  getValue() {
    return this.value;
  }
}

module.exports = BirthDate;
