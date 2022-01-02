export interface StatusCodeObj {
    code: number;
    description: string;
    key: string;
    jsdoc: {
      reference?: string;
      documentation: string;
    };
    isExperimental?: boolean;
    origin: string;
  }
