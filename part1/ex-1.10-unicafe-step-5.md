# 1.10: unicafe step 5

Let's continue refactoring the application. Extract the following two components:

- Button handles the functionality of each feedback submission button.
- StatisticLine for displaying a single statistic, e.g. the average score.

To be clear: the StatisticLine component always displays a single statistic, meaning that the application uses multiple components for rendering all of the statistics:
