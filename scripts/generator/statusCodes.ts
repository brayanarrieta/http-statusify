/* eslint-disable no-console */
import { generateJSDocLink } from '../../helpers';
import { STATUS_CODES } from '../../constants';
import {
  disableEslintOnFile, generateEnumMembers, generateFileWithEnum, saveProjectChanges,
} from './typescriptCompiler';

const PATH_FILENAME = 'src/StatusCodes.ts';

export const generateStatusCodes = async () => {
  try {
    const statusCodes = STATUS_CODES.map(
      ({
        code, key, jsdoc,
      }) => {
        const statusCode: any = { key, value: code };

        if (jsdoc) {
          const docs = [jsdoc.documentation];

          if (jsdoc.reference) {
            docs.push(generateJSDocLink(jsdoc.reference, 'Official Documentation'));
          }
          statusCode.docs = [docs.join('\n\n')];
        }

        return statusCode;
      },
    );

    const statusCodesMembers = generateEnumMembers(statusCodes);

    generateFileWithEnum({
      pathFileName: PATH_FILENAME,
      enumName: 'StatusCodes',
      overwrite: true,
      members: statusCodesMembers,
    });

    disableEslintOnFile(PATH_FILENAME);

    await saveProjectChanges();

    console.log(`Successfully updated ${PATH_FILENAME}`);
  } catch (error) {
    console.log(`Error updating ${PATH_FILENAME}`);
  }
};
