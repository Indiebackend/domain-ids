import {
  ValidationOptions,
  buildMessage,
  registerDecorator,
} from "class-validator";
import Id from "./id";

export function IsId(domain: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isId",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return typeof value === "string" && !!Id.validate(domain, value);
        },
        defaultMessage: buildMessage((eachPrefix) => {
          return `${eachPrefix}$property must be a valid ${domain} id`;
        }, validationOptions),
      },
    });
  };
}
