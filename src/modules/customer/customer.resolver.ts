import { createBaseResolver } from "../shared/createBaseResolver";
import { Customer } from "../../entity/Customer";
import { CreateCustomerInput } from "./Input";
import { Resolver} from "type-graphql";
// import bcryptjs from 'bcryptjs';

const BaseResolver = createBaseResolver(
    "Customer",
    Customer,
    CreateCustomerInput,
    Customer
);

@Resolver()
export class CustomerResolver extends BaseResolver{

    // @Mutation(() => Customer, {name: 'register'})
    // async register(@Arg("data", () => CreateCustomerInput) data: CreateCustomerInput){
    //     const hashedPassword = await bcryptjs.hash(data.password, 12);
    //     const user = await super.create({
    //         ...data,
    //         password: hashedPassword
    //     });

    //     return user;

    // }
}