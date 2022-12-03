/**
 * Allows you to create a simulation of Conway's game of life
 *
 * @class GameOfLife (name)
 */
export default class GameOfLife
{
	/**
	 * Constructs a new instance.
	 *
	 * @param {string}  target  The id of the targeted canvas
	 * @param {object}  config  The game configuration
	 */
	constructor(target, config) {
		// Size of a cell on display
		this.cellSize = config.cellSize || 4
		// Colour of a dead cell
		this.deadColor = config.deadColor || 'white'
		// Colour of a living cell
		this.aliveColor = config.aliveColor || 'black'
		// Matrix containing the game
		this.matrix = null
		// Canvas that will contain the game
		this.canvas = document.getElementById(target)
		// Canvas context
		this.ctx = this.canvas.getContext('2d')
	}

	/**
	 * Fill matrix with zero.
	 *
	 * @return {GameOfLife}
	 */
	fillMatrix() {
		const height = this.canvas.height / 4
		const width = this.canvas.width / 4

		this.matrix = Array(height).fill(null).map(() => Array(width).fill(0))

		return this
	}

	/**
	 * Creates a matrix.
	 *
	 * @param {number}  width   The width
	 * @param {number}  height  The height
	 * 
	 * @return {object}  New Matrix
	 */
	createMatrix(width, height) {
		const height = this.canvas.height / 4
		const width = this.canvas.width / 4

		return Array(height).fill(null).map(() => Array(width).fill(0))
	}

	/**
	 * Place random living cells into the matrix.
	 *
	 * @return {GameOfLife}
	 */
	randomize() {
		for (let y = 0; y < this.matrix.length; y++) {
			for (let x = 0; x < this.matrix[y].length; x++) {
				this.matrix[y][x] = Math.random() > 0.5 ? 1 : 0
			}
		}

		return this
	}

	/**
	 * Draw the matrix into the canvas.
	 */
	draw() {
		for (let y = 0; y < matrix.length; y++) {
			for (let x = 0; x < matrix[y].length; x++) {
				ctx.fillStyle = this.deadColor
				if (1 === matrix[y][x]) {
					ctx.fillStyle = this.aliveColor
				}
				ctx.fillRect(4 * x, 4 * y, 4, 4)
			}
		}
	}

	/**
	 * Counts the number of neighbours.
	 *
	 * @param  {number}  y  The y-coordinate
	 * @param  {number}  x  The x-coordinate
	 * 
	 * @return {number}  Number of neighbours.
	 */
	countNeighbours(y, x) {
		let total = 0;

		let top = y - 1;
		let bottom = y + 1;
		let left = x - 1;
		let right = x + 1;

		// Top
		if (this.matrix?.[top]?.[x] && 1 === this.matrix[top][x]) {
			++total;
		}

		// Top left
		if (this.matrix?.[top]?.[left] && 1 === this.matrix[top][left]) {
			++total;
		}

		// Top right
		if (this.matrix?.[top]?.[right] && 1 === this.matrix[top][right]) {
			++total;
		}

		// Bottom
		if (this.matrix?.[bottom]?.[x] && 1 === this.matrix[bottom][x]) {
			++total;
		}

		// Bottom left
		if (this.matrix?.[bottom]?.[left] && 1 === this.matrix[bottom][left]) {
			++total;
		}

		// Bottom right
		if (this.matrix?.[bottom]?.[right] && 1 === this.matrix[bottom][right]) {
			++total;
		}

		// Left
		if (this.matrix?.[y]?.[left] && 1 === this.matrix[y][left]) {
			++total;
		}

		// Right
		if (this.matrix?.[y]?.[right] && 1 === this.matrix[y][right]) {
			++total;
		}

		return total;
	}

	/**
	 * Process the matrix according game of life rules
	 *
	 * @return {object} Evolved matrix
	 */
	evolve() {
		let result = this.createMatrix(this.matrix[0].length, this.matrix.length);
		for (let y = 0; y < this.matrix.length; y++) {
			for (let x = 0; x < this.matrix[y].length; x++) {
				let neighbours = this.countNeighbours(this.matrix, y, x)
				if (neighbours < 2 && 1 === this.matrix[y][x] || neighbours > 3 && 1 === this.matrix[y][x]) {
					continue;
				}

				if (3 === neighbours && 0 === this.matrix[y][x]) {
					result[y][x] = 1;
					continue;
				}

				result[y][x] = this.matrix[y][x];
			}
		}

		return result;
	}

	/**
	 * Clears the canvas.
	 *
	 * @return {GameOfLife}
	 */
	clear() {
		this.ctx.clearRect(0, 0, canvas.width, canvas.height)

		return this
	}
}
