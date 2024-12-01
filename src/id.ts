import base from "base-x";
import * as uuid from "uuid";
import { DomainIdError } from "./id-error";

const ID_SIZE = 22;
const SEPARATOR = "_";
const BASE62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const b62 = base(BASE62);

export default class Id {
  /**
   * Generate a new uuid and encode it with the provided domain
   * @argument domain the domain (prefix) of the id
   */
  static generate(domain: string): string {
    return Id.encode(domain, crypto.randomUUID());
  }

  /**
   * Encode a UUID with the provided domain as prefix
   * @argument domain the domain (prefix) of the id
   * @argument id UUID to encode
   */
  static encode(domain: string, id: string): string {
    // Base62 encoding of a UUID can result in either a 22 or 21 characters
    return `${domain}${SEPARATOR}${b62.encode(uuid.parse(id)).padStart(22, "0")}`;
  }

  /**
   * Decode and return the uuid from a domain id, if you require strict validation please use Id.validate()
   */
  static decode(id: string): string {
    try {
      const encodedUuid = this.extractIdPart(id);
      const decoded = b62.decode(encodedUuid);
      return uuid.stringify(decoded.slice(decoded.length === 17 ? 1 : 0)); // Remove the extra padding for ids < 22
    } catch (error) {
      throw new DomainIdError(`failed to decode uuid from id ${id}`);
    }
  }

  /**
   * Validate and returns the decoded UUID from a domain id if it's valid, returns null otherwise
   */
  static validate(domain: string, value: string): boolean {
    const parts = value.split(SEPARATOR);
    if (
      parts.length !== 2 ||
      parts[0] !== domain ||
      parts[1].length !== ID_SIZE
    )
      return false;

    return !!Id.decode(value);
  }

  private static extractIdPart(value: string): string {
    return value.substring(value.indexOf(SEPARATOR) + 1);
  }
}
