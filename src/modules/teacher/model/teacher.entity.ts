
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TeacherData } from '.';

@Entity({ name: 'teachers' })
export class Teacher {

    public static readonly NAME_LENGTH = 50;

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'first_name', length: Teacher.NAME_LENGTH })
    public firstName: string;

    @Column({ name: 'last_name', length: Teacher.NAME_LENGTH })
    public lastName: string;

    public buildData(): TeacherData {

        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName
        };
    }

}
