import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConnectionService } from './database-connection.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { KeywordsModule } from './keywords/keywords.module';
import { SentencesModule } from './sentences/sentences.module';
import { SentencePartsModule } from './sentence-parts/sentence-parts.module';
import { CategoriesModule } from './categories/categories.module';
import { SentenceTemplateModule } from './sentence-template/sentence-template.module';
import { GoogleDocsConnectionModule } from './google-docs-connection/google-docs-connection.module';
import { LessonsModule } from './lessons/lessons.module';
import { WordsApiConnectionModule } from './words-api-connection/words-api-connection.module';
import { DatamuseApiConnectionModule } from './datamuse-api-connection/datamuse-api-connection.module';
import { TranslatorApiConnectionModule } from './translator-api-connection/translator-api-connection.module';

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
    DatamuseApiConnectionModule,
    TranslatorApiConnectionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
