import {
  EnumMemberStructure,
  OptionalKind,
  Project, StructureKind,
} from 'ts-morph';
import { DISABLE_ESLINT_COMMENT } from '../../constants';

const project = new Project({
  tsConfigFilePath: 'tsconfig.json',
});

interface GenerateEnumParams {
    pathFileName: string,
    enumName: string,
    members: OptionalKind<EnumMemberStructure>[],
    overwrite?: boolean,
}

export const generateFileWithEnum = (params: GenerateEnumParams) => {
  const {
    pathFileName, members, enumName, overwrite = false,
  } = params;
  const file = project.createSourceFile(pathFileName, {
    statements: [{
      kind: StructureKind.Enum,
      name: enumName,
      isExported: true,
      members,
    }],
  }, {
    overwrite,
  });

  return file;
};

export const saveProjectChanges = async () => project.save();

export const disableEslintOnFile = (pathFileName: string) => {
  const file = project.getSourceFile(pathFileName);
  file?.insertStatements(0, DISABLE_ESLINT_COMMENT);
};

interface EnumMember {
  key: string,
  value: any,
  docs?: any,
}

export const generateEnumMembers = (
  members: EnumMember[],
): OptionalKind<EnumMemberStructure>[] => members.map(
  ({ key, value, docs }) => ({ name: key, value, docs }),
);
