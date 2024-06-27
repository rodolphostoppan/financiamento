describe("FinanciamentoImobiliario class", () => {
  let financiamentoImobiliario;

  beforeEach(() => {
    financiamentoImobiliario = new FinanciamentoImobiliario();
  });

  afterEach(() => {
    financiamentoImobiliario = null;
  });

  it("creates a new Financiamento", () => {
    expect(financiamentoImobiliario).toBeDefined();
  });

  describe("success", () => {
    describe("CPF input", () => {
      beforeEach(() => {
        financiamentoImobiliario.setCPF("123.456.789-10");
      });

      it("get a CPF number from an input", () => {
        const cpfNumber = financiamentoImobiliario.getCPF();

        expect(cpfNumber).toHaveLength();
      });

      it("get a valid CPF number", () => {
        const cpfNumber = financiamentoImobiliario.getCPF();

        const validCpfNumber = financiamentoImobiliario.validateCPF(cpfNumber);

        expect(validCpfNumber).toBeTruthy();
      });
    });

    describe("birth date", () => {
      beforeEach(() => {
        financiamentoImobiliario.setBirthDate("22/11/1997");
      });
      it("get a valid birth date", () => {
        const birthDate = financiamentoImobiliario.getBirthDate();

        financiamentoImobiliario.validateBirthDate(birthDate);

        expect(birthDate).toBeTruthy();
      });
    });

    describe("financiamentoImobiliario options", () => {
      it.each`
        initialValue | type          | finalValue
        ${200000}    | ${"poupanca"} | ${7920000}
        ${200000}    | ${"ipca"}     | ${3600000}
        ${200000}    | ${"fixo"}     | ${5760000}
      `(
        "calculate final value according to type $type",
        ({ initialValue, type, finalValue }) => {
          const imovelFinalValue = financiamentoImobiliario.calculateFinalValue(
            initialValue,
            type
          );

          expect(imovelFinalValue).toBe(finalValue);
        }
      );

      it.each`
        initialValue | type          | parcela
        ${200000}    | ${"poupanca"} | ${22000}
        ${200000}    | ${"ipca"}     | ${10000}
        ${200000}    | ${"fixo"}     | ${16000}
      `("calculate parcela", ({ initialValue, type, parcela }) => {
        const parcelaValue = financiamentoImobiliario.calculateParcela(
          initialValue,
          type
        );

        expect(parcelaValue).toBe(parcela);
      });
    });
  });
  describe("error", () => {
    describe("CPF input", () => {
      beforeEach(() => {
        financiamentoImobiliario.setCPF("1");
      });

      it("get an invalid CPF number", () => {
        const cpfNumber = financiamentoImobiliario.getCPF();

        financiamentoImobiliario.validateCPF(cpfNumber);

        expect(cpfNumber).toThrow("CPF invalid");
      });
    });

    describe("birth date", () => {
      beforeEach(() => {
        financiamentoImobiliario.setBirthDate("22/11/1800");
      });
      it("get an invalid birth date", () => {
        const birthDate = financiamentoImobiliario.getBirthDate();

        financiamentoImobiliario.validateBirthDate(birthDate);

        expect(birthDate).toBeFalsy();
      });
    });
  });
});
