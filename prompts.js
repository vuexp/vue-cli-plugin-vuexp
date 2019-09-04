const path = require('path');

module.exports = [
  {
    name: 'applicationId',
    type: 'input',
    message: 'Enter a unique application identifier:',
    default: 'org.vuexp.application',
    validate(applicationId) {
      const idRE = /^([A-Za-z][A-Za-z\d_]*\.)+[A-Za-z][A-Za-z\d_]*$/;

      if (!idRE.test(applicationId)) {
        return `Invalid application identifier.
A valid identifier:
 - must contain two or more strings separated by a dot
 - each string must start with a letter
 - each string can only contain numbers, letters and the _ character
Example: com.company.app`;
      }

      return true;
    }
  },
  {
    name: 'historyMode',
    type: 'confirm',
    message: 'Use HTML5 history mode? (Default: history mode)',
    default: true
  },
  {
    name: 'isNewProject',
    type: 'confirm',
    message: 'Is this a brand new project? (Default: Yes)',
    default: true
  },
  {
    name: 'vuexpRouter',
    type: 'confirm',
    message: 'Use VueXP Router? (Default: Yes)',
    default: true,
    when: () => {
      try {
        // Attempt to read package.json
        const pkg = require(path.join(process.cwd(), 'package.json'));
        // Don't show if vue router is already set
        return !pkg.dependencies['vue-router'];
      } catch (e) {
        console.log('Unable to read package.json');
        return false;
      }
    }
  },
  {
    name: 'templateType',
    type: 'list',
    message: 'What type of template do you want to start with? (Default: Simple)',
    choices: [
      {
        name: 'Simple',
        value: 'simple'
      },
      {
        name: 'Advanced',
        value: 'advanced'
      },
      {
        name: 'Custom',
        value: 'custom'
      }
    ],
    default: 'simple'
  },
  {
    name: 'customTemplatePath',
    type: 'input',
    message: 'Enter custom template path',
    when(answers) {
      return answers.templateType == 'custom';
    }
  }
];
