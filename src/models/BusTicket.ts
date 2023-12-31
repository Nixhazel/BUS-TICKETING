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
	tableName: "bustickets",
	modelName: "BusTicket"
})
export class BusTicket extends Model {
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

	@CreatedAt
	declare createdAt: Date;

	@UpdatedAt
	declare updatedAt: Date;
}
