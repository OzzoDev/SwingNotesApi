import yaml from "js-yaml";
import fs from "fs";
import path from "path";

const mainDoc = yaml.load(fs.readFileSync(path.resolve("docs/mainDoc.yaml"), "utf8"));
const authDoc = yaml.load(fs.readFileSync(path.resolve("docs/authDoc.yaml"), "utf8"));
const noteDoc = yaml.load(fs.readFileSync(path.resolve("docs/noteDoc.yaml"), "utf8"));

export const swaggerDocs = {
  ...mainDoc,
  paths: {
    ...mainDoc.paths,
    ...authDoc.paths,
    ...noteDoc.paths,
  },
  components: {
    schemas: {
      ...(authDoc.components?.schemas || {}),
      ...(noteDoc.components?.schemas || {}),
    },
    securitySchemes: {
      ...(mainDoc.components?.securitySchemes || {}),
    },
  },
};
