import { ShoppingItem } from "../entity/ShoppingItem.entity";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class QueryResponse {
  @Field(() => Success, { nullable: true })
  success?: Success;

  @Field(() => String, { nullable: true })
  error?: string;
}

@ObjectType()
class Success {
  @Field(() => String)
  message: string;

  @Field(() => [ShoppingItem], { nullable: true })
  data?: ShoppingItem[];
}
