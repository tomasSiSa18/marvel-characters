import { OmitType } from '@nestjs/mapped-types';
import { CreateTeamDto } from './create-team.dto.js';
import { IsBoolean } from 'class-validator';

export class UpdateTeamDto extends OmitType(CreateTeamDto, ['characterIds', 'active']) {

    @IsBoolean()
    active: boolean

}
