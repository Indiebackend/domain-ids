import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from "@nestjs/common";
import { Id } from "./id";

export type ExceptionBuilder = (value: string, domain: string) => unknown;

const defaultExceptionBuilder: ExceptionBuilder = (
  value: string,
  domain: string
) => new BadRequestException(`${value} is not a valid ${domain} id`);

export class ParseIdPipe implements PipeTransform {
  private readonly exceptionBuilder: (
    value: string,
    domainu: string
  ) => unknown;
  constructor(
    private readonly domain: string,
    exceptionBuilder?: ExceptionBuilder
  ) {
    this.exceptionBuilder = exceptionBuilder ?? defaultExceptionBuilder;
  }

  transform(value: any, _: ArgumentMetadata) {
    if (!Id.validate(this.domain, value)) {
      throw this.exceptionBuilder(this.domain, value);
    }
    return Id.decode(value);
  }
}
