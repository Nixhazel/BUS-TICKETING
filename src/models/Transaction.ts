import {
	Table,
	Column,
	Model,
	HasMany,
	DataType,
	CreatedAt,
	UpdatedAt
} from "sequelize-typescript";

@Table({
	timestamps: true,
	tableName: "transactions",
	modelName: "Transaction"
})
export class Transaction extends Model {
	@Column({
		primaryKey: true,
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4
	})
	declare id: string;

	@Column({
		type: DataType.UUID,
		unique: true,
		allowNull: false
	})
	declare userId: string;

	@Column({
		type: DataType.ENUM("credit", "debit"),
		allowNull: false
	})
	declare type: string;

	@Column({
		type: DataType.DECIMAL(10, 2),
		allowNull: false
	})
	declare amount: string;

	@CreatedAt
	declare created_at: Date;

	@UpdatedAt
	declare updated_at: Date;
}
