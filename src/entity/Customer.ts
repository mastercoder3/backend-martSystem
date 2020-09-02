import { ObjectType, Field, ID, Root } from "type-graphql";
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Customer extends BaseEntity{
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;
    
    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field()
    name(@Root() parent: Customer): string{
        return `${parent.firstName} ${parent.lastName}`;
    }

    @Field()
    @Column("text", {unique: true})
    email: string;

    @Column()
    password: string

    @Column("bool", {default: false})
    confirmed: boolean

}