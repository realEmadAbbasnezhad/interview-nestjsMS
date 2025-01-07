import {Module} from '@nestjs/common';
import {PrismaService} from "common/common/repository/prisma/prisma.service";

@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})
export class RepositoryModule {
}
