module.exports = function (plop) {
  plop.setWelcomeMessage(`
    Welcome to CLI, What do you need?
  `),
    plop.setGenerator("Create component", {
      description: "React component",
      prompts: [
        {
          type: "list",
          name: "folderName",
          message: "select the folder or path",
          choices: ["components", "pages", "templates", "path"],
        },
        {
          type: "input",
          name: "name",
          message: "enter the component name:",
        },
        {
          type: "input",
          name: "folderPath",
          message: "path folder: (ignore case choose other choice)",
        },
      ],
      actions: (data) => {
        const { name, folderName } = data;

        if (folderName === "path") {
          return [
            {
              type: "add",
              path: `../../{{lowerCase folderPath}}/{{pascalCase name}}/index.tsx`,
              templateFile: "templates/components/index.tsx.hbs",
            },
            {
              type: "add",
              path: `../../{{lowerCase folderPath}}/{{pascalCase name}}/styles.ts`,
              templateFile: "templates/components/styles.ts.hbs",
            },
            {
              type: "add",
              path: `../../{{lowerCase folderPath}}/{{pascalCase name}}/test.tsx`,
              templateFile: "templates/components/test.tsx.hbs",
            },
          ];
        }

        return [
          {
            type: "add",
            path: "../../src/{{folderName}}/{{pascalCase name}}/index.tsx",
            templateFile: "templates/components/index.tsx.hbs",
          },
          {
            type: "add",
            path: "../../src/{{folderName}}/{{pascalCase name}}/styles.ts",
            templateFile: "templates/components/styles.ts.hbs",
          },
          {
            type: "add",
            path: "../../src/{{folderName}}/{{pascalCase name}}/test.tsx",
            templateFile: "templates/components/test.tsx.hbs",
          },
        ];
      },
    });

  plop.setGenerator("Create service", {
    description: "Create API service consumer",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "enter the service name:",
      },
    ],
    actions: [
      {
        type: "add",
        path: "../../src/services/{{name}}-service.ts",
        templateFile: "templates/service.ts.hbs",
      },
    ],
  });
  plop.setGenerator("Create MFE remote", {
    description: "Create consumer remote",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "enter the mfe name (lower case | without spaces):",
      },
    ],
    actions: [
      {
        type: "add",
        path: "../webpack/mfe/remotes/{{lowerCase name}}.js",
        templateFile: "templates/remote.js.hbs",
      },
    ],
  });
};
