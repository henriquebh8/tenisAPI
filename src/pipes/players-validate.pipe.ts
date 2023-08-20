import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';

export class PlayerValidatePipe implements PipeTransform {

    transform(value: any, metadata: ArgumentMetadata) {
        if(!value || !/^[0-9a-fA-F]{24}$/.test(value)) {
            throw new BadRequestException('id cannot be empty')
        }
        return value;
    }
}


export class PlayerValidatePipeGet implements PipeTransform {

    transform(value: any, metadata: ArgumentMetadata) {
        if(!value || value.length < 1) {
            throw new BadRequestException('id cannot be empty')
        }
        return value;
    }
}