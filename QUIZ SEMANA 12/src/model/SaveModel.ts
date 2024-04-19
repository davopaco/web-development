import { SaveInterface } from "./types/RequestInterface";
import fs from "fs";
import path from "path";

export default class SaveModel {
  save = async (content: SaveInterface, query: string): Promise<boolean> => {
    try {
      content["id"] = query;
      await this.pushtoFile(content);
      return true;
    } catch (error) {
      return false;
    }
  };

  pushtoFile = async (question: SaveInterface): Promise<void> => {
    try {
      const filename = path.join(__dirname, "../database/questions.json");
      if (fs.existsSync(filename)) {
        fs.readFile(filename, "utf-8", (err, data) => {
          if (err) {
            console.log(err);
            return;
          }
          let json = JSON.parse(data) as SaveInterface[];
          json.push(question);
          fs.writeFile(filename, JSON.stringify(json, null, 2), (err) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log("File updated");
          });
        });
      } else {
        const result = [question];
        fs.writeFileSync(
          path.join(__dirname, "../database/questions.json"),
          JSON.stringify(result, null, 2)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
}
