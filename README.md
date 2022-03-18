# TIC-TAC-TOE

![tic-tac-toe](https://user-images.githubusercontent.com/97133099/159033706-95997576-4103-4b10-8846-92d1f64adac0.gif)

Play a classic Tic Tac Toe game!

## Info
- pure javascript
- no graphic assets, just bunch of divs and characters
- some nice css animations combined with javascript setTimeout to synchronize it
- svg line to create the "crossed out" effect when someone wins
- you can play against AI or other player locally
- the AI:
  - first checks if it has an opportunity to finish a winning pattern that round
  - if not, it checks if it has to defend against player's finishing move
  - if not, it either tries to get a winning pattern out of empty cells or if there are already some moves made it proceeds to analyze which winning patterns are currently the most likely so it can prevent the player from making them. It puts the available moves into a sort of a heatmap and acts on the most "optimal" move (meaning that this move has been suggested the most frequently by its analysis methods). So it basically thinks how to block player's all potential winning patterns in the least amount of moves.
  - in theory the AI should be unbeatable, meaning you can only either draw or lose against it
  - there is an already well-documented algorithm for creating an unbeatable tic tac toe AI (more here: https://www.neverstopbuilding.com/blog/minimax), however I've decided I wanted to figure this out from scratch without reading into how it "should" work. There is a chance I've accidentally came up with essentially the same thing, just with a more brute approach. I've left bunch of comments inside the code within the aiMove() function, so one might try to understand how it works.
