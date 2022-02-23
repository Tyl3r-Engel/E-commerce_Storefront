const React = require('react');

const AppContext = React.createContext();
const OverviewContext = React.createContext();
const StyleContext = React.createContext();
const QuestionsContext = React.createContext();
const RelatedItemsContext = React.createContext();
const RatingsContext = React.createContext();

module.exports = {
  AppContext,
  QuestionsContext,
  OverviewContext,
  StyleContext,
  RatingsContext,
  RelatedItemsContext,
};
