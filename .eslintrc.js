module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        "plugin:react/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "google",
        "plugin:prettier/recommended",
        "prettier"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "prettier"
    ],
    "rules": {
    	'require-jsdoc': 'off',
    	'@typescript-eslint/ban-ts-comment': 'off',
   	 '@typescript-eslint/ban-types': 'off',
   	 '@typescript-eslint/no-explicit-any': 'off',
   	 'new-cap': 0,
  	  'no-unused-vars': 0,
  	  '@typescript-eslint/no-unused-vars': 'off',
  	  'endOfLine': 'off',
  	  "import/no-unresolved": "off",
    		'camelcase': 'off',
    }
}