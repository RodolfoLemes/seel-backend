import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddColumnCoursesInSubscribers1617238786778
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'subscribers',
      new TableColumn({
        name: 'courses',
        isArray: true,
        type: 'varchar',
        default: 'array[]::varchar[]',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('subscribers', 'courses');
  }
}
