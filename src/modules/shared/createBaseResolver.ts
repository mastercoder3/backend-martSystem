import { ClassType, Resolver, Query, Arg, Mutation } from "type-graphql";
import bcryptjs  from 'bcryptjs';

export function createBaseResolver<
    T extends ClassType,
    I extends ClassType
>(
    suffix: string,
    returnType: T,
    inputType: I,
    entity: any
) {
    @Resolver({isAbstract: true})
    abstract class BaseResolver{

        @Query(() => returnType, {name: `get${suffix}`})
        async get(@Arg("id", () => String) id: string){
            return entity.findOne(id);
        }

        @Mutation(() => returnType, {name: `create${suffix}`})
        async create(@Arg("data", () => inputType) data: any){
            if(suffix === 'customer'){
                const hashedPassword = await bcryptjs.hash(data.password,12);
                return entity.create({...data, password: hashedPassword}).save();
            }
            return entity.create(data).save();
        }
    }

    return BaseResolver;
}