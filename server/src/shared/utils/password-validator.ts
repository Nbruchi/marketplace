import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";

@ValidatorConstraint({ name: "StrongPassword", async: false })
export class StrongPassword implements ValidatorConstraintInterface {
  validate(password: string, args: ValidationArguments) {
    if (!password) return false;

    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]{6,}$/;
    return regex.test(password);
  }

  defaultMessage(args: ValidationArguments) {
    return "Password must be at least 6 characters long, contain uppercase, lowercase, number and special character";
  }
}
