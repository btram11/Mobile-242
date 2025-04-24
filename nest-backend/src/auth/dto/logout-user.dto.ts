import { ApiProperty } from '@nestjs/swagger';

export class LogoutResponseDTO {
  @ApiProperty()
  message: string;
}
