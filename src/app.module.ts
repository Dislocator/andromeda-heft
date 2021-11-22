import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConnectionService } from './database-connection.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { KeywordsModule } from './keywords/keywords.module';
import { SentencePartsModule } from './sentence-parts/sentence-parts.module';
import { CategoriesModule } from './categories/categories.module';
import { SentenceTemplateModule } from './sentence-template/sentence-template.module';
import { GoogleDocsConnectionModule } from './google-docs-connection/google-docs-connection.module';
import { LessonsModule } from './lessons/lessons.module';
import { WordsApiConnectionModule } from './words-api-connection/words-api-connection.module';
import { SentencesModule } from './sentences/sentences.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: DatabaseConnectionService }),
    AuthModule,
    UserModule,
    KeywordsModule,
    SentencesModule,
    SentencePartsModule,
    CategoriesModule,
    SentenceTemplateModule,
    GoogleDocsConnectionModule,
    LessonsModule,
    WordsApiConnectionModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
