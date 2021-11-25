import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { KeywordEntity } from '../entities/keyword.entity';
import { SentenceEntity } from '../entities/sentence.entity';
import { SentencePartEntity } from '../entities/sentencePart.entity';
import { SentenceTemplateEntity } from '../entities/sentenceTemplate.entity';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { DatamuseApiConnectionService } from 'src/datamuse-api-connection/datamuse-api-connection.service';
import { WordsApiConnectionService } from 'src/words-api-connection/words-api-connection.service';
import { TranslatorApiConnectionService } from '../translator-api-connection/translator-api-connection.service';

@Injectable()
export class SentencesService {
  constructor(
    private translatorApiConnectionService: TranslatorApiConnectionService,
    private datamuseApiConnectionService: DatamuseApiConnectionService,
    private wordsApiConnectionService: WordsApiConnectionService,
    @InjectRepository(KeywordEntity)
    private keywordsRepository: Repository<KeywordEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(SentenceTemplateEntity)
    private sentenceTemplateRepository: Repository<SentenceTemplateEntity>,
    @InjectRepository(SentenceEntity)
    private sentenceRepository: Repository<SentenceEntity>,
  ) {}

  async findAll(user: UserEntity) {
    const sentences = await this.userRepository.find({
      where: { id: user.id },
      relations: ['sentences'],
    });
    return sentences;
  }

  async generateSentences(user: UserEntity) {
    try {
      console.log('user', user);
      const keywords = user.keywords;
      let sentence: SentenceEntity;
      this.sentenceRepository.create(sentence);
      for (const keyword of keywords) {
        await this.generateSentenceHelper(user, keyword);
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return user.sentences;
  }

  async generateSentence(user: UserEntity, keywordName: string) {
    try {
      const keyword = await this.keywordsRepository.findOne({
        where: { word: keywordName },
      });
      return this.generateSentenceHelper(user, keyword);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  private async generateSentenceHelper(
    user: UserEntity,
    keyword: KeywordEntity,
  ) {
    let sentence = this.sentenceRepository.create();
    sentence.keywords = [];
    const templates = await this.sentenceTemplateRepository.find();
    console.log(templates, 'templates');
    const filteredTemplates: SentenceTemplateEntity[] = [];
    for (const template of templates) {
      for (const sentencePart of template.sentenceParts) {
        if (sentencePart.name === keyword.sentencePart.name) {
          filteredTemplates.push(template);
          break;
        }
      }
    }
    console.log(
      filteredTemplates,
      '----------------------------------------------------------------',
    );
    // const filteredTemplates = templates.filter((sentence) => sentence.sentenceParts.map((sentencePart) => sentencePart.name === keyword.sentencePart.name))
    const randomTemplate =
      filteredTemplates[Math.floor(Math.random() * filteredTemplates.length)];

    console.log(randomTemplate, 'template');
    let foundSame = false;
    for (const sentencePart of randomTemplate.sentenceParts) {
      if (sentencePart.name === keyword.sentencePart.name && !foundSame) {
        foundSame = true;
        sentence.keywords.push(keyword);
        continue;
      }
      //   const keywords = await this.keywordsRepository.find({
      //     where: { sentencePart: sentencePart },
      //   });
      //   console.log(keywords, 'keywords', sentencePart, 'sentencePart');

      const keywords = await this.getNextWords(keyword.word, sentencePart.name);
      console.log(keywords, '-----------');
      const randomKeyword = this.keywordsRepository.create();
      randomKeyword.word =
        keywords[Math.floor(Math.random() * keywords.length)];
      sentence.keywords.push(randomKeyword);
      randomKeyword.category = keyword.category;
      //   randomKeyword.sentencePart = keyword.sentencePart;
    }
    sentence.category = keyword.category;
    console.log(sentence, 'sentence');
    user.sentences.push(sentence);

    await user.save();
    await sentence.save();

    return sentence;
  }
  async createSentence() {
    // const template = ['v', 'u', 'n'];
    const template = ['v', 'adv', 'adv', 'v', 'n'];
    let keyword = 'tests';
    let sentence = [keyword];
    for (let index = template.length - 2; index >= 0; index--) {
      const element = template[index];
      let nextWord = '';
      if (template[index] == 'u') {
        nextWord = 'the';
      } else {
        console.log(keyword, element, 'kw');
        let nextWords: any = await this.getNextWords(keyword, element);
        console.log(nextWords);
        nextWord = nextWords[Math.floor(Math.random() * nextWords.length)];
        keyword = nextWord;
      }
      sentence.push(nextWord);
    }
    return sentence;

    let keywordPos = 0;
    let i;
    for (i = 0; i < keyword.length; i++) {
      if (await this.hasRightPartOfSpeech(keyword, template[i])) {
        keywordPos = i;
        break;
      }
    }
    while (i > 0) {}
  }
  async getNextWords(word: string, wordPart: string) {
    const options = `lc=${word}&md=p${wordPart}`;
    let contestantNextWords: any =
      await this.datamuseApiConnectionService.sendData(options);
    // contestantNextWords = contestantNextWords.map((word) => word.word);
    let goodOnes = [];
    let test = {};
    for (const contestant of contestantNextWords) {
      const result = await this.findWithRightPartOfSpeech(wordPart, contestant);
      if (result) {
        goodOnes.push(contestant.word);
      }
      test[contestant] = result;
    }
    console.log(test, 'text');
    console.log(goodOnes, 'good ones');
    return goodOnes;
    if (!contestantNextWords.length) {
      console.log('no contestant');
      throw new NotFoundException('Following words not found');
    }

    let filteredNextWords = [];

    for (const contestant of contestantNextWords) {
      let contestantData;
      try {
        contestantData = await this.wordsApiConnectionService.sendWord(
          contestant,
        );
      } catch (error) {
        console.log(error);
      }
      console.log(contestantData, '--------------------------------');
      if (contestantData === undefined) continue;
      if (await this.hasRightPartOfSpeech(contestantData.results, wordPart)) {
        filteredNextWords.push(contestant);
      }
    }
    if (!filteredNextWords.length) {
      console.log('no filtered');

      throw new NotFoundException('Following words not found');
    }
    console.log(filteredNextWords, '--------------------------------');
    return filteredNextWords;
  }
  private async findWithRightPartOfSpeech(wordPart, data) {
    try {
      if (data.tags == null) return false;
      for (const tag of data.tags) {
        if (wordPart != tag) return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }
  private async hasRightPartOfSpeech(
    wordData: any,
    wordPart: string,
  ): Promise<boolean> {
    try {
      console.log(wordData);

      if (Array.isArray(wordData)) {
        for (const item of wordData) {
          if (item.partOfSpeech != wordPart) {
            return false;
          }
        }
      }
      if (wordData.partOfSpeech == wordPart) {
        return true;
      }
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  async removeSentence(id: string, user: UserEntity) {
    user.sentences.filter((sentence) => sentence.id != Number(id));
    return user.sentences;
  }

  async reworkSentence(sentence: string) {
    let words = sentence.split(' ')
    
  }

}
