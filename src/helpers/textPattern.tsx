export class TextPattern {
  public text: string;
  constructor(text: string) {
    this.text = text;
  }

  public textPatternThai() {
    const thiaOnlyPattern = /^[ก-๙\s]*$/;
    return thiaOnlyPattern.test(this.text);
  }

  public textPatternEnglish() {
    const englishOnlyPattern = /^[a-zA-Z0-9\s!@#%^&*.]*$/;
    return englishOnlyPattern.test(this.text);
  }
}

export class EmailPattern extends TextPattern {
  constructor(text: string | undefined | null) {
    super(text ?? "");
  }

  public isValidate() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]$/;
    return super.textPatternEnglish() && emailPattern.test(this.text);
  }
}
