import {Logger, Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule} from "@nestjs/config";
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import mongoose from "mongoose";
import {NestjsFormDataModule} from "nestjs-form-data";

@Module({
  imports: [
      ConfigModule.forRoot(),
      MongooseModule.forRoot(process.env.DATABASE_URL),
      ShoppingListModule,
      NestjsFormDataModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
    constructor() {
        mongoose.connect(process.env.DATABASE_URL)
            .then(() => Logger.log('[Database]: Database Connected Successfully'))
            .catch((err) => Logger.error(err));
    }
}
