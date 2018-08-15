# Tic Tac Toe

Basic implementation of Tic Tac Toe (no AI) using vanilla javascript and html. The computer makes random moves each time. You can play the game here: https://codepen.io/aditi-nath/full/ajrpmy/

# How to run

Unzip the folder and run the Index.html file in your broswer. NOTE: If you run the codepen link on your phone, the markers scale down and look squished. 

# Description 

1. Board is laid out as 3x3 grid using Bootstrap's grid structure. Each cell has an id associated with it.
2. Game state isn't saved in any data structure. Each time a turn is completed, depending on the cell marked, the corresponding row and column in checked. Diagonals are also checked each time regardless of whether the cell is central or not.
3. Color scheme was picked keeping color blindness in mind. (NOTE: Still an ongoing selection process.)
4. Grid is responsive and svg elements scale accordingly through the usage of viewBox.
5. In order to scale the svg element, circle and path for the crosses, I calculated the dimensions from the current width and height of the svg container. 
6. Computer makes moves by generating random numbers using Math.random()

# Challenges faced

1. Main challenge was getting the svg elements to scale according to the view size.
2. Animating the markers appropriately.
3. Deciding on the right color palette.

# TODO

1. ADD UNIT TESTING
2. Implement AI logic, either MinMax algorithm or NegaMax.
3. Implement game state visualization for NegaMax algorithm. Refer to this wonderful visualization for inspiration! 
http://bernii.github.io/tic-tac-toe-coffee/
4. Add two player option
5. Make the page more responsive for mobile devices
6. Implement in React
7. Cry in a corner when all above fails




