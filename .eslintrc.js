module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": ["airbnb/base", "eslint:recommended"],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
        "no-restricted-syntax": ["error", "FunctionExpression", "WithStatement", "BinaryExpression[operator='in']"],
    }
}
