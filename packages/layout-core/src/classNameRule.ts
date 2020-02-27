import { GridType } from 'layout-core/helper/name-rule';

class ClassNameRule {
  readonly type: GridType;

  readonly name: string;

  readonly separator: string;

  constructor(type: GridType, name: string, separator: string = ':') {
    this.type = type;
    this.name = name;
    this.separator = separator;
  }

  key = () => `${this.type}${this.separator}${this.name}`;

  static phrase = (text: string, separator: string = ':') => {
    const r = text.split(separator);
    return new ClassNameRule(r[0] as GridType, r[1], separator);
  };

  static of = (type: GridType, name: string, separator: string = ':') => new ClassNameRule(type, name, separator);

  static container = (name: string) => ClassNameRule.of('container', name);

  static item = (name: string) => ClassNameRule.of('item', name);
}

export { ClassNameRule };
