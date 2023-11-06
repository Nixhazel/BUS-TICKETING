import {
	Table,
	Column,
	Model,
	HasMany,
	DataType,
	CreatedAt,
	UpdatedAt,
} from "sequelize-typescript";


@Table({
   timestamps: true,
   tableName: "users",
   modelName: "User"
})
export class User extends Model {
   @Column({
      primaryKey: true,
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4
   })
   declare id: string;

   @Column({
      type: DataType.STRING,
      unique: true,
      allowNull: false,
   })
   declare username: string;

   @Column({
      type: DataType.STRING,
      allowNull: false,
   })
   declare password: string;

   @CreatedAt
   declare created_at: Date;

   @UpdatedAt
   declare updated_at: Date
}
