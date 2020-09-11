import SQLite from 'react-native-sqlite-storage';

import { IDatabaseContract } from '../contracts/DatabaseContract';
import { PodcastModel } from '../models/PodcastModel';

export class SQliteServices implements IDatabaseContract {
  private _db: SQLite.SQLiteDatabase;
  public isReady = false;

  constructor() {
    this._db = SQLite.openDatabase(
      {
        name: 'db.sqlite',
        location: 'Documents',
      },
      () => {
        this.init();
        console.log('sQlite database connect');
      },
      (err) => {
        console.log('sQlite database error', err);
      },
    );
  }

  private async init() {
    await this._db.executeSql(`
      
      INSERT INTO podcasts (artist, episodes_count, feed_url, name, thumbnail) VALUES ("Adam Wathan", 150, "https://feeds.transistor.fm/full-stack-radio", "Full Stack Radio", "https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/68/76/80/68768037-8acf-383e-0ba7-1b6f96f8257a/mza_14278481333190252475.jpg/100x100bb.jpg");
    `);

    this.isReady = true;
  }

  public getAllPodcast(): Promise<PodcastModel[]> {
    const podcasts: PodcastModel[] = [];

    return new Promise((resolve, reject) => {
      this._db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM podcasts ORDER BY name;',
          [],
          (_, results) => {
            for (let i = 0; i < results.rows.length; i++) {
              const row = results.rows.item(i);

              podcasts.push(
                new PodcastModel({
                  name: row.name,
                  thumbnail: row.thumbnail,
                  artist: row.artist,
                  episodesCount: row.episodes_count,
                  feedUrl: row.feed_url,
                }),
              );
            }

            resolve(podcasts);
          },
          (_, err) => {
            reject(err);
          },
        );
      });
    });
  }

  public subscribeToPodcast(podcast: PodcastModel): Promise<void> {
    console.log('podcast', podcast);
    return new Promise((resolve, reject) => {
      this._db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO podcasts (artist, episodes_count, feed_url, name, thumbnail) VALUES ($1, $2, $3, $4, $5)',
          [
            podcast.artist,
            podcast.episodesCount,
            podcast.feedUrl,
            podcast.name,
            podcast.thumbnail,
          ],
          () => {
            console.log('podcast insert');
            resolve();
          },
          (_, err) => {
            console.log('error insert podcast', err);
            reject(err);
          },
        );
      });
    });
  }
}
