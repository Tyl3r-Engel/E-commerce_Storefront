const React = require('react');

const AppContext = React.createContext();

const QuestionsContext = React.createContext();

const RelatedItemsContext = React.createContext();

module.exports = {
  AppContext, QuestionsContext, RelatedItemsContext,
};
