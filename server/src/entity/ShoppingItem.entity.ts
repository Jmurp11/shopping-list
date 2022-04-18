import { Field, Int, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("shopping-items")
@ObjectType()
export class ShoppingItem {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id?: number;

  @Field(() => String)
  @Column()
  itemName: string;

  @Field(() => String)
  @Column()
  description: string;

  @Field(() => Int)
  @Column()
  quantity: number;
}
