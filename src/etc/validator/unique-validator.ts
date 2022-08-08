import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DataSource, Not } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueValidator implements ValidatorConstraintInterface {
  constructor(private readonly dataSource: DataSource) {}

  async validate(value: any, args: ValidationArguments) {
    const find = {
      where: {
        [args.constraints[1]]: args.value,
      },
    };
    if (args.object['id']) {
      find.where['id'] = Not(args.object['id']);
    }
    const check = await this.dataSource
      .getRepository(args.constraints[0])
      .findOne(find);

    if (check) {
      return false;
    }

    return true;
  }
  defaultMessage(args: ValidationArguments) {
    return args.property + ' ' + args.value + ' sudah digunakan';
  }
}

export function IsUnique(option: any, validationOption?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsExist',
      target: object.constructor,
      propertyName: propertyName,
      constraints: option,
      options: validationOption,
      validator: UniqueValidator,
      async: true,
    });
  };
}
