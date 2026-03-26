import { IsString, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export class CreateHabbitDto {
  @IsString()        
  @IsNotEmpty()    
  @MinLength(3)    
  name: string;
  @IsString()
  @IsOptional()
  desc?: string;
}