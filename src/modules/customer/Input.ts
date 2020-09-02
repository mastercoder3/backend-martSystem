import { InputType, Field } from "type-graphql";
import { Length, IsEmail, MinLength } from "class-validator";

@InputType()
class BaseInput{
    @Field()
    @Length(1, 255)
    firstName: string;

    @Field()
    @Length(1, 255)
    lastName: string;

    @Field()
    @IsEmail()
    email: string;

    @Field()
    @MinLength(6)
    password: string;
}

@InputType()
export class CreateCustomerInput extends BaseInput{}