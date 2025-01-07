import { Module } from '@nestjs/common';
import {RepositoryModule} from "common/common/repository/repository.module";

@Module({
    imports:[RepositoryModule]
})
export class AuthModule {}
